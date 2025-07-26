<?php

namespace App\Core;

class Response {
    private int $statusCode;
    private array $data;

    public function __construct(int $statusCode, array $data) {
        $this->statusCode = $statusCode;
        $this->data = $data;
    }

    public function getStatusCode(): int {
        return $this->statusCode;
    }

    public function getData(): array {
        return $this->data;
    }

    public function send(): void {
        http_response_code($this->statusCode);
        header('Content-Type: application/json');
        echo json_encode($this->data);
    }
}
