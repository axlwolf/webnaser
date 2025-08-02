# CI/CD Pipeline - Grupo Naser CMS

## Descripción General

El proyecto Grupo Naser CMS implementa un **pipeline completo de CI/CD** usando GitHub Actions que automatiza testing, security scanning, quality assurance y deployment. El pipeline está diseñado para garantizar la calidad del código y la estabilidad del sistema en cada cambio.

## Arquitectura del Pipeline

### Workflows Principales

#### 1. `ci-cd.yml` - Pipeline Principal

**Propósito**: Pipeline completo con deployment automático  
**Triggers**: Push a `main` y `develop`, Pull Requests a `main`

**Stages:**

- **Frontend Testing**: Node.js 18, npm ci, linting, tests con coverage, build
- **Backend Testing**: PHP 8.1, MySQL 8.0, Composer, PHPUnit, code quality
- **Security Scanning**: Trivy vulnerability scanner
- **Build & Deploy**: Docker images, staging deployment, E2E tests, producción

#### 2. `ci-tests.yml` - Testing Suite Completo

**Propósito**: Testing exhaustivo con reportes detallados  
**Triggers**: Push a `main` y `feature/auth-integration`, Pull Requests

**Jobs:**

- **Backend Tests**: PHP 8.2, MySQL 8.0, PHPUnit con coverage
- **Frontend Tests**: Node.js 18, Vitest, linting, coverage
- **Integration Tests**: Docker Compose, tests E2E
- **Security Scan**: Trivy filesystem scan
- **Results Notification**: Resumen automático con badges

## Configuración Técnica

### Backend Testing (PHP)

```yaml
services:
  mysql:
    image: mysql:8.0
    env:
      MYSQL_ROOT_PASSWORD: test_password
      MYSQL_DATABASE: naser_cms_test
    options: --health-cmd="mysqladmin ping"
```

**Herramientas:**

- **PHP**: 8.2 con extensiones (pdo, pdo_mysql, mbstring, zip, gd)
- **Testing**: PHPUnit con coverage (Xdebug)
- **Quality**: PHP CodeSniffer, PHP Mess Detector
- **Database**: MySQL 8.0 con base de datos de testing

### Frontend Testing (React)

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: "18"
    cache: "npm"
```

**Herramientas:**

- **Node.js**: 18 con npm cache
- **Testing**: Vitest con coverage, Jest-JUnit reporter
- **Quality**: ESLint con configuración personalizada
- **Build**: Vite con optimizaciones de producción

### Integration Testing

**Servicios Docker:**

- **Frontend**: React app en puerto 3000
- **Backend**: PHP API en puerto 8000
- **Database**: MySQL 8.0 en puerto 3306

**Proceso:**

1. Build de servicios con Docker Compose
2. Health checks automáticos (60s timeout)
3. Ejecución de tests de integración
4. Cleanup automático de recursos

### Security Scanning

**Trivy Scanner:**

- **Filesystem Scan**: Vulnerabilidades en código fuente
- **Docker Image Scan**: Vulnerabilidades en imágenes
- **SARIF Output**: Integración con GitHub Security tab
- **Automated Alerts**: Notificaciones automáticas de vulnerabilidades

## Flujo de Trabajo

### 1. Development Flow

```mermaid
graph LR
    A[Feature Branch] --> B[Local Testing]
    B --> C[Push to Branch]
    C --> D[CI Tests]
    D --> E[Pull Request]
    E --> F[Code Review]
    F --> G[Merge to Main]
    G --> H[Full Pipeline]
    H --> I[Deployment]
```

### 2. Pipeline Execution

**Push a Feature Branch:**

- ✅ Frontend tests
- ✅ Backend tests
- ✅ Security scan
- ❌ No deployment

**Pull Request:**

- ✅ Full testing suite
- ✅ Integration tests
- ✅ Security validation
- ✅ Coverage reports
- ❌ No deployment

**Push a Main:**

- ✅ All tests
- ✅ Security scan
- ✅ Docker build
- ✅ Staging deployment
- ✅ E2E tests
- ✅ Production deployment

## Métricas y Reportes

### Coverage Reports

**Backend (PHP):**

- **Tool**: PHPUnit con Xdebug
- **Format**: Clover XML
- **Upload**: Codecov con flag `backend`
- **Threshold**: 80% mínimo

**Frontend (React):**

- **Tool**: Vitest
- **Format**: LCOV
- **Upload**: Codecov con flag `frontend`
- **Threshold**: 80% mínimo

### Quality Metrics

**PHP Code Quality:**

```bash
composer cs    # PHP CodeSniffer
composer md    # PHP Mess Detector
composer test  # PHPUnit con coverage
```

**React Code Quality:**

```bash
npm run lint           # ESLint
npm run test:coverage  # Vitest con coverage
npm run build         # Production build
```

### Security Reports

**Trivy Scanning:**

- **Filesystem**: Vulnerabilidades en dependencias
- **Docker Images**: CVEs en imágenes base
- **SARIF Upload**: GitHub Security tab
- **Severity Levels**: Critical, High, Medium, Low

## Deployment Strategy

### Staging Environment

**Proceso:**

1. Build de Docker images optimizadas
2. Security scan de imágenes
3. Deploy a staging environment
4. Health checks automáticos
5. E2E tests en staging

### Production Deployment

**Condiciones:**

- ✅ Todos los tests pasan
- ✅ Security scan limpio
- ✅ E2E tests exitosos en staging
- ✅ Branch `main` únicamente

**Proceso:**

1. Blue-green deployment
2. Database migrations automáticas
3. Health checks post-deployment
4. Rollback automático en caso de fallo

## Configuración de Secrets

### GitHub Secrets Requeridos

```bash
# Database
DB_HOST=localhost
DB_DATABASE=naser_cms_test
DB_USERNAME=test_user
DB_PASSWORD=test_password

# Deployment
STAGING_HOST=staging.naser.com.mx
PRODUCTION_HOST=naser.com.mx
DEPLOY_KEY=<ssh-private-key>

# External Services
CODECOV_TOKEN=<codecov-token>
```

## Monitoreo y Alertas

### Pipeline Notifications

**Success:**

- ✅ Badge verde en README
- 📊 Coverage reports actualizados
- 🚀 Deployment confirmado

**Failure:**

- ❌ Badge rojo en README
- 📧 Notificación a desarrolladores
- 🔍 Logs detallados disponibles

### Health Checks

**Endpoints Monitoreados:**

- `GET /api/v1/health` - Backend health
- `GET /` - Frontend availability
- Database connectivity
- External services status

## Optimizaciones Implementadas

### Cache Strategy

**Dependencies:**

- **npm**: Cache de node_modules
- **Composer**: Cache de vendor/
- **Docker**: Layer caching

**Build Optimization:**

- **Frontend**: Vite con tree-shaking
- **Backend**: Composer optimized autoloader
- **Docker**: Multi-stage builds

### Parallel Execution

**Jobs Paralelos:**

- Frontend y Backend tests simultáneos
- Security scan independiente
- Integration tests después de unit tests

### Resource Management

**Timeouts:**

- **Unit Tests**: 10 minutos máximo
- **Integration Tests**: 15 minutos máximo
- **Deployment**: 20 minutos máximo

**Resource Limits:**

- **Memory**: 4GB por job
- **CPU**: 2 cores por job
- **Storage**: 14GB disponible

## Troubleshooting

### Fallos Comunes

**1. Database Connection Issues**

```bash
# Verificar servicio MySQL
docker-compose logs database

# Verificar conectividad
mysql -h 127.0.0.1 -u root -ptest_password -e "SHOW DATABASES;"
```

**2. Frontend Build Failures**

```bash
# Limpiar cache npm
npm ci --cache /tmp/empty-cache

# Verificar dependencias
npm audit --audit-level moderate
```

**3. Docker Build Issues**

```bash
# Limpiar Docker cache
docker system prune -f

# Rebuild sin cache
docker build --no-cache -t naser-frontend .
```

### Debug Mode

**Habilitar debug en CI:**

```yaml
- name: Debug CI Environment
  run: |
    echo "Node version: $(node --version)"
    echo "PHP version: $(php --version)"
    echo "Docker version: $(docker --version)"
    echo "Available memory: $(free -h)"
```

## 🔍 Pre-Commit Verification

### Nuevo Sistema de Verificación

El proyecto ahora incluye un **sistema completo de verificación pre-commit** que garantiza la calidad del código antes de cada commit:

**Script Principal**: `scripts/testing/pre-commit-verification.sh`

### Fases de Verificación

#### Fase 1: Testing Completo

- ✅ Tests backend (PHP/PHPUnit)
- ✅ Tests frontend (React/Vitest)
- ✅ Tests admin dashboard
- ✅ Verificación de cobertura

#### Fase 2: Linting y Code Quality

- ✅ ESLint para React/TypeScript
- ✅ PHP CodeSniffer para PHP
- ✅ PHP Mess Detector
- ✅ Verificación de estándares

#### Fase 3: Builds (Modo Full)

- ✅ Build frontend optimizado
- ✅ Build admin dashboard
- ✅ Verificación de dependencias backend
- ✅ Optimización de autoloader

#### Fase 4: Verificación Funcional

- ✅ Health checks de endpoints
- ✅ Conectividad de base de datos
- ✅ Estado de contenedores Docker
- ✅ Verificación de servicios

### Modos de Ejecución

```bash
# Verificación completa (recomendado)
./scripts/testing/pre-commit-verification.sh

# Verificación rápida (solo tests)
./scripts/testing/pre-commit-verification.sh --quick

# Verificación completa con builds
./scripts/testing/pre-commit-verification.sh --full

# Usando npm scripts
npm run pre-commit:check    # Verificación rápida
npm run pre-commit:full     # Verificación completa
```

### Reportes Generados

- **Reporte HTML**: Resumen visual completo
- **Logs Detallados**: Por cada fase de verificación
- **Markdown Summary**: Reporte ejecutivo
- **Instrucciones**: Pasos siguientes automáticos

### Integración con Workflow

**Flujo Recomendado:**

1. **Desarrollo**: Hacer cambios en código
2. **Pre-Commit**: Ejecutar verificación completa
3. **Corrección**: Resolver problemas identificados
4. **Commit**: Proceder solo si verificación pasa
5. **Push**: Activar CI/CD pipeline automático

### Beneficios

- 🚫 **Prevención**: Evita commits con problemas
- ⚡ **Velocidad**: Detección temprana de errores
- 📊 **Visibilidad**: Reportes detallados automáticos
- 🔄 **Consistencia**: Estándares uniformes de calidad
- 🛡️ **Confiabilidad**: Mayor estabilidad del código

## Próximas Mejoras

### Planned Enhancements

- [x] **Pre-Commit Verification**: Sistema completo implementado
- [ ] **Performance Testing**: Lighthouse CI integration
- [ ] **Visual Regression**: Percy.io para UI testing
- [ ] **Load Testing**: Artillery.io para stress testing
- [ ] **Monitoring**: Datadog integration
- [ ] **Notifications**: Slack/Discord webhooks

### Advanced Features

- [ ] **Feature Flags**: LaunchDarkly integration
- [ ] **A/B Testing**: Automated experiments
- [ ] **Canary Deployments**: Gradual rollouts
- [ ] **Multi-environment**: Dev, Staging, Production

---

**Última actualización**: 31 de julio de 2025  
**Mantenido por**: Warp (DevOps Specialist)  
**Revisado por**: Kiro (Orchestrator)
