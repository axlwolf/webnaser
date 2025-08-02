#!/bin/bash

# 🔍 PRE-COMMIT VERIFICATION - GRUPO NASER CMS
# Script para ejecutar verificación completa antes del commit final

set -e  # Salir en caso de error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuración
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
REPORT_DIR="$PROJECT_ROOT/reports/pre-commit/$TIMESTAMP"
MODE="full"

# Función para logging
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" >&2
}

success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

info() {
    echo -e "${CYAN}[INFO] $1${NC}"
}

# Función para mostrar ayuda
show_help() {
    echo "🔍 PRE-COMMIT VERIFICATION - Grupo Naser CMS"
    echo ""
    echo "Uso: $0 [opciones]"
    echo ""
    echo "Opciones:"
    echo "  --quick, -q     Verificación rápida (solo tests)"
    echo "  --full, -f      Verificación completa (tests + builds + verificación funcional)"
    echo "  --help, -h      Mostrar esta ayuda"
    echo ""
    echo "Ejemplos:"
    echo "  $0              # Verificación completa por defecto"
    echo "  $0 --quick      # Solo tests rápidos"
    echo "  $0 --full       # Verificación completa con builds"
    echo ""
}

# Procesar argumentos
while [[ $# -gt 0 ]]; do
    case $1 in
        --quick|-q)
            MODE="quick"
            shift
            ;;
        --full|-f)
            MODE="full"
            shift
            ;;
        --help|-h)
            show_help
            exit 0
            ;;
        *)
            warning "Opción desconocida: $1"
            show_help
            exit 1
            ;;
    esac
done

# Banner de inicio
print_banner() {
    echo ""
    echo -e "${CYAN}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║                                                              ║${NC}"
    echo -e "${CYAN}║           🔍 PRE-COMMIT VERIFICATION                         ║${NC}"
    echo -e "${CYAN}║              Grupo Naser CMS                                 ║${NC}"
    echo -e "${CYAN}║                                                              ║${NC}"
    echo -e "${CYAN}║  Modo: $(printf "%-10s" "$MODE")                                        ║${NC}"
    echo -e "${CYAN}║  Timestamp: $(date +'%Y-%m-%d %H:%M:%S')                           ║${NC}"
    echo -e "${CYAN}║                                                              ║${NC}"
    echo -e "${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Función principal
main() {
    print_banner
    
    # Crear directorio de reportes
    mkdir -p "$REPORT_DIR"
    
    log "🚀 Iniciando verificación pre-commit en modo: $MODE"
    
    # Variables para tracking de resultados
    local tests_result=0
    local builds_result=0
    local functional_result=0
    local lint_result=0
    
    # FASE 1: TESTING COMPLETO
    log "📋 FASE 1: TESTING COMPLETO"
    echo "----------------------------------------"
    
    if run_all_tests; then
        success "✅ Todos los tests pasaron"
    else
        error "❌ Algunos tests fallaron"
        tests_result=1
    fi
    
    # FASE 2: LINTING Y CODE QUALITY
    log "📋 FASE 2: LINTING Y CODE QUALITY"
    echo "----------------------------------------"
    
    if run_linting; then
        success "✅ Linting completado sin errores"
    else
        error "❌ Problemas de linting detectados"
        lint_result=1
    fi
    
    # FASE 3: BUILDS (solo en modo full)
    if [ "$MODE" = "full" ]; then
        log "📋 FASE 3: BUILDS"
        echo "----------------------------------------"
        
        if run_builds; then
            success "✅ Todos los builds completados"
        else
            error "❌ Algunos builds fallaron"
            builds_result=1
        fi
        
        # FASE 4: VERIFICACIÓN FUNCIONAL
        log "📋 FASE 4: VERIFICACIÓN FUNCIONAL"
        echo "----------------------------------------"
        
        if run_functional_verification; then
            success "✅ Verificación funcional completada"
        else
            error "❌ Problemas en verificación funcional"
            functional_result=1
        fi
    fi
    
    # FASE FINAL: RESUMEN Y COMMIT
    log "📋 FASE FINAL: RESUMEN Y PREPARACIÓN PARA COMMIT"
    echo "----------------------------------------"
    
    generate_summary_report $tests_result $lint_result $builds_result $functional_result
    
    # Calcular resultado final
    local total_errors=$((tests_result + lint_result + builds_result + functional_result))
    
    if [ $total_errors -eq 0 ]; then
        success "🎉 VERIFICACIÓN COMPLETADA EXITOSAMENTE"
        success "✅ El proyecto está listo para commit"
        show_commit_instructions
        exit 0
    else
        error "❌ VERIFICACIÓN FALLÓ - $total_errors problema(s) detectado(s)"
        error "🚫 NO PROCEDER CON EL COMMIT hasta resolver los problemas"
        show_error_instructions
        exit 1
    fi
}

# Ejecutar todos los tests
run_all_tests() {
    log "🧪 Ejecutando suite completa de tests..."
    
    # Backend tests
    info "Ejecutando tests de backend (PHP)..."
    if ! run_backend_tests; then
        return 1
    fi
    
    # Frontend tests
    info "Ejecutando tests de frontend (React)..."
    if ! run_frontend_tests; then
        return 1
    fi
    
    # Admin tests (si existe)
    if [ -d "$PROJECT_ROOT/src/admin" ]; then
        info "Ejecutando tests de admin dashboard..."
        if ! run_admin_tests; then
            return 1
        fi
    fi
    
    return 0
}

# Tests de backend
run_backend_tests() {
    cd "$PROJECT_ROOT/api"
    
    if [ -f "vendor/bin/phpunit" ]; then
        if ./vendor/bin/phpunit --configuration phpunit.xml > "$REPORT_DIR/backend-tests.log" 2>&1; then
            success "Backend tests: PASS"
            cd "$PROJECT_ROOT"
            return 0
        else
            error "Backend tests: FAIL"
            cat "$REPORT_DIR/backend-tests.log"
            cd "$PROJECT_ROOT"
            return 1
        fi
    else
        warning "PHPUnit no encontrado, instalando dependencias..."
        composer install
        return $?
    fi
}

# Tests de frontend
run_frontend_tests() {
    cd "$PROJECT_ROOT/src/frontend"
    
    if [ -f "package.json" ]; then
        if npm test -- --watchAll=false --coverage=false > "$REPORT_DIR/frontend-tests.log" 2>&1; then
            success "Frontend tests: PASS"
            cd "$PROJECT_ROOT"
            return 0
        else
            error "Frontend tests: FAIL"
            cat "$REPORT_DIR/frontend-tests.log"
            cd "$PROJECT_ROOT"
            return 1
        fi
    else
        warning "Frontend package.json no encontrado"
        cd "$PROJECT_ROOT"
        return 1
    fi
}

# Tests de admin dashboard
run_admin_tests() {
    cd "$PROJECT_ROOT/src/admin"
    
    if [ -f "package.json" ]; then
        if npm test -- --watchAll=false --coverage=false > "$REPORT_DIR/admin-tests.log" 2>&1; then
            success "Admin tests: PASS"
            cd "$PROJECT_ROOT"
            return 0
        else
            error "Admin tests: FAIL"
            cat "$REPORT_DIR/admin-tests.log"
            cd "$PROJECT_ROOT"
            return 1
        fi
    else
        info "Admin dashboard no configurado aún"
        cd "$PROJECT_ROOT"
        return 0
    fi
}

# Ejecutar linting
run_linting() {
    log "🔍 Ejecutando linting y code quality..."
    
    local lint_errors=0
    
    # Frontend linting
    info "Linting frontend..."
    cd "$PROJECT_ROOT/src/frontend"
    if [ -f "package.json" ]; then
        if npm run lint > "$REPORT_DIR/frontend-lint.log" 2>&1; then
            success "Frontend lint: PASS"
        else
            error "Frontend lint: FAIL"
            cat "$REPORT_DIR/frontend-lint.log"
            lint_errors=$((lint_errors + 1))
        fi
    fi
    cd "$PROJECT_ROOT"
    
    # Backend linting
    info "Linting backend..."
    cd "$PROJECT_ROOT/api"
    if [ -f "composer.json" ]; then
        if composer cs > "$REPORT_DIR/backend-lint.log" 2>&1; then
            success "Backend lint: PASS"
        else
            error "Backend lint: FAIL"
            cat "$REPORT_DIR/backend-lint.log"
            lint_errors=$((lint_errors + 1))
        fi
    fi
    cd "$PROJECT_ROOT"
    
    # Admin linting (si existe)
    if [ -d "$PROJECT_ROOT/src/admin" ]; then
        info "Linting admin dashboard..."
        cd "$PROJECT_ROOT/src/admin"
        if [ -f "package.json" ]; then
            if npm run lint > "$REPORT_DIR/admin-lint.log" 2>&1; then
                success "Admin lint: PASS"
            else
                error "Admin lint: FAIL"
                cat "$REPORT_DIR/admin-lint.log"
                lint_errors=$((lint_errors + 1))
            fi
        fi
        cd "$PROJECT_ROOT"
    fi
    
    return $lint_errors
}

# Ejecutar builds
run_builds() {
    log "🏗️ Ejecutando builds de todas las aplicaciones..."
    
    local build_errors=0
    
    # Frontend build
    info "Building frontend..."
    cd "$PROJECT_ROOT/src/frontend"
    if [ -f "package.json" ]; then
        if npm run build > "$REPORT_DIR/frontend-build.log" 2>&1; then
            success "Frontend build: PASS"
        else
            error "Frontend build: FAIL"
            cat "$REPORT_DIR/frontend-build.log"
            build_errors=$((build_errors + 1))
        fi
    fi
    cd "$PROJECT_ROOT"
    
    # Admin build (si existe)
    if [ -d "$PROJECT_ROOT/src/admin" ]; then
        info "Building admin dashboard..."
        cd "$PROJECT_ROOT/src/admin"
        if [ -f "package.json" ]; then
            if npm run build > "$REPORT_DIR/admin-build.log" 2>&1; then
                success "Admin build: PASS"
            else
                error "Admin build: FAIL"
                cat "$REPORT_DIR/admin-build.log"
                build_errors=$((build_errors + 1))
            fi
        fi
        cd "$PROJECT_ROOT"
    fi
    
    # Backend composer
    info "Verificando backend dependencies..."
    cd "$PROJECT_ROOT/api"
    if composer install --no-dev --optimize-autoloader > "$REPORT_DIR/backend-build.log" 2>&1; then
        success "Backend dependencies: PASS"
    else
        error "Backend dependencies: FAIL"
        cat "$REPORT_DIR/backend-build.log"
        build_errors=$((build_errors + 1))
    fi
    cd "$PROJECT_ROOT"
    
    return $build_errors
}

# Verificación funcional
run_functional_verification() {
    log "🔧 Ejecutando verificación funcional..."
    
    # Verificar que Docker esté corriendo
    info "Verificando contenedores Docker..."
    if ! docker-compose ps | grep -q "Up"; then
        warning "Contenedores no están corriendo, iniciando..."
        docker-compose up -d
        sleep 15
    fi
    
    # Verificar endpoints
    local endpoints=(
        "http://localhost:8000/api/v1/health"
        "http://localhost:3000"
    )
    
    for endpoint in "${endpoints[@]}"; do
        info "Verificando endpoint: $endpoint"
        if curl -f -s "$endpoint" > /dev/null 2>&1; then
            success "Endpoint $endpoint: OK"
        else
            warning "Endpoint $endpoint: NO RESPONDE"
            return 1
        fi
    done
    
    # Verificar base de datos
    info "Verificando conexión a base de datos..."
    if docker exec naser_db mysql -u naser_user -pnaser_pass_2024 -e "SELECT 1" naser_cms > /dev/null 2>&1; then
        success "Database connection: OK"
    else
        error "Database connection: FAIL"
        return 1
    fi
    
    return 0
}

# Generar reporte de resumen
generate_summary_report() {
    local tests_result=$1
    local lint_result=$2
    local builds_result=$3
    local functional_result=$4
    
    cat > "$REPORT_DIR/pre-commit-summary.md" << EOF
# 🔍 PRE-COMMIT VERIFICATION REPORT

**Proyecto**: Grupo Naser CMS  
**Timestamp**: $(date +"%Y-%m-%d %H:%M:%S")  
**Modo**: $MODE  
**Branch**: $(git branch --show-current 2>/dev/null || echo "unknown")

## 📊 Resultados de Verificación

| Fase | Estado | Resultado |
|------|--------|-----------|
| **Tests** | $([ $tests_result -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL") | $([ $tests_result -eq 0 ] && echo "Todos los tests pasaron" || echo "Algunos tests fallaron") |
| **Linting** | $([ $lint_result -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL") | $([ $lint_result -eq 0 ] && echo "Code quality OK" || echo "Problemas de linting") |
| **Builds** | $([ $builds_result -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL") | $([ $builds_result -eq 0 ] && echo "Builds exitosos" || echo "Problemas en builds") |
| **Funcional** | $([ $functional_result -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL") | $([ $functional_result -eq 0 ] && echo "Sistema operativo" || echo "Problemas funcionales") |

## 📁 Archivos de Log

- **Tests Backend**: [backend-tests.log](backend-tests.log)
- **Tests Frontend**: [frontend-tests.log](frontend-tests.log)
- **Lint Backend**: [backend-lint.log](backend-lint.log)
- **Lint Frontend**: [frontend-lint.log](frontend-lint.log)
- **Build Frontend**: [frontend-build.log](frontend-build.log)
- **Build Backend**: [backend-build.log](backend-build.log)

## 🎯 Estado Final

$([ $((tests_result + lint_result + builds_result + functional_result)) -eq 0 ] && echo "🎉 **VERIFICACIÓN EXITOSA** - El proyecto está listo para commit" || echo "❌ **VERIFICACIÓN FALLÓ** - Revisar problemas antes de proceder")

---

**Generado por**: Pre-Commit Verification System  
**Reporte ID**: pre-commit_$TIMESTAMP
EOF

    info "Reporte generado en: $REPORT_DIR/pre-commit-summary.md"
}

# Mostrar instrucciones para commit
show_commit_instructions() {
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                              ║${NC}"
    echo -e "${GREEN}║                    ✅ LISTO PARA COMMIT                      ║${NC}"
    echo -e "${GREEN}║                                                              ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${CYAN}Próximos pasos recomendados:${NC}"
    echo ""
    echo -e "${YELLOW}1. Verificar estado de Git:${NC}"
    echo "   git status"
    echo ""
    echo -e "${YELLOW}2. Añadir archivos al staging:${NC}"
    echo "   git add ."
    echo ""
    echo -e "${YELLOW}3. Crear commit descriptivo:${NC}"
    echo "   git commit -m \"feat: descripción de los cambios\""
    echo ""
    echo -e "${YELLOW}4. Push al repositorio:${NC}"
    echo "   git push origin \$(git branch --show-current)"
    echo ""
    echo -e "${CYAN}Reporte completo disponible en:${NC}"
    echo "   $REPORT_DIR/pre-commit-summary.md"
    echo ""
}

# Mostrar instrucciones para errores
show_error_instructions() {
    echo ""
    echo -e "${RED}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║                                                              ║${NC}"
    echo -e "${RED}║                  ❌ VERIFICACIÓN FALLÓ                       ║${NC}"
    echo -e "${RED}║                                                              ║${NC}"
    echo -e "${RED}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${CYAN}Pasos para resolver problemas:${NC}"
    echo ""
    echo -e "${YELLOW}1. Revisar logs de error:${NC}"
    echo "   cat $REPORT_DIR/*.log"
    echo ""
    echo -e "${YELLOW}2. Corregir problemas identificados${NC}"
    echo ""
    echo -e "${YELLOW}3. Re-ejecutar verificación:${NC}"
    echo "   $0"
    echo ""
    echo -e "${YELLOW}4. Una vez resuelto, proceder con commit${NC}"
    echo ""
    echo -e "${CYAN}Reporte completo de errores disponible en:${NC}"
    echo "   $REPORT_DIR/pre-commit-summary.md"
    echo ""
}

# Ejecutar función principal
main "$@"