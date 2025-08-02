#!/bin/bash

# Performance Monitoring - Grupo Naser CMS
# Monitorea métricas de performance del sistema

set -e

echo "📊 Monitoreando métricas de performance..."

# Parse arguments
DURATION=60
OUTPUT_FORMAT="table"
CONTINUOUS=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --duration)
            DURATION="$2"
            shift 2
            ;;
        --format)
            OUTPUT_FORMAT="$2"
            shift 2
            ;;
        --continuous)
            CONTINUOUS=true
            shift
            ;;
        *)
            echo "Uso: $0 [--duration 60] [--format table|json] [--continuous]"
            exit 1
            ;;
    esac
done

# Verificar que Docker esté corriendo
if ! docker info >/dev/null 2>&1; then
    echo "❌ Error: Docker no está corriendo."
    exit 1
fi

# Crear directorio de reportes
REPORT_DIR="reports/performance/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$REPORT_DIR"

# Función para obtener métricas de Docker
get_docker_metrics() {
    echo "🐳 Métricas de contenedores Docker:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
}

# Función para obtener métricas de sistema
get_system_metrics() {
    echo "💻 Métricas del sistema:"
    echo "CPU Usage: $(top -l 1 | grep "CPU usage" | awk '{print $3}' | sed 's/%//')"
    echo "Memory Usage: $(vm_stat | grep "Pages active" | awk '{print $3}' | sed 's/\.//')"
    echo "Disk Usage: $(df -h / | tail -1 | awk '{print $5}')"
}

# Función para obtener métricas de aplicación
get_app_metrics() {
    echo "🌐 Métricas de aplicación:"
    
    # Backend response time
    if curl -f http://localhost:8000/api/v1/health >/dev/null 2>&1; then
        BACKEND_TIME=$(curl -o /dev/null -s -w "%{time_total}" http://localhost:8000/api/v1/health)
        echo "Backend Response Time: ${BACKEND_TIME}s"
    else
        echo "Backend Response Time: ERROR"
    fi
    
    # Frontend response time
    if curl -f http://localhost:3000 >/dev/null 2>&1; then
        FRONTEND_TIME=$(curl -o /dev/null -s -w "%{time_total}" http://localhost:3000)
        echo "Frontend Response Time: ${FRONTEND_TIME}s"
    else
        echo "Frontend Response Time: ERROR"
    fi
    
    # Admin Dashboard response time
    if curl -f http://localhost:3001 >/dev/null 2>&1; then
        ADMIN_TIME=$(curl -o /dev/null -s -w "%{time_total}" http://localhost:3001)
        echo "Admin Dashboard Response Time: ${ADMIN_TIME}s"
    else
        echo "Admin Dashboard Response Time: ERROR"
    fi
    
    # Database connection time
    DB_TIME=$(docker exec naser_db mysql -u naser_user -pnaser_pass_2024 -e "SELECT 1" naser_cms 2>/dev/null && echo "OK" || echo "ERROR")
    echo "Database Connection: $DB_TIME"
}

# Función para generar reporte JSON
generate_json_report() {
    local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    
    cat > "$REPORT_DIR/metrics.json" << EOF
{
  "timestamp": "$timestamp",
  "duration": $DURATION,
  "docker_stats": $(docker stats --no-stream --format json),
  "system": {
    "cpu_usage": "$(top -l 1 | grep "CPU usage" | awk '{print $3}' | sed 's/%//')",
    "memory_usage": "$(vm_stat | grep "Pages active" | awk '{print $3}' | sed 's/\.//')",
    "disk_usage": "$(df -h / | tail -1 | awk '{print $5}')"
  },
  "application": {
    "backend_response_time": "$(curl -o /dev/null -s -w "%{time_total}" http://localhost:8000/api/v1/health 2>/dev/null || echo "error")",
    "frontend_response_time": "$(curl -o /dev/null -s -w "%{time_total}" http://localhost:3000 2>/dev/null || echo "error")",
    "admin_response_time": "$(curl -o /dev/null -s -w "%{time_total}" http://localhost:3001 2>/dev/null || echo "error")",
    "database_status": "$(docker exec naser_db mysql -u naser_user -pnaser_pass_2024 -e "SELECT 1" naser_cms >/dev/null 2>&1 && echo "ok" || echo "error")"
  }
}
EOF
}

# Función principal de monitoreo
monitor_performance() {
    local start_time=$(date +%s)
    local end_time=$((start_time + DURATION))
    
    echo "⏱️  Monitoreando por $DURATION segundos..."
    echo "📁 Guardando reportes en: $REPORT_DIR"
    echo ""
    
    # Crear archivo de log
    LOG_FILE="$REPORT_DIR/performance.log"
    echo "Performance Monitoring Started: $(date)" > "$LOG_FILE"
    
    while [ $(date +%s) -lt $end_time ] || [ "$CONTINUOUS" = true ]; do
        clear
        echo "📊 Performance Monitor - Grupo Naser CMS"
        echo "⏰ $(date)"
        echo "📍 Tiempo restante: $((end_time - $(date +%s)))s"
        echo ""
        
        # Obtener métricas
        get_docker_metrics
        echo ""
        get_system_metrics
        echo ""
        get_app_metrics
        echo ""
        
        # Guardar en log
        {
            echo "=== $(date) ==="
            get_docker_metrics
            get_system_metrics
            get_app_metrics
            echo ""
        } >> "$LOG_FILE"
        
        # Generar reporte JSON si se solicita
        if [ "$OUTPUT_FORMAT" = "json" ]; then
            generate_json_report
        fi
        
        # Esperar antes de la siguiente iteración
        if [ "$CONTINUOUS" = false ]; then
            sleep 5
        else
            sleep 10
        fi
        
        # Salir del loop si no es continuo
        if [ "$CONTINUOUS" = false ] && [ $(date +%s) -ge $end_time ]; then
            break
        fi
    done
}

# Función para generar reporte final
generate_final_report() {
    cat > "$REPORT_DIR/performance-summary.md" << EOF
# Performance Monitoring Report

**Date**: $(date)
**Duration**: ${DURATION}s
**Format**: $OUTPUT_FORMAT
**Continuous**: $CONTINUOUS

## Summary

### Docker Containers
$(docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}")

### System Resources
- CPU Usage: $(top -l 1 | grep "CPU usage" | awk '{print $3}')
- Memory: $(vm_stat | grep "Pages active" | awk '{print $3}')
- Disk: $(df -h / | tail -1 | awk '{print $5}')

### Application Performance
- Backend Health: $(curl -f http://localhost:8000/api/v1/health >/dev/null 2>&1 && echo "✅ OK" || echo "❌ ERROR")
- Frontend Health: $(curl -f http://localhost:3000 >/dev/null 2>&1 && echo "✅ OK" || echo "❌ ERROR")
- Database Health: $(docker exec naser_db mysql -u naser_user -pnaser_pass_2024 -e "SELECT 1" naser_cms >/dev/null 2>&1 && echo "✅ OK" || echo "❌ ERROR")

## Files Generated
- Performance Log: performance.log
- JSON Metrics: metrics.json (if requested)
- Summary Report: performance-summary.md

## Recommendations
1. Monitor CPU usage - keep below 80%
2. Monitor memory usage - ensure sufficient free memory
3. Check response times - should be under 2 seconds
4. Monitor disk space - keep above 20% free

## Next Steps
1. Review performance.log for detailed metrics
2. Identify performance bottlenecks
3. Optimize resource usage if needed
4. Set up automated monitoring alerts
EOF
}

# Ejecutar monitoreo
monitor_performance

# Generar reporte final
echo "📊 Generando reporte final..."
generate_final_report

echo ""
echo "✅ Monitoreo completado!"
echo "📁 Reportes guardados en: $REPORT_DIR"
echo ""
echo "📋 Archivos generados:"
echo "   - performance.log (log detallado)"
echo "   - performance-summary.md (resumen)"
if [ "$OUTPUT_FORMAT" = "json" ]; then
    echo "   - metrics.json (métricas en JSON)"
fi
echo ""
echo "🔧 Comandos útiles:"
echo "   Ver log en tiempo real: tail -f $REPORT_DIR/performance.log"
echo "   Monitoreo continuo: $0 --continuous"
echo "   Formato JSON: $0 --format json"
echo ""