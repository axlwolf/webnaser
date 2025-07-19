<?php

namespace App\Services;

use App\Models\Interfaces\ServiceRepositoryInterface;
use App\Models\Service;

class ServiceService {
    private ServiceRepositoryInterface $serviceRepository;

    public function __construct(ServiceRepositoryInterface $serviceRepository) {
        $this->serviceRepository = $serviceRepository;
    }

    public function getAllServices(int $pageNum, int $limit): array {
        $services = $this->serviceRepository->findAll($pageNum, $limit);
        $total = $this->serviceRepository->count();
        return ['services' => $services, 'total' => $total];
    }

    public function getServiceById(int $id): ?Service {
        return $this->serviceRepository->findById($id);
    }

    public function createService(array $data): Service {
        $service = new Service();
        $service->name = $data['name'];
        $service->slug = $data['slug'] ?? $this->slugify($data['name']);
        $this->updateServiceData($service, $data);
        return $this->serviceRepository->save($service);
    }

    public function updateService(int $id, array $data): ?Service {
        $service = $this->serviceRepository->findById($id);
        if (!$service) return null;

        $this->updateServiceData($service, $data);
        return $this->serviceRepository->save($service);
    }

    public function deleteService(int $id): bool {
        return $this->serviceRepository->delete($id);
    }

    private function updateServiceData(Service $service, array $data): void {
        $service->name = $data['name'] ?? $service->name;
        $service->slug = $data['slug'] ?? $service->slug;
        $service->description = $data['description'] ?? $service->description;
        $service->short_description = $data['short_description'] ?? $service->short_description;
        $service->price = $data['price'] ?? $service->price;
        $service->image_url = $data['image_url'] ?? $service->image_url;
        $service->icon = $data['icon'] ?? $service->icon;
        $service->features = isset($data['features']) ? json_encode($data['features']) : $service->features;
        $service->category = $data['category'] ?? $service->category;
        $service->is_featured = $data['is_featured'] ?? $service->is_featured;
        $service->status = $data['status'] ?? $service->status;
    }

    private function slugify(string $text): string {
        $text = preg_replace('~[\s-]+~', '-', $text);
        $text = preg_replace('~[^\w-]+~', '', $text);
        return strtolower(trim($text, '-'));
    }
}
