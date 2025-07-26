# PROMPT GEMINI - BATCH 2: Servicios de Autenticación Backend

## 🎯 CONTEXTO DEL PROYECTO

Estás desarrollando el sistema de autenticación para el **CMS de Grupo Naser**. Has completado exitosamente el **UserRepository** y ahora formas parte de un equipo de **4 agentes coordinados**:

- **Kiro**: Orquestador principal con sistema de hooks automáticos
- **Claude**: Desarrollador Frontend React (completó LoginForm)
- **Gemini (tú)**: Desarrollador Backend PHP
- **Warp**: Especialista DevOps y automatización

**Branch actual**: `feature/auth-integration`  
**Progreso actual**: 36.67% (11/30 tareas completadas)  
**Sistema de hooks**: Activo - detecta automáticamente tus cambios

## ✅ TUS LOGROS ANTERIORES

Has implementado **UserRepository excepcional**:

- ✅ Operaciones CRUD completas con prepared statements
- ✅ Tests unitarios y de integración completos
- ✅ Manejo seguro de contraseñas con password_hash()
- ✅ Compatibilidad perfecta con GoDaddy hosting
- ✅ Documentación PHPDoc completa
- ✅ Arquitectura limpia y mantenible

**Tu trabajo anterior fue calificado como EXCELENTE** 🌟

## 🎯 TU PRÓXIMA TAREA: IMPLEMENTAR JWTSERVICE (Tarea 3.1)

### OBJETIVO

Crear un **servicio completo para manejo de JWT** que genere, valide y gestione tokens de autenticación de forma segura y eficiente.

### UBICACIÓN DE ARCHIVOS

```
api/services/JwtService.php
tests/unit/backend/JwtServiceTest.php
tests/integration/auth/JwtServiceIntegrationTest.php
```

### ESPECIFICACIONES TÉCNICAS DETALLADAS

#### 1. IMPLEMENTACIÓN PRINCIPAL (JwtService.php)

```php
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
        // Tu implementación aquí
    }

    /**
     * Generar token de refresh para renovación
     */
    public function generateRefreshToken(int $userId): string
    {
        // Tu implementación aquí
    }

    /**
     * Validar y decodificar token JWT
     */
    public function validateToken(string $token): ?array
    {
        // Tu implementación aquí
    }

    /**
     * Verificar si un token ha expirado
     */
    public function isTokenExpired(string $token): bool
    {
        // Tu implementación aquí
    }

    /**
     * Obtener tiempo restante de un token
     */
    public function getTokenTimeRemaining(string $token): int
    {
        // Tu implementación aquí
    }

    /**
     * Extraer claims específicos del token
     */
    public function getTokenClaims(string $token): ?array
    {
        // Tu implementación aquí
    }

    /**
     * Generar JTI (JWT ID) único para el token
     */
    private function generateJti(): string
    {
        // Tu implementación aquí
    }

    /**
     * Crear payload base para tokens
     */
    private function createBasePayload(): array
    {
        // Tu implementación aquí
    }
}
```

#### 2. IMPLEMENTACIÓN DETALLADA DE MÉTODOS

##### generateAccessToken

```php
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
```

##### validateToken

```php
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
```

##### generateRefreshToken

```php
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
```

#### 3. MÉTODOS HELPER

```php
private function generateJti(): string
{
    return bin2hex(random_bytes(16));
}

private function createBasePayload(): array
{
    return [
        'iss' => $this->issuer, // Issuer
        'aud' => 'naser-cms-users', // Audience
    ];
}

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
```

#### 4. CONFIGURACIÓN DE DEPENDENCIAS

Actualizar `composer.json`:

```json
{
  "require": {
    "firebase/php-jwt": "^6.8"
  }
}
```

#### 5. TESTS UNITARIOS (JwtServiceTest.php)

```php
<?php

namespace Tests\Unit\Backend;

use PHPUnit\Framework\TestCase;
use App\Services\JwtService;

class JwtServiceTest extends TestCase
{
    private JwtService $jwtService;
    private array $testUserData;

    protected function setUp(): void
    {
        $this->jwtService = new JwtService(
            'test_secret_key_for_testing_only',
            'HS256',
            3600, // 1 hora para tests
            86400 // 1 día para tests
        );

        $this->testUserData = [
            'id' => 1,
            'name' => 'Test User',
            'email' => 'test@naser.com.mx',
            'role' => 'admin'
        ];
    }

    public function testGenerateAccessTokenReturnsValidString(): void
    {
        $token = $this->jwtService->generateAccessToken($this->testUserData);

        $this->assertIsString($token);
        $this->assertNotEmpty($token);

        // Verificar que tiene 3 partes separadas por puntos
        $parts = explode('.', $token);
        $this->assertCount(3, $parts);
    }

    public function testValidateTokenReturnsCorrectPayload(): void
    {
        $token = $this->jwtService->generateAccessToken($this->testUserData);
        $payload = $this->jwtService->validateToken($token);

        $this->assertIsArray($payload);
        $this->assertEquals('1', $payload['sub']);
        $this->assertEquals('Test User', $payload['name']);
        $this->assertEquals('test@naser.com.mx', $payload['email']);
        $this->assertEquals('admin', $payload['role']);
        $this->assertEquals('access', $payload['type']);
    }

    public function testValidateTokenReturnsFalseForInvalidToken(): void
    {
        $invalidToken = 'invalid.token.here';
        $result = $this->jwtService->validateToken($invalidToken);

        $this->assertNull($result);
    }

    public function testGenerateRefreshTokenHasCorrectType(): void
    {
        $token = $this->jwtService->generateRefreshToken(1);
        $payload = $this->jwtService->validateToken($token);

        $this->assertIsArray($payload);
        $this->assertEquals('refresh', $payload['type']);
        $this->assertEquals('1', $payload['sub']);
    }

    public function testIsTokenExpiredReturnsFalseForValidToken(): void
    {
        $token = $this->jwtService->generateAccessToken($this->testUserData);

        $this->assertFalse($this->jwtService->isTokenExpired($token));
    }

    public function testIsTokenExpiredReturnsTrueForExpiredToken(): void
    {
        // Crear servicio con expiración muy corta
        $shortLivedService = new JwtService('test_key', 'HS256', -1); // Expira inmediatamente
        $token = $shortLivedService->generateAccessToken($this->testUserData);

        sleep(1); // Esperar para que expire

        $this->assertTrue($shortLivedService->isTokenExpired($token));
    }

    public function testGetTokenTimeRemainingReturnsPositiveNumber(): void
    {
        $token = $this->jwtService->generateAccessToken($this->testUserData);
        $timeRemaining = $this->jwtService->getTokenTimeRemaining($token);

        $this->assertGreaterThan(0, $timeRemaining);
        $this->assertLessThanOrEqual(3600, $timeRemaining); // No más que 1 hora
    }

    public function testGetTokenClaimsReturnsCorrectData(): void
    {
        $token = $this->jwtService->generateAccessToken($this->testUserData);
        $claims = $this->jwtService->getTokenClaims($token);

        $this->assertIsArray($claims);
        $this->assertArrayHasKey('sub', $claims);
        $this->assertArrayHasKey('exp', $claims);
        $this->assertArrayHasKey('iat', $claims);
        $this->assertArrayHasKey('jti', $claims);
    }

    public function testTokensHaveUniqueJti(): void
    {
        $token1 = $this->jwtService->generateAccessToken($this->testUserData);
        $token2 = $this->jwtService->generateAccessToken($this->testUserData);

        $claims1 = $this->jwtService->getTokenClaims($token1);
        $claims2 = $this->jwtService->getTokenClaims($token2);

        $this->assertNotEquals($claims1['jti'], $claims2['jti']);
    }

    public function testTokenContainsRequiredClaims(): void
    {
        $token = $this->jwtService->generateAccessToken($this->testUserData);
        $payload = $this->jwtService->validateToken($token);

        $requiredClaims = ['sub', 'name', 'email', 'role', 'type', 'iat', 'exp', 'jti', 'iss', 'aud'];

        foreach ($requiredClaims as $claim) {
            $this->assertArrayHasKey($claim, $payload, "Missing required claim: {$claim}");
        }
    }
}
```

#### 6. TESTS DE INTEGRACIÓN

```php
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
```

### CONSIDERACIONES ESPECIALES

#### Seguridad para GoDaddy

```php
// Configuración optimizada para shared hosting
class JwtService
{
    public function __construct()
    {
        // Usar variable de entorno o fallback seguro
        $this->secretKey = $_ENV['JWT_SECRET'] ?? $this->generateSecureKey();

        // Validar longitud mínima de clave
        if (strlen($this->secretKey) < 32) {
            throw new \InvalidArgumentException("JWT secret key debe tener al menos 32 caracteres");
        }
    }

    private function generateSecureKey(): string
    {
        // Solo para desarrollo - en producción debe estar en .env
        return hash('sha256', 'naser_cms_' . $_SERVER['HTTP_HOST'] ?? 'localhost');
    }
}
```

#### Manejo de Memoria

```php
// Liberar memoria después de operaciones pesadas
public function __destruct()
{
    $this->secretKey = null;
}
```

### CRITERIOS DE ACEPTACIÓN

- [ ] Implementación completa de JwtService con todos los métodos
- [ ] Generación segura de tokens de acceso y refresh
- [ ] Validación robusta con manejo de excepciones
- [ ] Tests unitarios con cobertura >90%
- [ ] Tests de integración para flujos completos
- [ ] Compatibilidad con GoDaddy shared hosting
- [ ] Documentación PHPDoc completa
- [ ] Manejo seguro de claves secretas
- [ ] Optimización de memoria y performance

### COMANDOS PARA REPORTAR PROGRESO

```bash
# Al iniciar la tarea
node .kiro/specs/auth-integration/update-status.js start-task gemini "3.1" "Iniciando implementación de JwtService con generación y validación de tokens"

# Para reportar progreso
node .kiro/specs/auth-integration/update-status.js update-progress gemini "3.1" "Métodos principales implementados, trabajando en tests unitarios"

# Al completar
node .kiro/specs/auth-integration/update-status.js complete-task gemini "3.1" "JwtService completado con generación, validación, tests y documentación completa"
```

### INTEGRACIÓN CON SISTEMA DE HOOKS

El **sistema de hooks automático** detectará cuando completes esta tarea:

- Detectará la creación de `JwtService.php`, `JwtServiceTest.php`, etc.
- Ejecutará automáticamente los tests
- Actualizará el estado del proyecto
- Notificará a Kiro sobre tu progreso

### PRÓXIMAS TAREAS DESPUÉS DE ESTA

1. **Tarea 3.2**: Implementar AuthService backend
2. **Tarea 4.1**: Implementar endpoint de login
3. **Integración con Claude**: Conectar con LoginForm

---

**¡Tu UserRepository anterior fue excepcional!** 🌟 Este JwtService será la base de toda la seguridad del sistema.

**Enfócate en**: Seguridad máxima, compatibilidad con GoDaddy, y performance optimizada.
