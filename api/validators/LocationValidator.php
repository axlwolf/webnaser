<?php

namespace App\Validators;

class LocationValidator {
    public static function validate(array $data): ?array {
        $errors = [];

        if (empty($data['name'])) {
            $errors['name'] = 'El nombre es requerido.';
        }

        if (empty($data['address'])) {
            $errors['address'] = 'La dirección es requerida.';
        }

        if (empty($data['phone'])) {
            $errors['phone'] = 'El teléfono es requerido.';
        }

        return empty($errors) ? null : $errors;
    }
}
