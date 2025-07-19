<?php

namespace Tests\Integration\Api;

use PHPUnit\Framework\TestCase;
use PDO;
use App\Controllers\ServiceController;
use App\Services\ServiceService;
use App\Repositories\ServiceRepository;
use App\Core\Request;

class ServiceControllerTest extends TestCase {
    private PDO $pdo;
    private ServiceController $serviceController;

    protected function setUp(): void {
        $this->pdo = new PDO('sqlite::memory:');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->createServicesTable();

        $serviceRepository = new ServiceRepository($this->pdo);
        $serviceService = new ServiceService($serviceRepository);
        $this->serviceController = new ServiceController($serviceService);
    }

    private function createServicesTable(): void {
        $this->pdo->exec("CREATE TABLE services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            description TEXT,
            short_description TEXT,
            price REAL,
            image_url TEXT,
            icon TEXT,
            features TEXT,
            category TEXT NOT NULL,
            is_featured INTEGER DEFAULT 0,
            status TEXT NOT NULL DEFAULT 'active',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
    }

    private function createTestService(array $data): void {
        $stmt = $this->pdo->prepare("INSERT INTO services (name, slug, category) VALUES (?, ?, ?)");
        $stmt->execute([$data['name'], $data['slug'], $data['category']]);
    }

    public function testStoreCreatesNewService(): void {
        $requestBody = ['name' => 'New Service', 'slug' => 'new-service', 'category' => 'funeral'];
        $request = $this->createMock(Request::class);
        $request->method('getBody')->willReturn($requestBody);

        $response = $this->serviceController->store($request);
        $data = $response->getData();

        $this->assertEquals(201, $response->getStatusCode());
        $this->assertEquals('New Service', $data['data']->name);
    }

    public function testIndexReturnsServices(): void {
        $this->createTestService(['name' => 'Service 1', 'slug' => 'service-1', 'category' => 'cremacion']);
        
        $request = $this->createMock(Request::class);
        $request->method('getQueryParams')->willReturn([]);

        $response = $this->serviceController->index($request);
        $data = $response->getData();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertCount(1, $data['data']);
    }

    public function testShowReturnsService(): void {
        $this->createTestService(['name' => 'Service 1', 'slug' => 'service-1', 'category' => 'cremacion']);
        $request = $this->createMock(Request::class);

        $response = $this->serviceController->show($request, 1);
        $data = $response->getData();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(1, $data['data']->id);
    }

    public function testUpdateModifiesService(): void {
        $this->createTestService(['name' => 'Service 1', 'slug' => 'service-1', 'category' => 'cremacion']);
        $requestBody = ['name' => 'Updated Name'];
        $request = $this->createMock(Request::class);
        $request->method('getBody')->willReturn($requestBody);

        $response = $this->serviceController->update($request, 1);
        $data = $response->getData();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Updated Name', $data['data']->name);
    }

    public function testDestroyDeletesService(): void {
        $this->createTestService(['name' => 'Service 1', 'slug' => 'service-1', 'category' => 'cremacion']);
        $request = $this->createMock(Request::class);

        $response = $this->serviceController->destroy($request, 1);

        $this->assertEquals(204, $response->getStatusCode());

        $findResponse = $this->serviceController->show($request, 1);
        $this->assertEquals(404, $findResponse->getStatusCode());
    }
}
