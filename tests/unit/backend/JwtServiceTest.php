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
        // Crear servicio con expiración muy corta (1 segundo)
        $shortLivedService = new JwtService('test_key', 'HS256', 1); 
        $token = $shortLivedService->generateAccessToken($this->testUserData);

        sleep(2); // Esperar 2 segundos para asegurar que expire

        $this->assertTrue($this->jwtService->isTokenExpired($token));
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
