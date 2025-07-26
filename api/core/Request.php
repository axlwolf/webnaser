<?php

namespace App\Core;

class Request {
    public function getBody(): array {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
            $body = file_get_contents('php://input');
            return json_decode($body, true) ?? [];
        }
        return [];
    }

    public function getQueryParams(): array {
        return $_GET;
    }
}
