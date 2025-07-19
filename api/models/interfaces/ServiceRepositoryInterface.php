<?php

namespace App\Models\Interfaces;

use App\Models\Service;

interface ServiceRepositoryInterface {
    public function findAll(int $page, int $limit): array;
    public function findById(int $id): ?Service;
    public function save(Service $service): Service;
    public function delete(int $id): bool;
    public function count(): int;
}
