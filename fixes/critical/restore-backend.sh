#!/bin/bash

# Script para restaurar la funcionalidad del backend
# Soluciona los problemas introducidos por cambios conflictivos

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[RESTORE] $1${NC}"
}

success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" >&2
}

header() {
    echo -e "${PURPLE}
╔══════════════════════════════════════════════════════════════════════════════╗
║                    🔧 RESTAURACIÓN DE BACKEND                                ║
║                         Ejecutado por Warp                                  ║
╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
}

# Función principal
main() {
    header
    
    log "🔧 Restaurando configuración funcional del backend..."
    
    # 1. Crear configuración Apache simplificada
    log "📝 Creando configuración Apache corregida..."
    
    docker exec naser_backend bash -c "cat > /etc/apache2/sites-available/000-default.conf << 'EOF'
<VirtualHost *:80>
    ServerName localhost
    DocumentRoot /var/www/project/api
    
    <Directory /var/www/project/api>
        Options FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Headers de seguridad
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection \"1; mode=block\"
    
    # CORS para desarrollo
    Header always set Access-Control-Allow-Origin \"*\"
    Header always set Access-Control-Allow-Methods \"GET, POST, PUT, DELETE, OPTIONS\"
    Header always set Access-Control-Allow-Headers \"Content-Type, Authorization\"
    
    ErrorLog \${APACHE_LOG_DIR}/error.log
    CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
EOF"
    
    success "✅ Configuración Apache creada"
    
    # 2. Crear .htaccess minimalista
    log "📝 Creando .htaccess funcional..."
    
    docker exec naser_backend bash -c "cat > /var/www/project/api/.htaccess << 'EOF'
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
EOF"
    
    success "✅ .htaccess creado"
    
    # 3. Reiniciar Apache
    log "🔄 Reiniciando Apache..."
    docker exec naser_backend service apache2 reload
    
    success "✅ Apache reiniciado"
    
    # 4. Verificar funcionamiento
    log "🔍 Verificando funcionamiento..."
    
    sleep 3
    
    if curl -f -s "http://localhost:8000/api/v1/health" > /dev/null 2>&1; then
        success "✅ Backend funcionando correctamente"
        
        log "📋 Respuesta del health check:"
        curl -s "http://localhost:8000/api/v1/health" | python3 -m json.tool
        
        # Reportar éxito
        if [ -f ".kiro/specs/auth-integration/update-status.js" ]; then
            node .kiro/specs/auth-integration/update-status.js \
                "add-comment" warp "✅ Backend restaurado exitosamente después de cambios conflictivos"
        fi
    else
        error "❌ Backend aún no responde"
        docker logs naser_backend --tail=10
    fi
    
    success "🎉 Restauración completada"
}

# Ejecutar
main "$@"
