<?php

namespace Tests\Integration\Auth;

use PHPUnit\Framework\TestCase;
use App\Services\JwtService;
use App\Models\User;

class JwtServiceIntegrationTest extends TestCase
{
    private JwtService $jwtService;

    protected function setUp(): void
    {
        $this->jwtService = new JwtService();
    }

    public function testCompleteTokenLifecycle(): void
    {
        // Simular datos de usuario real
        $userData = [
            'id' => 1,
            'name' => 'Admin Naser',
            'email' => 'admin@naser.com.mx',
            'role' => 'admin'
        ];

        // 1. Generar token de acceso
        $accessToken = $this->jwtService->generateAccessToken($userData);
        $this->assertNotEmpty($accessToken);

        // 2. Validar token
        $payload = $this->jwtService->validateToken($accessToken);
        $this->assertIsArray($payload);
        $this->assertEquals($userData['email'], $payload['email']);

        // 3. Verificar que no está expirado
        $this->assertFalse($this->jwtService->isTokenExpired($accessToken));

        // 4. Generar refresh token
        $refreshToken = $this->jwtService->generateRefreshToken($userData['id']);
        $this->assertNotEmpty($refreshToken);

        // 5. Validar refresh token
        $refreshPayload = $this->jwtService->validateToken($refreshToken);
        $this->assertEquals('refresh', $refreshPayload['type']);
    }

    public function testTokenSecurityFeatures(): void
    {
        $userData = [
            'id' => 1,
            'name' => 'Test User',
            'email' => 'test@naser.com.mx',
            'role' => 'editor'
        ];

        $token = $this->jwtService->generateAccessToken($userData);

        // Verificar que el token no contiene información sensible
        $this->assertStringNotContainsString('password', $token);
        $this->assertStringNotContainsString('secret', $token);

        // Verificar que tiene estructura JWT válida
        $parts = explode('.', $token);
        $this->assertCount(3, $parts);

        // Verificar que el payload está correctamente codificado
        $payload = json_decode(base64_decode($parts[1]), true);
        $this->assertIsArray($payload);
        $this->assertArrayHasKey('exp', $payload);
    }
}
