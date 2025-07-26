<?php

namespace Tests\Integration\Api;

use PHPUnit\Framework\TestCase;
use PDO;
use App\Controllers\LocationController;
use App\Services\LocationService;
use App\Repositories\LocationRepository;
use App\Core\Request;

class LocationControllerTest extends TestCase {
    private PDO $pdo;
    private LocationController $locationController;

    protected function setUp(): void {
        $this->pdo = new PDO('sqlite::memory:');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->createLocationsTable();

        $locationRepository = new LocationRepository($this->pdo);
        $locationService = new LocationService($locationRepository);
        $this->locationController = new LocationController($locationService);
    }

    private function createLocationsTable(): void {
        $this->pdo->exec("CREATE TABLE locations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            address TEXT,
            phone TEXT,
            map_url TEXT,
            image_url TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
    }

    private function createTestLocation(string $name = 'Test Location'): void {
        $stmt = $this->pdo->prepare("INSERT INTO locations (name) VALUES (?)");
        $stmt->execute([$name]);
    }

    public function testStoreCreatesNewLocation(): void {
        $requestBody = ['name' => 'New Location', 'address' => '123 Main St'];
        $request = $this->createMock(Request::class);
        $request->method('getBody')->willReturn($requestBody);

        $response = $this->locationController->store($request);
        $data = $response->getData();

        $this->assertEquals(201, $response->getStatusCode());
        $this->assertEquals('New Location', $data['data']->name);
    }

    public function testIndexReturnsLocations(): void {
        $this->createTestLocation('Location 1');
        
        $request = $this->createMock(Request::class);
        $request->method('getQueryParams')->willReturn([]);

        $response = $this->locationController->index($request);
        $data = $response->getData();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertCount(1, $data['data']);
    }

    public function testShowReturnsLocation(): void {
        $this->createTestLocation();
        $request = $this->createMock(Request::class);

        $response = $this->locationController->show($request, 1);
        $data = $response->getData();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(1, $data['data']->id);
    }

    public function testUpdateModifiesLocation(): void {
        $this->createTestLocation();
        $requestBody = ['name' => 'Updated Location Name'];
        $request = $this->createMock(Request::class);
        $request->method('getBody')->willReturn($requestBody);

        $response = $this->locationController->update($request, 1);
        $data = $response->getData();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Updated Location Name', $data['data']->name);
    }

    public function testDestroyDeletesLocation(): void {
        $this->createTestLocation();
        $request = $this->createMock(Request::class);

        $response = $this->locationController->destroy($request, 1);

        $this->assertEquals(204, $response->getStatusCode());

        $findResponse = $this->locationController->show($request, 1);
        $this->assertEquals(404, $findResponse->getStatusCode());
    }
}
