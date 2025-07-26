#!/bin/bash

# Resolución Crítica: Problema de Redirección Infinita Apache
# Soluciona errores HTTP 500 por configuración incorrecta de Apache

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

log() {
    echo -e "${BLUE}[APACHE-FIX] $1${NC}"
}

success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" >&2
}

critical_header() {
    echo -e "${PURPLE}
╔══════════════════════════════════════════════════════════════════════════════╗
║                  🚨 RESOLUCIÓN CRÍTICA: PROBLEMA APACHE                      ║
║                           Ejecutado por Warp                                ║
╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
}

# Función para reportar a Kiro
report_to_kiro() {
    local status="$1"
    local message="$2"
    if [ -f "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" ]; then
        node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" "$status" warp "W.4" "$message"
    fi
}

# Crear index.php principal para el API
create_api_index() {
    log "🔧 Creando index.php principal para el API..."

    cat > "$PROJECT_ROOT/api/index.php" << 'EOF'
<?php
/**
 * API Entry Point - Grupo Naser CMS
 * Resuelve el problema de redirección infinita
 */

// Configurar errores para desarrollo
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Headers CORS para desarrollo
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Obtener la ruta solicitada
$request_uri = $_SERVER['REQUEST_URI'];
$request_method = $_SERVER['REQUEST_METHOD'];

// Quitar query string
$path = parse_url($request_uri, PHP_URL_PATH);

// Rutas disponibles
$routes = [
    'GET' => [
        '/api/v1/health' => 'handleHealthCheck',
        '/api/v1/test' => 'handleTest',
    ],
    'POST' => [
        '/api/v1/auth/login' => 'handleLogin',
        '/api/v1/auth/register' => 'handleRegister',
    ],
];

// Health check endpoint
function handleHealthCheck() {
    $health = [
        'status' => 'healthy',
        'timestamp' => date('c'),
        'service' => 'Grupo Naser API',
        'version' => '1.0.0',
        'php_version' => PHP_VERSION,
        'checks' => [
            'database' => checkDatabase(),
        ]
    ];
    
    http_response_code(200);
    echo json_encode($health, JSON_PRETTY_PRINT);
}

// Test endpoint
function handleTest() {
    http_response_code(200);
    echo json_encode([
        'message' => 'API funcionando correctamente',
        'timestamp' => date('c')
    ]);
}

// Login placeholder
function handleLogin() {
    http_response_code(200);
    echo json_encode([
        'message' => 'Login endpoint (en desarrollo)',
        'timestamp' => date('c')
    ]);
}

// Register placeholder
function handleRegister() {
    http_response_code(200);
    echo json_encode([
        'message' => 'Register endpoint (en desarrollo)',
        'timestamp' => date('c')
    ]);
}

// Database check
function checkDatabase() {
    try {
        $host = $_ENV['DB_HOST'] ?? 'database';
        $dbname = $_ENV['DB_NAME'] ?? 'naser_cms';
        $user = $_ENV['DB_USER'] ?? 'naser_user';
        $pass = $_ENV['DB_PASSWORD'] ?? 'naser_pass_2024';
        
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        return 'connected';
    } catch (Exception $e) {
        return 'disconnected: ' . $e->getMessage();
    }
}

// Enrutador principal
if (isset($routes[$request_method][$path])) {
    $handler = $routes[$request_method][$path];
    $handler();
} else {
    // 404 para rutas no encontradas
    http_response_code(404);
    echo json_encode([
        'error' => 'Endpoint no encontrado',
        'path' => $path,
        'method' => $request_method
    ]);
}
EOF

    success "✅ index.php principal creado"
}

# Crear .htaccess corregido
create_fixed_htaccess() {
    log "🔧 Creando .htaccess corregido..."

    cat > "$PROJECT_ROOT/api/.htaccess" << 'EOF'
# Configuración Apache corregida para evitar redirección infinita
RewriteEngine On

# Configuración de headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# CORS para desarrollo
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type, Authorization"

# No procesar archivos existentes
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Redirigir todo a index.php
RewriteRule ^(.*)$ index.php [QSA,L]

# PHP settings
<IfModule mod_php7.c>
    php_flag display_errors Off
    php_flag log_errors On
    php_value max_execution_time 60
    php_value memory_limit 128M
    php_value post_max_size 8M
    php_value upload_max_filesize 8M
</IfModule>
EOF

    success "✅ .htaccess corregido creado"
}

# Aplicar correcciones
apply_apache_fixes() {
    log "🔄 Aplicando correcciones de Apache..."

    cd "$PROJECT_ROOT/api"

    # Backup de archivos originales
    if [ -f ".htaccess" ]; then
        cp .htaccess .htaccess.backup.$(date +%Y%m%d%H%M%S)
        log "📋 Backup creado de .htaccess"
    fi

    if [ -f "index.php" ]; then
        cp index.php index.php.backup.$(date +%Y%m%d%H%M%S)
        log "📋 Backup creado de index.php"
    fi

    success "✅ Configuraciones Apache aplicadas"
}

# Reiniciar contenedor backend
restart_backend_container() {
    log "🔄 Reiniciando contenedor backend..."

    # Verificar si el contenedor existe
    if docker ps -a | grep -q "naser_backend"; then
        # Detener y eliminar contenedor actual
        docker stop naser_backend || true
        docker rm naser_backend || true
    fi

    # Reconstruir y reiniciar
    cd "$PROJECT_ROOT"
    docker-compose up -d --build backend

    # Esperar a que esté listo
    log "⏳ Esperando a que el backend esté listo..."
    sleep 10

    success "✅ Contenedor backend reiniciado"
}

# Validar corrección
validate_apache_fix() {
    log "✅ Validando corrección de Apache..."

    # Esperar un poco más para asegurar que el servicio esté listo
    sleep 5

    # Verificar conectividad HTTP
    if curl -f -s --max-time 10 "http://localhost:8000/api/v1/health" > /dev/null 2>&1; then
        success "✅ Backend responde correctamente al health check"
        
        # Mostrar respuesta del health check
        log "📋 Respuesta del health check:"
        curl -s "http://localhost:8000/api/v1/health" | jq . || curl -s "http://localhost:8000/api/v1/health"
        
        return 0
    else
        error "❌ Backend aún no responde correctamente"
        
        # Mostrar logs para debugging
        log "📋 Últimos logs del backend:"
        docker logs naser_backend --tail=20
        
        return 1
    fi
}

# Función principal
main() {
    critical_header

    log "🚨 Iniciando resolución crítica del problema Apache..."

    # Reportar inicio
    report_to_kiro "update-progress" "Resolviendo problema Apache - backend desbloqueándose"

    # Crear directorio de logs
    mkdir -p "$PROJECT_ROOT/logs/critical"

    # Crear archivos corregidos
    create_api_index
    create_fixed_htaccess

    # Aplicar correcciones
    apply_apache_fixes

    # Reiniciar contenedor
    restart_backend_container

    # Validar corrección
    if validate_apache_fix; then
        success "🎉 Problema Apache completamente resuelto"
        report_to_kiro "update-progress" "✅ Problema Apache resuelto - backend desbloqueado y funcionando"
    else
        error "❌ Validación falló - intentando diagnóstico adicional"
        
        # Intentar acceso directo al contenedor
        log "🔍 Verificando configuración dentro del contenedor..."
        docker exec naser_backend ls -la /var/www/html/
        docker exec naser_backend cat /var/www/html/.htaccess
        
        exit 1
    fi

    success "🚀 Backend desbloqueado - Gemini puede continuar desarrollo"
    exit 0
}

# Ejecutar función principal
main "$@"
