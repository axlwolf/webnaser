# 🎛️ Qwen Batch 1 - Quick Reference

**ESTADO**: 🚀 INICIADO - Panel de Administración CMS  
**ACCIÓN REQUERIDA**: Implementar sistema completo de administración  
**PROGRESO**: 0.00% (0/8 tareas completadas)

## 🎯 OBJETIVO PRINCIPAL

Desarrollar un **panel de administración completo y especializado** para el CMS de Grupo Naser con funcionalidades avanzadas, interfaz intuitiva y integración perfecta con el backend PHP.

## 📋 8 TAREAS PRINCIPALES

### FASE 1: DASHBOARD CORE

#### 🔐 TAREA Q1: Sistema de Autenticación Admin

- **Estado**: ❌ Pendiente
- **Componentes**: LoginForm, AuthGuard, LogoutButton
- **Funcionalidades**: JWT tokens, protección de rutas, manejo de sesiones
- **Integración**: APIs de autenticación de Gemini

#### 📊 TAREA Q2: Dashboard Principal con Métricas

- **Estado**: ❌ Pendiente
- **Componentes**: StatsCards, RecentActivity, QuickActions, SystemStatus
- **Métricas**: Páginas, servicios, ubicaciones, sistema, business KPIs
- **Widgets**: Gráficos interactivos, actividad reciente, acciones rápidas

### FASE 2: CONTENT MANAGEMENT

#### 📝 TAREA Q3: Gestión de Páginas y Contenido

- **Estado**: ❌ Pendiente
- **Componentes**: PagesList, PageEditor, PagePreview, SEOSettings
- **Editor**: TinyMCE WYSIWYG, SEO tools, preview en tiempo real
- **Páginas**: 13 páginas HTML → React (inicio, nosotros, servicios, etc.)

#### ⚰️ TAREA Q4: Gestión de Servicios Funerarios

- **Estado**: ❌ Pendiente
- **Componentes**: ServicesList, ServiceEditor, ServiceCategories, PricingManager
- **Categorías**: Previsión, necesidad inmediata, cremación, traslados
- **Funcionalidades**: Pricing avanzado, galería, disponibilidad por ubicación

### FASE 3: ADVANCED FEATURES

#### 🏢 TAREA Q5: Gestión de Ubicaciones/Sucursales

- **Estado**: ❌ Pendiente
- **Componentes**: LocationsList, LocationEditor, LocationMap, HoursManager
- **Ubicaciones**: Tlalpan, Morelos, Oaxaca, Aragón
- **Integración**: Google Maps, horarios, servicios por ubicación

#### 📁 TAREA Q6: Sistema de Medios y Archivos

- **Estado**: ❌ Pendiente
- **Componentes**: MediaLibrary, FileUploader, ImageEditor, MediaGrid
- **Funcionalidades**: Drag & drop, organización, edición básica, optimización

### FASE 4: ADMINISTRATION

#### 👥 TAREA Q7: Gestión de Usuarios y Permisos

- **Estado**: ❌ Pendiente
- **Componentes**: UsersList, UserEditor, RoleManager, PermissionsMatrix
- **Roles**: Super Admin, Admin, Editor, Viewer
- **Funcionalidades**: Permisos granulares, auditoría de actividades

#### ⚙️ TAREA Q8: Configuraciones del Sistema

- **Estado**: ❌ Pendiente
- **Componentes**: GeneralSettings, SEOSettings, EmailSettings, BackupSettings
- **Configuraciones**: Generales, SEO global, email SMTP, backups automáticos

## 🚀 STACK TECNOLÓGICO

```typescript
// Frontend Admin Stack
- React 18+ con TypeScript
- Tailwind CSS + Headless UI
- React Hook Form + React Query
- TinyMCE para editor WYSIWYG
- React Router DOM v6
- Chart.js para gráficos
- Google Maps API
- React Dropzone para uploads
```

## 🔗 INTEGRACIÓN CON EQUIPO

### Con Gemini (Backend)

- ✅ APIs REST disponibles (80% completadas)
- ✅ Sistema de autenticación JWT
- ✅ Endpoints para CRUD de entidades
- ✅ Validación de datos consistente

### Con Claude (Frontend)

- 🔄 Configuración TypeScript base (en progreso)
- 🔄 Design tokens y CSS (en progreso)
- ✅ Arquitectura de componentes establecida
- ✅ Shared utilities disponibles

### Con Warp (DevOps)

- ✅ Docker environment configurado
- ✅ Scripts de desarrollo disponibles
- ✅ Testing infrastructure lista
- ✅ Performance monitoring activo

## 📁 ESTRUCTURA DEL PROYECTO

```
src/admin/
├── components/           # Componentes especializados
│   ├── auth/            # Sistema de autenticación
│   ├── layout/          # Layout y navegación
│   ├── dashboard/       # Widgets y métricas
│   ├── pages/           # Gestión de páginas CMS
│   ├── services/        # Gestión servicios funerarios
│   ├── locations/       # Gestión de sucursales
│   ├── media/           # Sistema de archivos
│   ├── users/           # Gestión usuarios y permisos
│   ├── settings/        # Configuraciones del sistema
│   └── common/          # Componentes comunes
├── pages/               # Páginas principales
├── hooks/               # Custom hooks
├── services/            # Servicios API
├── types/               # Tipos TypeScript
└── utils/               # Utilidades
```

## ✅ CRITERIOS DE ÉXITO

### Funcionalidad

- [ ] Sistema de autenticación robusto y seguro
- [ ] Dashboard con métricas en tiempo real
- [ ] CRUD completo para todas las entidades
- [ ] Editor WYSIWYG completamente funcional
- [ ] Sistema de medios con upload y organización

### UX/UI

- [ ] Interfaz intuitiva y fácil de usar
- [ ] Responsive design para tablets y móviles
- [ ] Navegación clara y consistente
- [ ] Feedback visual para todas las acciones
- [ ] Performance optimizada con lazy loading

### Integración

- [ ] Integración completa con APIs de Gemini
- [ ] Manejo de errores y estados de carga
- [ ] Validación de datos sincronizada
- [ ] Permisos granulares efectivos

## 🎯 COMANDOS DE DESARROLLO

```bash
# Desarrollo del admin dashboard
cd src/admin
npm install
npm run dev

# Testing
npm run test
npm run test:coverage

# Build para producción
npm run build

# Linting y formatting
npm run lint
npm run format
```

## 📊 MÉTRICAS DE PERFORMANCE

### Target Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 500KB (gzipped)
- **Test Coverage**: > 80%

### Optimizaciones

- Code splitting por rutas
- Lazy loading de componentes
- Image optimization automática
- Caching inteligente con React Query

## 🔒 CONSIDERACIONES DE SEGURIDAD

- **JWT Tokens**: Manejo seguro con refresh automático
- **Permisos Granulares**: Verificación en cada acción
- **Validación de Inputs**: Frontend + Backend
- **File Upload Security**: Validación de tipos y tamaños
- **CSRF Protection**: Tokens en formularios críticos

## 📈 VALOR DIFERENCIAL

- **Especialización Funeraria**: Panel optimizado para servicios funerarios
- **Gestión de Obituarios**: Herramientas específicas del sector
- **Multi-ubicación**: Gestión centralizada de sucursales
- **Previsión Funeraria**: Módulos especializados en previsión
- **Necesidad Inmediata**: Workflows para servicios urgentes

---

**MENSAJE**: Tu expertise en desarrollo de interfaces administrativas será clave para completar el CMS con un panel de administración robusto, intuitivo y especializado en servicios funerarios.

**DEPENDENCIAS RESUELTAS**:

- ✅ Backend APIs (Gemini) - 80% completadas
- 🔄 Frontend base (Claude) - Configuración en progreso
- ✅ DevOps tools (Warp) - Infraestructura lista

**SIGUIENTE PASO**: Iniciar con TAREA Q1 (Sistema de Autenticación Admin) una vez que Claude resuelva los problemas críticos de CSS.

**DOCUMENTACIÓN COMPLETA**: `docs/ADMIN-DASHBOARD.md`
