<?php

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Services\LocationService;

class LocationController {
    private LocationService $locationService;

    public function __construct(LocationService $locationService) {
        $this->locationService = $locationService;
    }

    public function index(Request $request): Response {
        $queryParams = $request->getQueryParams();
        $pageNum = (int)($queryParams['page'] ?? 1);
        $limit = (int)($queryParams['limit'] ?? 10);

        $result = $this->locationService->getAllLocations($pageNum, $limit);
        
        $pagination = [
            'current_page' => $pageNum,
            'per_page' => $limit,
            'total' => $result['total'],
            'total_pages' => ceil($result['total'] / $limit)
        ];

        return new Response(200, ['data' => $result['locations'], 'pagination' => $pagination]);
    }

    public function show(Request $request, int $id): Response {
        $location = $this->locationService->getLocationById($id);
        if (!$location) {
            return new Response(404, ['error' => 'Location not found']);
        }
        return new Response(200, ['data' => $location]);
    }

    public function store(Request $request): Response {
        $data = $request->getBody();
        // Add validation here
        $location = $this->locationService->createLocation($data);
        return new Response(201, ['data' => $location]);
    }

    public function update(Request $request, int $id): Response {
        $data = $request->getBody();
        $location = $this->locationService->updateLocation($id, $data);
        if (!$location) {
            return new Response(404, ['error' => 'Location not found']);
        }
        return new Response(200, ['data' => $location]);
    }

    public function destroy(Request $request, int $id): Response {
        if (!$this->locationService->deleteLocation($id)) {
            return new Response(404, ['error' => 'Location not found']);
        }
        return new Response(204, []);
    }
}
