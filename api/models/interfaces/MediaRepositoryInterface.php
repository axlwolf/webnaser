<?php

namespace App\Models\Interfaces;

use App\Models\Media;

interface MediaRepositoryInterface {
    public function findAll(int $page, int $limit): array;
    public function findById(int $id): ?Media;
    public function save(Media $media): Media;
    public function delete(int $id): bool;
    public function count(): int;
}
