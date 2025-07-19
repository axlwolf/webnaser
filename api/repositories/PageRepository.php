<?php

namespace App\Repositories;

use App\Models\Interfaces\PageRepositoryInterface;
use App\Models\Page;
use PDO;

class PageRepository implements PageRepositoryInterface {
    private PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function findAll(int $page, int $limit): array {
        $offset = ($page - 1) * $limit;
        $stmt = $this->db->prepare("SELECT * FROM pages ORDER BY created_at DESC LIMIT :limit OFFSET :offset");
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return array_map([$this, 'mapToPage'], $results);
    }

    public function findById(int $id): ?Page {
        $stmt = $this->db->prepare("SELECT * FROM pages WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $data ? $this->mapToPage($data) : null;
    }

    public function findBySlug(string $slug): ?Page {
        $stmt = $this->db->prepare("SELECT * FROM pages WHERE slug = :slug");
        $stmt->execute(['slug' => $slug]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $data ? $this->mapToPage($data) : null;
    }

    public function save(Page $page): Page {
        if ($page->id) {
            // Update
            $stmt = $this->db->prepare(
                "UPDATE pages SET title = :title, slug = :slug, content = :content, status = :status, meta_title = :meta_title, meta_description = :meta_description WHERE id = :id"
            );
            $stmt->execute([
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'content' => $page->content,
                'status' => $page->status,
                'meta_title' => $page->meta_title,
                'meta_description' => $page->meta_description
            ]);
        } else {
            // Create
            $stmt = $this->db->prepare(
                "INSERT INTO pages (title, slug, content, status, meta_title, meta_description) VALUES (:title, :slug, :content, :status, :meta_title, :meta_description)"
            );
            $stmt->execute([
                'title' => $page->title,
                'slug' => $page->slug,
                'content' => $page->content,
                'status' => $page->status,
                'meta_title' => $page->meta_title,
                'meta_description' => $page->meta_description
            ]);
            $page->id = (int)$this->db->lastInsertId();
        }
        return $this->findById($page->id);
    }

    public function delete(int $id): bool {
        $stmt = $this->db->prepare("DELETE FROM pages WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }

    public function count(): int {
        return (int)$this->db->query("SELECT COUNT(*) FROM pages")->fetchColumn();
    }

    private function mapToPage(array $data): Page {
        $page = new Page();
        $page->id = (int)$data['id'];
        $page->title = $data['title'];
        $page->slug = $data['slug'];
        $page->content = $data['content'];
        $page->status = $data['status'];
        $page->meta_title = $data['meta_title'];
        $page->meta_description = $data['meta_description'];
        $page->created_at = $data['created_at'];
        $page->updated_at = $data['updated_at'];
        return $page;
    }
}
