<?php

namespace Tests\Integration\Api;

use PHPUnit\Framework\TestCase;
use PDO;
use App\Controllers\MediaController;
use App\Services\MediaService;
use App\Repositories\MediaRepository;
use App\Core\Request;

class MediaControllerTest extends TestCase {
    private PDO $pdo;
    private MediaController $mediaController;
    private string $testUploadDir;

    protected function setUp(): void {
        $this->pdo = new PDO('sqlite::memory:');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->createMediaTable();

        // Define constants for testing MediaService
        if (!defined('UPLOAD_DIR')) define('UPLOAD_DIR', __DIR__ . '/test_uploads/');
        if (!defined('MAX_UPLOAD_SIZE')) define('MAX_UPLOAD_SIZE', 5242880); // 5MB
        if (!defined('ALLOWED_EXTENSIONS')) define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'pdf']);

        $this->testUploadDir = UPLOAD_DIR;
        
        // Asegurarse de que el directorio existe
        if (!file_exists($this->testUploadDir)) {
            if (!mkdir($this->testUploadDir, 0777, true)) {
                $this->markTestSkipped('No se pudo crear el directorio de prueba: ' . $this->testUploadDir);
            }
        }
        
        // Verificar permisos
        if (!is_writable($this->testUploadDir)) {
            chmod($this->testUploadDir, 0777);
            if (!is_writable($this->testUploadDir)) {
                $this->markTestSkipped('El directorio de prueba no tiene permisos de escritura: ' . $this->testUploadDir);
            }
        }

        $mediaRepository = new MediaRepository($this->pdo);
        $mediaService = $this->getMockBuilder(MediaService::class)
                               ->setConstructorArgs([
                                   $mediaRepository,
                                   UPLOAD_DIR,
                                   MAX_UPLOAD_SIZE,
                                   ALLOWED_EXTENSIONS
                               ])
                               ->onlyMethods(['moveUploadedFile'])
                               ->getMock();
        $mediaService->method('moveUploadedFile')->willReturn(true);
        $this->mediaController = new MediaController($mediaService);
    }

    protected function tearDown(): void {
        // Clean up test upload directory
        if (is_dir($this->testUploadDir)) {
            $files = glob($this->testUploadDir . '*');
            foreach ($files as $file) {
                if (is_file($file)) {
                    unlink($file);
                }
            }
            rmdir($this->testUploadDir);
        }
    }

    private function createMediaTable(): void {
        $this->pdo->exec("CREATE TABLE media (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            original_filename TEXT NOT NULL,
            mime_type TEXT NOT NULL,
            size INTEGER NOT NULL,
            url TEXT NOT NULL,
            thumbnail_url TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
    }

    public function testUploadCreatesNewMedia(): void {
        // Simulate $_FILES array
        $_FILES['file'] = [
            'name' => 'test_image.jpg',
            'type' => 'image/jpeg',
            'tmp_name' => $this->createDummyFile('test_image.jpg', 'image/jpeg'),
            'error' => UPLOAD_ERR_OK,
            'size' => 1024
        ];

        $request = $this->createMock(Request::class);

        $response = $this->mediaController->upload($request, $_FILES['file']);
        $data = $response->getData();

        $this->assertEquals(201, $response->getStatusCode());
        $this->assertEquals('test_image.jpg', $data['data']->original_filename);
        $this->assertStringContainsString('/public/uploads/', $data['data']->url);
        
        // No verificamos la existencia del archivo físico porque estamos usando un mock para moveUploadedFile
        // que no crea realmente el archivo
        $this->assertNotEmpty($data['data']->filename);
    }

    public function testIndexReturnsMedia(): void {
        // Upload a dummy file first
        $_FILES['file'] = [
            'name' => 'dummy.png',
            'type' => 'image/png',
            'tmp_name' => $this->createDummyFile('dummy.png', 'image/png'),
            'error' => UPLOAD_ERR_OK,
            'size' => 500
        ];
        $request = $this->createMock(Request::class);
        $_FILES['file'] = [
            'name' => 'dummy.png',
            'type' => 'image/png',
            'tmp_name' => $this->createDummyFile('dummy.png', 'image/png'),
            'error' => UPLOAD_ERR_OK,
            'size' => 500
        ];
        $this->mediaController->upload($request, $_FILES['file']);
        unset($_FILES['file']); // Clear $_FILES after use

        $request->method('getQueryParams')->willReturn([]);
        $response = $this->mediaController->index($request);
        $data = $response->getData();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertCount(1, $data['data']);
    }

    public function testShowReturnsMedia(): void {
        // Upload a dummy file first
        $_FILES['file'] = [
            'name' => 'show_test.gif',
            'type' => 'image/gif',
            'tmp_name' => $this->createDummyFile('show_test.gif', 'image/gif'),
            'error' => UPLOAD_ERR_OK,
            'size' => 200
        ];
        $request = $this->createMock(Request::class);
        $_FILES['file'] = [
            'name' => 'show_test.gif',
            'type' => 'image/gif',
            'tmp_name' => $this->createDummyFile('show_test.gif', 'image/gif'),
            'error' => UPLOAD_ERR_OK,
            'size' => 200
        ];
        $uploadResponse = $this->mediaController->upload($request, $_FILES['file']);
        $uploadedMediaId = $uploadResponse->getData()['data']->id;
        unset($_FILES['file']);

        $response = $this->mediaController->show($request, $uploadedMediaId);
        $data = $response->getData();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals($uploadedMediaId, $data['data']->id);
    }

    public function testDestroyDeletesMedia(): void {
        // Upload a dummy file first
        $_FILES['file'] = [
            'name' => 'delete_test.pdf',
            'type' => 'application/pdf',
            'tmp_name' => $this->createDummyFile('delete_test.pdf', 'application/pdf'),
            'error' => UPLOAD_ERR_OK,
            'size' => 300
        ];
        $request = $this->createMock(Request::class);
        $uploadResponse = $this->mediaController->upload($request, [
            'name' => 'delete_test.pdf',
            'type' => 'application/pdf',
            'tmp_name' => $this->createDummyFile('delete_test.pdf', 'application/pdf'),
            'error' => UPLOAD_ERR_OK,
            'size' => 300
        ]);
        $uploadedMedia = $uploadResponse->getData()['data'];
        unset($_FILES['file']);

        $response = $this->mediaController->destroy($request, $uploadedMedia->id);

        $this->assertEquals(204, $response->getStatusCode());
        $this->assertFileDoesNotExist(UPLOAD_DIR . $uploadedMedia->filename);

        $findResponse = $this->mediaController->show($request, $uploadedMedia->id);
        $this->assertEquals(404, $findResponse->getStatusCode());
    }

    private function createDummyFile(string $filename, string $mimeType): string {
        $tmpDir = sys_get_temp_dir();
        $tmpFileName = uniqid('php') . '.tmp';
        $tmpFilePath = $tmpDir . DIRECTORY_SEPARATOR . $tmpFileName;
        file_put_contents($tmpFilePath, 'dummy content');
        return $tmpFilePath;
    }
}
