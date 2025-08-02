#!/bin/bash

# Script de inicio para el sistema de monitoreo del proyecto de autenticación
# Este script inicia el monitor en segundo plano y proporciona comandos útiles

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MONITOR_PID_FILE="$PROJECT_DIR/monitor.pid"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar ayuda
show_help() {
    echo -e "${BLUE}🚀 Sistema de Monitoreo - Proyecto de Autenticación${NC}"
    echo ""
    echo "Uso: ./start-monitoring.sh [comando]"
    echo ""
    echo "COMANDOS DISPONIBLES:"
    echo ""
    echo -e "${GREEN}start${NC}     - Inicia el monitor en segundo plano"
    echo -e "${GREEN}stop${NC}      - Detiene el monitor"
    echo -e "${GREEN}status${NC}    - Muestra el estado del monitor y del proyecto"
    echo -e "${GREEN}restart${NC}   - Reinicia el monitor"
    echo -e "${GREEN}logs${NC}      - Muestra los logs del monitor"
    echo -e "${GREEN}update${NC}    - Abre el script de actualización de estado"
    echo -e "${GREEN}help${NC}      - Muestra esta ayuda"
    echo ""
    echo "EJEMPLOS DE USO:"
    echo ""
    echo "# Iniciar monitoreo"
    echo "./start-monitoring.sh start"
    echo ""
    echo "# Ver estado actual"
    echo "./start-monitoring.sh status"
    echo ""
    echo "# Actualizar estado de tarea"
    echo "node update-status.js start-task claude \"1.2\" \"Iniciando configuración\""
    echo ""
}

# Función para verificar si Node.js está instalado
check_node() {
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js no está instalado. Por favor instala Node.js para continuar.${NC}"
        exit 1
    fi
}

# Función para iniciar el monitor
start_monitor() {
    check_node
    
    if [ -f "$MONITOR_PID_FILE" ]; then
        PID=$(cat "$MONITOR_PID_FILE")
        if ps -p $PID > /dev/null 2>&1; then
            echo -e "${YELLOW}⚠️  El monitor ya está ejecutándose (PID: $PID)${NC}"
            return
        else
            rm "$MONITOR_PID_FILE"
        fi
    fi
    
    echo -e "${BLUE}🚀 Iniciando monitor del proyecto...${NC}"
    
    # Hacer ejecutables los scripts
    chmod +x "$PROJECT_DIR/monitor.js"
    chmod +x "$PROJECT_DIR/update-status.js"
    
    # Iniciar monitor en segundo plano
    nohup node "$PROJECT_DIR/monitor.js" > "$PROJECT_DIR/monitor.log" 2>&1 &
    MONITOR_PID=$!
    
    echo $MONITOR_PID > "$MONITOR_PID_FILE"
    
    sleep 2
    
    if ps -p $MONITOR_PID > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Monitor iniciado correctamente (PID: $MONITOR_PID)${NC}"
        echo -e "${BLUE}📋 Para ver el estado: ./start-monitoring.sh status${NC}"
        echo -e "${BLUE}📝 Para actualizar tareas: node update-status.js help${NC}"
        echo -e "${BLUE}📊 Para ver logs: ./start-monitoring.sh logs${NC}"
    else
        echo -e "${RED}❌ Error al iniciar el monitor${NC}"
        rm -f "$MONITOR_PID_FILE"
    fi
}

# Función para detener el monitor
stop_monitor() {
    if [ -f "$MONITOR_PID_FILE" ]; then
        PID=$(cat "$MONITOR_PID_FILE")
        if ps -p $PID > /dev/null 2>&1; then
            echo -e "${YELLOW}🛑 Deteniendo monitor (PID: $PID)...${NC}"
            kill $PID
            sleep 2
            if ps -p $PID > /dev/null 2>&1; then
                echo -e "${RED}⚠️  Forzando detención del monitor...${NC}"
                kill -9 $PID
            fi
            rm "$MONITOR_PID_FILE"
            echo -e "${GREEN}✅ Monitor detenido${NC}"
        else
            echo -e "${YELLOW}⚠️  El monitor no está ejecutándose${NC}"
            rm "$MONITOR_PID_FILE"
        fi
    else
        echo -e "${YELLOW}⚠️  No se encontró proceso del monitor${NC}"
    fi
}

# Función para mostrar estado
show_status() {
    echo -e "${BLUE}📊 ESTADO DEL SISTEMA DE MONITOREO${NC}"
    echo "═══════════════════════════════════════"
    
    # Estado del monitor
    if [ -f "$MONITOR_PID_FILE" ]; then
        PID=$(cat "$MONITOR_PID_FILE")
        if ps -p $PID > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Monitor: Ejecutándose (PID: $PID)${NC}"
        else
            echo -e "${RED}❌ Monitor: No ejecutándose (archivo PID obsoleto)${NC}"
            rm "$MONITOR_PID_FILE"
        fi
    else
        echo -e "${RED}❌ Monitor: No ejecutándose${NC}"
    fi
    
    echo ""
    
    # Estado del proyecto
    if [ -f "$PROJECT_DIR/status.json" ]; then
        echo -e "${BLUE}📋 ESTADO DEL PROYECTO:${NC}"
        node "$PROJECT_DIR/update-status.js" show-status
    else
        echo -e "${RED}❌ Archivo de estado no encontrado${NC}"
    fi
}

# Función para mostrar logs
show_logs() {
    if [ -f "$PROJECT_DIR/monitor.log" ]; then
        echo -e "${BLUE}📊 LOGS DEL MONITOR (últimas 20 líneas):${NC}"
        echo "═══════════════════════════════════════════════"
        tail -20 "$PROJECT_DIR/monitor.log"
        echo ""
        echo -e "${YELLOW}💡 Para ver logs en tiempo real: tail -f $PROJECT_DIR/monitor.log${NC}"
    else
        echo -e "${YELLOW}⚠️  No se encontraron logs del monitor${NC}"
    fi
}

# Función para reiniciar el monitor
restart_monitor() {
    echo -e "${BLUE}🔄 Reiniciando monitor...${NC}"
    stop_monitor
    sleep 1
    start_monitor
}

# Función para abrir actualización de estado
open_update() {
    echo -e "${BLUE}📝 Abriendo script de actualización de estado...${NC}"
    echo ""
    node "$PROJECT_DIR/update-status.js" help
}

# Función principal
main() {
    case "${1:-help}" in
        "start")
            start_monitor
            ;;
        "stop")
            stop_monitor
            ;;
        "status")
            show_status
            ;;
        "restart")
            restart_monitor
            ;;
        "logs")
            show_logs
            ;;
        "update")
            open_update
            ;;
        "help"|"--help"|"-h"|"")
            show_help
            ;;
        *)
            echo -e "${RED}❌ Comando desconocido: $1${NC}"
            echo -e "${YELLOW}💡 Usa './start-monitoring.sh help' para ver comandos disponibles${NC}"
            exit 1
            ;;
    esac
}

# Ejecutar función principal
main "$@"