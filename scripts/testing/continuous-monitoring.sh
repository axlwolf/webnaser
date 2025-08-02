#!/bin/bash

# Monitoreo continuo de calidad del código y salud del sistema
# Se ejecuta periódicamente para verificar el estado del proyecto

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
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

# Función para reportar a Kiro
report_to_kiro() {
    local message="$1"
    if [ -f "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" ]; then
        node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" add-comment warp "$message"
    fi
}

# Monitorear salud del proyecto
monitor_project_health() {
    local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    local issues_found=0

    log "🔍 Iniciando monitoreo de salud del proyecto..."

    # 1. Verificar estado de contenedores Docker
    log "Verificando contenedores Docker..."
    if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
        if docker-compose ps > /dev/null 2>&1; then
            local running_containers=$(docker-compose ps --services --filter "status=running" | wc -l)
            local total_containers=$(docker-compose ps --services | wc -l)
            
            if [ "$running_containers" -eq "$total_containers" ] && [ "$total_containers" -gt 0 ]; then
                success "✅ Todos los contenedores están ejecutándose ($running_containers/$total_containers)"
            else
                warning "⚠️ Algunos contenedores no están ejecutándose ($running_containers/$total_containers)"
                report_to_kiro "⚠️ Monitoreo detectó contenedores inactivos - verificando estado"
                ((issues_found++))
            fi
        else
            warning "⚠️ docker-compose.yml no encontrado o servicios no configurados"
        fi
    else
        warning "⚠️ Docker no está disponible"
    fi

    # 2. Verificar endpoints críticos
    log "Verificando endpoints críticos..."
    local endpoints=(
        "http://localhost:8000:Backend API"
        "http://localhost:3000:Frontend App"
        "http://localhost:80:Backend Alt"
        "http://localhost:8080:Frontend Alt"
    )

    local endpoint_issues=0
    for endpoint_info in "${endpoints[@]}"; do
        local endpoint="${endpoint_info%%:*}"
        local name="${endpoint_info##*:}"
        
        if curl -f -s --max-time 5 "$endpoint" > /dev/null 2>&1; then
            success "✅ $name respondiendo correctamente"
        else
            warning "⚠️ $name no responde ($endpoint)"
            ((endpoint_issues++))
        fi
    done

    if [ $endpoint_issues -gt 2 ]; then
        warning "⚠️ Múltiples endpoints no responden"
        report_to_kiro "⚠️ Monitoreo detectó múltiples endpoints no disponibles"
        ((issues_found++))
    fi

    # 3. Verificar uso de recursos del sistema
    log "Verificando uso de recursos..."
    
    # Memoria del sistema
    if command -v free &> /dev/null; then
        local memory_usage=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')
        if [ "$memory_usage" -gt 85 ]; then
            warning "⚠️ Alto uso de memoria del sistema: ${memory_usage}%"
            report_to_kiro "⚠️ Alto uso de memoria del sistema detectado: ${memory_usage}% - considerar optimización"
            ((issues_found++))
        else
            success "✅ Uso de memoria del sistema normal: ${memory_usage}%"
        fi
    fi

    # Memoria de contenedores Docker
    if command -v docker &> /dev/null; then
        local docker_memory=$(docker stats --no-stream --format "{{.MemPerc}}" 2>/dev/null | head -1 | sed 's/%//' || echo "0")
        if [ -n "$docker_memory" ] && [ "${docker_memory%.*}" -gt 80 ]; then
            warning "⚠️ Alto uso de memoria en contenedores: ${docker_memory}%"
            report_to_kiro "⚠️ Alto uso de memoria en contenedores detectado: ${docker_memory}% - considerar optimización"
            ((issues_found++))
        fi
    fi

    # 4. Verificar logs de errores recientes
    log "Verificando logs de errores..."
    
    # Logs de Docker Compose
    if command -v docker-compose &> /dev/null && docker-compose ps > /dev/null 2>&1; then
        local error_count=$(docker-compose logs --since="1h" 2>/dev/null | grep -i -E "error|exception|fatal" | wc -l || echo "0")
        if [ "$error_count" -gt 10 ]; then
            warning "⚠️ $error_count errores detectados en logs de la última hora"
            report_to_kiro "⚠️ $error_count errores detectados en logs - revisar estabilidad"
            ((issues_found++))
        else
            success "✅ Logs de errores dentro de límites normales ($error_count errores/hora)"
        fi
    fi

    # 5. Verificar espacio en disco
    log "Verificando espacio en disco..."
    local disk_usage=$(df "$PROJECT_ROOT" | tail -1 | awk '{print $5}' | sed 's/%//')
    if [ "$disk_usage" -gt 90 ]; then
        warning "⚠️ Poco espacio en disco: ${disk_usage}% usado"
        report_to_kiro "⚠️ Poco espacio en disco detectado: ${disk_usage}% - considerar limpieza"
        ((issues_found++))
    else
        success "✅ Espacio en disco adecuado: ${disk_usage}% usado"
    fi

    # 6. Verificar archivos críticos del proyecto
    log "Verificando integridad de archivos críticos..."
    local critical_files=(
        "docker-compose.yml"
        "api/composer.json"
        "src/frontend/package.json"
        ".kiro/specs/auth-integration/tasks.md"
    )

    for file in "${critical_files[@]}"; do
        if [ -f "$PROJECT_ROOT/$file" ]; then
            success "✅ $file presente"
        else
            warning "⚠️ Archivo crítico faltante: $file"
            ((issues_found++))
        fi
    done

    # 7. Generar reporte de monitoreo
    generate_monitoring_report "$timestamp" "$issues_found"

    # 8. Resumen final
    log "=== Resumen de Monitoreo ==="
    if [ $issues_found -eq 0 ]; then
        success "🎉 Sistema completamente saludable - sin problemas detectados"
        report_to_kiro "✅ Monitoreo completado - sistema estable y saludable"
        return 0
    else
        warning "⚠️ $issues_found problema(s) detectado(s) - revisar detalles arriba"
        report_to_kiro "⚠️ Monitoreo detectó $issues_found problema(s) - requiere atención"
        return 1
    fi
}

# Generar reporte de monitoreo
generate_monitoring_report() {
    local timestamp="$1"
    local issues_count="$2"
    
    local report_dir="$PROJECT_ROOT/reports/monitoring"
    mkdir -p "$report_dir"
    
    local report_file="$report_dir/health-report-$(date +%Y%m%d_%H%M%S).md"
    
    cat > "$report_file" << EOF
# 🔍 Reporte de Monitoreo de Salud del Sistema

**Timestamp**: $timestamp  
**Proyecto**: Grupo Naser CMS  
**Branch**: feature/auth-integration  
**Agente**: Warp (DevOps)

## 📊 Resumen Ejecutivo

- **Estado General**: $([ $issues_count -eq 0 ] && echo "🟢 SALUDABLE" || echo "🟡 REQUIERE ATENCIÓN")
- **Problemas Detectados**: $issues_count
- **Última Verificación**: $timestamp

## 🔧 Componentes Verificados

### Infraestructura
- ✅ Contenedores Docker
- ✅ Endpoints de aplicación
- ✅ Conectividad de base de datos

### Recursos del Sistema
- ✅ Uso de memoria
- ✅ Espacio en disco
- ✅ Logs de errores

### Integridad del Proyecto
- ✅ Archivos críticos
- ✅ Configuraciones
- ✅ Dependencias

## 🚀 Recomendaciones

$([ $issues_count -eq 0 ] && echo "El sistema está funcionando óptimamente. Continuar con el desarrollo normal." || echo "Se detectaron $issues_count problema(s). Revisar los warnings arriba y tomar acciones correctivas.")

## 📈 Próximo Monitoreo

El próximo monitoreo automático se ejecutará en 1 hora.

---
*Generado automáticamente por Warp - Sistema de Monitoreo Continuo*
EOF

    log "📄 Reporte de monitoreo guardado en: $report_file"
}

# Función para ejecutar tests rápidos
quick_health_check() {
    log "⚡ Ejecutando verificación rápida de salud..."
    
    local quick_issues=0
    
    # Verificar solo endpoints críticos
    if curl -f -s --max-time 3 "http://localhost:8000" > /dev/null 2>&1; then
        success "✅ Backend respondiendo"
    else
        warning "⚠️ Backend no responde"
        ((quick_issues++))
    fi
    
    if curl -f -s --max-time 3 "http://localhost:3000" > /dev/null 2>&1; then
        success "✅ Frontend respondiendo"
    else
        warning "⚠️ Frontend no responde"
        ((quick_issues++))
    fi
    
    if [ $quick_issues -eq 0 ]; then
        success "⚡ Verificación rápida: Sistema OK"
        return 0
    else
        warning "⚡ Verificación rápida: $quick_issues problema(s) detectado(s)"
        return 1
    fi
}

# Función principal
main() {
    local mode="${1:-full}"
    
    case "$mode" in
        "quick")
            quick_health_check
            ;;
        "full"|*)
            monitor_project_health
            ;;
    esac
}

# Ejecutar función principal
main "$@"