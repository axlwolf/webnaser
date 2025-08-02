<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use DateTime;
use DateInterval;

/**
 * Servicio para manejo de JSON Web Tokens (JWT)
 *
 * Proporciona funcionalidades para generar, validar y gestionar
 * tokens JWT para el sistema de autenticación.
 */
class JwtService
{
    private string $secretKey;
    private string $algorithm;
    private int $accessTokenExpiry;
    private int $refreshTokenExpiry;
    private string $issuer;

    public function __construct(
        string $secretKey = null,
        string $algorithm = 'HS256',
        int $accessTokenExpiry = 7200, // 2 horas
        int $refreshTokenExpiry = 604800, // 7 días
        string $issuer = 'naser-cms'
    ) {
        $this->secretKey = $secretKey ?? $_ENV['JWT_SECRET'] ?? 'naser_jwt_secret_development_2024';
        $this->algorithm = $algorithm;
        $this->accessTokenExpiry = $accessTokenExpiry;
        $this->refreshTokenExpiry = $refreshTokenExpiry;
        $this->issuer = $issuer;
    }

    /**
     * Generar token de acceso para usuario autenticado
     */
    public function generateAccessToken(array $userData): string
    {
        try {
            $now = new DateTime();
            $expiry = (clone $now)->add(new DateInterval("PT{$this->accessTokenExpiry}S"));

            $payload = array_merge($this->createBasePayload(), [
                'sub' => (string) $userData['id'], // Subject (User ID)
                'name' => $userData['name'],
                'email' => $userData['email'],
                'role' => $userData['role'],
                'type' => 'access',
                'iat' => $now->getTimestamp(),
                'exp' => $expiry->getTimestamp(),
                'jti' => $this->generateJti()
            ]);

            return JWT::encode($payload, $this->secretKey, $this->algorithm);

        } catch (\Exception $e) {
            error_log("Error generating access token: " . $e->getMessage());
            throw new \RuntimeException("Error al generar token de acceso", 0, $e);
        }
    }

    /**
     * Generar token de refresh para renovación
     */
    public function generateRefreshToken(int $userId): string
    {
        try {
            $now = new DateTime();
            $expiry = (clone $now)->add(new DateInterval("PT{$this->refreshTokenExpiry}S"));

            $payload = array_merge($this->createBasePayload(), [
                'sub' => (string) $userId,
                'type' => 'refresh',
                'iat' => $now->getTimestamp(),
                'exp' => $expiry->getTimestamp(),
                'jti' => $this->generateJti()
            ]);

            return JWT::encode($payload, $this->secretKey, $this->algorithm);

        } catch (\Exception $e) {
            error_log("Error generating refresh token: " . $e->getMessage());
            throw new \RuntimeException("Error al generar token de refresh", 0, $e);
        }
    }

    /**
     * Validar y decodificar token JWT
     */
    public function validateToken(string $token): ?array
    {
        try {
            $decoded = JWT::decode($token, new Key($this->secretKey, $this->algorithm));
            $payload = (array) $decoded;

            // Validaciones adicionales
            if (!isset($payload['iss']) || $payload['iss'] !== $this->issuer) {
                throw new \InvalidArgumentException("Token issuer inválido");
            }

            if (!isset($payload['type'])) {
                throw new \InvalidArgumentException("Tipo de token no especificado");
            }

            return $payload;

        } catch (ExpiredException $e) {
            error_log("Token expired: " . $e->getMessage());
            return null;
        } catch (SignatureInvalidException $e) {
            error_log("Invalid token signature: " . $e->getMessage());
            return null;
        } catch (\Exception $e) {
            error_log("Token validation error: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Verificar si un token ha expirado
     */
    public function isTokenExpired(string $token): bool
    {
        try {
            $payload = $this->getTokenClaims($token);
            if (!$payload || !isset($payload['exp'])) {
                return true;
            }

            return $payload['exp'] < time();

        } catch (\Exception $e) {
            return true;
        }
    }

    /**
     * Obtener tiempo restante de un token
     */
    public function getTokenTimeRemaining(string $token): int
    {
        try {
            $payload = $this->getTokenClaims($token);
            if (!$payload || !isset($payload['exp'])) {
                return 0;
            }

            $remaining = $payload['exp'] - time();
            return max(0, $remaining);

        } catch (\Exception $e) {
            return 0;
        }
    }

    /**
     * Extraer claims específicos del token
     */
    public function getTokenClaims(string $token): ?array
    {
        try {
            // Decodificar sin validar (solo para obtener claims)
            $parts = explode('.', $token);
            if (count($parts) !== 3) {
                return null;
            }

            $payload = json_decode(base64_decode($parts[1]), true);
            return $payload ?: null;

        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Generar JTI (JWT ID) único para el token
     */
    private function generateJti(): string
    {
        return bin2hex(random_bytes(16));
    }

    /**
     * Crear payload base para tokens
     */
    private function createBasePayload(): array
    {
        return [
            'iss' => $this->issuer, // Issuer
            'aud' => 'naser-cms-users', // Audience
        ];
    }
}