<?php

namespace App\Controllers;

use App\Core\Database;
use App\Repositories\LocationRepository;
use App\Middleware\AdminMiddleware;
use App\Validators\LocationValidator;
use App\Models\Location;
use App\Exceptions\ValidationException;
use App\Exceptions\NotFoundException;

class LocationController {
    private $locationRepository;

    public function __construct() {
        $db = Database::getInstance();
        $this->locationRepository = new LocationRepository($db);
    }

    public function index() {
        $page = $_GET['page'] ?? 1;
        $limit = $_GET['limit'] ?? 10;
        $locations = $this->locationRepository->findAll($page, $limit);
        $total = $this->locationRepository->count();
        echo json_encode([
            'success' => true, 
            'data' => $locations,
            'pagination' => [
                'total' => $total,
                'page' => (int)$page,
                'limit' => (int)$limit
            ],
            'timestamp' => date('c')
        ]);
    }

    public function show($id) {
        $location = $this->locationRepository->findById($id);
        if ($location) {
            echo json_encode(['success' => true, 'data' => $location, 'timestamp' => date('c')]);
        } else {
            throw new NotFoundException('Sucursal no encontrada.');
        }
    }

    public function create() {
        AdminMiddleware::handle();
        $data = json_decode(file_get_contents('php://input'), true);

        $errors = LocationValidator::validate($data);
        if ($errors) {
            throw new ValidationException($errors);
        }

        $location = new Location();
        $location->name = $data['name'];
        $location->address = $data['address'];
        $location->phone = $data['phone'];
        $location->map_url = $data['map_url'] ?? null;
        $location->image_url = $data['image_url'] ?? null;

        $createdLocation = $this->locationRepository->save($location);

        http_response_code(201);
        echo json_encode(['success' => true, 'data' => $createdLocation, 'message' => 'Sucursal creada exitosamente.', 'timestamp' => date('c')]);
    }

    public function update($id) {
        AdminMiddleware::handle();
        $data = json_decode(file_get_contents('php://input'), true);

        $location = $this->locationRepository->findById($id);

        if (!$location) {
            throw new NotFoundException('Sucursal no encontrada.');
        }

        $errors = LocationValidator::validate($data);
        if ($errors) {
            throw new ValidationException($errors);
        }

        $location->name = $data['name'] ?? $location->name;
        $location->address = $data['address'] ?? $location->address;
        $location->phone = $data['phone'] ?? $location->phone;
        $location->map_url = $data['map_url'] ?? $location->map_url;
        $location->image_url = $data['image_url'] ?? $location->image_url;

        $updatedLocation = $this->locationRepository->save($location);

        echo json_encode(['success' => true, 'data' => $updatedLocation, 'message' => 'Sucursal actualizada exitosamente.', 'timestamp' => date('c')]);
    }

    public function delete($id) {
        AdminMiddleware::handle();
        
        $location = $this->locationRepository->findById($id);

        if (!$location) {
            throw new NotFoundException('Sucursal no encontrada.');
        }

        if ($this->locationRepository->delete($id)) {
            http_response_code(204);
        } else {
            throw new \Exception('No se pudo eliminar la sucursal.');
        }
    }

    public function nearest() {
        // This will be implemented later
        echo json_encode(['success' => true, 'data' => [], 'message' => 'Funcionalidad no implementada.', 'timestamp' => date('c')]);
    }
}
