<?php

namespace App\Exceptions;

class ValidationException extends \Exception {
    private $errors;

    public function __construct($errors, $message = "Los datos proporcionados no son válidos.", $code = 422, \Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
        $this->errors = $errors;
    }

    public function getErrors() {
        return $this->errors;
    }
}
