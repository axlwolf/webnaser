# PROMPT QWEN - BATCH 1: Dashboard de Administración CMS

## 🎯 CONTEXTO DEL PROYECTO

El proyecto Grupo Naser CMS está en **~45% de progreso** con un equipo sólido trabajando en frontend (Claude), backend (Gemini) y DevOps (Warp). Tu incorporación como especialista en **Dashboard de Administración** completará el sistema CMS con una interfaz administrativa robusta y funcional.

## 📊 ESTADO ACTUAL

- **Progreso**: ~45% (13.5/30 tareas completadas)
- **Equipo actual**: Claude (Frontend público), Gemini (Backend APIs), Warp (DevOps)
- **Tu rol**: Admin Dashboard Specialist + CMS Interface Developer
- **Necesidad crítica**: Sistema de administración completo para gestionar contenido

## 🎯 OBJETIVOS DE ESTA SESIÓN

### FASE 1: DASHBOARD CORE

1. **Sistema de autenticación admin**
2. **Dashboard principal con métricas**
3. **Gestión de páginas y contenido**
4. **Gestión de servicios funerarios**

### FASE 2: FUNCIONALIDADES AVANZADAS

1. **Gestión de ubicaciones/sucursales**
2. **Sistema de medios y archivos**
3. **Gestión de usuarios y permisos**
4. **Configuraciones del sistema**

## 🔧 TAREAS ESPECÍFICAS

### ✅ TAREA Q1: Sistema de Autenticación Admin

**Objetivo**: Crear interfaz de login y autenticación para administradores

**Archivo**: `src/admin/`

**Componentes a Crear**:

```typescript
// Estructura del admin dashboard
src/admin/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── AuthGuard.tsx
│   │   └── LogoutButton.tsx
│   ├── layout/
│   │   ├── AdminLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── TopBar.tsx
│   └── common/
│       ├── LoadingSpinner.tsx
│       └── ErrorBoundary.tsx
├── pages/
│   ├── LoginPage.tsx
│   └── DashboardPage.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useApi.ts
├── services/
│   └── authService.ts
└── types/
    └── admin.types.ts
```

**Funcionalidades**:

- Login form con validación
- Manejo de sesiones JWT
- Protección de rutas admin
- Logout seguro
- Recordar sesión
- Manejo de errores de autenticación

**Integración con Backend**:

```typescript
// Usar APIs de Gemini
POST / api / auth / login;
GET / api / auth / me;
POST / api / auth / logout;
POST / api / auth / refresh;
```

### ✅ TAREA Q2: Dashboard Principal con Métricas

**Objetivo**: Crear dashboard principal con estadísticas y métricas del CMS

**Archivo**: `src/admin/pages/DashboardPage.tsx`

**Componentes**:

```typescript
// Dashboard components
├── components/dashboard/
│   ├── StatsCards.tsx
│   ├── RecentActivity.tsx
│   ├── QuickActions.tsx
│   ├── SystemStatus.tsx
│   └── MetricsChart.tsx
```

**Métricas a Mostrar**:

- **Páginas**: Total, publicadas, borradores
- **Servicios**: Total por categoría, más populares
- **Ubicaciones**: Sucursales activas, servicios por ubicación
- **Usuarios**: Administradores activos, últimos logins
- **Sistema**: Espacio usado, performance, errores

**Widgets del Dashboard**:

```typescript
interface DashboardStats {
  pages: {
    total: number;
    published: number;
    drafts: number;
    recent: Page[];
  };
  services: {
    total: number;
    byCategory: Record<string, number>;
    featured: Service[];
  };
  locations: {
    total: number;
    active: number;
    services: Record<string, number>;
  };
  system: {
    diskUsage: number;
    memoryUsage: number;
    uptime: string;
    lastBackup: string;
  };
}
```

### ✅ TAREA Q3: Gestión de Páginas y Contenido

**Objetivo**: CRUD completo para gestión de páginas del sitio web

**Archivo**: `src/admin/pages/PagesPage.tsx`

**Funcionalidades**:

```typescript
// Pages management
├── components/pages/
│   ├── PagesList.tsx
│   ├── PageEditor.tsx
│   ├── PagePreview.tsx
│   ├── SEOSettings.tsx
│   └── PageStatus.tsx
```

**Características del Editor**:

- **Rich Text Editor**: Integrar editor WYSIWYG (TinyMCE o similar)
- **SEO Management**: Meta title, description, keywords
- **Slug Management**: Generación automática y edición manual
- **Status Control**: Draft, Published, Archived
- **Image Upload**: Integración con sistema de medios
- **Preview**: Vista previa antes de publicar

**Páginas a Gestionar**:

- Inicio (index.html → HomePage)
- Nosotros (nosotros.html → AboutPage)
- Servicios (servicios.html → ServicesPage)
- Contacto (contacto.html → ContactPage)
- Historia (historia.html → HistoryPage)
- Previsión (prevision.html → PreventionPage)
- Necesidad Inmediata (necesidad-inmediata.html)
- Obituario (obituario.html → ObituaryPage)

**API Integration**:

```typescript
// Usar APIs de Gemini
GET / api / content / pages;
GET / api / content / pages / { id };
POST / api / content / pages;
PUT / api / content / pages / { id };
DELETE / api / content / pages / { id };
GET / api / content / pages / slug / { slug };
```

### ✅ TAREA Q4: Gestión de Servicios Funerarios

**Objetivo**: CRUD para servicios funerarios específicos de Grupo Naser

**Archivo**: `src/admin/pages/ServicesPage.tsx`

**Componentes**:

```typescript
├── components/services/
│   ├── ServicesList.tsx
│   ├── ServiceEditor.tsx
│   ├── ServiceCategories.tsx
│   ├── PricingManager.tsx
│   └── ServiceGallery.tsx
```

**Categorías de Servicios**:

- **Previsión Funeraria**: Paquetes de previsión
- **Necesidad Inmediata**: Servicios urgentes
- **Cremación**: Servicios de cremación
- **Traslados**: Servicios de traslado
- **Velación**: Servicios de velación

**Funcionalidades**:

```typescript
interface Service {
  id: number;
  name: string;
  category: "prevision" | "inmediata" | "cremacion" | "traslados" | "velacion";
  description: string;
  features: string[];
  priceRange: string;
  image: string;
  gallery: string[];
  isFeatured: boolean;
  status: "active" | "inactive";
  locations: string[]; // Sucursales donde está disponible
}
```

**Editor de Servicios**:

- Información básica (nombre, categoría, descripción)
- Lista de características/beneficios
- Gestión de precios y rangos
- Galería de imágenes
- Disponibilidad por ubicación
- Estado (activo/inactivo, destacado)

### ✅ TAREA Q5: Gestión de Ubicaciones/Sucursales

**Objetivo**: CRUD para gestión de sucursales de Grupo Naser

**Archivo**: `src/admin/pages/LocationsPage.tsx`

**Ubicaciones Existentes**:

- Naser Tlalpan
- Naser Morelos
- Naser Oaxaca
- Naser Aragón

**Componentes**:

```typescript
├── components/locations/
│   ├── LocationsList.tsx
│   ├── LocationEditor.tsx
│   ├── LocationMap.tsx
│   ├── HoursManager.tsx
│   └── ServicesAssignment.tsx
```

**Funcionalidades**:

```typescript
interface Location {
  id: number;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: Record<string, string>;
  services: string[];
  images: string[];
  isMain: boolean;
  status: "active" | "inactive";
}
```

**Editor de Ubicaciones**:

- Información de contacto completa
- Integración con mapas (Google Maps)
- Gestión de horarios por día
- Asignación de servicios disponibles
- Galería de imágenes de la sucursal
- Estado y configuración principal

### ✅ TAREA Q6: Sistema de Medios y Archivos

**Objetivo**: Gestión completa de archivos multimedia del CMS

**Archivo**: `src/admin/pages/MediaPage.tsx`

**Componentes**:

```typescript
├── components/media/
│   ├── MediaLibrary.tsx
│   ├── FileUploader.tsx
│   ├── ImageEditor.tsx
│   ├── MediaGrid.tsx
│   └── MediaDetails.tsx
```

**Funcionalidades**:

- **Upload**: Drag & drop, múltiples archivos
- **Organización**: Carpetas, tags, categorías
- **Edición**: Redimensionar, recortar, filtros básicos
- **Optimización**: Compresión automática, múltiples tamaños
- **Búsqueda**: Por nombre, tipo, fecha, tags
- **Integración**: Selector de medios para páginas y servicios

**Tipos de Archivos Soportados**:

- Imágenes: JPG, PNG, WebP, SVG
- Documentos: PDF
- Videos: MP4 (para futuras funcionalidades)

### ✅ TAREA Q7: Gestión de Usuarios y Permisos

**Objetivo**: Sistema de usuarios administrativos con roles

**Archivo**: `src/admin/pages/UsersPage.tsx`

**Roles del Sistema**:

- **Super Admin**: Acceso completo
- **Admin**: Gestión de contenido y servicios
- **Editor**: Solo edición de páginas y servicios
- **Viewer**: Solo lectura

**Componentes**:

```typescript
├── components/users/
│   ├── UsersList.tsx
│   ├── UserEditor.tsx
│   ├── RoleManager.tsx
│   ├── PermissionsMatrix.tsx
│   └── UserActivity.tsx
```

**Funcionalidades**:

```typescript
interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "editor" | "viewer";
  permissions: string[];
  lastLogin: string;
  isActive: boolean;
  createdAt: string;
}
```

### ✅ TAREA Q8: Configuraciones del Sistema

**Objetivo**: Panel de configuraciones generales del CMS

**Archivo**: `src/admin/pages/SettingsPage.tsx`

**Secciones de Configuración**:

```typescript
├── components/settings/
│   ├── GeneralSettings.tsx
│   ├── SEOSettings.tsx
│   ├── EmailSettings.tsx
│   ├── BackupSettings.tsx
│   └── SystemInfo.tsx
```

**Configuraciones**:

- **General**: Nombre del sitio, logo, información de contacto
- **SEO**: Meta tags globales, Google Analytics, Search Console
- **Email**: Configuración SMTP, plantillas de email
- **Backup**: Configuración de respaldos automáticos
- **Sistema**: Información del servidor, logs, mantenimiento

## 📋 CRITERIOS DE ÉXITO

### Funcionalidad

- ✅ Sistema de autenticación robusto y seguro
- ✅ Dashboard con métricas en tiempo real
- ✅ CRUD completo para todas las entidades
- ✅ Editor de contenido WYSIWYG funcional
- ✅ Sistema de medios con upload y organización

### UX/UI

- ✅ Interfaz intuitiva y fácil de usar
- ✅ Responsive design para tablets y móviles
- ✅ Navegación clara y consistente
- ✅ Feedback visual para todas las acciones
- ✅ Carga rápida y performance optimizada

### Integración

- ✅ Integración completa con APIs de Gemini
- ✅ Manejo de errores y estados de carga
- ✅ Validación de datos en frontend y backend
- ✅ Sincronización en tiempo real cuando sea posible

## 🚀 STACK TECNOLÓGICO

```typescript
// Frontend Admin Stack
- React 18+ con TypeScript
- React Router para navegación
- React Hook Form para formularios
- React Query para estado del servidor
- Tailwind CSS para estilos
- Headless UI para componentes
- TinyMCE o similar para editor WYSIWYG
- React Dropzone para uploads
- Chart.js para gráficos y métricas

// Estructura de proyecto
src/admin/
├── components/     # Componentes reutilizables
├── pages/         # Páginas principales
├── hooks/         # Custom hooks
├── services/      # Servicios API
├── types/         # Tipos TypeScript
├── utils/         # Utilidades
└── styles/        # Estilos globales
```

## 🔗 INTEGRACIÓN CON EQUIPO

### Con Gemini (Backend)

- Consumir todas las APIs REST creadas
- Validación de datos consistente
- Manejo de errores estandarizado
- Autenticación JWT

### Con Claude (Frontend)

- Compartir componentes base y estilos
- Consistencia en design tokens
- Routing integrado para admin vs público
- Shared utilities y hooks

### Con Warp (DevOps)

- Build process para admin dashboard
- Deployment junto con frontend público
- Monitoreo de performance admin
- Backup de configuraciones

## 🎯 RESULTADO ESPERADO

Al final de esta sesión:

1. **Dashboard admin completo** - Sistema de administración funcional
2. **CRUD para todas las entidades** - Páginas, servicios, ubicaciones
3. **Sistema de medios robusto** - Upload y gestión de archivos
4. **Interfaz intuitiva** - UX optimizada para administradores
5. **Integración perfecta** - Con todas las APIs del backend

**¡Tu expertise en desarrollo de interfaces administrativas será clave para completar el CMS!**

---

**Prioridad**: 🟡 ALTA  
**Estimación**: 8-10 horas  
**Dependencias**: APIs de Gemini (mayormente completadas)  
**Siguiente**: Refinamiento UX y funcionalidades avanzadas
