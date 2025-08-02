#!/bin/bash

# Resolución Crítica: Problema ARM64/Rollup en Frontend
# Soluciona incompatibilidad de Rollup con arquitectura ARM64 (Mac M1/M2)

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
    echo -e "${BLUE}[ARM64-FIX] $1${NC}"
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
║                    🚨 RESOLUCIÓN CRÍTICA: PROBLEMA ARM64                     ║
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

# Detectar arquitectura
detect_architecture() {
    log "🔍 Detectando arquitectura del sistema..."

    local arch=$(uname -m)
    local os=$(uname -s)

    echo "Arquitectura: $arch"
    echo "OS: $os"

    if [[ "$arch" == "arm64" ]] && [[ "$os" == "Darwin" ]]; then
        success "✅ Detectado: Mac con chip Apple Silicon (ARM64)"
        return 0
    elif [[ "$arch" == "x86_64" ]]; then
        warning "⚠️ Detectado: Arquitectura x86_64 - problema ARM64 no aplica"
        return 1
    else
        warning "⚠️ Arquitectura no reconocida: $arch"
        return 1
    fi
}

# Crear Dockerfile específico para ARM64
create_arm64_dockerfile() {
    log "🐳 Creando Dockerfile específico para ARM64..."

    cat > "$PROJECT_ROOT/src/frontend/Dockerfile.arm64" << 'EOF'
# Dockerfile específico para ARM64 (Mac M1/M2)
FROM --platform=linux/arm64 node:20-alpine

# Establecer variables de entorno para ARM64
ENV NODE_ENV=development
ENV PLATFORM=linux/arm64
ENV ARCH=arm64

# Instalar dependencias del sistema incluyendo python3 para compilación nativa
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    bash

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Limpiar caché de npm
RUN npm cache clean --force

# Instalar dependencias con flag para reconstruir módulos nativos
RUN npm install --force

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando de inicio con host binding
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
EOF

    success "✅ Dockerfile ARM64 creado: src/frontend/Dockerfile.arm64"
}

# Actualizar docker-compose para usar el Dockerfile ARM64
update_docker_compose_for_arm64() {
    log "🔄 Actualizando docker-compose para usar Dockerfile ARM64..."

    # Hacer backup del docker-compose actual
    cp "$PROJECT_ROOT/docker-compose.yml" "$PROJECT_ROOT/docker-compose.yml.backup"
    
    # Actualizar el servicio frontend para usar el nuevo Dockerfile
    # Usamos un enfoque más simple: modificar el contexto de build
    cat > "$PROJECT_ROOT/docker-compose.override.yml" << 'EOF'
version: '3.8'

services:
  frontend:
    build:
      context: ./src/frontend
      dockerfile: Dockerfile.arm64
    platform: linux/arm64
    environment:
      - NODE_ENV=development
      - PLATFORM=linux/arm64
    volumes:
      - ./src/frontend:/app
      - /app/node_modules
EOF

    success "✅ docker-compose.override.yml creado para ARM64"
}

# Reiniciar frontend con nueva configuración
restart_frontend_with_fix() {
    log "🔄 Reiniciando frontend con configuración ARM64..."

    # Detener frontend actual
    docker-compose stop frontend
    
    # Eliminar contenedor anterior
    docker-compose rm -f frontend
    
    # Reconstruir con nueva configuración
    docker-compose build --no-cache frontend
    
    # Iniciar frontend
    docker-compose up -d frontend
    
    success "✅ Frontend reiniciado con configuración ARM64"
}

# Función principal
main() {
    critical_header

    log "🚨 Iniciando resolución crítica del problema ARM64..."

    # Reportar inicio
    report_to_kiro "update-progress" "Resolviendo problema ARM64 - frontend desbloqueándose"

    # Crear directorio de logs
    mkdir -p "$PROJECT_ROOT/logs/critical"

    # Detectar arquitectura
    if ! detect_architecture; then
        warning "Este sistema no es ARM64, pero continuaremos con la solución general"
    fi

    # Crear Dockerfile específico
    create_arm64_dockerfile

    # Actualizar docker-compose
    update_docker_compose_for_arm64

    # Reiniciar frontend
    restart_frontend_with_fix

    # Esperar a que el frontend esté listo
    log "⏳ Esperando a que el frontend esté listo..."
    sleep 15

    # Verificar estado del frontend
    if docker ps | grep -q "naser_frontend.*Up"; then
        success "🎉 Frontend funcionando correctamente"
        report_to_kiro "update-progress" "✅ Problema ARM64 resuelto - frontend desbloqueado"
    else
        error "❌ Frontend aún tiene problemas"
        docker logs naser_frontend --tail=20
        exit 1
    fi

    success "🚀 Frontend desbloqueado - Claude puede continuar desarrollo"
    exit 0
}

# Ejecutar función principal
main "$@"
