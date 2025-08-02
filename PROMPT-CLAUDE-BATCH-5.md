# PROMPT CLAUDE - BATCH 5: Resolución Crítica + Implementación Pixel Perfect

## 🚨 CONTEXTO CRÍTICO

El proyecto Grupo Naser CMS está **BLOQUEADO** por problemas críticos de configuración que impiden la implementación pixel perfect. Tu misión es **RESOLVER INMEDIATAMENTE** estos problemas y luego proceder con la implementación visual.

## 📊 ESTADO ACTUAL

- **Progreso**: 36.67% (11/30 tareas completadas)
- **Problema**: Configuración TypeScript inconsistente + errores CSS
- **Impacto**: Frontend developer bloqueado, timeline comprometido
- **Urgencia**: CRÍTICA - Resolución inmediata requerida

## 🎯 OBJETIVOS DE ESTA SESIÓN

### FASE 1: RESOLUCIÓN CRÍTICA (INMEDIATA)

1. **Configuración TypeScript Completa**
2. **Corrección de Errores CSS**
3. **Sistema de Design Tokens**
4. **Validación de Configuración**

### FASE 2: IMPLEMENTACIÓN PIXEL PERFECT

1. **Header Completo con Sub-header**
2. **Hero Slider Cinematográfico**
3. **Conversión de Páginas HTML a React**

## 🔧 TAREAS ESPECÍFICAS

### ✅ TAREA C1: Configuración TypeScript Completa

**Objetivo**: Crear configuración TypeScript robusta y consistente

**Acciones Requeridas**:

1. **Crear `src/frontend/tsconfig.json` completo**:

   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "lib": ["ES2020", "DOM", "DOM.Iterable"],
       "allowJs": true,
       "skipLibCheck": true,
       "esModuleInterop": true,
       "allowSyntheticDefaultImports": true,
       "strict": true,
       "forceConsistentCasingInFileNames": true,
       "noFallthroughCasesInSwitch": true,
       "module": "ESNext",
       "moduleResolution": "bundler",
       "resolveJsonModule": true,
       "isolatedModules": true,
       "noEmit": true,
       "jsx": "react-jsx",
       "baseUrl": "./src",
       "paths": {
         "@/*": ["*"],
         "@/components/*": ["components/*"],
         "@/pages/*": ["pages/*"],
         "@/styles/*": ["styles/*"],
         "@/utils/*": ["utils/*"],
         "@/hooks/*": ["hooks/*"],
         "@/contexts/*": ["contexts/*"]
       }
     },
     "include": ["src/**/*", "src/**/*.tsx", "src/**/*.ts"],
     "exclude": ["node_modules", "dist", "build"]
   }
   ```

2. **Convertir archivos JSX a TSX**:

   - `src/frontend/src/App.test.jsx` → `App.test.tsx`
   - Actualizar imports y tipos
   - Verificar compatibilidad

3. **Actualizar `vite.config.js` a `vite.config.ts`**:

   - Convertir configuración a TypeScript
   - Mantener alias y configuraciones existentes
   - Asegurar compatibilidad con paths de tsconfig

4. **Verificar configuración de testing**:
   - Actualizar configuración Vitest para TypeScript
   - Asegurar que tests funcionen correctamente

### ✅ TAREA C2: Corrección de Errores CSS Críticos

**Objetivo**: Resolver errores de importación CSS que bloquean el desarrollo

**Acciones Requeridas**:

1. **Analizar error actual en `src/frontend/src/index.css`**
2. **Crear estructura de estilos correcta**:

   ```
   src/frontend/src/styles/
   ├── tokens.css          # Design tokens
   ├── globals.css         # Estilos globales
   ├── components.css      # Estilos de componentes
   └── utilities.css       # Clases utilitarias
   ```

3. **Implementar design tokens completos**:

   ```css
   /* tokens.css */
   :root {
     /* Colores Grupo Naser */
     --color-primary: #1a365d;
     --color-secondary: #2d3748;
     --color-accent: #3182ce;
     --color-text: #2d3748;
     --color-text-light: #718096;
     --color-background: #ffffff;
     --color-surface: #f7fafc;

     /* Typography */
     --font-family-primary: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
     --font-family-heading: "Playfair Display", serif;

     /* Spacing */
     --spacing-xs: 0.25rem;
     --spacing-sm: 0.5rem;
     --spacing-md: 1rem;
     --spacing-lg: 1.5rem;
     --spacing-xl: 2rem;
     --spacing-2xl: 3rem;

     /* Breakpoints */
     --breakpoint-sm: 640px;
     --breakpoint-md: 768px;
     --breakpoint-lg: 1024px;
     --breakpoint-xl: 1280px;
   }
   ```

4. **Corregir importaciones en archivos existentes**
5. **Verificar compatibilidad Docker y desarrollo local**

### ✅ TAREA C3: Sistema de Design Tokens Avanzado

**Objetivo**: Implementar sistema completo de tokens para consistencia visual

**Acciones Requeridas**:

1. **Crear tokens semánticos**:

   - Colores (primary, secondary, semantic)
   - Typography (families, sizes, weights)
   - Spacing (margins, paddings, gaps)
   - Shadows y borders
   - Animations y transitions

2. **Implementar CSS custom properties**
3. **Crear utilidades CSS**
4. **Documentar sistema de tokens**

### ✅ TAREA C4: Validación y Testing de Configuración

**Objetivo**: Asegurar que toda la configuración funciona correctamente

**Acciones Requeridas**:

1. **Ejecutar build de desarrollo**: `npm run dev`
2. **Ejecutar build de producción**: `npm run build`
3. **Ejecutar tests**: `npm test`
4. **Verificar hot reload y HMR**
5. **Validar en contenedor Docker**

---

## 🎨 FASE 2: IMPLEMENTACIÓN PIXEL PERFECT

### ✅ TAREA P1: Header Completo con Sub-header

**Objetivo**: Implementar header pixel perfect basado en diseño original

**Referencia Visual**: `design-reference/screenshots/` + `VISUAL_SPEC.md`

**Componentes a Crear**:

1. **`TopBar`** - Barra superior con información de contacto
2. **`MainHeader`** - Header principal con logo y navegación
3. **`SubHeader`** - Sub-navegación con servicios
4. **`MobileMenu`** - Menú móvil responsive

**Especificaciones**:

- Logo Grupo Naser en posición exacta
- Navegación principal: Inicio, Nosotros, Servicios, Ubicaciones, Contacto
- Sub-navegación con servicios específicos
- Responsive design mobile-first
- Animaciones suaves en hover
- Accesibilidad completa (ARIA, keyboard navigation)

### ✅ TAREA P2: Hero Slider Cinematográfico

**Objetivo**: Implementar slider principal con efecto cinematográfico

**Características**:

- Slider automático con controles manuales
- Transiciones cinematográficas (fade, slide)
- Overlay con texto y call-to-action
- Responsive en todos los dispositivos
- Optimización de imágenes
- Lazy loading

**Imágenes**: Usar assets existentes en `assets/images/`

### ✅ TAREA P3: Conversión de Páginas HTML a React

**Objetivo**: Convertir las 13 páginas HTML existentes a componentes React

**Páginas a Convertir**:

1. `index.html` → `HomePage`
2. `nosotros.html` → `AboutPage`
3. `servicios.html` → `ServicesPage`
4. `contacto.html` → `ContactPage`
5. `historia.html` → `HistoryPage`
6. `prevision.html` → `PreventionPage`
7. `necesidad-inmediata.html` → `ImmediateNeedPage`
8. `obituario.html` → `ObituaryPage`
9. `naser_tlalpan.html` → `TlalpanLocationPage`
10. `naser_morelos.html` → `MorelosLocationPage`
11. `naser_oaxaca.html` → `OaxacaLocationPage`
12. `naser_aragon.html` → `AragonLocationPage`
13. `one-page.html` → `OnePageView`

**Proceso por Página**:

1. Analizar estructura HTML existente
2. Extraer contenido y estilos
3. Crear componente React equivalente
4. Implementar responsive design
5. Agregar interactividad necesaria
6. Optimizar SEO (meta tags, structured data)
7. Crear tests unitarios

## 📋 CRITERIOS DE ÉXITO

### Resolución Crítica

- ✅ Build de desarrollo funciona sin errores
- ✅ Build de producción genera assets correctos
- ✅ Tests pasan completamente
- ✅ Hot reload funciona en desarrollo
- ✅ Configuración TypeScript sin errores
- ✅ CSS se importa correctamente

### Implementación Pixel Perfect

- ✅ Header idéntico al diseño original
- ✅ Hero slider funcional y atractivo
- ✅ Al menos 5 páginas convertidas a React
- ✅ Responsive design perfecto
- ✅ Performance optimizada (Lighthouse > 90)
- ✅ Accesibilidad completa (WCAG 2.1 AA)

## 🚀 COMANDOS ÚTILES

```bash
# Desarrollo
cd src/frontend && npm run dev

# Build
cd src/frontend && npm run build

# Tests
cd src/frontend && npm test

# Linting
cd src/frontend && npm run lint

# Docker
docker-compose up -d
```

## 📁 ARCHIVOS CLAVE

- `src/frontend/tsconfig.json` - Configuración TypeScript
- `src/frontend/vite.config.ts` - Configuración Vite
- `src/frontend/src/styles/tokens.css` - Design tokens
- `src/frontend/src/components/` - Componentes React
- `VISUAL_SPEC.md` - Especificaciones visuales
- `design-reference/` - Referencias de diseño

## 🎯 RESULTADO ESPERADO

Al final de esta sesión:

1. **Problemas críticos resueltos** - Configuración funcionando perfectamente
2. **Base visual sólida** - Header, hero slider y páginas principales
3. **Sistema escalable** - Design tokens y arquitectura robusta
4. **Calidad asegurada** - Tests, linting y documentación

**¡Tu expertise en React y CSS es crucial para desbloquear el proyecto!**

---

**Prioridad**: 🔴 CRÍTICA  
**Estimación**: 4-6 horas  
**Dependencias**: Ninguna (tarea bloqueante)  
**Siguiente**: Integración con backend (Gemini)
