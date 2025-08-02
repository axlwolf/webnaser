<?php

namespace App\Validators;

class ServiceValidator {
    public static function validate(array $data): ?array {
        $errors = [];
        $categories = ['prevision', 'inmediata', 'cremacion', 'traslados', 'velacion'];

        if (empty($data['name'])) {
            $errors['name'] = 'El nombre es requerido.';
        }

        if (empty($data['category'])) {
            $errors['category'] = 'La categoría es requerida.';
        } elseif (!in_array($data['category'], $categories)) {
            $errors['category'] = 'La categoría no es válida.';
        }

        if (empty($data['description'])) {
            $errors['description'] = 'La descripción es requerida.';
        }

        if (!empty($data['status']) && !in_array($data['status'], ['active', 'inactive'])) {
            $errors['status'] = 'El estado no es válido. Debe ser "active" o "inactive".';
        }

        return empty($errors) ? null : $errors;
    }
}
