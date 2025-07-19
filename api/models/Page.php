<?php

namespace App\Models;

class Page {
    public ?int $id = null;
    public string $title;
    public string $slug;
    public ?string $content = null;
    public string $status = 'draft';
    public ?string $meta_title = null;
    public ?string $meta_description = null;
    public ?string $created_at = null;
    public ?string $updated_at = null;
}
