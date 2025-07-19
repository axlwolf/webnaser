<?php

namespace App\Repositories;

use App\Models\Interfaces\ObituaryRepositoryInterface;
use App\Models\Obituary;
use PDO;

class ObituaryRepository implements ObituaryRepositoryInterface {
    private PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function findAll(int $page, int $limit): array {
        $offset = ($page - 1) * $limit;
        $stmt = $this->db->prepare("SELECT * FROM obituaries ORDER BY death_date DESC LIMIT :limit OFFSET :offset");
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return array_map([$this, 'mapToObituary'], $results);
    }

    public function findById(int $id): ?Obituary {
        $stmt = $this->db->prepare("SELECT * FROM obituaries WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $data ? $this->mapToObituary($data) : null;
    }

    public function save(Obituary $obituary): Obituary {
        $sql = $obituary->id ? $this->getUpdateSql() : $this->getInsertSql();
        $stmt = $this->db->prepare($sql);
        
        $params = [
            ':full_name' => $obituary->full_name,
            ':birth_date' => $obituary->birth_date,
            ':death_date' => $obituary->death_date,
            ':obituary_text' => $obituary->obituary_text,
            ':image_url' => $obituary->image_url,
            ':location_id' => $obituary->location_id,
            ':status' => $obituary->status,
        ];

        if ($obituary->id) {
            $params[':id'] = $obituary->id;
        }

        $stmt->execute($params);

        if (!$obituary->id) {
            $obituary->id = (int)$this->db->lastInsertId();
        }
        return $this->findById($obituary->id);
    }

    public function delete(int $id): bool {
        $stmt = $this->db->prepare("DELETE FROM obituaries WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }

    public function count(): int {
        return (int)$this->db->query("SELECT COUNT(*) FROM obituaries")->fetchColumn();
    }

    private function getInsertSql(): string {
        return "INSERT INTO obituaries (full_name, birth_date, death_date, obituary_text, image_url, location_id, status) VALUES (:full_name, :birth_date, :death_date, :obituary_text, :image_url, :location_id, :status)";
    }

    private function getUpdateSql(): string {
        return "UPDATE obituaries SET full_name = :full_name, birth_date = :birth_date, death_date = :death_date, obituary_text = :obituary_text, image_url = :image_url, location_id = :location_id, status = :status WHERE id = :id";
    }

    private function mapToObituary(array $data): Obituary {
        $obituary = new Obituary();
        $obituary->id = (int)$data['id'];
        $obituary->full_name = $data['full_name'];
        $obituary->birth_date = $data['birth_date'];
        $obituary->death_date = $data['death_date'];
        $obituary->obituary_text = $data['obituary_text'];
        $obituary->image_url = $data['image_url'];
        $obituary->location_id = $data['location_id'] ? (int)$data['location_id'] : null;
        $obituary->status = $data['status'];
        $obituary->created_at = $data['created_at'];
        $obituary->updated_at = $data['updated_at'];
        return $obituary;
    }
}
