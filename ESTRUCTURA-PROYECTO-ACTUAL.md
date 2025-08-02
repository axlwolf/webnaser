# 📁 ESTRUCTURA ACTUAL DEL PROYECTO - GRUPO NASER CMS

## 📊 INFORMACIÓN GENERAL

**Fecha**: 1 de agosto de 2025  
**Proyecto**: Grupo Naser CMS - React + PHP  
**Estado**: ~45% completado  
**Agentes activos**: Claude, Gemini, Warp, Qwen

---

## 🏗️ ESTRUCTURA PRINCIPAL

```
web_naser_23/
├── 📁 .github/                    # GitHub Actions y workflows
├── 📁 .husky/                     # Git hooks con Husky
├── 📁 .kiro/                      # Configuración Kiro IDE
├── 📁 .gemini/                    # Configuración agente Gemini
├── 📁 .qwen/                      # Configuración agente Qwen
├── 📁 api/                        # Backend PHP (APIs REST)
├── 📁 assets/                     # Assets estáticos originales
├── 📁 contracts/                  # Contratos y tipos compartidos
├── 📁 database/                   # Migraciones y seeds
├── 📁 design-reference/           # Referencias de diseño
├── 📁 docker/                     # Configuraciones Docker
├── 📁 docs/                       # Documentación del proyecto
├── 📁 fixes/                      # Scripts de corrección
├── 📁 logs/                       # Logs del sistema
├── 📁 memory-bank/                # Banco de memoria del proyecto
├── 📁 monitoring/                 # Configuraciones de monitoreo
├── 📁 optimization/               # Optimizaciones
├── 📁 public/                     # Archivos públicos estáticos
├── 📁 reports/                    # Reportes de testing y performance
├── 📁 scripts/                    # Scripts de automatización
├── 📁 secrets/                    # Archivos de configuración sensibles
├── 📁 src/                        # Código fuente principal
├── 📁 tests/                      # Tests unitarios e integración
├── 📄 *.html                      # Páginas HTML originales (13 archivos)
├── 📄 .env                        # Variables de entorno
├── 📄 docker-compose.yml          # Configuración Docker Compose
├── 📄 package.json                # Dependencias Node.js raíz
└── 📄 README.md                   # Documentación principal
```

---

## 🎨 FRONTEND - src/frontend/

```
src/frontend/
├── 📁 public/                     # Assets públicos
│   └── 📁 assets/images/          # Imágenes del frontend
├── 📁 src/                        # Código fuente React
│   ├── 📁 auth/                   # Sistema de autenticación
│   │   ├── 📁 components/         # Componentes de auth
│   │   │   ├── 📁 LoginForm/      # ✅ Componente login completo
│   │   │   └── 📁 LogoutButton/   # ✅ Componente logout
│   │   ├── 📁 context/            # Context de autenticación
│   │   ├── 📁 hooks/              # Hooks de auth
│   │   ├── 📁 services/           # Servicios de auth
│   │   └── 📁 types/              # Tipos TypeScript
│   ├── 📁 components/             # Componentes React
│   │   ├── 📁 atoms/              # Componentes atómicos
│   │   │   ├── 📁 Button/         # ✅ Componente botón
│   │   │   └── 📁 Logo/           # ✅ Componente logo
│   │   ├── 📁 layout/             # Componentes de layout
│   │   │   ├── 📁 Footer/         # Footer del sitio
│   │   │   ├── 📁 Header/         # ✅ Header principal
│   │   │   ├── 📁 Layout/         # Layout base
│   │   │   ├── 📁 MainHeader/     # Header principal
│   │   │   └── 📁 TopBar/         # Barra superior
│   │   ├── 📁 molecules/          # Componentes moleculares
│   │   │   └── 📁 Navigation/     # ✅ Navegación
│   │   └── 📁 organisms/          # Componentes complejos
│   │       ├── 📁 Header/         # Header completo
│   │       └── 📁 HeroSlider/     # 🔄 Hero slider (en progreso)
│   ├── 📁 pages/                  # Páginas React
│   │   └── 📁 Home/               # Página de inicio
│   ├── 📁 services/               # Servicios API
│   ├── 📁 styles/                 # ✅ Estilos CSS
│   │   ├── 📄 colors.css          # ✅ Colores del sistema
│   │   ├── 📄 globals.css         # ✅ Estilos globales
│   │   ├── 📄 tokens.css          # ✅ Design tokens
│   │   └── 📄 typography.css      # ✅ Tipografía
│   ├── 📁 types/                  # Tipos TypeScript
│   └── 📁 utils/                  # Utilidades
├── 📄 tsconfig.json               # ✅ Configuración TypeScript
├── 📄 vite.config.ts              # ✅ Configuración Vite
├── 📄 package.json                # Dependencias frontend
└── 📄 vitest.config.js            # Configuración testing
```

---

## 🔧 BACKEND - api/

```
api/
├── 📁 controllers/                # ✅ Controladores REST
│   ├── 📄 AuthController.php      # ✅ Autenticación JWT
│   ├── 📄 ContentController.php   # ✅ Gestión de contenido
│   ├── 📄 LocationController.php  # ✅ Gestión de ubicaciones
│   ├── 📄 MediaController.php     # ✅ Gestión de medios
│   ├── 📄 ObituaryController.php  # ✅ Gestión de obituarios
│   ├── 📄 PageController.php      # ✅ Gestión de páginas
│   └── 📄 ServiceController.php   # ✅ Gestión de servicios
├── 📁 core/                       # Clases core del sistema
│   ├── 📄 Database.php            # ✅ Conexión base de datos
│   └── 📄 Router.php              # ✅ Sistema de rutas
├── 📁 exceptions/                 # ✅ Manejo de errores (NUEVO)
├── 📁 middleware/                 # Middleware de la aplicación
│   └── 📄 AuthMiddleware.php      # ✅ Middleware JWT
├── 📁 models/                     # Modelos de datos
│   └── 📁 interfaces/             # Interfaces de modelos
├── 📁 repositories/               # ✅ Repositorios de datos
│   └── 📄 UserRepository.php      # ✅ Repositorio de usuarios
├── 📁 routes/                     # Definición de rutas
│   └── 📄 api.php                 # ✅ Rutas API principales
├── 📁 services/                   # Servicios de negocio
├── 📁 utils/                      # Utilidades PHP
├── 📁 validators/                 # ✅ Validadores (NUEVO)
├── 📁 v1/                         # Versionado API v1
├── 📄 index.php                   # ✅ Entry point API
├── 📄 config.php                  # ✅ Configuración principal
├── 📄 composer.json               # ✅ Dependencias PHP
└── 📄 .htaccess                   # ✅ Configuración Apache
```

---

## 🎛️ ADMIN DASHBOARD - src/admin/

```
src/admin/                         # 🆕 Dashboard administrativo (Qwen)
├── 📁 components/                 # Componentes admin
│   ├── 📁 auth/                   # Autenticación admin
│   ├── 📁 common/                 # Componentes comunes
│   └── 📁 layout/                 # Layout admin
├── 📁 context/                    # Context admin
├── 📁 hooks/                      # Hooks admin
├── 📁 pages/                      # Páginas admin
├── 📁 services/                   # Servicios admin
├── 📁 src/                        # Código fuente admin
└── 📁 utils/                      # Utilidades admin
```

---

## 🐳 DOCKER & DEVOPS

```
docker/
├── 📁 backend/                    # Configuración Docker backend
│   └── 📄 Dockerfile.prod         # ✅ Docker producción PHP
├── 📁 frontend/                   # Configuración Docker frontend
│   └── 📄 Dockerfile.prod         # ✅ Docker producción React
├── 📁 nginx/                      # Configuración Nginx
│   └── 📄 default.conf            # Configuración Nginx
├── 📁 production/                 # ✅ Configuración producción
│   ├── 📄 docker-compose.prod.yml # Docker Compose producción
│   ├── 📄 Dockerfile.prod         # Dockerfile optimizado
│   ├── 📄 logging.conf            # Configuración logs
│   ├── 📄 nginx.prod.conf         # Nginx producción
│   └── 📄 resource-limits.yml     # Límites de recursos
└── 📁 testing/                    # ✅ Configuración testing
    ├── 📄 docker-compose.test.yml # Docker Compose testing
    ├── 📄 Dockerfile.test         # Dockerfile testing
    └── 📄 entrypoint-test.sh      # Script entrada testing
```

---

## 🧪 TESTING

```
tests/
├── 📁 e2e/                        # Tests end-to-end
│   ├── 📁 admin/                  # Tests admin dashboard
│   └── 📁 public/                 # Tests sitio público
├── 📁 integration/                # Tests de integración
│   ├── 📁 api/                    # ✅ Tests API endpoints
│   ├── 📁 auth/                   # ✅ Tests autenticación
│   ├── 📁 components/             # Tests componentes
│   └── 📁 database/               # ✅ Tests base de datos
└── 📁 unit/                       # Tests unitarios
    ├── 📁 backend/                # ✅ Tests backend PHP
    ├── 📁 controllers/            # ✅ Tests controladores
    └── 📁 frontend/               # Tests frontend React

scripts/testing/
├── 📄 run-all-tests.sh            # Suite completa de testing
├── 📄 run-test-suite.sh           # Orquestador maestro
├── 📄 test-backend.sh             # Tests específicos PHP
├── 📄 test-frontend.sh            # Tests específicos React
├── 📄 test-integration.sh         # Tests de integración
├── 📄 continuous-monitoring.sh    # Monitoreo continuo
├── 📄 pre-commit-verification.sh  # 🆕 Verificación pre-commit
└── 📄 README.md                   # Documentación testing
```

---

## 🔄 CI/CD & AUTOMATION

```
.github/workflows/
├── 📄 ci-cd.yml                   # ✅ Pipeline CI/CD principal
└── 📄 ci-tests.yml               # Pipeline de testing

scripts/
├── 📁 emergency/                  # Scripts de emergencia
├── 📁 performance/                # Scripts de performance
├── 📁 testing/                    # Scripts de testing
├── 📄 archive-prompts.sh          # ✅ Archivado de prompts
├── 📄 deploy.sh                   # Script de deployment
├── 📄 dev.sh                      # Script desarrollo
└── 📄 test.sh                     # Script testing
```

---

## 📊 CONFIGURACIÓN & DATOS

```
database/
├── 📁 migrations/                 # ✅ Migraciones de BD
│   ├── 📄 001_create_users_table.sql
│   ├── 📄 002_create_pages_table.sql
│   ├── 📄 003_create_services_table.sql
│   ├── 📄 004_create_locations_table.sql
│   ├── 📄 005_create_obituaries_table.sql
│   └── 📄 006_create_media_table.sql
└── 📁 seeds/                      # Seeds de datos

contracts/
├── 📁 api/                        # ✅ Contratos API
├── 📁 events/                     # Contratos de eventos
├── 📁 schemas/                    # Esquemas de datos
└── 📁 types/                      # ✅ Tipos compartidos
```

---

## 🎯 KIRO IDE CONFIGURATION

```
.kiro/
├── 📁 hooks/                      # ✅ Sistema de hooks
│   ├── 📁 logs/                   # Logs de hooks
│   ├── 📄 claude-changes-detector.kiro.hook
│   ├── 📄 gemini-changes-detector.kiro.hook
│   ├── 📄 warp-integration-hook.kiro.hook
│   └── 📄 start-hook-system.sh    # ✅ Sistema de monitoreo
├── 📁 settings/                   # Configuraciones Kiro
├── 📁 specs/                      # Especificaciones del proyecto
│   └── 📁 react-cms-godaddy/      # Spec principal del CMS
└── 📁 steering/                   # Reglas de steering
```

---

## 📄 PÁGINAS HTML ORIGINALES (13 archivos)

```
Páginas del sitio original:
├── 📄 index.html                  # Página principal
├── 📄 nosotros.html               # Acerca de nosotros
├── 📄 servicios.html              # Servicios principales
├── 📄 contacto.html               # Información de contacto
├── 📄 historia.html               # Historia de la empresa
├── 📄 prevision.html              # Previsión funeraria
├── 📄 necesidad-inmediata.html    # Servicios urgentes
├── 📄 obituario.html              # Obituarios
├── 📄 naser_tlalpan.html          # Sucursal Tlalpan
├── 📄 naser_morelos.html          # Sucursal Morelos
├── 📄 naser_oaxaca.html           # Sucursal Oaxaca
├── 📄 naser_aragon.html           # Sucursal Aragón
└── 📄 one-page.html               # Vista de una página
```

---

## 📈 ESTADO DE COMPLETITUD POR ÁREA

### ✅ COMPLETADO (Verde)

- **Backend APIs**: 80% - Controladores principales implementados
- **Autenticación**: 90% - Sistema JWT completo
- **Docker**: 70% - Configuraciones de producción listas
- **CI/CD**: 60% - Pipeline básico funcionando
- **Design Tokens**: 100% - Sistema completo implementado
- **Testing Infrastructure**: 80% - Tests unitarios e integración

### 🔄 EN PROGRESO (Amarillo)

- **Frontend Components**: 40% - Header y componentes base
- **Admin Dashboard**: 10% - Estructura inicial (Qwen)
- **Page Conversion**: 20% - Algunas páginas convertidas
- **Error Handling**: 60% - Sistema parcialmente implementado

### ⏳ PENDIENTE (Rojo)

- **Hero Slider**: 0% - Por implementar
- **Página Conversions**: 60% - 8 de 13 páginas pendientes
- **Media Management**: 30% - Sistema básico
- **User Management**: 40% - CRUD básico
- **SEO Optimization**: 20% - Meta tags básicos

---

## 🎯 PRÓXIMOS PASOS CRÍTICOS

### Para Claude (Frontend)

1. Completar corrección de errores CSS
2. Implementar Hero Slider cinematográfico
3. Convertir páginas HTML restantes a React

### Para Gemini (Backend)

1. Completar sistema de validadores
2. Finalizar manejo de errores centralizado
3. Completar tests de controladores

### Para Warp (DevOps)

1. Implementar sistema de backup automatizado
2. Configurar monitoreo avanzado
3. Preparar deployment a GoDaddy

### Para Qwen (Admin Dashboard)

1. Implementar sistema de autenticación admin
2. Crear dashboard principal con métricas
3. Desarrollar CRUD para gestión de contenido

### Para Kiro (Orquestador)

1. **Evaluar implementación de enfoque híbrido de prompts** basado en análisis JSON vs Natural Language
2. Implementar metadata JSON para tracking automático de tareas
3. Mantener efectividad actual de prompts en lenguaje natural

---

## 📊 ANÁLISIS DE METODOLOGÍA DE PROMPTS

**Documento**: `ANALISIS-PROMPTS-JSON-VS-NATURAL.md`  
**Estado**: ✅ Análisis completado  
**Recomendación**: Enfoque híbrido evolutivo

### 🔍 Hallazgos Principales

#### ✅ Ventajas del Formato JSON

- Estructura y parseo automático
- Validación con JSON Schema
- Automatización y tooling
- Métricas de éxito claramente definidas

#### ❌ Limitaciones del Formato JSON

- Pérdida de contexto humano y motivación
- Rigidez que puede limitar creatividad
- Complejidad de mantenimiento de schemas

#### 🎯 Enfoque Híbrido Recomendado

**FASE 1: Mantener Markdown + Agregar Metadata JSON**

```markdown
---
agent: claude
batch: 5
priority: critical
estimated_hours: 4-6
---

# PROMPT CLAUDE - BATCH 5: Resolución Crítica

[Contexto rico en lenguaje natural...]
```

**FASE 2: Sistema Híbrido Completo**

- Separar contexto (MD) de tareas (JSON)
- Implementar validación automática
- Crear templates reutilizables

### 💡 Impacto en el Proyecto

- **Mantener efectividad actual** de prompts en lenguaje natural
- **Agregar capacidades de automatización** con metadata JSON
- **Evolución gradual** sin disrumpir flujo de trabajo existente

---

**Generado por**: Kiro (Orquestador)  
**Fecha**: 1 de agosto de 2025  
**Estado del proyecto**: ~45% completado  
**Próxima actualización**: Al completar próximas tareas críticas
