# 🔍 Pre-Commit Verification Guide - Grupo Naser CMS

## 📋 Descripción General

El sistema de **Pre-Commit Verification** es una herramienta automatizada que garantiza la calidad del código y la estabilidad del sistema antes de cada commit. Este sistema ejecuta una suite completa de verificaciones que incluyen testing, linting, builds y verificación funcional.

## 🎯 Objetivos

- **Prevenir commits defectuosos** que puedan romper el sistema
- **Mantener estándares de calidad** consistentes en todo el proyecto
- **Detectar problemas tempranamente** antes de que lleguen al repositorio
- **Automatizar verificaciones** que tradicionalmente se hacían manualmente
- **Generar reportes detallados** para facilitar la resolución de problemas

## 🚀 Instalación y Configuración

### Prerrequisitos

- Docker y Docker Compose funcionando
- Node.js y npm instalados
- PHP y Composer configurados
- Contenedores del proyecto ejecutándose
- **🔒 Cumplimiento de la Política de Permisos de Archivos** (ver `.kiro/steering/file-permissions-policy.md`)

### Configuración Inicial

```bash
# 1. Asegurar que el script sea ejecutable
chmod +x scripts/testing/pre-commit-verification.sh

# 2. Verificar que los contenedores estén corriendo
docker-compose up -d

# 3. Instalar dependencias si es necesario (SIN sudo)
cd src/frontend && npm install
cd ../../api && composer install

# ⚠️ IMPORTANTE: NUNCA usar sudo para estos comandos
# ❌ sudo npm install
# ❌ sudo composer install
# ❌ sudo docker-compose up -d
```

## 📊 Fases de Verificación

### Fase 1: Testing Completo ✅

**Objetivo**: Ejecutar todos los tests unitarios y de integración

**Componentes verificados**:

- **Backend PHP**: PHPUnit con configuración completa
- **Frontend React**: Vitest con React Testing Library
- **Admin Dashboard**: Tests específicos del panel de administración

**Criterios de éxito**:

- Todos los tests deben pasar sin errores
- No debe haber tests fallidos o con warnings críticos
- Cobertura de código debe mantenerse en niveles aceptables

**Comandos ejecutados**:

```bash
# Backend
cd api && ./vendor/bin/phpunit --configuration phpunit.xml

# Frontend
cd src/frontend && npm test -- --watchAll=false --coverage=false

# Admin (si existe)
cd src/admin && npm test -- --watchAll=false --coverage=false
```

### Fase 2: Linting y Code Quality 🔍

**Objetivo**: Verificar que el código cumple con los estándares de calidad

**Herramientas utilizadas**:

- **ESLint**: Para código React/TypeScript
- **PHP CodeSniffer**: Para código PHP
- **PHP Mess Detector**: Para detección de problemas de diseño

**Criterios de éxito**:

- No debe haber errores de linting críticos
- Warnings deben estar en niveles aceptables
- Código debe seguir estándares PSR para PHP

**Comandos ejecutados**:

```bash
# Frontend linting
cd src/frontend && npm run lint

# Backend linting
cd api && composer cs

# Admin linting (si existe)
cd src/admin && npm run lint
```

### Fase 3: Builds 🏗️

**Objetivo**: Verificar que todas las aplicaciones se pueden construir correctamente

**Aplicaciones verificadas**:

- **Frontend React**: Build de producción con Vite
- **Admin Dashboard**: Build optimizado para producción
- **Backend PHP**: Optimización de autoloader y dependencias

**Criterios de éxito**:

- Builds deben completarse sin errores
- Assets deben generarse correctamente
- Optimizaciones deben aplicarse sin problemas

**Comandos ejecutados**:

```bash
# Frontend build
cd src/frontend && npm run build

# Admin build
cd src/admin && npm run build

# Backend optimization
cd api && composer install --no-dev --optimize-autoloader
```

### Fase 4: Verificación Funcional 🔧

**Objetivo**: Verificar que el sistema está operativo y los servicios responden

**Verificaciones realizadas**:

- **Health Checks**: Endpoints críticos del API
- **Conectividad**: Base de datos y servicios externos
- **Docker**: Estado de contenedores y servicios

**Criterios de éxito**:

- Todos los endpoints deben responder correctamente
- Base de datos debe estar accesible
- Contenedores deben estar en estado "Up"

**Comandos ejecutados**:

```bash
# Health checks
curl -f http://localhost:8000/api/v1/health
curl -f http://localhost:3000

# Database connectivity
docker exec naser_db mysql -u naser_user -pnaser_pass_2024 -e "SELECT 1" naser_cms

# Docker status
docker-compose ps
```

## 🎮 Modos de Ejecución

### Modo Completo (Recomendado)

```bash
./scripts/testing/pre-commit-verification.sh
```

**Incluye**: Todas las fases de verificación
**Tiempo estimado**: 3-5 minutos
**Uso recomendado**: Antes de commits importantes o releases

### Modo Rápido

```bash
./scripts/testing/pre-commit-verification.sh --quick
```

**Incluye**: Solo testing y linting
**Tiempo estimado**: 1-2 minutos
**Uso recomendado**: Verificaciones frecuentes durante desarrollo

### Modo Full

```bash
./scripts/testing/pre-commit-verification.sh --full
```

**Incluye**: Todas las fases + verificación funcional extendida
**Tiempo estimado**: 5-8 minutos
**Uso recomendado**: Antes de merges a main o deployment

## 📊 Reportes y Logs

### Estructura de Reportes

Los reportes se generan en `reports/pre-commit/[timestamp]/`:

```
reports/pre-commit/20250801_143022/
├── pre-commit-summary.md      # Reporte ejecutivo
├── backend-tests.log          # Log detallado tests PHP
├── frontend-tests.log         # Log detallado tests React
├── admin-tests.log            # Log detallado tests Admin
├── backend-lint.log           # Resultados linting PHP
├── frontend-lint.log          # Resultados linting React
├── admin-lint.log             # Resultados linting Admin
├── frontend-build.log         # Log build React
├── admin-build.log            # Log build Admin
└── backend-build.log          # Log dependencies PHP
```

### Reporte Ejecutivo

El archivo `pre-commit-summary.md` contiene:

- **Resumen de resultados** por fase
- **Estado final** de la verificación
- **Enlaces a logs detallados**
- **Instrucciones** para próximos pasos
- **Metadata** del proyecto y timestamp

### Interpretación de Resultados

**✅ PASS**: La fase se completó exitosamente
**❌ FAIL**: La fase falló y requiere atención
**⚠️ WARNING**: La fase completó con advertencias

## 🔄 Integración con Workflow

### Flujo Recomendado

```mermaid
graph TD
    A[Hacer cambios en código] --> B[git add .]
    B --> C[Ejecutar pre-commit verification]
    C --> D{¿Verificación exitosa?}
    D -->|Sí| E[git commit -m "mensaje"]
    D -->|No| F[Revisar logs de error]
    F --> G[Corregir problemas]
    G --> C
    E --> H[git push origin branch]
    H --> I[CI/CD Pipeline automático]
```

### Integración con Git Hooks

Para automatizar la verificación, se puede integrar con Git hooks:

```bash
# .git/hooks/pre-commit
#!/bin/bash
./scripts/testing/pre-commit-verification.sh --quick
```

### Integración con npm Scripts

El `package.json` incluye scripts convenientes:

```json
{
  "scripts": {
    "pre-commit:check": "./scripts/testing/pre-commit-verification.sh --quick",
    "pre-commit:full": "./scripts/testing/pre-commit-verification.sh --full",
    "pre-commit:verify": "./scripts/testing/pre-commit-verification.sh"
  }
}
```

## 🚨 Troubleshooting

### Problemas Comunes

#### 1. Tests de Backend Fallan

**Síntomas**:

- PHPUnit reporta tests fallidos
- Errores de conexión a base de datos
- Problemas de dependencias

**Soluciones**:

```bash
# Verificar dependencias
cd api && composer install

# Verificar configuración de BD
docker exec naser_db mysql -u root -p

# Ejecutar tests con debug
cd api && ./vendor/bin/phpunit --debug
```

#### 2. Tests de Frontend Fallan

**Síntomas**:

- Jest/Vitest reporta tests fallidos
- Errores de importación de módulos
- Problemas de configuración

**Soluciones**:

```bash
# Reinstalar dependencias
cd src/frontend && rm -rf node_modules && npm install

# Limpiar cache
npm test -- --clearCache

# Ejecutar con verbose
npm test -- --verbose
```

#### 3. Problemas de Linting

**Síntomas**:

- ESLint reporta errores de formato
- PHP CodeSniffer encuentra violaciones
- Estándares de código no se cumplen

**Soluciones**:

```bash
# Auto-fix ESLint
cd src/frontend && npm run lint -- --fix

# Auto-fix PHP CS
cd api && composer cs-fix

# Revisar configuración
cat .eslintrc.js
cat api/phpcs.xml
```

#### 4. Builds Fallan

**Síntomas**:

- Vite build falla
- Errores de TypeScript
- Problemas de assets

**Soluciones**:

```bash
# Limpiar cache de build
cd src/frontend && rm -rf dist && npm run build

# Verificar configuración TypeScript
npx tsc --noEmit

# Verificar configuración Vite
cat vite.config.ts
```

#### 5. Verificación Funcional Falla

**Síntomas**:

- Endpoints no responden
- Contenedores no están corriendo
- Base de datos no accesible

**Soluciones**:

```bash
# Reiniciar contenedores
docker-compose down && docker-compose up -d

# Verificar logs
docker-compose logs

# Verificar puertos
netstat -tulpn | grep :8000
netstat -tulpn | grep :3000
```

### Logs de Debug

Para obtener información detallada de debug:

```bash
# Ejecutar con logs verbosos
./scripts/testing/pre-commit-verification.sh --full 2>&1 | tee debug.log

# Verificar logs específicos
tail -f reports/pre-commit/latest/*.log

# Verificar estado de Docker
docker-compose ps
docker-compose logs --tail=50
```

## 📈 Métricas y Performance

### Tiempos de Ejecución Esperados

| Modo       | Tiempo Estimado | Fases Incluidas                          |
| ---------- | --------------- | ---------------------------------------- |
| **Quick**  | 1-2 minutos     | Tests + Linting                          |
| **Normal** | 3-5 minutos     | Tests + Linting + Builds                 |
| **Full**   | 5-8 minutos     | Todas las fases + Verificación extendida |

### Optimizaciones Implementadas

- **Cache de dependencias**: npm y composer cache
- **Ejecución paralela**: Tests independientes en paralelo
- **Skip de builds**: En modo quick para velocidad
- **Logs optimizados**: Solo errores en modo normal

### Métricas de Calidad

- **Cobertura de tests**: Mantenida automáticamente
- **Estándares de código**: Verificados en cada ejecución
- **Build success rate**: Monitoreado y reportado
- **Performance**: Tiempos de ejecución tracked

## 🔮 Próximas Mejoras

### Funcionalidades Planificadas

- [ ] **Integración con IDE**: Plugin para VS Code
- [ ] **Notificaciones**: Slack/Discord webhooks
- [ ] **Métricas avanzadas**: Dashboard de calidad
- [ ] **Cache inteligente**: Skip de fases sin cambios
- [ ] **Paralelización**: Ejecución simultánea de fases

### Integraciones Futuras

- [ ] **SonarQube**: Análisis de calidad avanzado
- [ ] **Codecov**: Reportes de cobertura automáticos
- [ ] **GitHub Actions**: Integración nativa
- [ ] **Husky**: Git hooks automáticos
- [ ] **Lint-staged**: Linting incremental

## 🤝 Contribución y Mantenimiento

### Para Desarrolladores

**Antes de cada commit**:

1. Ejecutar verificación completa
2. Revisar reportes generados
3. Corregir problemas identificados
4. Proceder con commit solo si pasa

**Para nuevas funcionalidades**:

1. Añadir tests correspondientes
2. Actualizar linting rules si es necesario
3. Verificar que builds funcionen
4. Documentar cambios

### Para DevOps

**Mantenimiento regular**:

- Actualizar dependencias de testing
- Optimizar tiempos de ejecución
- Monitorear métricas de calidad
- Actualizar configuraciones

**Monitoreo**:

- Revisar logs de fallos frecuentes
- Optimizar configuraciones problemáticas
- Actualizar documentación según necesidades

## 📞 Soporte

### Recursos de Ayuda

1. **Documentación**: Este archivo y `scripts/testing/README.md`
2. **Logs detallados**: En `reports/pre-commit/[timestamp]/`
3. **Configuraciones**: En archivos de configuración del proyecto
4. **Issues**: GitHub Issues para problemas específicos

### Contacto

Para problemas o mejoras del sistema:

1. **Revisar logs** en directorio de reportes
2. **Consultar troubleshooting** en esta documentación
3. **Verificar configuración** de Docker y servicios
4. **Crear issue** en GitHub con logs relevantes

---

**Desarrollado por**: Kiro (Orchestrator)  
**Basado en**: Sistema de Testing Automatizado de Warp  
**Proyecto**: Grupo Naser CMS  
**Versión**: 1.0  
**Fecha**: 1 de agosto de 2025
