<?php

namespace App\Validators;

class ContentValidator {
    public static function validate(array $data, bool $isUpdate = false): ?array {
        $errors = [];

        if (empty($data['title'])) {
            $errors['title'] = 'El título es requerido.';
        }

        if (!$isUpdate && empty($data['slug'])) {
            $errors['slug'] = 'El slug es requerido.';
        } elseif (!empty($data['slug']) && !preg_match('/^[a-z0-9-]+$/', $data['slug'])) {
            $errors['slug'] = 'El slug solo puede contener letras minúsculas, números y guiones.';
        }

        if (empty($data['content'])) {
            $errors['content'] = 'El contenido es requerido.';
        }

        if (!empty($data['status']) && !in_array($data['status'], ['draft', 'published', 'archived'])) {
            $errors['status'] = 'El estado no es válido. Debe ser "draft", "published" o "archived".';
        }

        return empty($errors) ? null : $errors;
    }
}
