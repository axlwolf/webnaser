<?php

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Services\ServiceService;

class ServiceController {
    private ServiceService $serviceService;

    public function __construct(ServiceService $serviceService) {
        $this->serviceService = $serviceService;
    }

    public function index(Request $request): Response {
        $queryParams = $request->getQueryParams();
        $pageNum = (int)($queryParams['page'] ?? 1);
        $limit = (int)($queryParams['limit'] ?? 10);

        $result = $this->serviceService->getAllServices($pageNum, $limit);
        
        $pagination = [
            'current_page' => $pageNum,
            'per_page' => $limit,
            'total' => $result['total'],
            'total_pages' => ceil($result['total'] / $limit)
        ];

        return new Response(200, ['data' => $result['services'], 'pagination' => $pagination]);
    }

    public function show(Request $request, int $id): Response {
        $service = $this->serviceService->getServiceById($id);
        if (!$service) {
            return new Response(404, ['error' => 'Service not found']);
        }
        return new Response(200, ['data' => $service]);
    }

    public function store(Request $request): Response {
        $data = $request->getBody();
        // Add validation here
        $service = $this->serviceService->createService($data);
        return new Response(201, ['data' => $service]);
    }

    public function update(Request $request, int $id): Response {
        $data = $request->getBody();
        $service = $this->serviceService->updateService($id, $data);
        if (!$service) {
            return new Response(404, ['error' => 'Service not found']);
        }
        return new Response(200, ['data' => $service]);
    }

    public function destroy(Request $request, int $id): Response {
        if (!$this->serviceService->deleteService($id)) {
            return new Response(404, ['error' => 'Service not found']);
        }
        return new Response(204, []);
    }
}
