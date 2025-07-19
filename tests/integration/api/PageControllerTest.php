<?php

namespace Tests\Integration\Api;

use PHPUnit\Framework\TestCase;
use PDO;
use App\Models\Page;
use App\Repositories\PageRepository;
use App\Services\PageService;
use App\Controllers\PageController;
use App\Core\Request;

class PageControllerTest extends TestCase {
    private PDO $pdo;
    private PageController $pageController;

    protected function setUp(): void {
        $this->pdo = new PDO('sqlite::memory:');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->createPagesTable();

        $pageRepository = new PageRepository($this->pdo);
        $pageService = new PageService($pageRepository);
        $this->pageController = new PageController($pageService);
    }

    private function createPagesTable(): void {
        $this->pdo->exec("CREATE TABLE pages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            content TEXT,
            status TEXT NOT NULL DEFAULT 'draft',
            meta_title TEXT,
            meta_description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
    }

    private function createTestPage(string $title = 'Test Page'): void {
        $stmt = $this->pdo->prepare("INSERT INTO pages (title, slug, content, status) VALUES (?, ?, ?, ?)");
        $stmt->execute([$title, strtolower(str_replace(' ', '-', $title)), 'Test content', 'published']);
    }

    public function testIndexReturnsPaginatedPages(): void {
        $this->createTestPage('Page 1');
        $this->createTestPage('Page 2');

        $request = $this->createMock(Request::class);
        $request->method('getQueryParams')->willReturn(['page' => 1, 'limit' => 1]);

        $response = $this->pageController->index($request);
        $data = $response->getData();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertCount(1, $data['data']);
        $this->assertEquals(2, $data['pagination']['total']);
    }

    public function testStoreCreatesNewPage(): void {
        $requestBody = ['title' => 'New Page', 'slug' => 'new-page', 'content' => 'Content'];
        $request = $this->createMock(Request::class);
        $request->method('getBody')->willReturn($requestBody);

        $response = $this->pageController->store($request);
        $data = $response->getData();

        $this->assertEquals(201, $response->getStatusCode());
        $this->assertEquals('New Page', $data['data']->title);
        $this->assertNotNull($data['data']->id);
    }

    public function testShowReturnsPage(): void {
        $this->createTestPage();
        $request = $this->createMock(Request::class);

        $response = $this->pageController->show($request, 1);
        $data = $response->getData();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(1, $data['data']->id);
    }

    public function testUpdateModifiesPage(): void {
        $this->createTestPage();
        $requestBody = ['title' => 'Updated Title'];
        $request = $this->createMock(Request::class);
        $request->method('getBody')->willReturn($requestBody);

        $response = $this->pageController->update($request, 1);
        $data = $response->getData();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Updated Title', $data['data']->title);
    }

    public function testDestroyDeletesPage(): void {
        $this->createTestPage();
        $request = $this->createMock(Request::class);

        $response = $this->pageController->destroy($request, 1);

        $this->assertEquals(204, $response->getStatusCode());

        // Verify it's gone
        $findResponse = $this->pageController->show($request, 1);
        $this->assertEquals(404, $findResponse->getStatusCode());
    }
}
