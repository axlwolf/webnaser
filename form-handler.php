<?php
/**
 * RipperFive Form Handler
 * 
 * This script processes form submissions from contacto.html and sends emails.
 * It includes validation, security measures, and error handling.
 */

// Configuration
$config = [
    'recipient_email' => 'info@naser.com.mx', // Primary recipient
    'cc_email' => '', // Optional CC recipient
    'subject_prefix' => 'Formulario de Contacto: ', // Email subject prefix
    'success_redirect' => 'contacto.html?status=success', // Redirect on success (no longer used for AJAX)
    'error_redirect' => 'contacto.html?status=error', // Redirect on error (no longer used for AJAX)
    'allowed_origin' => $_SERVER['HTTP_HOST'], // Prevent cross-site submissions
    'required_fields' => ['name', 'email', 'subject', 'message'], // Required form fields
    'log_file' => __DIR__ . '/form_submissions.log', // Log file path
];

// Initialize response array
$response = [
    'success' => false,
    'message' => '',
    'errors' => []
];

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Validate CSRF token (if implemented)
    // if (!validateCSRFToken()) {
    //     $response['message'] = 'Error de seguridad: token inválido.';
    //     redirectWithError($config['error_redirect'], $response['message']);
    // }
    
    // Validate required fields
    $errors = [];
    foreach ($config['required_fields'] as $field) {
        if (empty($_POST[$field])) {
            $errors[] = "El campo '" . ucfirst($field) . "' es obligatorio.";
        }
    }
    
    // Validate email format
    if (!empty($_POST['email']) && !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "El formato del correo electrónico es inválido.";
    }
    
    // If there are validation errors
    if (!empty($errors)) {
        $response['errors'] = $errors;
        $response['message'] = 'Por favor corrija los errores en el formulario.';
        logMessage('ERROR: Validation failed - ' . implode('; ', $errors), $config['log_file']);
        sendJsonResponse(false, 'Por favor corrija los errores en el formulario.', $errors);
    }
    
    // Sanitize form data
    $name = sanitizeInput($_POST['name']);
    $email = sanitizeInput($_POST['email']);
    $phone = isset($_POST['subject']) ? sanitizeInput($_POST['subject']) : 'No proporcionado';
    $location = isset($_POST['location']) ? sanitizeInput($_POST['location']) : 'No proporcionada';
    $message = sanitizeInput($_POST['message']);
    
    // Prepare email content
    $subject = $config['subject_prefix'] . $name;
    
    $emailBody = "
    <html>
    <head>
        <title>Nuevo mensaje de contacto</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #003366; border-bottom: 1px solid #eee; padding-bottom: 10px; }
            .info { margin-bottom: 20px; }
            .label { font-weight: bold; }
            .message { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #003366; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>Nuevo mensaje de contacto - Grupo Naser</h2>
            <div class='info'>
                <p><span class='label'>Nombre:</span> {$name}</p>
                <p><span class='label'>Correo electrónico:</span> {$email}</p>
                <p><span class='label'>Teléfono:</span> {$phone}</p>
                <p><span class='label'>Localidad:</span> {$location}</p>
            </div>
            <div class='message'>
                <p><span class='label'>Mensaje:</span></p>
                <p>" . nl2br($message) . "</p>
            </div>
            <p>Este mensaje fue enviado desde el formulario de contacto en " . date('d/m/Y H:i:s') . "</p>
        </div>
    </body>
    </html>
    ";
    
    // Set email headers
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . $name . ' <' . $email . '>',
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion()
    ];
    
    if (!empty($config['cc_email'])) {
        $headers[] = 'Cc: ' . $config['cc_email'];
    }
    
    // Attempt to send email
    $mailSent = mail($config['recipient_email'], $subject, $emailBody, implode("\r\n", $headers));
    
    if ($mailSent) {
        // Success
        $response['success'] = true;
        $response['message'] = 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.';
        logMessage('SUCCESS: Email sent from ' . $email . ' to ' . $config['recipient_email'], $config['log_file']);
        sendJsonResponse(true, 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.');
    } else {
        // Email sending failed
        $response['message'] = 'Error al enviar el mensaje. Por favor intente más tarde o contáctenos directamente por teléfono.';
        logMessage('ERROR: Email failed to send from ' . $email . ' to ' . $config['recipient_email'] . ' - ' . $response['message'], $config['log_file']);
        sendJsonResponse(false, 'Error al enviar el mensaje. Por favor intente más tarde o contáctenos directamente por teléfono.');
    }
} else {
    // Not a POST request
    $response['message'] = 'Método de solicitud no válido.';
    logMessage('ERROR: Invalid request method - Not a POST request.', $config['log_file']);
    sendJsonResponse(false, 'Método de solicitud no válido.');
}

/**
 * Log messages to a specified file.
 *
 * @param string $message The message to log.
 * @param string $logFile The path to the log file.
 */
function logMessage($message, $logFile) {
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND);
}

/**
 * Sanitize user input
 * 
 * @param string $input User input to sanitize
 * @return string Sanitized input
 */
function sanitizeInput($input) {
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return $input;
}

/**
 * Send JSON response and exit.
 *
 * @param bool $success Indicates if the operation was successful.
 * @param string $message A message to send to the client.
 * @param array $errors An array of errors, if any.
 */
function sendJsonResponse($success, $message, $errors = []) {
    header('Content-Type: application/json');
    echo json_encode(['success' => $success, 'message' => $message, 'errors' => $errors]);
    exit;
}

/**
 * Validate CSRF token
 * 
 * @return bool True if token is valid, false otherwise
 */
function validateCSRFToken() {
    // Implementation would go here
    return true; // Placeholder
}
?>
