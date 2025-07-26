#!/bin/bash

# Sistema de Análisis de Performance - Grupo Naser CMS
# Analiza performance completa del sistema y genera recomendaciones

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
REPORT_DIR="$PROJECT_ROOT/reports/performance/$TIMESTAMP"

log() {
    echo -e "${BLUE}[PERFORMANCE] $1${NC}"
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
║                    🚀 ANÁLISIS DE PERFORMANCE - NASER CMS                    ║
║                           Optimizado por Warp                               ║
╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
}

# Función para reportar a Kiro
report_to_kiro() {
    local status="$1"
    local message="$2"
    if [ -f "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" ]; then
        node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" "$status" warp "W.3" "$message"
    fi
}

# Análisis de recursos del sistema
analyze_system_resources() {
    log "🔍 Analizando recursos del sistema..."

    local cpu_usage=$(top -l 1 | grep "CPU usage" | awk '{print $3}' | sed 's/%//')
    local memory_info=$(vm_stat | grep "Pages free\|Pages active\|Pages inactive\|Pages wired")
    local disk_usage=$(df "$PROJECT_ROOT" | tail -1 | awk '{print $5}' | sed 's/%//')

    # Calcular uso de memoria en macOS
    local pages_free=$(echo "$memory_info" | grep "Pages free" | awk '{print $3}' | sed 's/\.//')
    local pages_active=$(echo "$memory_info" | grep "Pages active" | awk '{print $3}' | sed 's/\.//')
    local pages_inactive=$(echo "$memory_info" | grep "Pages inactive" | awk '{print $3}' | sed 's/\.//')
    local pages_wired=$(echo "$memory_info" | grep "Pages wired" | awk '{print $4}' | sed 's/\.//')
    
    local total_pages=$((pages_free + pages_active + pages_inactive + pages_wired))
    local used_pages=$((pages_active + pages_wired))
    local memory_usage=0
    if [ $total_pages -gt 0 ]; then
        memory_usage=$((used_pages * 100 / total_pages))
    fi

    # Análisis de procesos
    local node_processes=$(pgrep -c node || echo "0")
    local docker_processes=$(pgrep -c Docker || echo "0")

    cat > "$REPORT_DIR/system-resources.json" << EOF
{
    "timestamp": "$(date -Iseconds)",
    "system": {
        "cpu_usage": "$cpu_usage",
        "memory_usage": "$memory_usage",
        "disk_usage": "$disk_usage"
    },
    "processes": {
        "node": $node_processes,
        "docker": $docker_processes
    },
    "recommendations": []
}
EOF

    # Generar recomendaciones
    if [ "$memory_usage" -gt 80 ]; then
        warning "Alto uso de memoria: ${memory_usage}%"
        echo "    \"Optimizar uso de memoria - considerar aumentar límites o optimizar código\"" >> "$REPORT_DIR/recommendations.tmp"
    fi

    if [ "$disk_usage" -gt 85 ]; then
        warning "Poco espacio en disco: ${disk_usage}%"
        echo "    \"Limpiar archivos temporales y logs antiguos\"" >> "$REPORT_DIR/recommendations.tmp"
    fi

    success "Análisis de recursos completado"
}

# Análisis de performance de Docker
analyze_docker_performance() {
    log "🐳 Analizando performance de Docker..."

    if ! command -v docker &> /dev/null; then
        warning "Docker no está disponible"
        return 1
    fi

    # Estadísticas de contenedores
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}\t{{.NetIO}}\t{{.BlockIO}}" > "$REPORT_DIR/docker-stats.txt"

    # Análisis de imágenes
    docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}" > "$REPORT_DIR/docker-images.txt"

    # Análisis de volúmenes
    docker system df > "$REPORT_DIR/docker-disk-usage.txt"

    # Recomendaciones de optimización
    local large_images=$(docker images --format "{{.Size}}" | grep -E "[0-9]+GB" | wc -l)
    if [ "$large_images" -gt 0 ]; then
        warning "$large_images imágenes Docker grandes detectadas"
        echo "    \"Optimizar imágenes Docker - usar multi-stage builds y alpine base\"" >> "$REPORT_DIR/recommendations.tmp"
    fi

    success "Análisis de Docker completado"
}

# Análisis de performance de base de datos
analyze_database_performance() {
    log "🗄️ Analizando performance de base de datos..."

    # Verificar si MySQL está disponible
    if ! docker ps | grep -q "naser_db"; then
        warning "MySQL no está disponible para análisis"
        return 1
    fi

    # Análisis de consultas lentas (si está disponible)
    local db_container="naser_db"
    if [ -n "$db_container" ]; then
        # Obtener estadísticas básicas
        docker exec "$db_container" mysql -uroot -pnaser_root_2024 -e "SHOW GLOBAL STATUS LIKE 'Slow_queries';" > "$REPORT_DIR/mysql-slow-queries.txt" 2>/dev/null || true
        docker exec "$db_container" mysql -uroot -pnaser_root_2024 -e "SHOW GLOBAL STATUS LIKE 'Questions';" > "$REPORT_DIR/mysql-questions.txt" 2>/dev/null || true
        docker exec "$db_container" mysql -uroot -pnaser_root_2024 -e "SHOW GLOBAL STATUS LIKE 'Uptime';" > "$REPORT_DIR/mysql-uptime.txt" 2>/dev/null || true
    fi

    success "Análisis de base de datos completado"
}

# Análisis de performance web
analyze_web_performance() {
    log "🌐 Analizando performance web..."

    # Verificar endpoints y medir tiempo de respuesta
    local endpoints=(
        "http://localhost:8000/api/v1/health:Backend API"
        "http://localhost:3000:Frontend App"
    )

    for endpoint_info in "${endpoints[@]}"; do
        local endpoint="${endpoint_info%%:*}"
        local name="${endpoint_info##*:}"

        log "Midiendo tiempo de respuesta: $name"

        # Medir tiempo de respuesta
        local response_time=$(curl -o /dev/null -s -w "%{time_total}" "$endpoint" 2>/dev/null || echo "timeout")

        if [ "$response_time" != "timeout" ]; then
            echo "$name: ${response_time}s" >> "$REPORT_DIR/response-times.txt"

            # Verificar si es lento
            if (( $(echo "$response_time > 2.0" | bc -l) )); then
                warning "$name responde lento: ${response_time}s"
                echo "    \"Optimizar $name - tiempo de respuesta > 2s\"" >> "$REPORT_DIR/recommendations.tmp"
            fi
        else
            warning "$name no responde"
            echo "$name: No disponible" >> "$REPORT_DIR/response-times.txt"
        fi
    done

    success "Análisis de performance web completado"
}

# Generar reporte consolidado
generate_performance_report() {
    log "📊 Generando reporte consolidado..."

    # Consolidar recomendaciones
    local recommendations=""
    if [ -f "$REPORT_DIR/recommendations.tmp" ]; then
        recommendations=$(cat "$REPORT_DIR/recommendations.tmp" | sort | uniq)
    fi

    cat > "$REPORT_DIR/performance-report.md" << EOF
# 🚀 Reporte de Análisis de Performance

**Timestamp**: $(date)
**Proyecto**: Grupo Naser CMS
**Analizado por**: Warp (DevOps)

## 📊 Resumen Ejecutivo

### Recursos del Sistema
$([ -f "$REPORT_DIR/system-resources.json" ] && echo "- CPU, Memoria y Disco analizados" || echo "- Análisis de recursos no disponible")

### Performance Docker
$([ -f "$REPORT_DIR/docker-stats.txt" ] && echo "- Contenedores analizados" || echo "- Docker no disponible")

### Performance Base de Datos
$([ -f "$REPORT_DIR/mysql-uptime.txt" ] && echo "- MySQL analizado" || echo "- Base de datos no disponible")

### Performance Web
$([ -f "$REPORT_DIR/response-times.txt" ] && echo "- Tiempos de respuesta medidos" || echo "- Endpoints no disponibles")

## 🎯 Recomendaciones de Optimización

$recommendations

## 📁 Archivos Generados

- \`system-resources.json\` - Métricas del sistema
- \`docker-stats.txt\` - Estadísticas de contenedores
- \`response-times.txt\` - Tiempos de respuesta web
- \`mysql-*.txt\` - Métricas de base de datos

## 🚀 Próximos Pasos

1. **Implementar optimizaciones** basadas en recomendaciones
2. **Configurar monitoreo continuo** de métricas
3. **Optimizar configuraciones** de producción
4. **Establecer alertas** para métricas críticas

---
*Generado automáticamente por Warp - Sistema de Análisis de Performance*
EOF

    success "Reporte consolidado generado: $REPORT_DIR/performance-report.md"
}

# Función principal
main() {
    header

    log "🚀 Iniciando análisis completo de performance..."

    # Crear directorio de reportes
    mkdir -p "$REPORT_DIR"

    # Reportar inicio
    report_to_kiro "start-task" "Iniciando análisis completo de performance del sistema"

    # Ejecutar análisis
    analyze_system_resources
    analyze_docker_performance
    analyze_database_performance
    analyze_web_performance

    # Generar reporte final
    generate_performance_report

    # Reportar completitud
    report_to_kiro "update-progress" "Análisis de performance completado - reporte disponible en reports/performance/$TIMESTAMP"

    success "🎉 Análisis de performance completado exitosamente"
    log "📄 Reporte disponible en: $REPORT_DIR/performance-report.md"

    exit 0
}

# Ejecutar función principal
main "$@"
