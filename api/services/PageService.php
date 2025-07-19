<?php

namespace App\Services;

use App\Models\Interfaces\PageRepositoryInterface;
use App\Models\Page;

class PageService {
    private PageRepositoryInterface $pageRepository;

    public function __construct(PageRepositoryInterface $pageRepository) {
        $this->pageRepository = $pageRepository;
    }

    public function getAllPages(int $pageNum, int $limit): array {
        $pages = $this->pageRepository->findAll($pageNum, $limit);
        $total = $this->pageRepository->count();
        return [
            'pages' => $pages,
            'total' => $total
        ];
    }

    public function getPageById(int $id): ?Page {
        return $this->pageRepository->findById($id);
    }

    public function createPage(array $data): Page {
        $page = new Page();
        $page->title = $data['title'];
        $page->slug = $data['slug'] ?? $this->slugify($data['title']);
        $page->content = $data['content'] ?? null;
        $page->status = $data['status'] ?? 'draft';
        return $this->pageRepository->save($page);
    }

    public function updatePage(int $id, array $data): ?Page {
        $page = $this->pageRepository->findById($id);
        if (!$page) {
            return null;
        }

        $page->title = $data['title'] ?? $page->title;
        $page->slug = $data['slug'] ?? $page->slug;
        $page->content = $data['content'] ?? $page->content;
        $page->status = $data['status'] ?? $page->status;
        
        return $this->pageRepository->save($page);
    }

    public function deletePage(int $id): bool {
        return $this->pageRepository->delete($id);
    }

    private function slugify(string $text): string {
        $text = preg_replace('~[\s-]+~', '-', $text);
        $text = preg_replace('~[^\w-]+~', '', $text);
        $text = trim($text, '-');
        $text = strtolower($text);
        return $text ?: 'n-a';
    }
}
