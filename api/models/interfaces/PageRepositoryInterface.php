<?php

namespace App\Models\Interfaces;

use App\Models\Page;

interface PageRepositoryInterface {
    public function findAll(int $page, int $limit): array;
    public function findById(int $id): ?Page;
    public function findBySlug(string $slug): ?Page;
    public function save(Page $page): Page;
    public function delete(int $id): bool;
    public function count(): int;
}
