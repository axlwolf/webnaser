<?php

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Services\MediaService;

class MediaController {
    private MediaService $mediaService;

    public function __construct(MediaService $mediaService) {
        $this->mediaService = $mediaService;
    }

    public function index(Request $request): Response {
        $queryParams = $request->getQueryParams();
        $pageNum = (int)($queryParams['page'] ?? 1);
        $limit = (int)($queryParams['limit'] ?? 10);

        $result = $this->mediaService->getAllMedia($pageNum, $limit);
        
        $pagination = [
            'current_page' => $pageNum,
            'per_page' => $limit,
            'total' => $result['total'],
            'total_pages' => ceil($result['total'] / $limit)
        ];

        return new Response(200, ['data' => $result['media'], 'pagination' => $pagination]);
    }

    public function upload(Request $request, array $fileData): Response {
        if (empty($fileData)) {
            return new Response(400, ['error' => 'No file uploaded']);
        }

        $media = $this->mediaService->uploadMedia($fileData);

        if (!$media) {
            return new Response(400, ['error' => 'File upload failed or invalid']);
        }

        return new Response(201, ['data' => $media]);
    }

    public function show(Request $request, int $id): Response {
        $media = $this->mediaService->getMediaById($id);
        if (!$media) {
            return new Response(404, ['error' => 'Media not found']);
        }
        return new Response(200, ['data' => $media]);
    }

    public function destroy(Request $request, int $id): Response {
        if (!$this->mediaService->deleteMedia($id)) {
            return new Response(404, ['error' => 'Media not found']);
        }
        return new Response(204, []);
    }
}
