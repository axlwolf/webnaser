<?php

namespace App\Controllers;

use App\Core\Database;
use App\Repositories\ContentRepository;
use App\Middleware\AdminMiddleware;
use App\Validators\ContentValidator;
use App\Models\Page;
use App\Exceptions\ValidationException;
use App\Exceptions\NotFoundException;

class ContentController {
    private $contentRepository;

    public function __construct() {
        $db = Database::getInstance();
        $this->contentRepository = new ContentRepository($db);
    }

    public function index() {
        $pages = $this->contentRepository->findAll();
        echo json_encode(['success' => true, 'data' => $pages, 'timestamp' => date('c')]);
    }

    public function show($id) {
        $page = $this->contentRepository->findById($id);
        if ($page) {
            echo json_encode(['success' => true, 'data' => $page, 'timestamp' => date('c')]);
        } else {
            throw new NotFoundException('Página no encontrada.');
        }
    }

    public function showBySlug($slug) {
        $page = $this->contentRepository->findBySlug($slug);
        if ($page) {
            echo json_encode(['success' => true, 'data' => $page, 'timestamp' => date('c')]);
        } else {
            throw new NotFoundException('Página no encontrada.');
        }
    }

    public function create() {
        AdminMiddleware::handle();
        $data = json_decode(file_get_contents('php://input'), true);

        $errors = ContentValidator::validate($data);
        if ($errors) {
            throw new ValidationException($errors);
        }

        $page = new Page();
        $page->title = $data['title'];
        $page->slug = $data['slug'];
        $page->content = $data['content'];
        $page->meta_title = $data['meta_title'] ?? '';
        $page->meta_description = $data['meta_description'] ?? '';
        $page->featured_image = $data['featured_image'] ?? null;
        $page->status = $data['status'] ?? 'draft';

        $createdPage = $this->contentRepository->create($page);

        http_response_code(201);
        echo json_encode(['success' => true, 'data' => $createdPage, 'message' => 'Página creada exitosamente.', 'timestamp' => date('c')]);
    }

    public function update($id) {
        AdminMiddleware::handle();
        $data = json_decode(file_get_contents('php://input'), true);

        $page = $this->contentRepository->findById($id);

        if (!$page) {
            throw new NotFoundException('Página no encontrada.');
        }

        $errors = ContentValidator::validate($data, true);
        if ($errors) {
            throw new ValidationException($errors);
        }

        // Update page properties from request data
        $page->title = $data['title'] ?? $page->title;
        $page->slug = $data['slug'] ?? $page->slug;
        $page->content = $data['content'] ?? $page->content;
        $page->meta_title = $data['meta_title'] ?? $page->meta_title;
        $page->meta_description = $data['meta_description'] ?? $page->meta_description;
        $page->featured_image = $data['featured_image'] ?? $page->featured_image;
        $page->status = $data['status'] ?? $page->status;

        $updatedPage = $this->contentRepository->update($page);

        echo json_encode(['success' => true, 'data' => $updatedPage, 'message' => 'Página actualizada exitosamente.', 'timestamp' => date('c')]);
    }

    public function delete($id) {
        AdminMiddleware::handle();
        
        $page = $this->contentRepository->findById($id);

        if (!$page) {
            throw new NotFoundException('Página no encontrada.');
        }

        if ($this->contentRepository->delete($id)) {
            http_response_code(204);
        } else {
            throw new \Exception('No se pudo eliminar la página.');
        }
    }
}