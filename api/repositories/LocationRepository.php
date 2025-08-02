<?php

namespace App\Repositories;

use App\Models\Interfaces\LocationRepositoryInterface;
use App\Models\Location;
use PDO;

class LocationRepository implements LocationRepositoryInterface {
    private PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function findAll(int $page, int $limit): array {
        $offset = ($page - 1) * $limit;
        $stmt = $this->db->prepare("SELECT * FROM locations ORDER BY name ASC LIMIT :limit OFFSET :offset");
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return array_map([$this, 'mapToLocation'], $results);
    }

    public function findById(int $id): ?Location {
        $stmt = $this->db->prepare("SELECT * FROM locations WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $data ? $this->mapToLocation($data) : null;
    }

    public function save(Location $location): Location {
        $sql = $location->id ? $this->getUpdateSql() : $this->getInsertSql();
        $stmt = $this->db->prepare($sql);
        
        $params = [
            ':name' => $location->name,
            ':address' => $location->address,
            ':phone' => $location->phone,
            ':map_url' => $location->map_url,
            ':image_url' => $location->image_url,
        ];

        if ($location->id) {
            $params[':id'] = $location->id;
        }

        $stmt->execute($params);

        if (!$location->id) {
            $location->id = (int)$this->db->lastInsertId();
        }
        return $this->findById($location->id);
    }

    public function delete(int $id): bool {
        $stmt = $this->db->prepare("DELETE FROM locations WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }

    public function count(): int {
        return (int)$this->db->query("SELECT COUNT(*) FROM locations")->fetchColumn();
    }

    private function getInsertSql(): string {
        return "INSERT INTO locations (name, address, phone, map_url, image_url) VALUES (:name, :address, :phone, :map_url, :image_url)";
    }

    private function getUpdateSql(): string {
        return "UPDATE locations SET name = :name, address = :address, phone = :phone, map_url = :map_url, image_url = :image_url WHERE id = :id";
    }

    private function mapToLocation(array $data): Location {
        $location = new Location();
        $location->id = (int)$data['id'];
        $location->name = $data['name'];
        $location->address = $data['address'];
        $location->phone = $data['phone'];
        $location->map_url = $data['map_url'];
        $location->image_url = $data['image_url'];
        $location->created_at = $data['created_at'];
        $location->updated_at = $data['updated_at'];
        return $location;
    }
}
