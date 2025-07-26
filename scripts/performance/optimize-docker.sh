#!/bin/bash

# Script de Optimización Docker - Grupo Naser CMS
# Optimiza la configuración y uso de recursos de Docker

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

log() {
    echo -e "${BLUE}[DOCKER-OPT] $1${NC}"
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

header() {
    echo -e "${PURPLE}
╔══════════════════════════════════════════════════════════════════════════════╗
║                    🐳 OPTIMIZACIÓN DOCKER - NASER CMS                        ║
║                           Optimizado por Warp                               ║
╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
}

# Función para limpiar recursos no utilizados
cleanup_docker_resources() {
    log "🧹 Limpiando recursos Docker no utilizados..."
    
    # Detener contenedores no utilizados
    log "Deteniendo contenedores no utilizados..."
    docker container prune -f
    
    # Eliminar imágenes no utilizadas
    log "Eliminando imágenes no utilizadas..."
    docker image prune -f
    
    # Eliminar volúmenes no utilizados
    log "Eliminando volúmenes no utilizados..."
    docker volume prune -f
    
    # Eliminar redes no utilizadas
    log "Eliminando redes no utilizadas..."
    docker network prune -f
    
    # Limpiar caché de build
    log "Limpiando caché de build..."
    docker builder prune -f
    
    success "Recursos Docker limpiados"
}

# Función para optimizar imágenes
optimize_docker_images() {
    log "🎯 Optimizando imágenes Docker..."
    
    # Verificar tamaño de imágenes actuales
    log "Análisis de imágenes actuales:"
    docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}" | grep -E "naser|web_naser"
    
    # Recomendar optimizaciones
    local recommendations=""
    
    # Verificar si hay imágenes grandes
    if docker images --format "{{.Size}}" | grep -E "[0-9]+GB"; then
        recommendations="${recommendations}\n- Considera usar imágenes base Alpine para reducir tamaño"
        recommendations="${recommendations}\n- Implementa multi-stage builds para minimizar capas"
    fi
    
    if [ -n "$recommendations" ]; then
        warning "Recomendaciones de optimización:$recommendations"
    fi
    
    success "Análisis de imágenes completado"
}

# Función para configurar límites de recursos
configure_resource_limits() {
    log "⚙️ Configurando límites de recursos para contenedores..."
    
    # Crear archivo de configuración de recursos
    cat > "$PROJECT_ROOT/docker/production/resource-limits.yml" << EOF
# Límites de recursos para contenedores en producción
version: '3.8'

services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M

  frontend:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 256M
        reservations:
          cpus: '0.25'
          memory: 128M

  database:
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 1G
        reservations:
          cpus: '1.0'
          memory: 512M
EOF
    
    success "Límites de recursos configurados en docker/production/resource-limits.yml"
}

# Función para optimizar configuración de red
optimize_network_configuration() {
    log "🌐 Optimizando configuración de red..."
    
    # Crear red optimizada si no existe
    if ! docker network ls | grep -q "naser_production"; then
        log "Creando red optimizada para producción..."
        docker network create --driver bridge \
            --opt com.docker.network.bridge.name=naser_prod \
            --opt com.docker.network.bridge.enable_icc=true \
            --opt com.docker.network.bridge.enable_ip_masquerade=true \
            naser_production
        success "Red de producción creada"
    else
        log "Red de producción ya existe"
    fi
}

# Función para configurar logging optimizado
configure_optimized_logging() {
    log "📝 Configurando logging optimizado..."
    
    cat > "$PROJECT_ROOT/docker/production/logging.conf" << EOF
# Configuración de logging optimizada para producción

# Configuración para docker-compose
# Agregar a cada servicio:
#
# logging:
#   driver: "json-file"
#   options:
#     max-size: "10m"
#     max-file: "3"
#     compress: "true"
#     labels: "service,environment"

# Para aplicar a todos los contenedores:
# Crear archivo /etc/docker/daemon.json con:
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3",
    "compress": "true"
  }
}
EOF
    
    success "Configuración de logging creada en docker/production/logging.conf"
}

# Función para generar docker-compose optimizado
generate_optimized_compose() {
    log "📋 Generando docker-compose.prod.yml optimizado..."
    
    cat > "$PROJECT_ROOT/docker/production/docker-compose.prod.yml" << 'EOF'
version: '3.8'

services:
  backend:
    build:
      context: ../..
      dockerfile: docker/production/Dockerfile.prod
      cache_from:
        - php:8.2-apache
    image: naser-cms-backend:prod
    container_name: naser_backend_prod
    restart: always
    networks:
      - naser_production
    volumes:
      - uploads:/var/www/html/public/uploads
      - logs:/var/log
    environment:
      - APP_ENV=production
      - APP_DEBUG=false
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/api/v1/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    build:
      context: ../../src/frontend
      dockerfile: Dockerfile
      target: production
    image: naser-cms-frontend:prod
    container_name: naser_frontend_prod
    restart: always
    networks:
      - naser_production
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 256M
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  database:
    image: mysql:8.0
    container_name: naser_db_prod
    restart: always
    networks:
      - naser_production
    volumes:
      - db_data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_USER: ${DB_USER}
      MYSQL_PASSWORD: ${DB_PASSWORD}
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 1G
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

networks:
  naser_production:
    external: true

volumes:
  db_data:
  uploads:
  logs:
EOF
    
    success "docker-compose.prod.yml generado"
}

# Función principal
main() {
    header
    
    log "🚀 Iniciando optimización Docker..."
    
    # Reportar inicio a Kiro
    if [ -f "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" ]; then
        node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" \
            "update-progress" warp "W.3" "Ejecutando optimización Docker"
    fi
    
    # Ejecutar optimizaciones
    cleanup_docker_resources
    optimize_docker_images
    configure_resource_limits
    optimize_network_configuration
    configure_optimized_logging
    generate_optimized_compose
    
    # Generar resumen
    echo -e "\n${GREEN}════════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}✅ OPTIMIZACIÓN DOCKER COMPLETADA${NC}"
    echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
    echo -e "\n📁 Archivos generados:"
    echo -e "  - docker/production/resource-limits.yml"
    echo -e "  - docker/production/logging.conf"
    echo -e "  - docker/production/docker-compose.prod.yml"
    echo -e "\n🎯 Próximos pasos:"
    echo -e "  1. Revisar configuraciones generadas"
    echo -e "  2. Aplicar límites de recursos en desarrollo"
    echo -e "  3. Probar configuración de producción"
    echo -e "  4. Monitorear uso de recursos"
    
    success "Optimización Docker completada exitosamente"
}

# Ejecutar función principal
main "$@"
