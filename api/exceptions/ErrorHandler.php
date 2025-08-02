<?php

namespace App\Exceptions;

use Throwable;

class ErrorHandler {
    public static function handle(Throwable $exception) {
        header("Content-Type: application/json");
        $code = $exception->getCode() ?: 500;
        http_response_code($code);

        $response = [
            'success' => false,
            'error' => [
                'code' => self::getErrorCode($exception),
                'message' => $exception->getMessage(),
            ],
            'timestamp' => date('c')
        ];

        if ($exception instanceof ValidationException) {
            $response['error']['details'] = $exception->getErrors();
        }

        if (getenv('APP_DEBUG') === 'true') {
            $response['debug'] = [
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
                'trace' => $exception->getTraceAsString()
            ];
        }

        echo json_encode($response);
        exit();
    }

    private static function getErrorCode(Throwable $exception) {
        if ($exception instanceof ValidationException) {
            return 'VALIDATION_ERROR';
        }
        if ($exception instanceof NotFoundException) {
            return 'NOT_FOUND';
        }
        if ($exception instanceof UnauthorizedException) {
            return 'UNAUTHORIZED';
        }
        return 'SERVER_ERROR';
    }
}
