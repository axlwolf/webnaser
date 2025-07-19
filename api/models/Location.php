<?php

namespace App\Models;

class Location {
    public ?int $id = null;
    public string $name;
    public ?string $address = null;
    public ?string $phone = null;
    public ?string $map_url = null;
    public ?string $image_url = null;
    public ?string $created_at = null;
    public ?string $updated_at = null;
}
