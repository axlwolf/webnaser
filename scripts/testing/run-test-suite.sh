#!/bin/bash

# Script maestro para ejecutar toda la suite de testing
# Orquesta todos los tipos de tests y genera reportes consolidados

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

log() {
    echo -e "${BLUE}[TEST-SUITE] $1${NC}"
}

success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" >&2
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

header() {
    echo -e "${PURPLE}
╔══════════════════════════════════════════════════════════════════════════════╗
║                    🧪 GRUPO NASER CMS - TESTING SUITE                        ║
║                           Automatizado por Warp                             ║
╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
}

# Función para mostrar ayuda
show_help() {
    echo "Uso: $0 [OPCIONES]"
    echo ""
    echo "Opciones:"
    echo "  --backend-only     Ejecutar solo tests de backend"
    echo "  --frontend-only    Ejecutar solo tests de frontend"
    echo "  --integration-only Ejecutar solo tests de integración"
    echo "  --quick           Ejecutar verificación rápida"
    echo "  --docker          Usar contenedores Docker para testing"
    echo "  --ci              Modo CI/CD (sin interacción)"
    echo "  --help            Mostrar esta ayuda"
    echo ""
    echo "Ejemplos:"
    echo "  $0                    # Ejecutar suite completa"
    echo "  $0 --backend-only     # Solo tests de PHP"
    echo "  $0 --quick           # Verificación rápida"
    echo "  $0 --docker          # Usar Docker"
}

# Función para reportar a Kiro
report_to_kiro() {
    local status="$1"
    local message="$2"
    if [ -f "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" ]; then
        node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" "$status" warp "W.2" "$message"
    fi
}

# Función para ejecutar tests de backend
run_backend_tests() {
    log "🧪 Ejecutando tests de backend..."
    
    if [ "$USE_DOCKER" = "true" ]; then
        log "Usando Docker para tests de backend..."
        docker-compose -f docker/testing/docker-compose.test.yml up --build backend-test
        return $?
    else
        if [ -x "$PROJECT_ROOT/scripts/testing/test-backend.sh" ]; then
            "$PROJECT_ROOT/scripts/testing/test-backend.sh"
            return $?
        else
            error "Script de backend no encontrado o no ejecutable"
            return 1
        fi
    fi
}

# Función para ejecutar tests de frontend
run_frontend_tests() {
    log "🎨 Ejecutando tests de frontend..."
    
    if [ -x "$PROJECT_ROOT/scripts/testing/test-frontend.sh" ]; then
        "$PROJECT_ROOT/scripts/testing/test-frontend.sh"
        return $?
    else
        error "Script de frontend no encontrado o no ejecutable"
        return 1
    fi
}

# Función para ejecutar tests de integración
run_integration_tests() {
    log "🔗 Ejecutando tests de integración..."
    
    if [ "$USE_DOCKER" = "true" ]; then
        log "Usando Docker para tests de integración..."
        docker-compose -f docker/testing/docker-compose.test.yml up --build integration-test
        return $?
    else
        if [ -x "$PROJECT_ROOT/scripts/testing/test-integration.sh" ]; then
            "$PROJECT_ROOT/scripts/testing/test-integration.sh"
            return $?
        else
            error "Script de integración no encontrado o no ejecutable"
            return 1
        fi
    fi
}

# Función para verificación rápida
quick_check() {
    log "⚡ Ejecutando verificación rápida..."
    
    if [ -x "$PROJECT_ROOT/scripts/testing/continuous-monitoring.sh" ]; then
        "$PROJECT_ROOT/scripts/testing/continuous-monitoring.sh" quick
        return $?
    else
        warning "Script de monitoreo no encontrado, ejecutando verificación básica..."
        
        # Verificación básica de endpoints
        local issues=0
        
        if curl -f -s --max-time 5 "http://localhost:8000" > /dev/null 2>&1; then
            success "✅ Backend respondiendo"
        else
            warning "⚠️ Backend no responde"
            ((issues++))
        fi
        
        if curl -f -s --max-time 5 "http://localhost:3000" > /dev/null 2>&1; then
            success "✅ Frontend respondiendo"
        else
            warning "⚠️ Frontend no responde"
            ((issues++))
        fi
        
        return $issues
    fi
}

# Función para generar reporte final
generate_final_report() {
    local backend_result=$1
    local frontend_result=$2
    local integration_result=$3
    
    local report_file="$PROJECT_ROOT/reports/testing/final-report-$TIMESTAMP.md"
    mkdir -p "$(dirname "$report_file")"
    
    cat > "$report_file" << EOF
# 🧪 Reporte Final de Testing Suite

**Timestamp**: $(date)  
**Proyecto**: Grupo Naser CMS  
**Branch**: feature/auth-integration  
**Ejecutado por**: Warp (DevOps)

## 📊 Resumen de Resultados

| Componente | Estado | Resultado |
|------------|--------|-----------|
| Backend PHP | $([ $backend_result -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL") | $([ $backend_result -eq 0 ] && echo "Tests completados exitosamente" || echo "Errores detectados") |
| Frontend React | $([ $frontend_result -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL") | $([ $frontend_result -eq 0 ] && echo "Tests completados exitosamente" || echo "Errores detectados") |
| Integración | $([ $integration_result -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL") | $([ $integration_result -eq 0 ] && echo "Sistema integrado correctamente" || echo "Problemas de integración") |

## 🎯 Estado General

$([ $((backend_result + frontend_result + integration_result)) -eq 0 ] && echo "🎉 **ÉXITO TOTAL**: Todos los tests pasaron correctamente. El sistema está listo para producción." || echo "⚠️ **REQUIERE ATENCIÓN**: Se detectaron fallos que necesitan corrección antes de continuar.")

## 📁 Archivos Generados

- Reportes de cobertura en \`reports/testing/$TIMESTAMP/\`
- Logs detallados disponibles
- Configuración CI/CD lista en \`.github/workflows/\`

## 🚀 Próximos Pasos

1. **Si todos los tests pasaron**: Continuar con desarrollo o deployment
2. **Si hay fallos**: Revisar logs específicos y corregir problemas
3. **Monitoreo continuo**: Sistema automático activado

---
*Generado automáticamente por Warp - Sistema de Testing Automatizado*
EOF

    log "📄 Reporte final generado: $report_file"
}

# Función principal
main() {
    local backend_only=false
    local frontend_only=false
    local integration_only=false
    local quick_mode=false
    local ci_mode=false
    
    # Parsear argumentos
    while [[ $# -gt 0 ]]; do
        case $1 in
            --backend-only)
                backend_only=true
                shift
                ;;
            --frontend-only)
                frontend_only=true
                shift
                ;;
            --integration-only)
                integration_only=true
                shift
                ;;
            --quick)
                quick_mode=true
                shift
                ;;
            --docker)
                USE_DOCKER=true
                shift
                ;;
            --ci)
                ci_mode=true
                shift
                ;;
            --help)
                show_help
                exit 0
                ;;
            *)
                error "Opción desconocida: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # Mostrar header
    if [ "$ci_mode" != "true" ]; then
        header
    fi
    
    log "🚀 Iniciando Testing Suite - $(date)"
    
    # Reportar inicio
    report_to_kiro "update-progress" "Iniciando ejecución de testing suite completa"
    
    # Variables para resultados
    local backend_result=0
    local frontend_result=0
    local integration_result=0
    
    # Modo rápido
    if [ "$quick_mode" = "true" ]; then
        if quick_check; then
            success "⚡ Verificación rápida completada exitosamente"
            report_to_kiro "add-comment" "✅ Verificación rápida completada - sistema estable"
            exit 0
        else
            error "⚡ Verificación rápida detectó problemas"
            report_to_kiro "add-comment" "⚠️ Verificación rápida detectó problemas - revisar sistema"
            exit 1
        fi
    fi
    
    # Ejecutar tests según opciones
    if [ "$backend_only" = "true" ]; then
        run_backend_tests || backend_result=$?
    elif [ "$frontend_only" = "true" ]; then
        run_frontend_tests || frontend_result=$?
    elif [ "$integration_only" = "true" ]; then
        run_integration_tests || integration_result=$?
    else
        # Suite completa
        log "📋 Ejecutando suite completa de testing..."
        
        # Backend
        if run_backend_tests; then
            success "✅ Tests de backend completados"
        else
            backend_result=$?
            error "❌ Tests de backend fallaron"
        fi
        
        # Frontend
        if run_frontend_tests; then
            success "✅ Tests de frontend completados"
        else
            frontend_result=$?
            error "❌ Tests de frontend fallaron"
        fi
        
        # Integración
        if run_integration_tests; then
            success "✅ Tests de integración completados"
        else
            integration_result=$?
            error "❌ Tests de integración fallaron"
        fi
    fi
    
    # Generar reporte final
    generate_final_report $backend_result $frontend_result $integration_result
    
    # Resultado final
    local total_failures=$((backend_result + frontend_result + integration_result))
    
    if [ $total_failures -eq 0 ]; then
        success "🎉 Testing Suite completada exitosamente - todos los tests pasaron"
        report_to_kiro "add-comment" "🎉 Testing Suite completada exitosamente - sistema completamente funcional"
        exit 0
    else
        error "❌ Testing Suite completada con $total_failures fallo(s)"
        report_to_kiro "add-comment" "⚠️ Testing Suite completada con $total_failures fallo(s) - requiere atención"
        exit 1
    fi
}

# Ejecutar función principal
main "$@"