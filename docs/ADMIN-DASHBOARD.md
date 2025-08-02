# 🎛️ Admin Dashboard CMS - Especificaciones Técnicas

**Estado**: 🚀 Iniciado - 0/8 tareas completadas  
**Especialista**: Qwen (Admin Dashboard + CMS Interface Developer)  
**Fecha de Inicio**: 1 de agosto de 2025  
**Documentación Relacionada**: `PROMPT-QWEN-BATCH-1-ADMIN-DASHBOARD.md`

## 🎯 Objetivo General

Desarrollar un **panel de administración completo y especializado** para el CMS de Grupo Naser, optimizado específicamente para la gestión de servicios funerarios con interfaz intuitiva, funcionalidades avanzadas y integración perfecta con el backend PHP.

## 📊 Estado del Proyecto

### Progreso General: 0/8 tareas completadas (0%)

- **🔐 TAREA Q1**: Sistema de Autenticación Admin - ❌ Pendiente
- **📊 TAREA Q2**: Dashboard Principal con Métricas - ❌ Pendiente
- **📝 TAREA Q3**: Gestión de Páginas y Contenido - ❌ Pendiente
- **⚰️ TAREA Q4**: Gestión de Servicios Funerarios - ❌ Pendiente
- **🏢 TAREA Q5**: Gestión de Ubicaciones/Sucursales - ❌ Pendiente
- **📁 TAREA Q6**: Sistema de Medios y Archivos - ❌ Pendiente
- **👥 TAREA Q7**: Gestión de Usuarios y Permisos - ❌ Pendiente
- **⚙️ TAREA Q8**: Configuraciones del Sistema - ❌ Pendiente

### Dependencias

- **✅ Backend APIs (Gemini)**: 80% completadas - APIs core disponibles
- **🔄 Frontend Base (Claude)**: Configuración TypeScript y CSS en progreso
- **✅ DevOps Infrastructure (Warp)**: Herramientas de desarrollo disponibles

## 🏗️ Arquitectura del Admin Dashboard

### Estructura de Directorios

```typescript
src/admin/
├── components/                    # Componentes reutilizables
│   ├── auth/                     # Sistema de autenticación
│   │   ├── LoginForm.tsx
│   │   ├── AuthGuard.tsx
│   │   ├── LogoutButton.tsx
│   │   └── PasswordReset.tsx
│   ├── layout/                   # Layout y navegación
│   │   ├── AdminLayout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   ├── Breadcrumbs.tsx
│   │   └── MobileMenu.tsx
│   ├── dashboard/                # Widgets del dashboard
│   │   ├── StatsCards.tsx
│   │   ├── RecentActivity.tsx
│   │   ├── QuickActions.tsx
│   │   ├── SystemStatus.tsx
│   │   ├── MetricsChart.tsx
│   │   └── NotificationCenter.tsx
│   ├── pages/                    # Gestión de páginas CMS
│   │   ├── PagesList.tsx
│   │   ├── PageEditor.tsx
│   │   ├── PagePreview.tsx
│   │   ├── SEOSettings.tsx
│   │   ├── PageStatus.tsx
│   │   └── SlugManager.tsx
│   ├── services/                 # Gestión servicios funerarios
│   │   ├── ServicesList.tsx
│   │   ├── ServiceEditor.tsx
│   │   ├── ServiceCategories.tsx
│   │   ├── PricingManager.tsx
│   │   ├── ServiceGallery.tsx
│   │   └── LocationAssignment.tsx
│   ├── locations/                # Gestión de sucursales
│   │   ├── LocationsList.tsx
│   │   ├── LocationEditor.tsx
│   │   ├── LocationMap.tsx
│   │   ├── HoursManager.tsx
│   │   ├── ServicesAssignment.tsx
│   │   └── ContactInfo.tsx
│   ├── media/                    # Sistema de archivos multimedia
│   │   ├── MediaLibrary.tsx
│   │   ├── FileUploader.tsx
│   │   ├── ImageEditor.tsx
│   │   ├── MediaGrid.tsx
│   │   ├── MediaDetails.tsx
│   │   ├── FolderManager.tsx
│   │   └── MediaSelector.tsx
│   ├── users/                    # Gestión usuarios y permisos
│   │   ├── UsersList.tsx
│   │   ├── UserEditor.tsx
│   │   ├── RoleManager.tsx
│   │   ├── PermissionsMatrix.tsx
│   │   ├── UserActivity.tsx
│   │   └── InviteUser.tsx
│   ├── settings/                 # Configuraciones del sistema
│   │   ├── GeneralSettings.tsx
│   │   ├── SEOSettings.tsx
│   │   ├── EmailSettings.tsx
│   │   ├── BackupSettings.tsx
│   │   ├── SystemInfo.tsx
│   │   └── MaintenanceMode.tsx
│   └── common/                   # Componentes comunes
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│       ├── ConfirmDialog.tsx
│       ├── Toast.tsx
│       ├── DataTable.tsx
│       ├── SearchBox.tsx
│       ├── Pagination.tsx
│       └── FormField.tsx
├── pages/                        # Páginas principales
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── PagesPage.tsx
│   ├── ServicesPage.tsx
│   ├── LocationsPage.tsx
│   ├── MediaPage.tsx
│   ├── UsersPage.tsx
│   ├── SettingsPage.tsx
│   └── NotFoundPage.tsx
├── hooks/                        # Custom hooks
│   ├── useAuth.ts
│   ├── useApi.ts
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   ├── usePermissions.ts
│   ├── useNotifications.ts
│   └── useMediaUpload.ts
├── services/                     # Servicios API
│   ├── authService.ts
│   ├── pagesService.ts
│   ├── servicesService.ts
│   ├── locationsService.ts
│   ├── mediaService.ts
│   ├── usersService.ts
│   ├── settingsService.ts
│   └── apiClient.ts
├── types/                        # Tipos TypeScript
│   ├── admin.types.ts
│   ├── auth.types.ts
│   ├── api.types.ts
│   ├── entities.types.ts
│   └── forms.types.ts
├── utils/                        # Utilidades
│   ├── formatters.ts
│   ├── validators.ts
│   ├── permissions.ts
│   ├── constants.ts
│   └── helpers.ts
├── styles/                       # Estilos específicos admin
│   ├── admin.css
│   ├── components.css
│   └── themes.css
├── App.tsx                       # Aplicación principal admin
├── main.tsx                      # Entry point
└── router.tsx                    # Configuración de rutas
```

## 🔐 TAREA Q1: Sistema de Autenticación Admin

### Objetivo

Crear un sistema de autenticación robusto y seguro para administradores del CMS.

### Componentes Principales

#### LoginForm.tsx

```typescript
interface LoginFormProps {
  onSuccess: (user: AdminUser) => void;
  onError: (error: string) => void;
}

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}
```

**Funcionalidades**:

- Validación en tiempo real con React Hook Form
- Manejo de errores específicos (credenciales inválidas, cuenta bloqueada)
- Opción "Recordar sesión" con localStorage seguro
- Loading states y feedback visual
- Integración con reCAPTCHA para seguridad

#### AuthGuard.tsx

```typescript
interface AuthGuardProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  fallback?: React.ReactNode;
}
```

**Funcionalidades**:

- Protección de rutas basada en autenticación
- Verificación de permisos granular
- Redirección automática a login
- Manejo de tokens expirados
- Refresh automático de tokens

#### Integración con Backend

```typescript
// authService.ts
export const authService = {
  login: (credentials: LoginCredentials) =>
    apiClient.post("/api/v1/auth/login", credentials),

  logout: () => apiClient.post("/api/v1/auth/logout"),

  refreshToken: () => apiClient.post("/api/v1/auth/refresh"),

  getCurrentUser: () => apiClient.get("/api/v1/auth/me"),
};
```

### Criterios de Éxito

- ✅ Login funcional con validación completa
- ✅ Protección de rutas admin efectiva
- ✅ Manejo seguro de tokens JWT
- ✅ Experiencia de usuario fluida
- ✅ Integración perfecta con APIs de Gemini

## 📊 TAREA Q2: Dashboard Principal con Métricas

### Objetivo

Crear un dashboard principal con estadísticas en tiempo real y métricas relevantes para el negocio funerario.

### Métricas Principales

#### StatsCards.tsx

```typescript
interface DashboardStats {
  pages: {
    total: number;
    published: number;
    drafts: number;
    recentlyUpdated: Page[];
  };
  services: {
    total: number;
    byCategory: Record<ServiceCategory, number>;
    featured: Service[];
    mostRequested: Service[];
  };
  locations: {
    total: number;
    active: number;
    servicesPerLocation: Record<string, number>;
    performanceMetrics: LocationMetrics[];
  };
  system: {
    diskUsage: number;
    memoryUsage: number;
    uptime: string;
    lastBackup: string;
    apiResponseTime: number;
  };
  business: {
    monthlyInquiries: number;
    conversionRate: number;
    averageServiceValue: number;
    customerSatisfaction: number;
  };
}
```

#### Widgets Especializados

**RecentActivity.tsx**:

- Últimas páginas editadas
- Servicios actualizados
- Nuevos usuarios registrados
- Cambios en configuraciones

**QuickActions.tsx**:

- Crear nueva página
- Agregar servicio
- Subir medios
- Ver reportes

**MetricsChart.tsx**:

- Gráficos de visitas por página
- Servicios más consultados
- Performance por ubicación
- Tendencias temporales

### Criterios de Éxito

- ✅ Dashboard responsive y visualmente atractivo
- ✅ Métricas actualizadas en tiempo real
- ✅ Widgets interactivos y funcionales
- ✅ Performance optimizada con lazy loading
- ✅ Integración con APIs de métricas

## 📝 TAREA Q3: Gestión de Páginas y Contenido

### Objetivo

Crear un sistema CRUD completo para la gestión de páginas del sitio web con editor WYSIWYG profesional.

### Páginas a Gestionar

1. **Inicio** (index.html → HomePage)
2. **Nosotros** (nosotros.html → AboutPage)
3. **Historia** (historia.html → HistoryPage)
4. **Servicios** (servicios.html → ServicesPage)
5. **Necesidad Inmediata** (necesidad-inmediata.html)
6. **Previsión** (prevision.html → PreventionPage)
7. **Obituario** (obituario.html → ObituaryPage)
8. **Contacto** (contacto.html → ContactPage)
9. **Cobertura** (cobertura.html → CoveragePage)
10. **Sucursales** (naser\_\*.html → LocationPages)

### Componentes Principales

#### PageEditor.tsx

```typescript
interface PageEditorProps {
  page?: Page;
  onSave: (page: PageData) => Promise<void>;
  onCancel: () => void;
}

interface PageData {
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  status: "draft" | "published" | "archived";
  featuredImage?: string;
  publishedAt?: string;
  seoScore?: number;
}
```

**Funcionalidades del Editor**:

- **TinyMCE Integration**: Editor WYSIWYG profesional
- **Media Integration**: Selector de imágenes desde la librería
- **SEO Tools**: Análisis automático de SEO score
- **Preview Mode**: Vista previa en tiempo real
- **Auto-save**: Guardado automático cada 30 segundos
- **Version Control**: Historial de cambios

#### SEOSettings.tsx

```typescript
interface SEOData {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
  structuredData?: Record<string, any>;
}
```

**Herramientas SEO**:

- Análisis de meta tags
- Sugerencias de keywords
- Preview de Google/Facebook
- Validación de structured data
- Score SEO automático

### Criterios de Éxito

- ✅ Editor WYSIWYG completamente funcional
- ✅ CRUD completo para todas las páginas
- ✅ SEO tools integradas y efectivas
- ✅ Preview en tiempo real
- ✅ Auto-save y version control

## ⚰️ TAREA Q4: Gestión de Servicios Funerarios

### Objetivo

Crear un sistema especializado para la gestión de servicios funerarios con categorías específicas del sector.

### Categorías de Servicios

```typescript
enum ServiceCategory {
  PREVISION = "prevision",
  NECESIDAD_INMEDIATA = "necesidad_inmediata",
  CREMACION = "cremacion",
  TRASLADOS = "traslados",
  VELACION = "velacion",
  SEPULTURA = "sepultura",
  EXHUMACION = "exhumacion",
  REPATRIACION = "repatriacion",
}

interface Service {
  id: number;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  description: string;
  features: string[];
  priceRange: string;
  exactPrice?: number;
  image: string;
  gallery: string[];
  isFeatured: boolean;
  isActive: boolean;
  availableLocations: string[];
  requirements: string[];
  duration: string;
  includes: string[];
  excludes: string[];
  terms: string;
  createdAt: string;
  updatedAt: string;
}
```

### Componentes Especializados

#### ServiceEditor.tsx

**Secciones del Editor**:

1. **Información Básica**: Nombre, categoría, descripción
2. **Características**: Lista de features y beneficios
3. **Pricing**: Rangos de precios y opciones
4. **Galería**: Imágenes del servicio
5. **Disponibilidad**: Sucursales donde está disponible
6. **Términos**: Condiciones y requisitos

#### PricingManager.tsx

```typescript
interface PricingData {
  basePrice?: number;
  priceRange: {
    min: number;
    max: number;
  };
  packages: PricingPackage[];
  discounts: Discount[];
  paymentOptions: PaymentOption[];
}
```

#### ServiceCategories.tsx

- Gestión de categorías personalizadas
- Configuración de campos específicos por categoría
- Templates para diferentes tipos de servicios

### Criterios de Éxito

- ✅ CRUD completo para servicios funerarios
- ✅ Categorización especializada del sector
- ✅ Gestión avanzada de precios y paquetes
- ✅ Galería de imágenes integrada
- ✅ Asignación por ubicaciones

## 🏢 TAREA Q5: Gestión de Ubicaciones/Sucursales

### Objetivo

Sistema completo para gestionar las sucursales de Grupo Naser con integración de mapas y servicios por ubicación.

### Ubicaciones Existentes

1. **Naser Tlalpan**
2. **Naser Morelos**
3. **Naser Oaxaca**
4. **Naser Aragón**

### Estructura de Datos

```typescript
interface Location {
  id: number;
  name: string;
  slug: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
  hours: {
    [key: string]: {
      open: string;
      close: string;
      is24Hours: boolean;
      isClosed: boolean;
    };
  };
  services: string[];
  facilities: string[];
  images: string[];
  isMainLocation: boolean;
  isActive: boolean;
  capacity: {
    velationRooms: number;
    parkingSpaces: number;
    maxCapacity: number;
  };
  staff: {
    manager: string;
    contactPerson: string;
  };
}
```

### Componentes Principales

#### LocationMap.tsx

- **Google Maps Integration**: Mapa interactivo
- **Marker Management**: Marcadores personalizados
- **Directions**: Rutas desde ubicación del usuario
- **Street View**: Vista de calle integrada

#### HoursManager.tsx

- Configuración de horarios por día
- Horarios especiales (feriados, eventos)
- Horarios 24/7 para emergencias
- Validación de horarios

### Criterios de Éxito

- ✅ CRUD completo para ubicaciones
- ✅ Integración con Google Maps
- ✅ Gestión avanzada de horarios
- ✅ Asignación de servicios por ubicación
- ✅ Información de contacto completa

## 📁 TAREA Q6: Sistema de Medios y Archivos

### Objetivo

Sistema completo de gestión de archivos multimedia con upload, organización, edición básica y optimización automática.

### Funcionalidades Principales

#### MediaLibrary.tsx

```typescript
interface MediaFile {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  url: string;
  thumbnailUrl?: string;
  alt: string;
  caption?: string;
  tags: string[];
  folder: string;
  uploadedBy: number;
  createdAt: string;
  updatedAt: string;
}
```

#### FileUploader.tsx

**Características**:

- **Drag & Drop**: Interfaz intuitiva
- **Multiple Upload**: Subida de múltiples archivos
- **Progress Tracking**: Barra de progreso por archivo
- **Validation**: Validación de tipo y tamaño
- **Auto-optimization**: Compresión automática de imágenes

#### ImageEditor.tsx

**Herramientas de Edición**:

- Redimensionar y recortar
- Filtros básicos (brillo, contraste, saturación)
- Rotación y volteo
- Marcas de agua automáticas
- Múltiples formatos de salida

### Organización

#### FolderManager.tsx

- Estructura de carpetas jerárquica
- Carpetas por categoría (servicios, ubicaciones, páginas)
- Permisos por carpeta
- Búsqueda avanzada con filtros

### Criterios de Éxito

- ✅ Upload drag & drop funcional
- ✅ Organización en carpetas
- ✅ Edición básica de imágenes
- ✅ Optimización automática
- ✅ Búsqueda y filtrado avanzado

## 👥 TAREA Q7: Gestión de Usuarios y Permisos

### Objetivo

Sistema completo de gestión de usuarios administrativos con roles y permisos granulares.

### Sistema de Roles

```typescript
enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  EDITOR = "editor",
  VIEWER = "viewer",
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  isActive: boolean;
  lastLogin?: string;
  loginCount: number;
  createdAt: string;
  updatedAt: string;
  profile: {
    avatar?: string;
    phone?: string;
    department?: string;
    notes?: string;
  };
}

interface Permission {
  resource: string; // 'pages', 'services', 'locations', etc.
  actions: string[]; // 'create', 'read', 'update', 'delete'
}
```

### Matriz de Permisos

| Recurso         | Super Admin | Admin | Editor | Viewer |
| --------------- | ----------- | ----- | ------ | ------ |
| Páginas         | CRUD        | CRUD  | CRU    | R      |
| Servicios       | CRUD        | CRUD  | CRU    | R      |
| Ubicaciones     | CRUD        | CRUD  | R      | R      |
| Medios          | CRUD        | CRUD  | CRU    | R      |
| Usuarios        | CRUD        | R     | -      | -      |
| Configuraciones | CRUD        | R     | -      | -      |

### Componentes Principales

#### PermissionsMatrix.tsx

- Matriz visual de permisos
- Configuración granular por recurso
- Roles personalizados
- Herencia de permisos

#### UserActivity.tsx

- Log de actividades por usuario
- Historial de login
- Acciones realizadas
- Reportes de uso

### Criterios de Éxito

- ✅ Sistema de roles completo
- ✅ Permisos granulares efectivos
- ✅ Matriz de permisos visual
- ✅ Auditoría de actividades
- ✅ Gestión de usuarios intuitiva

## ⚙️ TAREA Q8: Configuraciones del Sistema

### Objetivo

Panel completo de configuraciones generales del CMS con todas las opciones necesarias para la operación.

### Secciones de Configuración

#### GeneralSettings.tsx

```typescript
interface GeneralSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    whatsapp: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  businessHours: {
    [key: string]: {
      open: string;
      close: string;
      is24Hours: boolean;
    };
  };
}
```

#### SEOSettings.tsx

```typescript
interface GlobalSEOSettings {
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  defaultKeywords: string[];
  googleAnalyticsId?: string;
  googleSearchConsoleId?: string;
  facebookPixelId?: string;
  structuredData: {
    organization: OrganizationSchema;
    localBusiness: LocalBusinessSchema;
  };
  sitemapEnabled: boolean;
  robotsTxt: string;
}
```

#### EmailSettings.tsx

- Configuración SMTP
- Templates de email
- Notificaciones automáticas
- Testing de configuración

#### BackupSettings.tsx

- Configuración de respaldos automáticos
- Frecuencia de backup
- Retención de archivos
- Restauración de backups

### Criterios de Éxito

- ✅ Configuraciones generales completas
- ✅ SEO global configurado
- ✅ Sistema de email funcional
- ✅ Backups automáticos
- ✅ Información del sistema

## 🚀 Stack Tecnológico

### Frontend Technologies

```json
{
  "framework": "React 18+",
  "language": "TypeScript 5+",
  "styling": "Tailwind CSS 3+",
  "components": "Headless UI",
  "forms": "React Hook Form",
  "state": "React Query (TanStack Query)",
  "routing": "React Router DOM v6",
  "editor": "TinyMCE",
  "charts": "Chart.js / Recharts",
  "maps": "Google Maps API",
  "upload": "React Dropzone",
  "icons": "Heroicons",
  "notifications": "React Hot Toast"
}
```

### Development Tools

```json
{
  "bundler": "Vite",
  "testing": "Vitest + Testing Library",
  "linting": "ESLint + Prettier",
  "typeChecking": "TypeScript",
  "deployment": "Docker + Nginx"
}
```

## 🔗 Integración con Backend

### APIs Utilizadas (Gemini)

```typescript
// Endpoints principales
const API_ENDPOINTS = {
  // Autenticación
  auth: {
    login: "POST /api/v1/auth/login",
    logout: "POST /api/v1/auth/logout",
    refresh: "POST /api/v1/auth/refresh",
    me: "GET /api/v1/auth/me",
  },

  // Páginas
  pages: {
    list: "GET /api/v1/pages",
    get: "GET /api/v1/pages/:id",
    create: "POST /api/v1/pages",
    update: "PUT /api/v1/pages/:id",
    delete: "DELETE /api/v1/pages/:id",
  },

  // Servicios
  services: {
    list: "GET /api/v1/services",
    get: "GET /api/v1/services/:id",
    create: "POST /api/v1/services",
    update: "PUT /api/v1/services/:id",
    delete: "DELETE /api/v1/services/:id",
  },

  // Ubicaciones
  locations: {
    list: "GET /api/v1/locations",
    get: "GET /api/v1/locations/:id",
    create: "POST /api/v1/locations",
    update: "PUT /api/v1/locations/:id",
    delete: "DELETE /api/v1/locations/:id",
  },

  // Medios
  media: {
    list: "GET /api/v1/media",
    upload: "POST /api/v1/media",
    get: "GET /api/v1/media/:id",
    update: "PUT /api/v1/media/:id",
    delete: "DELETE /api/v1/media/:id",
  },

  // Usuarios
  users: {
    list: "GET /api/v1/users",
    get: "GET /api/v1/users/:id",
    create: "POST /api/v1/users",
    update: "PUT /api/v1/users/:id",
    delete: "DELETE /api/v1/users/:id",
  },
};
```

### Error Handling

```typescript
interface ApiError {
  success: false;
  error: string;
  message: string;
  violations?: Record<string, string>;
  timestamp: string;
}

// Manejo centralizado de errores
export const handleApiError = (error: ApiError) => {
  switch (error.error) {
    case "authentication_failed":
      // Redirect to login
      break;
    case "validation_error":
      // Show field errors
      break;
    case "unauthorized":
      // Show permission error
      break;
    default:
    // Show generic error
  }
};
```

## 📱 Responsive Design

### Breakpoints

```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Tablets */
md: 768px   /* Small laptops */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

### Mobile Considerations

- **Touch-friendly**: Botones y elementos táctiles de al menos 44px
- **Navigation**: Menú hamburguesa en móviles
- **Tables**: Scroll horizontal o cards en móviles
- **Forms**: Campos optimizados para teclados móviles
- **Performance**: Lazy loading y optimización de imágenes

## 🧪 Testing Strategy

### Unit Testing

```typescript
// Ejemplo de test para componente
describe("LoginForm", () => {
  it("should validate email format", () => {
    render(<LoginForm onSuccess={jest.fn()} onError={jest.fn()} />);

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
  });

  it("should call onSuccess when login is successful", async () => {
    const mockOnSuccess = jest.fn();
    const mockLogin = jest.fn().mockResolvedValue({ user: mockUser });

    render(<LoginForm onSuccess={mockOnSuccess} onError={jest.fn()} />);

    // ... test implementation

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledWith(mockUser);
    });
  });
});
```

### Integration Testing

- Testing de flujos completos (login → dashboard → CRUD)
- Testing de integración con APIs
- Testing de permisos y roles
- Testing de upload de archivos

### E2E Testing

- Flujos críticos de administración
- Testing cross-browser
- Testing de responsive design
- Performance testing

## 🚀 Deployment

### Build Process

```bash
# Build para producción
npm run build

# Optimizaciones automáticas
- Tree shaking
- Code splitting
- Asset optimization
- Bundle analysis
```

### Docker Configuration

```dockerfile
# Dockerfile para admin dashboard
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📊 Performance Metrics

### Target Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 500KB (gzipped)

### Optimization Strategies

- **Code Splitting**: Lazy loading de rutas
- **Image Optimization**: WebP, lazy loading, responsive images
- **Caching**: Service workers, HTTP caching
- **CDN**: Assets estáticos en CDN
- **Compression**: Gzip/Brotli compression

## 🔒 Security Considerations

### Authentication Security

- JWT tokens con expiración corta
- Refresh tokens seguros
- Rate limiting en login
- Account lockout después de intentos fallidos
- 2FA opcional para super admins

### Data Security

- Validación de inputs en frontend y backend
- Sanitización de HTML en editor
- CSRF protection
- XSS prevention
- File upload security

### Permissions Security

- Verificación de permisos en cada acción
- Principio de menor privilegio
- Auditoría de acciones sensibles
- Session timeout automático

## 📈 Analytics y Monitoring

### User Analytics

- Páginas más visitadas del admin
- Funcionalidades más utilizadas
- Tiempo promedio por sesión
- Errores más frecuentes

### Performance Monitoring

- Tiempo de carga de páginas
- Errores de JavaScript
- API response times
- Resource usage

### Business Metrics

- Contenido creado por período
- Usuarios activos del admin
- Eficiencia en gestión de contenido
- ROI del sistema CMS

## 🎯 Criterios de Éxito General

### Funcionalidad

- ✅ Todas las funcionalidades CRUD implementadas
- ✅ Sistema de autenticación robusto
- ✅ Permisos granulares funcionando
- ✅ Editor WYSIWYG completamente funcional
- ✅ Sistema de medios operativo

### Usabilidad

- ✅ Interfaz intuitiva y fácil de usar
- ✅ Responsive design en todos los dispositivos
- ✅ Navegación clara y consistente
- ✅ Feedback visual para todas las acciones
- ✅ Performance optimizada

### Integración

- ✅ Integración completa con APIs de Gemini
- ✅ Manejo de errores consistente
- ✅ Validación de datos sincronizada
- ✅ Estados de carga apropiados

### Calidad

- ✅ Cobertura de testing > 80%
- ✅ Código TypeScript sin errores
- ✅ Performance metrics cumplidas
- ✅ Security best practices implementadas

## 📅 Timeline Estimado

### Fase 1: Core (Semanas 1-2)

- TAREA Q1: Sistema de Autenticación
- TAREA Q2: Dashboard Principal

### Fase 2: Content Management (Semanas 3-4)

- TAREA Q3: Gestión de Páginas
- TAREA Q4: Gestión de Servicios

### Fase 3: Advanced Features (Semanas 5-6)

- TAREA Q5: Gestión de Ubicaciones
- TAREA Q6: Sistema de Medios

### Fase 4: Administration (Semanas 7-8)

- TAREA Q7: Gestión de Usuarios
- TAREA Q8: Configuraciones del Sistema

### Fase 5: Testing y Optimización (Semana 9)

- Testing completo
- Performance optimization
- Bug fixes y refinamiento

---

**Última actualización**: 1 de agosto de 2025  
**Autor**: Kiro (Orquestador)  
**Para implementación por**: Qwen (Admin Dashboard + CMS Interface Developer)  
**Dependencias**: APIs de Gemini (80% completadas), Frontend base de Claude (en progreso)
