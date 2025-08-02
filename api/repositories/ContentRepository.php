<?php

namespace App\Repositories;

use App\Models\Page;
use PDO;
use DateTime;

class ContentRepository {
    private $connection;

    public function __construct(PDO $connection) {
        $this->connection = $connection;
    }

    public function findAll() {
        $stmt = $this->connection->query("SELECT * FROM pages");
        return $stmt->fetchAll(PDO::FETCH_CLASS, Page::class);
    }

    public function findById($id) {
        $stmt = $this->connection->prepare("SELECT * FROM pages WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $stmt->setFetchMode(PDO::FETCH_CLASS, Page::class);
        return $stmt->fetch();
    }

    public function findBySlug($slug) {
        $stmt = $this->connection->prepare("SELECT * FROM pages WHERE slug = :slug");
        $stmt->execute(['slug' => $slug]);
        $stmt->setFetchMode(PDO::FETCH_CLASS, Page::class);
        return $stmt->fetch();
    }

    public function create(Page $page): Page {
        $sql = "INSERT INTO pages (title, slug, content, meta_title, meta_description, featured_image, status, created_at, updated_at)
                VALUES (:title, :slug, :content, :meta_title, :meta_description, :featured_image, :status, :created_at, :updated_at)";
        
        $stmt = $this->connection->prepare($sql);

        $now = (new DateTime())->format('Y-m-d H:i:s');
        
        $stmt->bindValue(':title', $page->title);
        $stmt->bindValue(':slug', $page->slug);
        $stmt->bindValue(':content', $page->content);
        $stmt->bindValue(':meta_title', $page->meta_title);
        $stmt->bindValue(':meta_description', $page->meta_description);
        $stmt->bindValue(':featured_image', $page->featured_image);
        $stmt->bindValue(':status', $page->status);
        $stmt->bindValue(':created_at', $now);
        $stmt->bindValue(':updated_at', $now);

        $stmt->execute();
        $page->id = (int)$this->connection->lastInsertId();
        return $page;
    }

    public function update(Page $page): Page {
        $sql = "UPDATE pages SET 
                    title = :title, 
                    slug = :slug, 
                    content = :content, 
                    meta_title = :meta_title, 
                    meta_description = :meta_description, 
                    featured_image = :featured_image, 
                    status = :status, 
                    updated_at = :updated_at
                WHERE id = :id";

        $stmt = $this->connection->prepare($sql);

        $now = (new DateTime())->format('Y-m-d H:i:s');

        $stmt->bindValue(':id', $page->id, PDO::PARAM_INT);
        $stmt->bindValue(':title', $page->title);
        $stmt->bindValue(':slug', $page->slug);
        $stmt->bindValue(':content', $page->content);
        $stmt->bindValue(':meta_title', $page->meta_title);
        $stmt->bindValue(':meta_description', $page->meta_description);
        $stmt->bindValue(':featured_image', $page->featured_image);
        $stmt->bindValue(':status', $page->status);
        $stmt->bindValue(':updated_at', $now);

        $stmt->execute();
        return $page;
    }

    public function delete($id): bool {
        $sql = "DELETE FROM pages WHERE id = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }
}