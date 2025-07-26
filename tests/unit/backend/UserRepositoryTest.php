<?php

namespace Tests\Unit\Backend;

use PHPUnit\Framework\TestCase;
use App\Repositories\UserRepository;
use App\Models\User;
use PDO;
use PDOStatement;

class UserRepositoryTest extends TestCase
{
    private UserRepository $repository;
    private PDO $mockConnection;
    private PDOStatement $mockStatement;

    protected function setUp(): void
    {
        $this->mockConnection = $this->createMock(PDO::class);
        $this->mockStatement = $this->createMock(PDOStatement::class);
        $this->repository = new UserRepository($this->mockConnection);
    }

    public function testFindByEmailReturnsUserWhenFound(): void
    {
        $userData = [
            'id' => 1,
            'name' => 'Test User',
            'email' => 'test@naser.com.mx',
            'password' => 'hashed_password',
            'role' => 'admin',
            'reset_token' => null,
            'reset_token_expiry' => null,
            'last_login' => null,
            'created_at' => '2025-01-01 00:00:00',
            'updated_at' => '2025-01-01 00:00:00'
        ];

        $this->mockConnection
            ->expects($this->once())
            ->method('prepare')
            ->willReturn($this->mockStatement);

        $this->mockStatement
            ->expects($this->once())
            ->method('execute');

        $this->mockStatement
            ->expects($this->once())
            ->method('fetch')
            ->willReturn($userData);

        $result = $this->repository->findByEmail('test@naser.com.mx');

        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals('test@naser.com.mx', $result->getEmail());
        $this->assertEquals('Test User', $result->getName());
    }

    public function testFindByEmailReturnsNullWhenNotFound(): void
    {
        $this->mockConnection
            ->expects($this->once())
            ->method('prepare')
            ->willReturn($this->mockStatement);

        $this->mockStatement
            ->expects($this->once())
            ->method('fetch')
            ->willReturn(false);

        $result = $this->repository->findByEmail('nonexistent@naser.com.mx');

        $this->assertNull($result);
    }

    public function testCreateUserSuccessfully(): void
    {
        $user = new User(
            name: 'New User',
            email: 'new@naser.com.mx',
            password: 'hashed_password',
            role: 'editor'
        );

        $this->mockConnection
            ->expects($this->once())
            ->method('beginTransaction');

        $this->mockConnection
            ->expects($this->once())
            ->method('prepare')
            ->willReturn($this->mockStatement);

        $this->mockConnection
            ->expects($this->once())
            ->method('lastInsertId')
            ->willReturn('1');

        $this->mockConnection
            ->expects($this->once())
            ->method('commit');

        $result = $this->repository->create($user);

        $this->assertEquals(1, $result->getId());
    }
}
