<?php

namespace App\Models;

class Page {
    public int $id;
    public string $title;
    public string $slug;
    public string $content;
    public string $meta_title;
    public string $meta_description;
    public string $featured_image;
    public string $status;
    public string $created_at;
    public string $updated_at;
}