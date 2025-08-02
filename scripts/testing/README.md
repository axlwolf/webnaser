# 🧪 Sistema de Testing Automatizado - Grupo Naser CMS

**Desarrollado por**: Warp (DevOps)  
**Proyecto**: Grupo Naser CMS  
**Versión**: 1.0

## 📋 Descripción

Sistema completo de automatización de testing que ejecuta tests de frontend, backend e integración con reportes de cobertura automáticos y notificaciones al sistema de orquestación.

## 🚀 Características Principales

- ✅ **Testing Automatizado**: Suite completa para PHP y React
- ✅ **Reportes de Cobertura**: HTML y XML con métricas detalladas
- ✅ **CI/CD Integration**: GitHub Actions configurado
- ✅ **Docker Support**: Contenedores optimizados para testing
- ✅ **Monitoreo Continuo**: Verificación automática de salud del sistema
- ✅ **Notificaciones**: Integración con sistema de hooks de Kiro

## 📁 Estructura de Archivos

```
scripts/testing/
├── run-all-tests.sh           # Script principal de testing
├── run-test-suite.sh          # Orquestador maestro
├── test-backend.sh            # Tests específicos de PHP
├── test-frontend.sh           # Tests específicos de React
├── test-integration.sh        # Tests de integración end-to-end
├── continuous-monitoring.sh   # Monitoreo continuo de salud
├── pre-commit-verification.sh # 🆕 Verificación completa pre-commit
└── README.md                  # Esta documentación

.github/workflows/
├── ci-tests.yml              # GitHub Actions para CI/CD

docker/testing/
├── Dockerfile.test           # Contenedor optimizado para testing
├── docker-compose.test.yml   # Orquestación de testing
└── entrypoint-test.sh        # Script de entrada para contenedor

reports/testing/
└── [timestamp]/              # Reportes organizados por timestamp
    ├── coverage-summary.html
    ├── test-summary.md
    ├── backend-tests.log
    ├── frontend-tests.log
    ├── backend-coverage/
    └── frontend-coverage/
```

## 🎯 Uso Básico

### Ejecutar Suite Completa

```bash
# Suite completa de testing
./scripts/testing/run-test-suite.sh

# Con Docker
./scripts/testing/run-test-suite.sh --docker
```

### Tests Específicos

```bash
# Solo backend PHP
./scripts/testing/run-test-suite.sh --backend-only

# Solo frontend React
./scripts/testing/run-test-suite.sh --frontend-only

# Solo integración
./scripts/testing/run-test-suite.sh --integration-only
```

### Verificación Rápida

```bash
# Verificación rápida de salud
./scripts/testing/run-test-suite.sh --quick

# Monitoreo continuo
./scripts/testing/continuous-monitoring.sh
```

### 🔍 Pre-Commit Verification (Nuevo)

```bash
# Verificación completa antes de commit
./scripts/testing/pre-commit-verification.sh

# Verificación rápida (solo tests)
./scripts/testing/pre-commit-verification.sh --quick

# Verificación completa con builds
./scripts/testing/pre-commit-verification.sh --full
```

### Modo CI/CD

```bash
# Para uso en pipelines automatizados
./scripts/testing/run-test-suite.sh --ci
```

## 🔧 Scripts Individuales

### Backend Testing

```bash
# Ejecutar tests de PHP con PHPUnit
./scripts/testing/test-backend.sh
```

### Frontend Testing

```bash
# Ejecutar tests de React con Jest
./scripts/testing/test-frontend.sh
```

### Integration Testing

```bash
# Verificar conectividad entre servicios
./scripts/testing/test-integration.sh
```

### Monitoreo Continuo

```bash
# Monitoreo completo
./scripts/testing/continuous-monitoring.sh

# Verificación rápida
./scripts/testing/continuous-monitoring.sh quick
```

## 🐳 Docker Testing

### Usar Contenedores de Testing

```bash
# Construir y ejecutar tests en Docker
docker-compose -f docker/testing/docker-compose.test.yml up --build

# Solo backend en Docker
docker-compose -f docker/testing/docker-compose.test.yml up backend-test

# Monitoreo continuo en Docker
docker-compose -f docker/testing/docker-compose.test.yml up test-monitor
```

### Construir Imagen de Testing

```bash
# Construir imagen optimizada para testing
docker build -f docker/testing/Dockerfile.test -t naser-cms-test .

# Ejecutar tests en contenedor
docker run --rm -v $(pwd):/var/www/project naser-cms-test
```

## 📊 Reportes y Cobertura

### Ubicación de Reportes

- **HTML Reports**: `reports/testing/[timestamp]/coverage-summary.html`
- **Backend Coverage**: `reports/testing/[timestamp]/backend-coverage/`
- **Frontend Coverage**: `reports/testing/[timestamp]/frontend-coverage/`
- **Test Summary**: `reports/testing/[timestamp]/test-summary.md`

### Métricas Incluidas

- Cobertura de líneas de código
- Cobertura de funciones
- Cobertura de branches
- Resultados de tests unitarios
- Resultados de tests de integración
- Métricas de performance

## 🔄 CI/CD Integration

### GitHub Actions

El sistema incluye configuración completa de GitHub Actions:

- **Triggers**: Push y Pull Requests
- **Jobs Paralelos**: Backend, Frontend, Integración, Seguridad
- **Artifacts**: Reportes de cobertura y resultados
- **Notifications**: Estado de tests automático

### Configuración Automática

```yaml
# .github/workflows/ci-tests.yml
# Configuración completa incluida
```

## 🔔 Sistema de Notificaciones

### Integración con Kiro

El sistema reporta automáticamente a Kiro:

```bash
# Reportar inicio de tarea
node .kiro/specs/auth-integration/update-status.js start-task warp "W.2" "mensaje"

# Reportar progreso
node .kiro/specs/auth-integration/update-status.js update-progress warp "W.2" "mensaje"

# Añadir comentario
node .kiro/specs/auth-integration/update-status.js add-comment warp "mensaje"

# Completar tarea
node .kiro/specs/auth-integration/update-status.js complete-task warp "W.2" "mensaje"
```

## 🛠️ Configuración y Personalización

### Variables de Entorno

```bash
# Para testing con Docker
export DB_HOST=localhost
export DB_PORT=3306
export DB_DATABASE=naser_cms_test
export DB_USERNAME=test_user
export DB_PASSWORD=test_password

# Para monitoreo
export MONITOR_INTERVAL=300  # 5 minutos
```

### Configuración de PHPUnit

```xml
<!-- api/phpunit.xml -->
<phpunit>
    <!-- Configuración optimizada incluida -->
</phpunit>
```

### Configuración de Jest

```json
// src/frontend/package.json
{
  "scripts": {
    "test": "react-scripts test",
    "test:coverage": "npm test -- --coverage --watchAll=false"
  }
}
```

## 🚨 Troubleshooting

### Problemas Comunes

#### Tests de Backend Fallan

```bash
# Verificar dependencias
cd api && composer install

# Verificar configuración de base de datos
mysql -h localhost -u root -p

# Ejecutar tests con debug
./vendor/bin/phpunit --debug
```

#### Tests de Frontend Fallan

```bash
# Verificar dependencias
cd src/frontend && npm install

# Limpiar cache
npm test -- --clearCache

# Ejecutar con verbose
npm test -- --verbose
```

#### Problemas de Conectividad

```bash
# Verificar servicios
docker-compose ps

# Reiniciar servicios
docker-compose restart

# Verificar logs
docker-compose logs
```

### Logs y Debugging

```bash
# Ver logs de testing
tail -f reports/testing/latest/backend-tests.log
tail -f reports/testing/latest/frontend-tests.log

# Monitoreo en tiempo real
./scripts/testing/continuous-monitoring.sh
```

## 📈 Métricas y Performance

### Objetivos de Cobertura

- **Backend PHP**: > 80%
- **Frontend React**: > 85%
- **Integración**: 100% de endpoints críticos

### Tiempos de Ejecución Esperados

- **Backend Tests**: ~30 segundos
- **Frontend Tests**: ~45 segundos
- **Integration Tests**: ~20 segundos
- **Suite Completa**: ~2 minutos

## 🔍 Pre-Commit Verification System

### Descripción

Sistema completo de verificación que se ejecuta antes de cada commit para garantizar la calidad del código y la estabilidad del sistema.

### Características

- ✅ **Testing Completo**: Backend, Frontend, Admin Dashboard
- ✅ **Code Quality**: Linting y estándares de código
- ✅ **Build Verification**: Verificación de builds exitosos
- ✅ **Functional Testing**: Health checks y conectividad
- ✅ **Reportes Detallados**: HTML, Markdown y logs
- ✅ **Instrucciones Automáticas**: Pasos siguientes claros

### Fases de Verificación

#### 1. Testing Completo

```bash
# Backend PHP con PHPUnit
cd api && ./vendor/bin/phpunit

# Frontend React con Vitest
cd src/frontend && npm test

# Admin Dashboard (si existe)
cd src/admin && npm test
```

#### 2. Linting y Code Quality

```bash
# Frontend linting
cd src/frontend && npm run lint

# Backend linting
cd api && composer cs

# Admin linting
cd src/admin && npm run lint
```

#### 3. Builds (Modo Full)

```bash
# Frontend build
cd src/frontend && npm run build

# Admin build
cd src/admin && npm run build

# Backend dependencies
cd api && composer install --optimize-autoloader
```

#### 4. Verificación Funcional

```bash
# Health checks
curl -f http://localhost:8000/api/v1/health
curl -f http://localhost:3000

# Database connectivity
docker exec naser_db mysql -u naser_user -pnaser_pass_2024 -e "SELECT 1" naser_cms
```

### Uso Recomendado

**Antes de cada commit:**

```bash
# 1. Hacer cambios en código
git add .

# 2. Ejecutar verificación
./scripts/testing/pre-commit-verification.sh

# 3. Si pasa, proceder con commit
git commit -m "feat: descripción de cambios"

# 4. Push al repositorio
git push origin branch-name
```

### Reportes Generados

Los reportes se guardan en `reports/pre-commit/[timestamp]/`:

- **pre-commit-summary.md**: Reporte ejecutivo
- **backend-tests.log**: Log detallado de tests PHP
- **frontend-tests.log**: Log detallado de tests React
- **backend-lint.log**: Resultados de linting PHP
- **frontend-lint.log**: Resultados de linting React
- **frontend-build.log**: Log de build React
- **backend-build.log**: Log de dependencias PHP

### Integración con npm Scripts

```json
{
  "scripts": {
    "pre-commit:check": "./scripts/testing/pre-commit-verification.sh --quick",
    "pre-commit:full": "./scripts/testing/pre-commit-verification.sh --full",
    "pre-commit:verify": "./scripts/testing/pre-commit-verification.sh"
  }
}
```

### Troubleshooting

**Si la verificación falla:**

1. **Revisar logs específicos** en el directorio de reportes
2. **Corregir problemas identificados**
3. **Re-ejecutar verificación**
4. **Proceder con commit solo cuando pase**

**Problemas comunes:**

- **Tests fallan**: Revisar `*-tests.log`
- **Linting falla**: Revisar `*-lint.log`
- **Build falla**: Revisar `*-build.log`
- **Endpoints no responden**: Verificar Docker containers

## 🔮 Próximas Mejoras

- [x] **Pre-Commit Verification**: Sistema completo implementado
- [ ] **E2E Testing**: Integración con Cypress/Playwright
- [ ] **Performance Testing**: Métricas de carga y stress
- [ ] **Security Testing**: Análisis automático de vulnerabilidades
- [ ] **Visual Regression**: Testing de UI automático
- [ ] **API Testing**: Suite completa de tests de API

## 🤝 Integración con Equipo

### Para Claude (Frontend)

```bash
# Ejecutar solo tests de frontend
./scripts/testing/test-frontend.sh

# Verificar cobertura antes de commit
npm test -- --coverage
```

### Para Gemini (Backend)

```bash
# Ejecutar solo tests de backend
./scripts/testing/test-backend.sh

# Verificar con cobertura
./vendor/bin/phpunit --coverage-html reports/coverage
```

### Para Kiro (Orquestador)

```bash
# Verificación completa del sistema
./scripts/testing/run-test-suite.sh

# Monitoreo de salud
./scripts/testing/continuous-monitoring.sh
```

## 📞 Soporte

Para problemas o mejoras del sistema de testing:

1. **Revisar logs** en `reports/testing/`
2. **Ejecutar diagnóstico** con `--quick`
3. **Verificar configuración** de Docker/servicios
4. **Consultar documentación** de PHPUnit/Jest

---

**Desarrollado por Warp** - Sistema de Testing Automatizado  
**Proyecto**: Grupo Naser CMS  
**Fecha**: $(date +"%Y-%m-%d")  
**Versión**: 1.0
