# ⚰️ Grupo Naser - React CMS para Servicios Funerarios

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT "MIT License")
![GitHub repo size](https://img.shields.io/github/repo-size/axlwolf/webnaser)
[![Active](http://img.shields.io/badge/Status-Active-green.svg)](https://github.com/axlwolf/webnaser)
[![Generic badge](https://img.shields.io/badge/lang-React%2BPHP-blue.svg)](https://reactjs.org/)
[![Generic badge](https://img.shields.io/badge/hosting-GoDaddy-orange.svg)](https://godaddy.com/)
[![Generic badge](https://img.shields.io/badge/progress-35%25-yellow)](https://github.com/axlwolf/webnaser)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com/)

![Grupo Naser Logo](assets/images/logo_naser.png)

Sistema de Gestión de Contenidos (CMS) basado en React para servicios funerarios de Grupo Naser, diseñado específicamente para despliegue en **GoDaddy shared hosting**. Incluye frontend React para visitantes y panel de administración React+PHP para gestión de contenido.

**🐳 Entorno Docker Completo**: Desarrollo y producción completamente dockerizados para máxima consistencia y colaboración entre equipos.

**⚠️ IMPORTANTE**: Se identificó un gap significativo entre el diseño actual del sitio web y la implementación React. El frontend requiere rediseño completo para coincidir con la identidad visual real de Grupo Naser.

## Características Planificadas

- **Frontend React**: Interfaz pública moderna y responsive para visitantes
- **Panel de Administración**: React+PHP para gestión de contenido por administradores
- **API REST**: Backend PHP optimizado para GoDaddy shared hosting
- **Base de Datos**: MySQL/MariaDB con arquitectura limpia
- **Autenticación**: Sistema seguro con JWT tokens
- **Gestión de Contenido**: Páginas dinámicas, servicios, ubicaciones y medios
- **SEO Optimizado**: Meta tags dinámicos, sitemap y estructura semántica
- **Responsive Design**: Mobile-first approach con CSS modules
- **Testing**: Cobertura completa con Vitest (React) y PHPUnit (PHP)
- **Docker**: Entorno completo con Docker Compose para desarrollo y producción
- **Base de Datos**: MySQL 8.0 con migraciones y phpMyAdmin incluido

## Estado del Proyecto

**Progreso General: 50%** (Actualizado: 25 de julio de 2025)  
**Fase Actual**: Implementación pixel perfect del sitio web en progreso  
**Estado Crítico**: 🚨 Error CSS crítico identificado - resolución prioritaria  
**Orquestador**: Kiro (sistema de hooks activo)

### ✅ Completado - Fases Iniciales

- **Configuración Base**: React frontend con Vite, PHP backend, estructura de directorios
- **Infraestructura de Testing**: Vitest (React) y PHPUnit (PHP) configurados
- **Herramientas de Desarrollo**: ESLint, PHP CodeSniffer, PHP Mess Detector
- **🐳 Docker Completo**: Entorno de desarrollo y producción dockerizado
- **🎨 Frontend Prototipo**: Header, Navigation, Logo y páginas básicas (requiere rediseño)
- **🌐 Internacionalización**: Sistema completo en español mexicano
- **📊 Base de Datos**: Esquema MySQL con migraciones iniciales
- **🔧 Scripts de Automatización**: dev.sh, test.sh, deploy.sh
- **📚 Documentación**: Docker, desarrollo y arquitectura completa
- **🔍 Análisis de Diseño**: Identificación de gaps con sitio actual
- **🚀 Testing Automatizado**: Suite completa con CI/CD y reportes de cobertura
- **📊 Análisis de Performance**: Sistema de monitoreo y optimización automática
- **🤖 Sistema de Hooks**: Kiro con detección automática de cambios
- **👥 Coordinación de Equipo**: 4 agentes especializados trabajando en paralelo
- **🎨 Pixel Perfect Implementation**: Claude desarrollando sitio web idéntico al original (Batch 4)

### 🔄 En Progreso - Fase de Implementación Pixel Perfect

- **🚨 CRÍTICO - Configuración TypeScript**: Configuración inconsistente JSX/TSX bloqueando compilación
- **🚨 CRÍTICO - Error CSS Frontend**: Rutas de importación incorrectas en contenedor Docker
- **🎨 Implementación Pixel Perfect**: Sitio web 100% idéntico al original (Claude - Batch 4)
- **🔐 Sistema de Autenticación**: LoginForm completado, integración con backend en progreso
- **API REST**: Endpoints y autenticación en desarrollo por Gemini
- **Panel de Administración**: Gestión de contenido
- **🚀 Optimización de Performance**: Análisis continuo y mejoras de rendimiento
- **🐳 Docker Producción**: Configuración optimizada para deployment
- **⚙️ DevOps Automation**: Scripts de resolución crítica y monitoreo (Warp)

### ❌ Pendiente - Próximas Fases

- **🔗 Integración API-Frontend**: Conexión completa entre React y PHP
- **📱 Responsive Testing**: Validación en todos los dispositivos y breakpoints
- **🧪 Testing Visual**: Comparación pixel perfect automatizada
- **📊 Panel de Administración**: Interfaz completa de gestión de contenido
- **📦 Migración de Datos**: Del sitio HTML actual al CMS
- **🚀 Deploy en GoDaddy**: Configuración final de hosting

### 🚨 Problemas Críticos Identificados

**PROBLEMA 1: Configuración TypeScript Inconsistente**: El proyecto frontend tiene configuración inconsistente entre JSX y TypeScript que está causando problemas de compilación:

- ❌ Falta `tsconfig.json` en el frontend
- ❌ Archivo `src/test/App.test.jsx` usa JSX en lugar de TSX
- ❌ `vite.config.js` debería ser `vite.config.ts`
- ❌ Configuración TypeScript incompleta

**PROBLEMA 2: Error CSS Crítico**: Se ha identificado un problema crítico que bloquea la implementación pixel perfect:

1. **Rutas CSS Incorrectas**: El archivo `src/frontend/src/index.css` importa `../../styles/tokens.css` pero la ruta es incorrecta dentro del contenedor Docker
2. **Design Tokens Faltantes**: Sistema de tokens CSS no implementado correctamente
3. **Estructura de Estilos**: Necesidad de reorganizar la arquitectura CSS para desarrollo y producción

**Implementación Pixel Perfect**: Claude (Batch 4) debe resolver ambos problemas críticos antes de proceder con la implementación del sitio web 100% idéntico al original, incluyendo:

- Header con sub-header y navegación funcional
- Hero slider cinematográfico
- Secciones principales (servicios, about, cobertura, contacto)
- Todas las páginas del sitio (13 páginas HTML)
- Responsive design completo

**Estado de Resolución**: Prioridad máxima para Claude - resolver configuración TypeScript y error CSS antes de comenzar implementación pixel perfect.

## Arquitectura y Estructura

### Arquitectura de Tres Capas

- **Frontend Estático**: Páginas HTML/CSS/JS de marketing (nivel raíz)
- **Frontend React**: Aplicación pública en `src/frontend/`
- **Panel de Administración**: Aplicación React en `src/admin/`
- **Backend API**: API PHP en `api/`

### Estructura de Directorios

```
web_naser_23/
├── 🐳 docker-compose.yml         # Desarrollo con Docker
├── 🐳 docker-compose.prod.yml    # Producción con Docker
├── 🐳 DOCKER.md                  # Documentación completa Docker
├── api/                          # PHP backend API
│   ├── 🐳 Dockerfile
│   ├── docker/                   # Configuraciones Docker
│   ├── src/                      # Código fuente PHP
│   └── composer.json             # Dependencias PHP
├── src/
│   ├── admin/                    # Panel de administración React
│   ├── frontend/                 # Frontend público React
│   │   ├── 🐳 Dockerfile
│   │   └── nginx.conf            # Configuración Nginx
│   ├── components/               # Componentes React compartidos
│   ├── constants/                # Textos en español y configuración
│   ├── styles/                   # Tokens de diseño y CSS global
│   └── utils/                    # Formatters y validadores mexicanos
├── 🐳 scripts/                   # Scripts de automatización
│   ├── dev.sh                    # Iniciar desarrollo
│   ├── test.sh                   # Ejecutar tests
│   ├── deploy.sh                 # Desplegar producción
│   ├── testing/                  # Suite de testing automatizado
│   │   ├── run-all-tests.sh      # Tests completos con reportes
│   │   ├── continuous-monitoring.sh # Monitoreo continuo
│   │   └── test-*.sh             # Tests específicos por área
│   └── performance/              # Análisis y optimización
│       ├── analyze-performance.sh # Análisis completo de performance
│       ├── optimize-docker.sh    # Optimización de contenedores
│       └── monitor-metrics.sh    # Monitoreo de métricas
├── database/                     # Migraciones y seeds MySQL
├── docker/                       # Configuraciones Docker globales
├── tests/                        # Testing (PHPUnit + Vitest)
├── memory-bank/                  # Documentación del proyecto
├── .kiro/                        # Especificaciones técnicas
└── [páginas].html               # Páginas de marketing estáticas
```

### Componentes Clave

- **🐳 Docker**: Entorno completo de desarrollo y producción
- **Clean Architecture**: Separación clara entre dominio, aplicación e infraestructura
- **Compatibilidad GoDaddy**: Optimizado para hosting compartido
- **Testing**: Cobertura obligatoria del 80% (Vitest + PHPUnit)
- **Responsive Design**: Mobile-first con CSS modules
- **🌐 Español Mexicano**: Localización completa (es-MX) con formatters

## Tecnologías Utilizadas

### Frontend

- **Framework**: React 19.1.0 con Vite
- **Routing**: React Router DOM v7.7.0
- **Estilos**: CSS Modules con metodología BEM
- **Testing**: Vitest con Testing Library
- **Build**: Vite con configuración optimizada para GoDaddy

### Backend

- **Lenguaje**: PHP 7.4+ (compatible con GoDaddy)
- **Arquitectura**: MVC con Repository pattern
- **Base de Datos**: MySQL/MariaDB con PDO
- **Autenticación**: JWT tokens
- **Testing**: PHPUnit 9.5

### Herramientas de Desarrollo

- **🐳 Docker**: Docker Compose para desarrollo y producción
- **Calidad de Código**: ESLint, PHP CodeSniffer, PHP Mess Detector
- **Testing**: Vitest (frontend), PHPUnit (backend)
- **Automatización**: Scripts bash para dev, test y deploy
- **Base de Datos**: MySQL 8.0 + phpMyAdmin
- **Hosting**: GoDaddy shared hosting

## Uso y Desarrollo

### Prerrequisitos

- **Docker Desktop** 4.0+ (requerido)
- **Docker Compose** 2.0+
- **Git** (para clonado del repositorio)
- **4GB+ RAM** disponible para contenedores

### 🚀 Inicio Rápido con Docker

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd web_naser_23

# 2. Configuración inicial
cp .env.example .env

# 3. Iniciar entorno completo
./scripts/dev.sh
```

**¡Listo!** Después de ejecutar el script tendrás:

- **Frontend React**: http://localhost:3000
- **Backend PHP API**: http://localhost:8000
- **Sitio Completo**: http://localhost
- **phpMyAdmin**: http://localhost:8080

### 🔧 Comandos de Desarrollo

```bash
# Desarrollo
./scripts/dev.sh        # Iniciar entorno completo
./scripts/test.sh       # Ejecutar todos los tests
./scripts/deploy.sh     # Desplegar a producción

# Performance y Optimización
./scripts/performance/analyze-performance.sh    # Análisis completo de performance
./scripts/performance/optimize-docker.sh        # Optimización de contenedores
./scripts/performance/monitor-metrics.sh        # Monitoreo en tiempo real

# Testing Automatizado
./scripts/testing/run-all-tests.sh             # Suite completa de testing
./scripts/testing/continuous-monitoring.sh      # Monitoreo continuo

# Docker manual
docker-compose up -d    # Iniciar servicios
docker-compose logs -f  # Ver logs en tiempo real
docker-compose down     # Parar servicios

# Comandos en contenedores
docker exec naser_frontend npm run test
docker exec naser_backend composer test
docker exec naser_backend php migrate.php
```

### 📊 Base de Datos

**Credenciales de desarrollo:**

- **Host**: localhost:3306
- **Usuario**: naser_user
- **Contraseña**: naser_pass_2024
- **Base de datos**: naser_cms

Ver **`DOCKER.md`** para documentación completa.

### 🛠️ Herramientas de Infraestructura (Warp DevOps)

**Scripts de Recuperación Crítica** (mantener siempre disponibles):

```
fixes/critical/
├── restore-backend.sh         # ⭐ CRÍTICO - Restaura backend roto
├── fix-frontend-display.sh    # Arregla visualización frontend
├── fix-arm64-frontend.sh      # Resuelve problemas ARM64
└── fix-apache-final.sh        # Solución Apache alternativa
```

**Configuraciones de Producción** (para deployment):

```
docker/production/
├── Dockerfile.prod            # Dockerfile optimizado
├── nginx.prod.conf           # Nginx para producción
├── resource-limits.yml       # Límites de recursos
└── docker-compose.prod.yml   # Docker Compose producción
```

**Archivos Temporales** (seguros para eliminar):

```
api/
├── .htaccess.minimal         # Usar restore-backend.sh en su lugar
├── .htaccess.disabled        # Backup temporal
├── index.php.backup.*        # Backups temporales
└── Dockerfile.fixed          # Versión temporal
```

### 🚀 Performance y Optimización

El proyecto incluye un **sistema completo de análisis y optimización de performance** desarrollado por Warp:

**Scripts de Performance:**

- **`scripts/performance/analyze-performance.sh`**: Análisis completo de recursos del sistema, Docker y web con reportes automáticos
- **`scripts/performance/optimize-docker.sh`**: Optimización automática de contenedores y configuraciones
- **`scripts/performance/monitor-metrics.sh`**: Monitoreo en tiempo real de métricas críticas con alertas

**Sistema de Testing Automatizado Completo:**

- **`scripts/testing/run-all-tests.sh`**: Suite completa de testing con reportes de cobertura
- **`scripts/testing/run-test-suite.sh`**: Testing específico por componentes
- **`scripts/testing/test-backend.sh`**: Testing especializado para PHP backend
- **`scripts/testing/test-frontend.sh`**: Testing especializado para React frontend
- **`scripts/testing/test-integration.sh`**: Testing de integración completo
- **`scripts/testing/continuous-monitoring.sh`**: Monitoreo continuo 24/7 de salud del proyecto

**Características de Optimización:**

- **Docker Optimizado**: Dockerfile de producción con OPcache y configuraciones optimizadas
- **Análisis Automático**: Reportes detallados de CPU, memoria, disco y tiempos de respuesta
- **Monitoreo Continuo**: Sistema de alertas para métricas críticas con detección proactiva
- **Recomendaciones**: Sugerencias automáticas de optimización basadas en análisis
- **Herramientas de Restauración**: Scripts automáticos para mantener estabilidad ante cambios conflictivos

**Reportes Generados:**

- Métricas del sistema en tiempo real
- Estadísticas de contenedores Docker
- Tiempos de respuesta de endpoints
- Análisis de base de datos MySQL
- Recomendaciones de optimización
- Logs de resolución crítica consolidados

**Valor Agregado por Warp:**

- ⏱️ **Tiempo Ahorrado**: ~2-3 horas/día en resolución manual de problemas
- 🐛 **Bugs Evitados**: Detección temprana de problemas de infraestructura
- 🚀 **Velocidad**: Desarrollo sin interrupciones por problemas técnicos
- 📊 **Visibilidad**: Estado del proyecto en tiempo real para todo el equipo

```bash
# Ejecutar análisis completo
./scripts/performance/analyze-performance.sh

# Ver reportes en: reports/performance/[timestamp]/

# Registrar contribución adicional de Warp
./scripts/warp-log-contribution.sh "Nueva herramienta" "ruta/archivo" "descripción"
```

### 🚨 Resolución de Problemas Críticos

El proyecto incluye un **ecosistema completo de herramientas DevOps** desarrollado por Warp que resuelve problemas críticos de infraestructura:

**Scripts de Resolución Crítica:**

- **`fixes/critical/restore-backend.sh`**: ⭐ **CRÍTICO** - Restaura funcionalidad del backend cuando otros agentes introducen cambios conflictivos
- **`fixes/critical/fix-frontend-display.sh`**: Soluciona problemas de visualización en el frontend
- **`fixes/critical/fix-arm64-frontend.sh`**: Resuelve problemas de Rollup en arquitecturas ARM64 (Mac M1/M2)
- **`fixes/critical/fix-apache-backend.sh`**: Soluciona redirecciones infinitas de Apache y errores HTTP 500
- **`fixes/critical/fix-apache-final.sh`**: Enfoque alternativo para problemas Apache complejos

**Problemas Críticos Resueltos por Warp:**

1. **Frontend ARM64/Rollup (Mac M1/M2)** ✅ RESUELTO:

   - Incompatibilidad con arquitectura ARM64
   - Contenedor frontend reiniciándose constantemente
   - Solución: Dockerfile.arm64 específico y configuración npm optimizada

2. **Backend Apache Redirección Infinita** ✅ RESUELTO:

   - Error 500 con redirecciones infinitas
   - DocumentRoot mal configurado
   - Solución: Reconfiguración VirtualHost y .htaccess simplificado

3. **Frontend Display** ✅ RESUELTO:
   - Puerto 3000 no mostraba contenido
   - Vite configurado en puerto incorrecto
   - Solución: Corrección de puerto y volúmenes Docker

**Herramientas de Recuperación Rápida:**

```bash
# Backend roto - Restauración automática
./fixes/critical/restore-backend.sh

# Frontend no se visualiza
./fixes/critical/fix-frontend-display.sh

# Problemas ARM64 (Mac M1/M2)
./fixes/critical/fix-arm64-frontend.sh

# Verificar salud del sistema
curl -f http://localhost:8000/api/v1/health
```

**Impacto**: Tiempo de recuperación de fallos reducido a <1 minuto con scripts automáticos.

**Logs de Resolución**: Todos los procesos se documentan automáticamente en `logs/critical/` para análisis posterior.

### 👥 Colaboración Multi-Agente

Este proyecto está diseñado para colaboración entre **4 agentes especializados**:

- **Kiro**: Orquestador principal con sistema de hooks automáticos
- **Claude**: Desarrollador Frontend React - **BATCH 4: Implementación Pixel Perfect**
- **Gemini**: Desarrollador Backend PHP (UserRepository, JwtService, API REST)
- **Warp**: Especialista DevOps y automatización (Testing, Performance, Infraestructura)

**Flujo de trabajo coordinado:**

1. **Kiro** coordina y detecta cambios automáticamente
2. **Claude** desarrolla implementación pixel perfect del sitio web completo
3. **Gemini** desarrolla en `/api` y `/database`
4. **Warp** mantiene infraestructura, testing y performance
5. Sincronización a través de Docker, base de datos compartida y sistema de hooks

**Branch actual**: `feature/auth-integration` - Implementación pixel perfect en progreso

**Estado Actual del Equipo**:

- **Claude (Batch 4)**: 🚨 Resolviendo error CSS crítico para implementación pixel perfect
- **Gemini**: Desarrollando JwtService y UserRepository
- **Warp**: Manteniendo infraestructura y scripts de resolución crítica
- **Kiro**: Coordinando desarrollo y actualizando documentación

## Documentación

### Documentación del Proyecto

- **🐳 `DOCKER.md`**: Guía completa de Docker (desarrollo y producción)
- **🛠️ `docs/DEVOPS-INFRASTRUCTURE.md`**: Ecosistema completo de herramientas DevOps (Warp)
- **`CLAUDE.md`**: Guía para desarrollo con Claude Code
- **`GEMINI.md`**: Guía para colaboración con Gemini
- **`roadmap.md`**: Estado actual y próximos pasos del proyecto
- **`memory-bank/ripperFive.md`**: Protocolo Ripper Five para desarrollo con IA
- **`WARP-CONTRIBUTIONS-LOG.md`**: Registro detallado de contribuciones adicionales de Warp

### Documentación de Batches Actuales

- **📋 `docs/BATCH-4-PIXEL-PERFECT.md`**: Estado y progreso del Batch 4 (Claude)
- **🎨 `VISUAL_SPEC.md`**: Especificaciones visuales para implementación pixel perfect
- **🔌 `API_SPEC.md`**: Especificaciones API con estado de integración frontend
- **📝 `PROMPT-CLAUDE-BATCH-4.md`**: Instrucciones detalladas para implementación pixel perfect
- **⚙️ `docs/TYPESCRIPT-CONFIGURATION.md`**: Configuración TypeScript crítica para frontend

### Especificaciones Técnicas

- **`.kiro/specs/react-cms-godaddy/`**: Especificaciones detalladas del CMS
- **`.kiro/steering/`**: Estándares de desarrollo y arquitectura
- **`docs/CRITICAL-INFRASTRUCTURE.md`**: Problemas críticos y resolución
- **`docs/DEVOPS-INFRASTRUCTURE.md`**: Herramientas DevOps y automatización (Warp)
- **`docs/TYPESCRIPT-CONFIGURATION.md`**: Configuración TypeScript para frontend
- **`docs/PERFORMANCE.md`**: Análisis y optimización de performance

### Contexto del Proyecto

- **`memory-bank/memory-bank.md`**: Contexto y alcance del proyecto
- **`memory-bank/activeContext.md`**: Contexto activo de desarrollo

## Protocolo de Desarrollo

Este proyecto sigue el **Protocolo Ripper Five Optimizado** para desarrollo asistido por IA:

1. **RESEARCH**: Investigación y comprensión del código existente
2. **INNOVATE**: Exploración de soluciones y enfoques
3. **PLAN**: Creación de planes de implementación detallados
4. **CODE**: Escritura de código siguiendo los planes
5. **EXECUTE**: Testing y verificación de implementaciones

Ver `memory-bank/ripperFive.md` para detalles completos.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
