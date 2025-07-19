<?php

namespace Tests\Integration\Api;

use PHPUnit\Framework\TestCase;
use PDO;
use App\Controllers\ObituaryController;
use App\Services\ObituaryService;
use App\Repositories\ObituaryRepository;
use App\Core\Request;

class ObituaryControllerTest extends TestCase {
    private PDO $pdo;
    private ObituaryController $obituaryController;

    protected function setUp(): void {
        $this->pdo = new PDO('sqlite::memory:');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->createTables();

        $obituaryRepository = new ObituaryRepository($this->pdo);
        $obituaryService = new ObituaryService($obituaryRepository);
        $this->obituaryController = new ObituaryController($obituaryService);
    }

    private function createTables(): void {
        $this->pdo->exec("CREATE TABLE locations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )");
        $this->pdo->exec("CREATE TABLE obituaries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            birth_date TEXT,
            death_date TEXT NOT NULL,
            obituary_text TEXT,
            image_url TEXT,
            location_id INTEGER,
            status TEXT NOT NULL DEFAULT 'draft',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE SET NULL
        )");
    }

    private function createTestObituary(string $fullName = 'Test Obituary', string $deathDate = '2025-01-01', ?int $locationId = null): void {
        $stmt = $this->pdo->prepare("INSERT INTO obituaries (full_name, death_date, location_id) VALUES (?, ?, ?)");
        $stmt->execute([$fullName, $deathDate, $locationId]);
    }

    public function testStoreCreatesNewObituary(): void {
        $requestBody = ['full_name' => 'New Obituary', 'death_date' => '2025-07-18'];
        $request = $this->createMock(Request::class);
        $request->method('getBody')->willReturn($requestBody);

        $response = $this->obituaryController->store($request);
        $data = $response->getData();

        $this->assertEquals(201, $response->getStatusCode());
        $this->assertEquals('New Obituary', $data['data']->full_name);
    }

    public function testIndexReturnsObituaries(): void {
        $this->createTestObituary('Obituary 1');
        
        $request = $this->createMock(Request::class);
        $request->method('getQueryParams')->willReturn([]);

        $response = $this->obituaryController->index($request);
        $data = $response->getData();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertCount(1, $data['data']);
    }

    public function testShowReturnsObituary(): void {
        $this->createTestObituary();
        $request = $this->createMock(Request::class);

        $response = $this->obituaryController->show($request, 1);
        $data = $response->getData();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(1, $data['data']->id);
    }

    public function testUpdateModifiesObituary(): void {
        $this->createTestObituary();
        $requestBody = ['full_name' => 'Updated Obituary Name'];
        $request = $this->createMock(Request::class);
        $request->method('getBody')->willReturn($requestBody);

        $response = $this->obituaryController->update($request, 1);
        $data = $response->getData();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Updated Obituary Name', $data['data']->full_name);
    }

    public function testDestroyDeletesObituary(): void {
        $this->createTestObituary();
        $request = $this->createMock(Request::class);

        $response = $this->obituaryController->destroy($request, 1);

        $this->assertEquals(204, $response->getStatusCode());

        $findResponse = $this->obituaryController->show($request, 1);
        $this->assertEquals(404, $findResponse->getStatusCode());
    }
}
