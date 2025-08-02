#!/bin/bash

# Script para tests de integración
# Verifica conectividad entre frontend, backend y base de datos

set -e

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

log() {
    echo -e "${BLUE}[INTEGRATION-TEST] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" >&2
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

# Función para verificar endpoint con timeout
check_endpoint() {
    local url=$1
    local name=$2
    local timeout=${3:-10}
    
    log "Verificando $name: $url"
    
    if curl -f -s --max-time "$timeout" "$url" > /dev/null 2>&1; then
        success "✅ $name respondiendo correctamente"
        return 0
    else
        error "❌ $name no responde"
        return 1
    fi
}

# Función para verificar base de datos
check_database() {
    log "Verificando conectividad de base de datos..."
    
    # Intentar conexión con Docker
    if docker ps | grep -q "mysql\|mariadb"; then
        local db_container=$(docker ps --format "table {{.Names}}" | grep -E "mysql|mariadb|database" | head -1)
        if [ -n "$db_container" ]; then
            if docker exec "$db_container" mysqladmin ping -h localhost > /dev/null 2>&1; then
                success "✅ Base de datos respondiendo (Docker)"
                return 0
            fi
        fi
    fi
    
    # Intentar conexión local
    if command -v mysql &> /dev/null; then
        if mysql -h localhost -u root -e "SELECT 1;" > /dev/null 2>&1; then
            success "✅ Base de datos respondiendo (Local)"
            return 0
        fi
    fi
    
    warning "⚠️ No se pudo verificar la base de datos"
    return 1
}

# Función para verificar Docker services
check_docker_services() {
    log "Verificando servicios Docker..."
    
    if ! command -v docker &> /dev/null; then
        warning "Docker no está instalado"
        return 1
    fi
    
    if ! docker-compose ps > /dev/null 2>&1; then
        warning "docker-compose.yml no encontrado o servicios no iniciados"
        return 1
    fi
    
    local running_services=$(docker-compose ps --services --filter "status=running" | wc -l)
    local total_services=$(docker-compose ps --services | wc -l)
    
    if [ "$running_services" -eq "$total_services" ] && [ "$total_services" -gt 0 ]; then
        success "✅ Todos los servicios Docker están ejecutándose ($running_services/$total_services)"
        return 0
    else
        warning "⚠️ Algunos servicios Docker no están ejecutándose ($running_services/$total_services)"
        return 1
    fi
}

# Función para test de API básico
test_api_endpoints() {
    log "Probando endpoints de API..."
    
    local api_base="http://localhost:8000"
    local endpoints=(
        "/api/v1/health:Health Check"
        "/api/v1/auth/login:Login Endpoint"
    )
    
    local failed=0
    
    for endpoint_info in "${endpoints[@]}"; do
        local endpoint="${endpoint_info%%:*}"
        local name="${endpoint_info##*:}"
        local full_url="$api_base$endpoint"
        
        if [[ "$endpoint" == "/api/v1/auth/login" ]]; then
            # Para login, verificar que el endpoint existe (puede devolver 400/405 pero no 404)
            local status_code=$(curl -s -o /dev/null -w "%{http_code}" "$full_url" 2>/dev/null || echo "000")
            if [[ "$status_code" != "404" && "$status_code" != "000" ]]; then
                success "✅ $name endpoint disponible (HTTP $status_code)"
            else
                error "❌ $name endpoint no disponible"
                ((failed++))
            fi
        else
            if check_endpoint "$full_url" "$name" 5; then
                :  # Success already logged
            else
                ((failed++))
            fi
        fi
    done
    
    return $failed
}

main() {
    log "🔗 Iniciando tests de integración..."
    
    local total_failures=0
    
    # 1. Verificar servicios Docker
    log "=== Verificando Infraestructura ==="
    if check_docker_services; then
        :  # Success
    else
        ((total_failures++))
    fi
    
    # 2. Verificar base de datos
    if check_database; then
        :  # Success
    else
        ((total_failures++))
    fi
    
    # 3. Verificar endpoints principales
    log "=== Verificando Endpoints ==="
    
    # Backend API
    local backend_endpoints=(
        "http://localhost:8000:Backend API"
        "http://localhost:80:Backend API (Alt)"
    )
    
    local backend_ok=false
    for endpoint_info in "${backend_endpoints[@]}"; do
        local endpoint="${endpoint_info%%:*}"
        local name="${endpoint_info##*:}"
        
        if check_endpoint "$endpoint" "$name" 5; then
            backend_ok=true
            break
        fi
    done
    
    if [ "$backend_ok" = false ]; then
        ((total_failures++))
    fi
    
    # Frontend
    local frontend_endpoints=(
        "http://localhost:3000:Frontend App"
        "http://localhost:8080:Frontend App (Alt)"
    )
    
    local frontend_ok=false
    for endpoint_info in "${frontend_endpoints[@]}"; do
        local endpoint="${endpoint_info%%:*}"
        local name="${endpoint_info##*:}"
        
        if check_endpoint "$endpoint" "$name" 5; then
            frontend_ok=true
            break
        fi
    done
    
    if [ "$frontend_ok" = false ]; then
        ((total_failures++))
    fi
    
    # 4. Test de endpoints de API específicos
    log "=== Probando API Endpoints ==="
    if test_api_endpoints; then
        :  # Success
    else
        ((total_failures++))
    fi
    
    # 5. Resumen final
    log "=== Resumen de Tests de Integración ==="
    
    if [ $total_failures -eq 0 ]; then
        success "🎉 Todos los tests de integración pasaron correctamente"
        success "✅ Sistema completamente integrado y funcional"
        exit 0
    else
        error "❌ $total_failures componente(s) fallaron en tests de integración"
        error "🔧 Revisar configuración de servicios y conectividad"
        exit 1
    fi
}

main "$@"