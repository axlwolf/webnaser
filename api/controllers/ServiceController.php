<?php

namespace App\Controllers;

use App\Core\Database;
use App\Repositories\ServiceRepository;
use App\Middleware\AdminMiddleware;
use App\Validators\ServiceValidator;
use App\Models\Service;
use App\Exceptions\ValidationException;
use App\Exceptions\NotFoundException;

class ServiceController {
    private $serviceRepository;

    public function __construct() {
        $db = Database::getInstance();
        $this->serviceRepository = new ServiceRepository($db);
    }

    public function index() {
        $page = $_GET['page'] ?? 1;
        $limit = $_GET['limit'] ?? 10;
        $services = $this->serviceRepository->findAll($page, $limit);
        $total = $this->serviceRepository->count();
        echo json_encode([
            'success' => true, 
            'data' => $services,
            'pagination' => [
                'total' => $total,
                'page' => (int)$page,
                'limit' => (int)$limit
            ],
            'timestamp' => date('c')
        ]);
    }

    public function show($id) {
        $service = $this->serviceRepository->findById($id);
        if ($service) {
            echo json_encode(['success' => true, 'data' => $service, 'timestamp' => date('c')]);
        } else {
            throw new NotFoundException('Servicio no encontrado.');
        }
    }

    public function create() {
        AdminMiddleware::handle();
        $data = json_decode(file_get_contents('php://input'), true);

        $errors = ServiceValidator::validate($data);
        if ($errors) {
            throw new ValidationException($errors);
        }

        $service = new Service();
        $service->name = $data['name'];
        $service->category = $data['category'];
        $service->description = $data['description'];
        $service->features = $data['features'] ?? [];
        $service->price_range = $data['price_range'] ?? '';
        $service->image = $data['image'] ?? null;
        $service->gallery = $data['gallery'] ?? [];
        $service->is_featured = $data['is_featured'] ?? false;
        $service->status = $data['status'] ?? 'active';
        $service->slug = str_replace(' ', '-', strtolower($data['name']));


        $createdService = $this->serviceRepository->save($service);

        http_response_code(201);
        echo json_encode(['success' => true, 'data' => $createdService, 'message' => 'Servicio creado exitosamente.', 'timestamp' => date('c')]);
    }

    public function update($id) {
        AdminMiddleware::handle();
        $data = json_decode(file_get_contents('php://input'), true);

        $service = $this->serviceRepository->findById($id);

        if (!$service) {
            throw new NotFoundException('Servicio no encontrado.');
        }

        $errors = ServiceValidator::validate($data);
        if ($errors) {
            throw new ValidationException($errors);
        }

        $service->name = $data['name'] ?? $service->name;
        $service->category = $data['category'] ?? $service->category;
        $service->description = $data['description'] ?? $service->description;
        $service->features = $data['features'] ?? $service->features;
        $service->price_range = $data['price_range'] ?? $service->price_range;
        $service->image = $data['image'] ?? $service->image;
        $service->gallery = $data['gallery'] ?? $service->gallery;
        $service->is_featured = $data['is_featured'] ?? $service->is_featured;
        $service->status = $data['status'] ?? $service->status;
        $service->slug = str_replace(' ', '-', strtolower($service->name));

        $updatedService = $this->serviceRepository->save($service);

        echo json_encode(['success' => true, 'data' => $updatedService, 'message' => 'Servicio actualizado exitosamente.', 'timestamp' => date('c')]);
    }

    public function delete($id) {
        AdminMiddleware::handle();
        
        $service = $this->serviceRepository->findById($id);

        if (!$service) {
            throw new NotFoundException('Servicio no encontrado.');
        }

        if ($this->serviceRepository->delete($id)) {
            http_response_code(204);
        } else {
            throw new \Exception('No se pudo eliminar el servicio.');
        }
    }
}