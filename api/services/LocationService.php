<?php

namespace App\Services;

use App\Models\Interfaces\LocationRepositoryInterface;
use App\Models\Location;

class LocationService {
    private LocationRepositoryInterface $locationRepository;

    public function __construct(LocationRepositoryInterface $locationRepository) {
        $this->locationRepository = $locationRepository;
    }

    public function getAllLocations(int $pageNum, int $limit): array {
        $locations = $this->locationRepository->findAll($pageNum, $limit);
        $total = $this->locationRepository->count();
        return ['locations' => $locations, 'total' => $total];
    }

    public function getLocationById(int $id): ?Location {
        return $this->locationRepository->findById($id);
    }

    public function createLocation(array $data): Location {
        $location = new Location();
        $location->name = $data['name'];
        $location->address = $data['address'] ?? null;
        $location->phone = $data['phone'] ?? null;
        $location->map_url = $data['map_url'] ?? null;
        $location->image_url = $data['image_url'] ?? null;
        return $this->locationRepository->save($location);
    }

    public function updateLocation(int $id, array $data): ?Location {
        $location = $this->locationRepository->findById($id);
        if (!$location) return null;

        $location->name = $data['name'] ?? $location->name;
        $location->address = $data['address'] ?? $location->address;
        $location->phone = $data['phone'] ?? $location->phone;
        $location->map_url = $data['map_url'] ?? $location->map_url;
        $location->image_url = $data['image_url'] ?? $location->image_url;
        
        return $this->locationRepository->save($location);
    }

    public function deleteLocation(int $id): bool {
        return $this->locationRepository->delete($id);
    }
}
