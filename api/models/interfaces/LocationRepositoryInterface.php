<?php

namespace App\Models\Interfaces;

use App\Models\Location;

interface LocationRepositoryInterface {
    public function findAll(int $page, int $limit): array;
    public function findById(int $id): ?Location;
    public function save(Location $location): Location;
    public function delete(int $id): bool;
    public function count(): int;
}
