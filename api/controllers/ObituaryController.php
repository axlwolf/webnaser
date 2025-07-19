<?php

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Services\ObituaryService;

class ObituaryController {
    private ObituaryService $obituaryService;

    public function __construct(ObituaryService $obituaryService) {
        $this->obituaryService = $obituaryService;
    }

    public function index(Request $request): Response {
        $queryParams = $request->getQueryParams();
        $pageNum = (int)($queryParams['page'] ?? 1);
        $limit = (int)($queryParams['limit'] ?? 10);

        $result = $this->obituaryService->getAllObituaries($pageNum, $limit);
        
        $pagination = [
            'current_page' => $pageNum,
            'per_page' => $limit,
            'total' => $result['total'],
            'total_pages' => ceil($result['total'] / $limit)
        ];

        return new Response(200, ['data' => $result['obituaries'], 'pagination' => $pagination]);
    }

    public function show(Request $request, int $id): Response {
        $obituary = $this->obituaryService->getObituaryById($id);
        if (!$obituary) {
            return new Response(404, ['error' => 'Obituary not found']);
        }
        return new Response(200, ['data' => $obituary]);
    }

    public function store(Request $request): Response {
        $data = $request->getBody();
        // Add validation here
        $obituary = $this->obituaryService->createObituary($data);
        return new Response(201, ['data' => $obituary]);
    }

    public function update(Request $request, int $id): Response {
        $data = $request->getBody();
        $obituary = $this->obituaryService->updateObituary($id, $data);
        if (!$obituary) {
            return new Response(404, ['error' => 'Obituary not found']);
        }
        return new Response(200, ['data' => $obituary]);
    }

    public function destroy(Request $request, int $id): Response {
        if (!$this->obituaryService->deleteObituary($id)) {
            return new Response(404, ['error' => 'Obituary not found']);
        }
        return new Response(204, []);
    }
}
