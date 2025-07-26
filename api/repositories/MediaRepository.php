<?php

namespace App\Repositories;

use App\Models\Interfaces\MediaRepositoryInterface;
use App\Models\Media;
use PDO;

class MediaRepository implements MediaRepositoryInterface {
    private PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function findAll(int $page, int $limit): array {
        $offset = ($page - 1) * $limit;
        $stmt = $this->db->prepare("SELECT * FROM media ORDER BY created_at DESC LIMIT :limit OFFSET :offset");
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return array_map([$this, 'mapToMedia'], $results);
    }

    public function findById(int $id): ?Media {
        $stmt = $this->db->prepare("SELECT * FROM media WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $data ? $this->mapToMedia($data) : null;
    }

    public function save(Media $media): Media {
        $sql = $media->id ? $this->getUpdateSql() : $this->getInsertSql();
        $stmt = $this->db->prepare($sql);
        
        $params = [
            ':filename' => $media->filename,
            ':original_filename' => $media->original_filename,
            ':mime_type' => $media->mime_type,
            ':size' => $media->size,
            ':url' => $media->url,
            ':thumbnail_url' => $media->thumbnail_url,
        ];

        if ($media->id) {
            $params[':id'] = $media->id;
        }

        $stmt->execute($params);

        if (!$media->id) {
            $media->id = (int)$this->db->lastInsertId();
        }
        return $this->findById($media->id);
    }

    public function delete(int $id): bool {
        $stmt = $this->db->prepare("DELETE FROM media WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }

    public function count(): int {
        return (int)$this->db->query("SELECT COUNT(*) FROM media")->fetchColumn();
    }

    private function getInsertSql(): string {
        return "INSERT INTO media (filename, original_filename, mime_type, size, url, thumbnail_url) VALUES (:filename, :original_filename, :mime_type, :size, :url, :thumbnail_url)";
    }

    private function getUpdateSql(): string {
        return "UPDATE media SET filename = :filename, original_filename = :original_filename, mime_type = :mime_type, size = :size, url = :url, thumbnail_url = :thumbnail_url WHERE id = :id";
    }

    private function mapToMedia(array $data): Media {
        $media = new Media();
        $media->id = (int)$data['id'];
        $media->filename = $data['filename'];
        $media->original_filename = $data['original_filename'];
        $media->mime_type = $data['mime_type'];
        $media->size = (int)$data['size'];
        $media->url = $data['url'];
        $media->thumbnail_url = $data['thumbnail_url'];
        $media->created_at = $data['created_at'];
        $media->updated_at = $data['updated_at'];
        return $media;
    }
}
