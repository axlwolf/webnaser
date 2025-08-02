<?php

namespace App\Repositories;

use App\Models\Interfaces\ServiceRepositoryInterface;
use App\Models\Service;
use PDO;

class ServiceRepository implements ServiceRepositoryInterface {
    private PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function findAll(int $page, int $limit): array {
        $offset = ($page - 1) * $limit;
        $stmt = $this->db->prepare("SELECT * FROM services ORDER BY name ASC LIMIT :limit OFFSET :offset");
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return array_map([$this, 'mapToService'], $results);
    }

    public function findById(int $id): ?Service {
        $stmt = $this->db->prepare("SELECT * FROM services WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $data ? $this->mapToService($data) : null;
    }

    public function save(Service $service): Service {
        $sql = $service->id ? $this->getUpdateSql() : $this->getInsertSql();
        $stmt = $this->db->prepare($sql);
        
        $params = [
            ':name' => $service->name,
            ':slug' => $service->slug,
            ':description' => $service->description,
            ':short_description' => $service->short_description,
            ':price' => $service->price,
            ':image_url' => $service->image_url,
            ':icon' => $service->icon,
            ':features' => $service->features,
            ':category' => $service->category,
            ':is_featured' => (int)$service->is_featured,
            ':status' => $service->status,
        ];

        if ($service->id) {
            $params[':id'] = $service->id;
        }

        $stmt->execute($params);

        if (!$service->id) {
            $service->id = (int)$this->db->lastInsertId();
        }
        return $this->findById($service->id);
    }

    public function delete(int $id): bool {
        $stmt = $this->db->prepare("DELETE FROM services WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }

    public function count(): int {
        return (int)$this->db->query("SELECT COUNT(*) FROM services")->fetchColumn();
    }

    private function getInsertSql(): string {
        return "INSERT INTO services (name, slug, description, short_description, price, image_url, icon, features, category, is_featured, status) VALUES (:name, :slug, :description, :short_description, :price, :image_url, :icon, :features, :category, :is_featured, :status)";
    }

    private function getUpdateSql(): string {
        return "UPDATE services SET name = :name, slug = :slug, description = :description, short_description = :short_description, price = :price, image_url = :image_url, icon = :icon, features = :features, category = :category, is_featured = :is_featured, status = :status WHERE id = :id";
    }

    private function mapToService(array $data): Service {
        $service = new Service();
        $service->id = (int)$data['id'];
        $service->name = $data['name'];
        $service->slug = $data['slug'];
        $service->description = $data['description'];
        $service->short_description = $data['short_description'];
        $service->price = (float)$data['price'];
        $service->image_url = $data['image_url'];
        $service->icon = $data['icon'];
        $service->features = $data['features'];
        $service->category = $data['category'];
        $service->is_featured = (bool)$data['is_featured'];
        $service->status = $data['status'];
        $service->created_at = $data['created_at'];
        $service->updated_at = $data['updated_at'];
        return $service;
    }
}
