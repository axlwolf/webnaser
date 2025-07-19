<?php

namespace App\Models;

class Obituary {
    public ?int $id = null;
    public string $full_name;
    public ?string $birth_date = null;
    public string $death_date;
    public ?string $obituary_text = null;
    public ?string $image_url = null;
    public ?int $location_id = null;
    public string $status = 'draft';
    public ?string $created_at = null;
    public ?string $updated_at = null;
}
