<?php

namespace Tests\Integration\Api;

use PHPUnit\Framework\TestCase;
use PDO;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\AuthService;
use App\Controllers\AuthController;
use App\Core\Request;

class AuthControllerTest extends TestCase {
    private PDO $pdo;
    private UserRepository $userRepository;
    private AuthService $authService;
    private AuthController $authController;

    protected function setUp(): void {
        $this->pdo = new PDO('sqlite::memory:');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->createUsersTable();
        $this->seedUsers();

        $this->userRepository = new UserRepository($this->pdo);
        $this->authService = new AuthService($this->userRepository);
        $this->authController = new AuthController($this->authService);
    }

    private function createUsersTable(): void {
        $this->pdo->exec("CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'editor',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
    }

    private function seedUsers(): void {
        $user = new User('testuser', 'test@example.com', '');
        $user->setPassword('password123');

        $stmt = $this->pdo->prepare("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)");
        $stmt->execute([$user->username, $user->email, $user->password_hash, 'admin']);
    }

    public function testLoginWithValidCredentialsReturnsToken(): void {
        // Simulate a request
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $requestBody = ['email' => 'test@example.com', 'password' => 'password123'];
        $request = $this->createMock(Request::class);
        $request->method('getBody')->willReturn($requestBody);

        $response = $this->authController->login($request);
        
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertArrayHasKey('token', $response->getData());
    }

    public function testLoginWithInvalidCredentialsReturnsUnauthorized(): void {
        // Simulate a request
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $requestBody = ['email' => 'test@example.com', 'password' => 'wrongpassword'];
        $request = $this->createMock(Request::class);
        $request->method('getBody')->willReturn($requestBody);

        $response = $this->authController->login($request);

        $this->assertEquals(401, $response->getStatusCode());
        $this->assertEquals(['error' => 'Invalid credentials'], $response->getData());
    }
}
