#!/bin/bash

# Sistema de Monitoreo de Métricas - Grupo Naser CMS
# Monitorea métricas del sistema en tiempo real

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
REFRESH_INTERVAL=5  # Segundos entre actualizaciones

# Función para limpiar pantalla manteniendo header
clear_screen() {
    clear
    echo -e "${PURPLE}
╔══════════════════════════════════════════════════════════════════════════════╗
║                    📊 MONITOREO EN TIEMPO REAL - NASER CMS                   ║
║                           Optimizado por Warp                               ║
╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
}

# Función para obtener métricas del sistema
get_system_metrics() {
    # CPU
    local cpu_usage=$(top -l 1 | grep "CPU usage" | awk '{print $3}' | sed 's/%//')
    
    # Memoria (macOS)
    local memory_info=$(vm_stat | grep "Pages free\|Pages active\|Pages inactive\|Pages wired")
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
    
    # Disco
    local disk_usage=$(df "$PROJECT_ROOT" | tail -1 | awk '{print $5}' | sed 's/%//')
    
    echo -e "\n${CYAN}═══ MÉTRICAS DEL SISTEMA ═══${NC}"
    echo -e "📊 CPU: $(format_metric $cpu_usage)%"
    echo -e "💾 Memoria: $(format_metric $memory_usage)%"
    echo -e "💿 Disco: $(format_metric $disk_usage)%"
}

# Función para obtener métricas de Docker
get_docker_metrics() {
    echo -e "\n${CYAN}═══ MÉTRICAS DOCKER ═══${NC}"
    
    if ! docker ps &>/dev/null; then
        echo -e "${RED}Docker no está disponible${NC}"
        return
    fi
    
    # Estadísticas de contenedores
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}" | head -6
}

# Función para obtener métricas web
get_web_metrics() {
    echo -e "\n${CYAN}═══ MÉTRICAS WEB ═══${NC}"
    
    # Backend API
    local backend_time=$(curl -o /dev/null -s -w "%{time_total}" "http://localhost:8000/api/v1/health" 2>/dev/null || echo "N/A")
    if [ "$backend_time" != "N/A" ]; then
        echo -e "🌐 Backend API: ${GREEN}${backend_time}s${NC}"
    else
        echo -e "🌐 Backend API: ${RED}No disponible${NC}"
    fi
    
    # Frontend
    local frontend_time=$(curl -o /dev/null -s -w "%{time_total}" "http://localhost:3000" 2>/dev/null || echo "N/A")
    if [ "$frontend_time" != "N/A" ]; then
        echo -e "🎨 Frontend: ${GREEN}${frontend_time}s${NC}"
    else
        echo -e "🎨 Frontend: ${RED}No disponible${NC}"
    fi
}

# Función para formatear métricas con colores
format_metric() {
    local value=$1
    if [ "$value" -gt 80 ]; then
        echo -e "${RED}$value${NC}"
    elif [ "$value" -gt 60 ]; then
        echo -e "${YELLOW}$value${NC}"
    else
        echo -e "${GREEN}$value${NC}"
    fi
}

# Función para mostrar alertas
check_alerts() {
    echo -e "\n${CYAN}═══ ALERTAS ═══${NC}"
    
    local has_alerts=false
    
    # Verificar contenedores unhealthy
    local unhealthy=$(docker ps --filter "health=unhealthy" --format "{{.Names}}" 2>/dev/null)
    if [ -n "$unhealthy" ]; then
        echo -e "${RED}⚠️  Contenedores unhealthy: $unhealthy${NC}"
        has_alerts=true
    fi
    
    # Verificar contenedores reiniciándose
    local restarting=$(docker ps --filter "status=restarting" --format "{{.Names}}" 2>/dev/null)
    if [ -n "$restarting" ]; then
        echo -e "${RED}⚠️  Contenedores reiniciándose: $restarting${NC}"
        has_alerts=true
    fi
    
    if [ "$has_alerts" = false ]; then
        echo -e "${GREEN}✅ Sin alertas activas${NC}"
    fi
}

# Función para mostrar timestamp
show_timestamp() {
    echo -e "\n${BLUE}🕐 Última actualización: $(date '+%Y-%m-%d %H:%M:%S')${NC}"
    echo -e "${BLUE}↻  Actualizando cada ${REFRESH_INTERVAL} segundos (Ctrl+C para salir)${NC}"
}

# Función principal de monitoreo
monitor_loop() {
    # Reportar inicio a Kiro
    if [ -f "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" ]; then
        node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" \
            "update-progress" warp "W.3" "Monitoreo de métricas en tiempo real iniciado"
    fi
    
    while true; do
        clear_screen
        get_system_metrics
        get_docker_metrics
        get_web_metrics
        check_alerts
        show_timestamp
        
        sleep $REFRESH_INTERVAL
    done
}

# Manejo de señales para salida limpia
trap 'echo -e "\n${GREEN}Monitoreo detenido${NC}"; exit 0' INT TERM

# Función principal
main() {
    # Verificar dependencias
    if ! command -v docker &>/dev/null; then
        error "Docker no está instalado"
        exit 1
    fi
    
    if ! command -v curl &>/dev/null; then
        error "curl no está instalado"
        exit 1
    fi
    
    # Iniciar monitoreo
    monitor_loop
}

# Ejecutar función principal
main "$@"
