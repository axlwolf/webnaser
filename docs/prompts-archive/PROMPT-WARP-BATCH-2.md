# PROMPT WARP - BATCH 2: Automatización de Testing y CI/CD

## 🎯 CONTEXTO DEL PROYECTO

¡Bienvenido oficialmente al equipo! Eres **Warp**, el especialista en DevOps y automatización para el **CMS de Grupo Naser**. Formas parte de un equipo de **4 agentes coordinados**:

- **Kiro**: Orquestador principal con sistema de hooks automáticos
- **Claude**: Desarrollador Frontend React (completó LoginForm)
- **Gemini**: Desarrollador Backend PHP (completó UserRepository)
- **Warp (tú)**: Especialista DevOps y automatización

**Branch actual**: `feature/auth-integration`  
**Progreso actual**: 36.67% (11/30 tareas completadas)  
**Sistema de hooks**: Activo - detecta automáticamente cambios de todos los agentes

## 🎯 TU ROL EN EL EQUIPO

### Responsabilidades Principales

- **Automatización de infraestructura** y deployment
- **Gestión de contenedores** Docker y orquestación
- **Monitoreo continuo** de performance y salud del sistema
- **Optimización de pipelines** CI/CD
- **Gestión de backups** y recuperación de datos
- **Preparación para deployment** en GoDaddy
- **Automatización de testing** y quality assurance

### Tu Integración con el Sistema de Hooks

- El sistema detecta cambios en archivos de configuración
- Reportas automáticamente el estado de infraestructura
- Coordinas con Kiro para optimización continua
- Automatizas procesos que Claude y Gemini necesitan

## 🎯 TU PRIMERA TAREA: AUTOMATIZACIÓN DE TESTING SUITE (Tarea W.2)

### OBJETIVO

Crear un **sistema completo de automatización de testing** que ejecute tests de frontend y backend automáticamente, genere reportes de cobertura y notifique resultados al equipo.

### UBICACIÓN DE ARCHIVOS

```
scripts/testing/
├── run-all-tests.sh           # Script principal de testing
├── test-frontend.sh           # Tests específicos de frontend
├── test-backend.sh            # Tests específicos de backend
├── generate-coverage.sh       # Generación de reportes de cobertura
├── test-integration.sh        # Tests de integración end-to-end
└── test-notifications.sh      # Sistema de notificaciones

.github/workflows/
├── ci-tests.yml              # GitHub Actions para CI
└── quality-check.yml         # Verificación de calidad de código

docker/testing/
├── Dockerfile.test           # Contenedor específico para testing
└── docker-compose.test.yml   # Orquestación de testing
```

### ESPECIFICACIONES TÉCNICAS DETALLADAS

#### 1. SCRIPT PRINCIPAL DE TESTING (run-all-tests.sh)

```bash
#!/bin/bash

# Sistema de Testing Automatizado - Grupo Naser CMS
# Ejecuta suite completa de tests con reportes y notificaciones

set -e  # Salir en caso de error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuración
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
REPORT_DIR="$PROJECT_ROOT/reports/testing/$TIMESTAMP"
COVERAGE_THRESHOLD=80

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

# Función para reportar estado a Kiro
report_status() {
    local status="$1"
    local message="$2"
    node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" "$status" warp "W.2" "$message"
}

# Función principal
main() {
    log "🚀 Iniciando suite completa de testing..."

    # Crear directorio de reportes
    mkdir -p "$REPORT_DIR"

    # Reportar inicio
    report_status "start-task" "Iniciando automatización de testing suite completa"

    # Variables para tracking de resultados
    local frontend_result=0
    local backend_result=0
    local integration_result=0
    local coverage_result=0

    # 1. Verificar entorno
    log "🔍 Verificando entorno de testing..."
    verify_environment || exit 1

    # 2. Tests de Backend
    log "🧪 Ejecutando tests de backend..."
    if run_backend_tests; then
        success "Tests de backend completados"
    else
        error "Tests de backend fallaron"
        backend_result=1
    fi

    # 3. Tests de Frontend
    log "🎨 Ejecutando tests de frontend..."
    if run_frontend_tests; then
        success "Tests de frontend completados"
    else
        error "Tests de frontend fallaron"
        frontend_result=1
    fi

    # 4. Tests de Integración
    log "🔗 Ejecutando tests de integración..."
    if run_integration_tests; then
        success "Tests de integración completados"
    else
        error "Tests de integración fallaron"
        integration_result=1
    fi

    # 5. Generar reportes de cobertura
    log "📊 Generando reportes de cobertura..."
    if generate_coverage_reports; then
        success "Reportes de cobertura generados"
    else
        warning "Problemas generando reportes de cobertura"
        coverage_result=1
    fi

    # 6. Generar reporte consolidado
    generate_consolidated_report $frontend_result $backend_result $integration_result $coverage_result

    # 7. Enviar notificaciones
    send_notifications $frontend_result $backend_result $integration_result

    # 8. Reportar resultado final
    local total_errors=$((frontend_result + backend_result + integration_result))
    if [ $total_errors -eq 0 ]; then
        success "🎉 Todos los tests pasaron correctamente"
        report_status "complete-task" "Suite de testing completada - todos los tests pasaron correctamente"
        exit 0
    else
        error "❌ $total_errors suite(s) de tests fallaron"
        report_status "add-comment" "Suite de testing completada con $total_errors fallos - requiere atención"
        exit 1
    fi
}

# Verificar entorno
verify_environment() {
    log "Verificando dependencias..."

    # Verificar Docker
    if ! command -v docker &> /dev/null; then
        error "Docker no está instalado"
        return 1
    fi

    # Verificar Node.js
    if ! command -v node &> /dev/null; then
        error "Node.js no está instalado"
        return 1
    fi

    # Verificar que los contenedores estén ejecutándose
    if ! docker-compose ps | grep -q "Up"; then
        warning "Contenedores no están ejecutándose, iniciando..."
        docker-compose up -d
        sleep 10
    fi

    success "Entorno verificado correctamente"
    return 0
}

# Tests de Backend
run_backend_tests() {
    log "Ejecutando tests de backend PHP..."

    # Ejecutar PHPUnit con cobertura
    if docker exec naser_backend php /var/www/project/api/vendor/bin/phpunit \
        --configuration /var/www/project/api/phpunit-docker.xml \
        --coverage-html /var/www/project/reports/backend-coverage \
        --coverage-clover /var/www/project/reports/backend-coverage.xml \
        --log-junit /var/www/project/reports/backend-junit.xml \
        --testdox > "$REPORT_DIR/backend-tests.log" 2>&1; then

        success "Tests de backend completados exitosamente"
        return 0
    else
        error "Tests de backend fallaron"
        cat "$REPORT_DIR/backend-tests.log"
        return 1
    fi
}

# Tests de Frontend
run_frontend_tests() {
    log "Ejecutando tests de frontend React..."

    cd "$PROJECT_ROOT/src/frontend"

    # Ejecutar tests con cobertura
    if npm test -- --coverage --watchAll=false --reporters=default --reporters=jest-junit \
        --coverageReporters=html --coverageReporters=lcov \
        --coverageDirectory="$REPORT_DIR/frontend-coverage" > "$REPORT_DIR/frontend-tests.log" 2>&1; then

        success "Tests de frontend completados exitosamente"
        cd "$PROJECT_ROOT"
        return 0
    else
        error "Tests de frontend fallaron"
        cat "$REPORT_DIR/frontend-tests.log"
        cd "$PROJECT_ROOT"
        return 1
    fi
}

# Tests de Integración
run_integration_tests() {
    log "Ejecutando tests de integración..."

    # Aquí implementarías tests end-to-end con Cypress o Playwright
    # Por ahora, simulamos con verificación de endpoints

    local endpoints=(
        "http://localhost:8000/api/v1/health"
        "http://localhost:3000"
    )

    for endpoint in "${endpoints[@]}"; do
        if curl -f -s "$endpoint" > /dev/null; then
            success "Endpoint $endpoint respondiendo correctamente"
        else
            error "Endpoint $endpoint no responde"
            return 1
        fi
    done

    success "Tests de integración completados"
    return 0
}

# Generar reportes de cobertura
generate_coverage_reports() {
    log "Generando reportes consolidados de cobertura..."

    # Crear reporte HTML consolidado
    cat > "$REPORT_DIR/coverage-summary.html" << EOF
<!DOCTYPE html>
<html>
<head>
    <title>Reporte de Cobertura - Grupo Naser CMS</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 8px; }
        .section { margin: 20px 0; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .success { color: #28a745; }
        .warning { color: #ffc107; }
        .error { color: #dc3545; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Reporte de Cobertura de Testing</h1>
        <p>Generado: $(date)</p>
        <p>Proyecto: Grupo Naser CMS</p>
    </div>

    <div class="section">
        <h2>Resumen de Cobertura</h2>
        <p>Frontend: <span id="frontend-coverage">Calculando...</span></p>
        <p>Backend: <span id="backend-coverage">Calculando...</span></p>
    </div>

    <div class="section">
        <h2>Enlaces a Reportes Detallados</h2>
        <ul>
            <li><a href="frontend-coverage/index.html">Reporte Frontend</a></li>
            <li><a href="backend-coverage/index.html">Reporte Backend</a></li>
        </ul>
    </div>
</body>
</html>
EOF

    success "Reporte de cobertura generado en $REPORT_DIR/coverage-summary.html"
    return 0
}

# Generar reporte consolidado
generate_consolidated_report() {
    local frontend_result=$1
    local backend_result=$2
    local integration_result=$3
    local coverage_result=$4

    cat > "$REPORT_DIR/test-summary.md" << EOF
# Reporte de Testing - $(date)

## Resumen de Resultados

| Suite | Estado | Resultado |
|-------|--------|-----------|
| Backend | $([ $backend_result -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL") | $([ $backend_result -eq 0 ] && echo "Todos los tests pasaron" || echo "Algunos tests fallaron") |
| Frontend | $([ $frontend_result -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL") | $([ $frontend_result -eq 0 ] && echo "Todos los tests pasaron" || echo "Algunos tests fallaron") |
| Integración | $([ $integration_result -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL") | $([ $integration_result -eq 0 ] && echo "Endpoints respondiendo" || echo "Problemas de conectividad") |

## Archivos de Log

- Backend: [backend-tests.log](backend-tests.log)
- Frontend: [frontend-tests.log](frontend-tests.log)
- Cobertura: [coverage-summary.html](coverage-summary.html)

## Próximos Pasos

$([ $((frontend_result + backend_result + integration_result)) -eq 0 ] && echo "🎉 Todos los tests pasaron. El sistema está estable." || echo "⚠️ Hay fallos que requieren atención. Revisar logs para detalles.")

---
Generado por Warp - Sistema de Testing Automatizado
EOF

    log "Reporte consolidado generado en $REPORT_DIR/test-summary.md"
}

# Enviar notificaciones
send_notifications() {
    local frontend_result=$1
    local backend_result=$2
    local integration_result=$3

    local total_errors=$((frontend_result + backend_result + integration_result))

    if [ $total_errors -eq 0 ]; then
        # Notificar éxito
        node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" add-comment warp \
            "🎉 Suite de testing completada exitosamente - todos los tests pasaron. Reporte disponible en reports/testing/$TIMESTAMP/"
    else
        # Notificar fallos
        node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" add-comment warp \
            "⚠️ Suite de testing completada con $total_errors fallos. Revisar reportes en reports/testing/$TIMESTAMP/"
    fi
}

# Ejecutar función principal
main "$@"
```

#### 2. CONFIGURACIÓN DE GITHUB ACTIONS (ci-tests.yml)

```yaml
name: CI - Testing Suite

on:
  push:
    branches: [main, feature/auth-integration]
  pull_request:
    branches: [main]

jobs:
  backend-tests:
    runs-on: ubuntu-latest

    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: test_password
          MYSQL_DATABASE: naser_cms_test
        ports:
          - 3306:3306
        options: --health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3

    steps:
      - uses: actions/checkout@v3

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: "8.2"
          extensions: pdo, pdo_mysql, mbstring

      - name: Install Backend Dependencies
        run: |
          cd api
          composer install --no-interaction --prefer-dist

      - name: Run Backend Tests
        run: |
          cd api
          ./vendor/bin/phpunit --configuration phpunit.xml --coverage-clover coverage.xml

      - name: Upload Backend Coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./api/coverage.xml
          flags: backend

  frontend-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"
          cache-dependency-path: src/frontend/package-lock.json

      - name: Install Frontend Dependencies
        run: |
          cd src/frontend
          npm ci

      - name: Run Frontend Tests
        run: |
          cd src/frontend
          npm test -- --coverage --watchAll=false

      - name: Upload Frontend Coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./src/frontend/coverage/lcov.info
          flags: frontend

  integration-tests:
    runs-on: ubuntu-latest
    needs: [backend-tests, frontend-tests]

    steps:
      - uses: actions/checkout@v3

      - name: Setup Docker Compose
        run: |
          docker-compose up -d
          sleep 30  # Wait for services to be ready

      - name: Run Integration Tests
        run: |
          chmod +x scripts/testing/test-integration.sh
          ./scripts/testing/test-integration.sh

      - name: Cleanup
        run: docker-compose down

  notify-results:
    runs-on: ubuntu-latest
    needs: [backend-tests, frontend-tests, integration-tests]
    if: always()

    steps:
      - name: Notify Success
        if: ${{ needs.backend-tests.result == 'success' && needs.frontend-tests.result == 'success' && needs.integration-tests.result == 'success' }}
        run: echo "🎉 All tests passed successfully!"

      - name: Notify Failure
        if: ${{ needs.backend-tests.result == 'failure' || needs.frontend-tests.result == 'failure' || needs.integration-tests.result == 'failure' }}
        run: echo "❌ Some tests failed. Check the logs for details."
```

#### 3. DOCKER PARA TESTING (Dockerfile.test)

```dockerfile
# Dockerfile específico para testing
FROM php:8.2-cli

# Instalar dependencias para testing
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    mysql-client \
    && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    zip \
    gd

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instalar Xdebug para cobertura
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Configurar Xdebug para cobertura
RUN echo "xdebug.mode=coverage" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Establecer directorio de trabajo
WORKDIR /var/www/project

# Copiar archivos de configuración
COPY api/composer.json api/composer.lock ./api/
RUN cd api && composer install --no-scripts --no-autoloader

# Copiar código fuente
COPY . .

# Generar autoloader
RUN cd api && composer dump-autoload --optimize

# Comando por defecto para tests
CMD ["php", "api/vendor/bin/phpunit", "--configuration", "api/phpunit-docker.xml"]
```

#### 4. SCRIPT DE MONITOREO CONTINUO

```bash
#!/bin/bash
# scripts/testing/continuous-monitoring.sh

# Monitoreo continuo de calidad del código
# Se ejecuta cada hora para verificar el estado del proyecto

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

monitor_project_health() {
    local timestamp=$(date +"%Y-%m-%d %H:%M:%S")

    echo "[$timestamp] 🔍 Iniciando monitoreo de salud del proyecto..."

    # 1. Verificar estado de contenedores
    if ! docker-compose ps | grep -q "Up"; then
        echo "⚠️ Algunos contenedores no están ejecutándose"
        node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" add-comment warp \
            "⚠️ Monitoreo detectó contenedores inactivos - verificando estado"
        return 1
    fi

    # 2. Verificar endpoints críticos
    local endpoints=(
        "http://localhost:8000/api/v1/health"
        "http://localhost:3000"
    )

    for endpoint in "${endpoints[@]}"; do
        if ! curl -f -s "$endpoint" > /dev/null; then
            echo "❌ Endpoint $endpoint no responde"
            node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" add-comment warp \
                "❌ Monitoreo detectó endpoint $endpoint no disponible"
            return 1
        fi
    done

    # 3. Verificar uso de recursos
    local memory_usage=$(docker stats --no-stream --format "{{.MemPerc}}" | head -1 | sed 's/%//')
    if [ "${memory_usage%.*}" -gt 85 ]; then
        echo "⚠️ Alto uso de memoria detectado: ${memory_usage}%"
        node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" add-comment warp \
            "⚠️ Alto uso de memoria detectado: ${memory_usage}% - considerar optimización"
    fi

    # 4. Verificar logs de errores
    local error_count=$(docker-compose logs --since="1h" | grep -i error | wc -l)
    if [ "$error_count" -gt 10 ]; then
        echo "⚠️ $error_count errores detectados en la última hora"
        node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" add-comment warp \
            "⚠️ $error_count errores detectados en logs - revisar estabilidad"
    fi

    echo "✅ Monitoreo completado - sistema estable"
    return 0
}

# Ejecutar monitoreo
monitor_project_health
```

### CRITERIOS DE ACEPTACIÓN

- [ ] Suite completa de testing automatizada funcionando
- [ ] Scripts para testing de frontend, backend e integración
- [ ] Reportes de cobertura automáticos con HTML
- [ ] GitHub Actions configurado para CI/CD
- [ ] Docker optimizado para testing
- [ ] Sistema de notificaciones integrado con Kiro
- [ ] Monitoreo continuo de salud del proyecto
- [ ] Documentación completa de uso
- [ ] Compatibilidad con GoDaddy deployment

### COMANDOS PARA REPORTAR PROGRESO

```bash
# Al iniciar la tarea
node .kiro/specs/auth-integration/update-status.js start-task warp "W.2" "Iniciando automatización de testing suite completa"

# Para reportar progreso
node .kiro/specs/auth-integration/update-status.js update-progress warp "W.2" "Scripts de testing implementados, configurando CI/CD"

# Al completar
node .kiro/specs/auth-integration/update-status.js complete-task warp "W.2" "Sistema de testing automatizado completado con CI/CD y monitoreo"
```

### INTEGRACIÓN CON SISTEMA DE HOOKS

Como parte del sistema de hooks:

- Tus scripts se ejecutarán automáticamente cuando Claude o Gemini hagan cambios
- El sistema detectará cambios en archivos de configuración
- Reportarás automáticamente el estado de infraestructura
- Coordinarás con Kiro para optimización continua

### PRÓXIMAS TAREAS DESPUÉS DE ESTA

1. **Tarea W.3**: Optimización de performance de desarrollo
2. **Tarea W.4**: Preparación de pipeline de deployment
3. **Tarea W.5**: Configuración de backup automático

---

**¡Bienvenido oficialmente al equipo, Warp!** 🚀 Tu expertise en DevOps será crucial para el éxito del proyecto.

**Enfócate en**: Automatización completa, monitoreo proactivo, y preparación para producción en GoDaddy.
