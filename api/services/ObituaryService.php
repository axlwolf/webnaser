<?php

namespace App\Services;

use App\Models\Interfaces\ObituaryRepositoryInterface;
use App\Models\Obituary;

class ObituaryService {
    private ObituaryRepositoryInterface $obituaryRepository;

    public function __construct(ObituaryRepositoryInterface $obituaryRepository) {
        $this->obituaryRepository = $obituaryRepository;
    }

    public function getAllObituaries(int $pageNum, int $limit): array {
        $obituaries = $this->obituaryRepository->findAll($pageNum, $limit);
        $total = $this->obituaryRepository->count();
        return ['obituaries' => $obituaries, 'total' => $total];
    }

    public function getObituaryById(int $id): ?Obituary {
        return $this->obituaryRepository->findById($id);
    }

    public function createObituary(array $data): Obituary {
        $obituary = new Obituary();
        $obituary->full_name = $data['full_name'];
        $obituary->death_date = $data['death_date'];
        $obituary->birth_date = $data['birth_date'] ?? null;
        $obituary->obituary_text = $data['obituary_text'] ?? null;
        $obituary->image_url = $data['image_url'] ?? null;
        $obituary->location_id = $data['location_id'] ?? null;
        $obituary->status = $data['status'] ?? 'draft';
        return $this->obituaryRepository->save($obituary);
    }

    public function updateObituary(int $id, array $data): ?Obituary {
        $obituary = $this->obituaryRepository->findById($id);
        if (!$obituary) return null;

        $obituary->full_name = $data['full_name'] ?? $obituary->full_name;
        $obituary->birth_date = $data['birth_date'] ?? $obituary->birth_date;
        $obituary->death_date = $data['death_date'] ?? $obituary->death_date;
        $obituary->obituary_text = $data['obituary_text'] ?? $obituary->obituary_text;
        $obituary->image_url = $data['image_url'] ?? $obituary->image_url;
        $obituary->location_id = $data['location_id'] ?? $obituary->location_id;
        $obituary->status = $data['status'] ?? $obituary->status;
        
        return $this->obituaryRepository->save($obituary);
    }

    public function deleteObituary(int $id): bool {
        return $this->obituaryRepository->delete($id);
    }
}
