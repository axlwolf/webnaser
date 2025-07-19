<?php

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Services\PageService;

class PageController {
    private PageService $pageService;

    public function __construct(PageService $pageService) {
        $this->pageService = $pageService;
    }

    public function index(Request $request): Response {
        $queryParams = $request->getQueryParams();
        $pageNum = (int)($queryParams['page'] ?? 1);
        $limit = (int)($queryParams['limit'] ?? 10);

        $result = $this->pageService->getAllPages($pageNum, $limit);
        
        $pagination = [
            'current_page' => $pageNum,
            'per_page' => $limit,
            'total' => $result['total'],
            'total_pages' => ceil($result['total'] / $limit)
        ];

        return new Response(200, ['data' => $result['pages'], 'pagination' => $pagination]);
    }

    public function show(Request $request, int $id): Response {
        $page = $this->pageService->getPageById($id);
        if (!$page) {
            return new Response(404, ['error' => 'Page not found']);
        }
        return new Response(200, ['data' => $page]);
    }

    public function store(Request $request): Response {
        $data = $request->getBody();
        // Add validation here in a real app
        $page = $this->pageService->createPage($data);
        return new Response(201, ['data' => $page]);
    }

    public function update(Request $request, int $id): Response {
        $data = $request->getBody();
        $page = $this->pageService->updatePage($id, $data);
        if (!$page) {
            return new Response(404, ['error' => 'Page not found']);
        }
        return new Response(200, ['data' => $page]);
    }

    public function destroy(Request $request, int $id): Response {
        $success = $this->pageService->deletePage($id);
        if (!$success) {
            return new Response(404, ['error' => 'Page not found']);
        }
        return new Response(204, []);
    }
}
