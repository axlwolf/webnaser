<?php

namespace App\Models;

class Media {
    public ?int $id = null;
    public string $filename;
    public string $original_filename;
    public string $mime_type;
    public int $size;
    public string $url;
    public ?string $thumbnail_url = null;
    public ?string $created_at = null;
    public ?string $updated_at = null;
}
