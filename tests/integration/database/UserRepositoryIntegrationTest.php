<?php

namespace Tests\Integration\Database;

use PHPUnit\Framework\TestCase;
use App\Repositories\UserRepository;
use App\Models\User;
use PDO;

class UserRepositoryIntegrationTest extends TestCase
{
    private UserRepository $repository;
    private PDO $connection;

    protected function setUp(): void
    {
        // Usar SQLite en memoria para tests
        $this->connection = new PDO('sqlite::memory:');
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Crear tabla de prueba
        $this->connection->exec("
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'editor',
                reset_token VARCHAR(255),
                reset_token_expiry DATETIME,
                last_login DATETIME,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ");

        $this->repository = new UserRepository($this->connection);
    }

    public function testFullUserLifecycle(): void
    {
        // Crear usuario
        $user = new User(
            name: 'Integration Test User',
            email: 'integration@naser.com.mx',
            password: 'test_password',
            role: 'admin'
        );

        $createdUser = $this->repository->create($user);
        $this->assertGreaterThan(0, $createdUser->getId());

        // Buscar por email
        $foundUser = $this->repository->findByEmail('integration@naser.com.mx');
        $this->assertNotNull($foundUser);
        $this->assertEquals('Integration Test User', $foundUser->getName());

        // Actualizar último login
        $this->repository->updateLastLogin($createdUser->getId());

        // Verificar actualización
        $updatedUser = $this->repository->findById($createdUser->getId());
        $this->assertNotNull($updatedUser->getLastLogin());
    }
}
