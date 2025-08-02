#!/bin/bash

# Script para resolver el problema de visualización del frontend
# Corrige la estructura de directorios y configuración

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[FRONTEND-FIX] $1${NC}"
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
║                    🎨 REPARACIÓN DE FRONTEND                                 ║
║                         Ejecutado por Warp                                  ║
╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
}

# Función principal
main() {
    header
    
    log "🔧 Resolviendo problema de visualización del frontend..."
    
    # 1. Detener el contenedor actual
    log "🛑 Deteniendo contenedor frontend actual..."
    docker stop naser_frontend || true
    docker rm naser_frontend || true
    
    success "✅ Contenedor detenido"
    
    # 2. Actualizar docker-compose para corregir volúmenes
    log "📝 Creando docker-compose override corregido..."
    
    cat > docker-compose.override.yml << 'EOF'
services:
  frontend:
    build:
      context: ./src/frontend
      dockerfile: Dockerfile
      target: development
    volumes:
      - ./src/frontend:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - VITE_API_URL=http://localhost:8000/api/v1
      - VITE_APP_TITLE=Grupo Naser CMS
      - VITE_APP_ENV=development
      - CHOKIDAR_USEPOLLING=true
EOF
    
    success "✅ docker-compose.override.yml creado"
    
    # 3. Reconstruir y reiniciar
    log "🔄 Reconstruyendo frontend..."
    docker-compose build frontend
    
    log "🚀 Iniciando frontend..."
    docker-compose up -d frontend
    
    # 4. Esperar a que esté listo
    log "⏳ Esperando a que el frontend esté listo..."
    sleep 10
    
    # 5. Verificar funcionamiento
    log "🔍 Verificando funcionamiento..."
    
    if curl -f -s "http://localhost:3000" > /dev/null 2>&1; then
        success "✅ Frontend respondiendo en puerto 3000"
        
        # Verificar que React esté cargando
        if curl -s "http://localhost:3000" | grep -q "root"; then
            success "✅ React app detectada"
            
            # Mostrar logs actuales
            log "📋 Últimos logs del frontend:"
            docker logs naser_frontend --tail=10
            
            success "🎉 Frontend funcionando correctamente"
            log "🌐 Abre http://localhost:3000 en tu navegador"
        else
            error "❌ React no está cargando correctamente"
        fi
    else
        error "❌ Frontend no responde"
        docker logs naser_frontend --tail=20
    fi
}

# Ejecutar
main "$@"
