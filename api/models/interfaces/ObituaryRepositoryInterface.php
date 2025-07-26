<?php

namespace App\Models\Interfaces;

use App\Models\Obituary;

interface ObituaryRepositoryInterface {
    public function findAll(int $page, int $limit): array;
    public function findById(int $id): ?Obituary;
    public function save(Obituary $obituary): Obituary;
    public function delete(int $id): bool;
    public function count(): int;
}
