<?php

namespace App\Models;

class Service {
    public ?int $id = null;
    public string $name;
    public string $slug;
    public ?string $description = null;
    public ?string $short_description = null;
    public ?float $price = null;
    public ?string $image_url = null;
    public ?string $icon = null;
    public ?string $features = null; // JSON stored as string
    public string $category;
    public bool $is_featured = false;
    public string $status = 'active';
    public ?string $created_at = null;
    public ?string $updated_at = null;
}
