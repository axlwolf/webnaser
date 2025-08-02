# PROMPT CLAUDE - BATCH 4: Implementación Pixel Perfect del Sitio Web

## 🎯 CONTEXTO DEL PROYECTO

¡Excelente trabajo en los batches anteriores! Eres **Claude**, el desarrollador Frontend React especializado para el **CMS de Grupo Naser**. Has completado exitosamente el sistema de autenticación (LoginForm, LogoutButton). Ahora tu misión es implementar el sitio web completo para que sea **pixel perfect** con el sitio actual.

**Equipo de 4 agentes coordinados**:

- **Kiro**: Orquestador principal - coordinando desarrollo pixel perfect
- **Claude (tú)**: Desarrollador Frontend React - RESPONSABLE DE UI/UX PIXEL PERFECT
- **Gemini**: Desarrollador Backend PHP - trabajando en JwtService
- **Warp**: Especialista DevOps - resolviendo problemas críticos de infraestructura

**Branch actual**: `feature/auth-integration`  
**Progreso actual**: ~45% (Sistema de auth completado)  
**Tu estado**: ✅ LogoutButton completado - Listo para pixel perfect implementation

## 🚨 PROBLEMAS CRÍTICOS A RESOLVER PRIMERO

### **PROBLEMA 1: CONFIGURACIÓN TYPESCRIPT INCONSISTENTE**

El proyecto frontend tiene configuración inconsistente entre JSX y TypeScript que está causando problemas de compilación:

**Problemas Identificados**:

- ❌ Falta `tsconfig.json` en el frontend
- ❌ Archivo `src/test/App.test.jsx` usa JSX en lugar de TSX
- ❌ `vite.config.js` debería ser `vite.config.ts`
- ❌ Configuración TypeScript incompleta

**Solución Requerida**: Configurar TypeScript correctamente siguiendo los estándares de React.

### **PROBLEMA 2: ERROR CSS EN CONTENEDOR FRONTEND**

```
[plugin:vite:css] [postcss] ENOENT: no such file or directory, open '../../styles/tokens.css'
/app/src/index.css:undefined:null
```

**Causa**: Rutas CSS incorrectas dentro del contenedor Docker.

**Solución Requerida**: Corregir las rutas de importación CSS.

## 🎯 TU MISIÓN: SITIO WEB PIXEL PERFECT (Tarea C.4)

### OBJETIVO

Implementar el sitio web completo de Grupo Naser en React para que sea **100% pixel perfect** con el sitio HTML actual, incluyendo todas las páginas, componentes, animaciones y responsive design.

### RECURSOS DISPONIBLES

#### **Sitio HTML Actual (Referencia)**

```
Páginas principales:
├── index.html              # Página de inicio
├── nosotros.html           # Acerca de nosotros
├── historia.html           # Historia de la empresa
├── servicios.html          # Servicios generales
├── necesidad-inmediata.html # Servicio de necesidad inmediata
├── prevision.html          # Servicio de previsión
├── obituario.html          # Obituarios
├── contacto.html           # Contacto general
├── cobertura.html          # Cobertura de servicios
├── naser_aragon.html       # Sucursal Aragón
├── naser_morelos.html      # Sucursal Morelos
├── naser_oaxaca.html       # Sucursal Oaxaca
├── naser_tlalpan.html      # Sucursal Tlalpan
└── one-page.html           # Versión one-page
```

#### **Assets Completos**

```
assets/
├── css/
│   ├── styles.css          # Estilos principales
│   ├── fontawesome.css     # Iconos FontAwesome
│   ├── owl.css            # Carousel Owl
│   └── flex-slider.css    # Slider
├── images/                # Todas las imágenes del sitio
├── fonts/                 # Fuentes personalizadas
└── js/                    # JavaScript original
```

#### **Referencias Visuales**

```
design-reference/
├── homepage.png           # Captura de página principal
├── nosotros.png          # Captura de nosotros
├── servicios.png         # Captura de servicios
├── contacto.png          # Captura de contacto
├── necesidad-inmediata.png # Captura de necesidad inmediata
├── prevision.png         # Captura de previsión
└── obituario.png         # Captura de obituarios
```

#### **Especificación Visual (VISUAL_SPEC.md)**

- Paleta de colores completa
- Tipografía (Poppins)
- Componentes UI definidos
- Responsive breakpoints

### UBICACIÓN DE ARCHIVOS

```
src/frontend/src/
├── components/
│   ├── layout/
│   │   ├── Header/         # Header principal con navegación
│   │   ├── Footer/         # Footer con información de contacto
│   │   ├── Navigation/     # Navegación principal
│   │   └── Layout/         # Layout wrapper principal
│   ├── sections/
│   │   ├── Hero/           # Hero slider principal
│   │   ├── Services/       # Sección de servicios
│   │   ├── About/          # Sección acerca de
│   │   ├── Contact/        # Sección de contacto
│   │   ├── Coverage/       # Sección de cobertura
│   │   └── Locations/      # Sección de ubicaciones
│   ├── pages/
│   │   ├── Home/           # Página principal
│   │   ├── About/          # Página nosotros
│   │   ├── History/        # Página historia
│   │   ├── Services/       # Página servicios
│   │   ├── ImmediateNeed/  # Página necesidad inmediata
│   │   ├── Prevention/     # Página previsión
│   │   ├── Obituary/       # Página obituarios
│   │   ├── Contact/        # Página contacto
│   │   ├── Coverage/       # Página cobertura
│   │   └── Locations/      # Páginas de ubicaciones
│   └── ui/
│       ├── Button/         # Componentes de botones
│       ├── Card/           # Componentes de tarjetas
│       ├── Modal/          # Componentes de modales
│       ├── Slider/         # Componentes de sliders
│       └── Form/           # Componentes de formularios
├── styles/
│   ├── tokens.css          # Design tokens (colores, tipografía)
│   ├── globals.css         # Estilos globales
│   ├── components.css      # Estilos de componentes
│   └── pages.css           # Estilos específicos de páginas
├── assets/
│   ├── images/             # Imágenes optimizadas
│   ├── fonts/              # Fuentes web
│   └── icons/              # Iconos SVG
└── utils/
    ├── constants.js        # Constantes del sitio
    ├── helpers.js          # Funciones auxiliares
    └── responsive.js       # Utilidades responsive
```

### ESPECIFICACIONES TÉCNICAS DETALLADAS

#### 1. CONFIGURACIÓN TYPESCRIPT COMPLETA

```json
// src/frontend/tsconfig.json
// Configuración TypeScript siguiendo estándares de React
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@pages/*": ["src/pages/*"],
      "@hooks/*": ["src/hooks/*"],
      "@services/*": ["src/services/*"],
      "@utils/*": ["src/utils/*"],
      "@styles/*": ["src/styles/*"],
      "@assets/*": ["src/assets/*"],
      "@constants/*": ["src/constants/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

```json
// src/frontend/tsconfig.node.json
// Configuración para herramientas de Node.js
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noEmit": true
  },
  "include": ["vite.config.ts"]
}
```

```typescript
// src/frontend/vite.config.ts - CONVERTIR DE JS A TS
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@context": resolve(__dirname, "./src/context"),
      "@services": resolve(__dirname, "./src/services"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@styles": resolve(__dirname, "./src/styles"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@constants": resolve(__dirname, "./src/constants"),
    },
  },
  build: {
    outDir: "../../public/static",
    emptyOutDir: true,
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
    host: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.config.ts",
        "dist/",
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});
```

```typescript
// src/frontend/src/test/App.test.tsx - CONVERTIR DE JSX A TSX
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import App from "../App";

// Helper function to render App with Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("App", () => {
  it("renders without crashing", () => {
    renderWithRouter(<App />);
    expect(document.body).toBeTruthy();
  });

  it("contains main content", () => {
    renderWithRouter(<App />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeTruthy();
  });

  it("displays home page content by default", () => {
    renderWithRouter(<App />);
    expect(screen.getByText("Grupo Naser - Home Page")).toBeTruthy();
  });

  it("contains navigation links", () => {
    renderWithRouter(<App />);
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("Services")).toBeTruthy();
    expect(screen.getByText("Locations")).toBeTruthy();
    expect(screen.getByText("Contact")).toBeTruthy();
  });
});
```

#### 2. RESOLUCIÓN DEL ERROR CSS CRÍTICO

```typescript
// src/frontend/src/styles/tokens.css
// Crear archivo de design tokens basado en VISUAL_SPEC.md

:root {
  /* Colores Primarios */
  --color-primary: #c8a97e;        /* Dorado Naser */
  --color-secondary: #1e2b4d;      /* Azul Oscuro */
  --color-accent: #2a4176;         /* Azul Medio */

  /* Colores de Texto */
  --color-text-primary: #000000;
  --color-text-secondary: #6a6a6a;
  --color-text-light: #ffffff;

  /* Colores de Fondo */
  --color-background: #ffffff;
  --color-background-alt: #f7f7f7;
  --color-background-dark: #1e2b4d;

  /* Tipografía */
  --font-family-primary: 'Poppins', sans-serif;
  --font-family-secondary: 'Poppins', sans-serif;

  /* Tamaños de Fuente */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-md: 1rem;       /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */

  /* Pesos de Fuente */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* Espaciado */
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  --spacing-3xl: 4rem;     /* 64px */

  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;

  /* Sombras */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  /* Bordes */
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.375rem;
  --border-radius-lg: 0.5rem;
  --border-radius-xl: 0.75rem;

  /* Transiciones */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 300ms ease-in-out;
  --transition-slow: 500ms ease-in-out;
}
```

```css
/* src/frontend/src/index.css - CORREGIR RUTAS */
/* Import our design system - RUTAS CORREGIDAS */
@import "./styles/tokens.css";
@import "./styles/globals.css";

/* Resto del archivo permanece igual... */
```

#### 3. COMPONENTE HEADER PIXEL PERFECT (Siguiendo Estándares React)

```typescript
// src/frontend/src/components/layout/Header/Header.tsx

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Detectar scroll para header sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navigationItems = [
    { path: "/", label: "Inicio" },
    { path: "/nosotros", label: "Nosotros" },
    { path: "/historia", label: "Historia" },
    {
      path: "/servicios",
      label: "Servicios",
      submenu: [
        { path: "/necesidad-inmediata", label: "Necesidad Inmediata" },
        { path: "/prevision", label: "Previsión" },
      ],
    },
    { path: "/cobertura", label: "Cobertura" },
    { path: "/obituario", label: "Obituario" },
    { path: "/contacto", label: "Contacto" },
  ];

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${
        className || ""
      }`}
    >
      {/* Sub-header con información de contacto */}
      <div className={styles.subHeader}>
        <div className={styles.container}>
          <div className={styles.contactInfo}>
            <span className={styles.phone}>
              <i className="fas fa-phone" aria-hidden="true"></i>
              55 5555 5555
            </span>
            <span className={styles.email}>
              <i className="fas fa-envelope" aria-hidden="true"></i>
              contacto@naser.com.mx
            </span>
          </div>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Facebook" className={styles.socialLink}>
              <i className="fab fa-facebook-f" aria-hidden="true"></i>
            </a>
            <a href="#" aria-label="Instagram" className={styles.socialLink}>
              <i className="fab fa-instagram" aria-hidden="true"></i>
            </a>
            <a href="#" aria-label="WhatsApp" className={styles.socialLink}>
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <div className={styles.mainHeader}>
        <div className={styles.container}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <img
              src="/assets/images/logo_naser.png"
              alt="Grupo Naser - Servicios Funerarios"
              className={styles.logoImage}
            />
          </Link>

          {/* Navegación desktop */}
          <nav className={styles.navigation} role="navigation">
            <ul className={styles.navList}>
              {navigationItems.map((item) => (
                <li key={item.path} className={styles.navItem}>
                  <Link
                    to={item.path}
                    className={`${styles.navLink} ${
                      location.pathname === item.path ? styles.active : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <ul className={styles.submenu}>
                      {item.submenu.map((subItem) => (
                        <li key={subItem.path}>
                          <Link
                            to={subItem.path}
                            className={styles.submenuLink}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Botón menú móvil */}
          <button
            className={`${styles.mobileMenuButton} ${
              isMenuOpen ? styles.open : ""
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú de navegación"
            aria-expanded={isMenuOpen}
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
        <nav className={styles.mobileNavigation}>
          <ul className={styles.mobileNavList}>
            {navigationItems.map((item) => (
              <li key={item.path} className={styles.mobileNavItem}>
                <Link
                  to={item.path}
                  className={`${styles.mobileNavLink} ${
                    location.pathname === item.path ? styles.active : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <ul className={styles.mobileSubmenu}>
                    {item.submenu.map((subItem) => (
                      <li key={subItem.path}>
                        <Link
                          to={subItem.path}
                          className={styles.mobileSubmenuLink}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay para cerrar menú móvil */}
      {isMenuOpen && (
        <div
          className={styles.mobileMenuOverlay}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

export default Header;
```

#### 3. PÁGINA PRINCIPAL PIXEL PERFECT

```typescript
// src/frontend/src/pages/Home/Home.tsx

import React from "react";
import { Header } from "../../components/layout/Header/Header";
import { Footer } from "../../components/layout/Footer/Footer";
import { HeroSlider } from "../../components/sections/Hero/HeroSlider";
import { ServicesSection } from "../../components/sections/Services/ServicesSection";
import { AboutSection } from "../../components/sections/About/AboutSection";
import { CoverageSection } from "../../components/sections/Coverage/CoverageSection";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import styles from "./Home.module.css";

export function Home() {
  return (
    <div className={styles.homePage}>
      <Header />

      <main className={styles.main}>
        {/* Hero Slider - Exactamente como el sitio original */}
        <HeroSlider />

        {/* Sección de Servicios */}
        <ServicesSection />

        {/* Sección Acerca de Nosotros */}
        <AboutSection />

        {/* Sección de Cobertura */}
        <CoverageSection />

        {/* Sección de Contacto */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
```

### CRITERIOS DE ACEPTACIÓN PIXEL PERFECT

#### **Resolución de Problemas**

- [ ] **TYPESCRIPT CONFIGURADO**: tsconfig.json completo y funcional
- [ ] **ARCHIVOS TSX CONVERTIDOS**: Todos los archivos JSX convertidos a TSX
- [ ] **VITE CONFIG ACTUALIZADO**: vite.config.ts con configuración TypeScript
- [ ] **ERROR CSS RESUELTO**: Contenedor frontend funciona sin errores
- [ ] **RUTAS CSS CORREGIDAS**: Imports funcionan en desarrollo y Docker
- [ ] **DESIGN TOKENS IMPLEMENTADOS**: Sistema de tokens CSS completo

#### **Implementación Visual**

- [ ] **HEADER PIXEL PERFECT**: Idéntico al sitio original con sub-header
- [ ] **NAVEGACIÓN FUNCIONAL**: Menú responsive con submenús
- [ ] **HERO SLIDER**: Slider principal con todas las imágenes y textos
- [ ] **SECCIONES PRINCIPALES**: Servicios, About, Cobertura, Contacto
- [ ] **FOOTER COMPLETO**: Información de contacto y enlaces

#### **Páginas Completas**

- [ ] **PÁGINA PRINCIPAL**: 100% pixel perfect con sitio original
- [ ] **PÁGINA NOSOTROS**: Layout y contenido idéntico
- [ ] **PÁGINA SERVICIOS**: Todas las variantes de servicios
- [ ] **PÁGINAS DE UBICACIONES**: Aragón, Morelos, Oaxaca, Tlalpan
- [ ] **PÁGINA CONTACTO**: Formularios y mapas funcionales

#### **Responsive Design**

- [ ] **MOBILE FIRST**: Diseño optimizado para móviles
- [ ] **TABLET RESPONSIVE**: Adaptación perfecta para tablets
- [ ] **DESKTOP PERFECT**: Idéntico al sitio original en desktop
- [ ] **BREAKPOINTS CORRECTOS**: Transiciones suaves entre tamaños

#### **Performance y Optimización**

- [ ] **IMÁGENES OPTIMIZADAS**: WebP con fallbacks
- [ ] **LAZY LOADING**: Carga diferida de imágenes
- [ ] **CSS OPTIMIZADO**: Estilos modulares y eficientes
- [ ] **ACCESIBILIDAD**: ARIA labels y navegación por teclado

#### **Testing y Validación**

- [ ] **TESTS VISUALES**: Comparación pixel perfect automatizada
- [ ] **TESTS RESPONSIVE**: Validación en todos los breakpoints
- [ ] **TESTS DE NAVEGACIÓN**: Todos los enlaces funcionan
- [ ] **TESTS DE FORMULARIOS**: Validación y envío correcto

### COMANDOS PARA REPORTAR PROGRESO

```bash
# Al iniciar la resolución de problemas críticos
node .kiro/specs/auth-integration/update-status.js start-task claude "C.4" "🚨 CRÍTICO: Configurando TypeScript y resolviendo errores CSS para implementación pixel perfect"

# Para reportar progreso de componentes
node .kiro/specs/auth-integration/update-status.js update-progress claude "C.4" "Header pixel perfect implementado - navegación funcional"
node .kiro/specs/auth-integration/update-status.js update-progress claude "C.4" "Página principal completada - hero slider y secciones principales"

# Al completar pixel perfect
node .kiro/specs/auth-integration/update-status.js complete-task claude "C.4" "🎉 PIXEL PERFECT COMPLETADO: Sitio web 100% idéntico al original con responsive design"
```

## 🎯 METODOLOGÍA PIXEL PERFECT

### **Proceso de Implementación**

1. **ANÁLISIS VISUAL**: Comparar cada elemento del sitio original
2. **EXTRACCIÓN DE ASSETS**: Optimizar y organizar imágenes/fuentes
3. **COMPONENTES MODULARES**: Crear componentes reutilizables
4. **TESTING CONTINUO**: Validar cada componente contra el original
5. **RESPONSIVE TESTING**: Verificar en todos los dispositivos
6. **OPTIMIZACIÓN FINAL**: Performance y accesibilidad

### **Herramientas de Validación**

- **Comparación Visual**: Screenshots lado a lado
- **Medición de Pixeles**: Herramientas de precisión
- **Testing Responsive**: DevTools y dispositivos reales
- **Validación de Colores**: Exactitud de paleta
- **Testing de Tipografía**: Tamaños y pesos correctos

## 🚀 PRIORIDADES DE IMPLEMENTACIÓN

### **FASE 1: CRÍTICA** (Resolver primero)

1. ✅ Configurar TypeScript correctamente (tsconfig.json)
2. ✅ Convertir archivos JSX a TSX
3. ✅ Actualizar vite.config.js a vite.config.ts
4. ✅ Resolver error CSS de rutas
5. ✅ Implementar design tokens
6. ✅ Header y navegación funcional

### **FASE 2: PRINCIPAL** (Core del sitio)

1. ✅ Página principal completa
2. ✅ Hero slider funcional
3. ✅ Secciones principales

### **FASE 3: PÁGINAS** (Contenido completo)

1. ✅ Todas las páginas principales
2. ✅ Páginas de ubicaciones
3. ✅ Formularios funcionales

### **FASE 4: OPTIMIZACIÓN** (Pulimiento final)

1. ✅ Responsive perfecto
2. ✅ Performance optimizada
3. ✅ Accesibilidad completa

---

**¡Esta es tu oportunidad de brillar, Claude!** 🎨 Tu expertise en frontend será crucial para crear una experiencia visual perfecta.

**Enfócate en**: Precisión pixel perfect, responsive design impecable, y experiencia de usuario excepcional.

## 📋 ESTÁNDARES DE REACT A SEGUIR

### **Estructura de Componentes**

- ✅ Usar componentes funcionales con hooks (no clases)
- ✅ Mantener componentes pequeños y enfocados en una responsabilidad
- ✅ Usar named exports para componentes
- ✅ Colocar cada componente en su propio archivo

### **Gestión de Estado**

- ✅ Usar React Context para estado global que cambia poco frecuentemente
- ✅ Preferir estado local del componente para estado específico de UI
- ✅ Considerar React Query para gestión de estado del servidor

### **Estilos**

- ✅ Usar CSS modules para estilos de componentes
- ✅ Seguir convención BEM para nombres de clases CSS
- ✅ Usar principios de diseño responsive con enfoque mobile-first

### **Performance**

- ✅ Usar React.memo para componentes que renderizan frecuentemente pero cambian poco
- ✅ Evitar re-renders innecesarios usando useCallback y useMemo
- ✅ Implementar code splitting con React.lazy y Suspense

### **Accesibilidad**

- ✅ Todas las imágenes deben tener texto alt
- ✅ Usar elementos HTML semánticos
- ✅ Asegurar que la navegación por teclado funcione para todos los elementos interactivos
- ✅ Mantener jerarquía apropiada de encabezados

### **Compatibilidad con GoDaddy**

- ✅ Asegurar que todo el código sea compatible con el entorno de hosting de GoDaddy
- ✅ Usar rutas relativas para assets y endpoints de API
- ✅ Optimizar el tamaño del bundle para limitaciones de hosting compartido
