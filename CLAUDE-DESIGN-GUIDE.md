# 🎨 GUÍA DE DISEÑO DETALLADA PARA CLAUDE

**Propósito**: Proporcionar descripciones pixel-perfect de las imágenes de referencia para implementación exacta  
**Para**: Claude (Frontend Developer)  
**De**: Kiro (Orquestador)

---

## 📋 IMÁGENES DE REFERENCIA DISPONIBLES

```
design-reference/
├── homepage.png           # Página principal completa
├── nosotros.png          # Página "Acerca de nosotros"
├── servicios.png         # Página de servicios
├── cotnacto.png          # Página de contacto (typo en nombre)
├── necesidad-inmediata.png # Servicio de necesidad inmediata
├── prevision.png         # Servicio de previsión
└── obituario.png         # Página de obituarios
```

---

## 🏠 HOMEPAGE.PNG - DESCRIPCIÓN DETALLADA

### **ESTRUCTURA GENERAL**

- **Layout**: Diseño vertical de una sola columna
- **Ancho máximo**: ~1200px centrado
- **Fondo**: Blanco (#ffffff)

### **1. HEADER SUPERIOR**

#### **Sub-header (Barra superior)**

- **Altura**: ~40px
- **Fondo**: Azul oscuro (#1e2b4d)
- **Contenido**:
  - **Izquierda**: Información de contacto con iconos
    - 📞 "55 5555 5555" (texto blanco, fuente pequeña)
    - ✉️ "contacto@naser.com.mx" (texto blanco, fuente pequeña)
  - **Derecha**: Iconos de redes sociales
    - Facebook, Instagram, WhatsApp (iconos blancos, ~16px)

#### **Header Principal**

- **Altura**: ~80px
- **Fondo**: Blanco (#ffffff)
- **Contenido**:
  - **Izquierda**: Logo Naser (altura ~50px)
  - **Derecha**: Navegación horizontal
    - Items: "Inicio", "Nosotros", "Historia", "Servicios", "Cobertura", "Obituario", "Contacto"
    - **Fuente**: Poppins Medium (500), ~14px
    - **Color**: Azul oscuro (#1e2b4d)
    - **Hover**: Dorado (#c8a97e)

### **2. HERO SLIDER**

#### **Dimensiones**

- **Altura**: ~600px (pantalla completa)
- **Ancho**: 100% viewport

#### **Slide Principal**

- **Imagen de fondo**: Imagen de servicios funerarios con overlay oscuro (opacity: 0.6)
- **Contenido centrado**:
  - **Título principal**: "SERVICIOS FUNERARIOS DE CALIDAD"
    - **Fuente**: Poppins Bold (700), ~48px
    - **Color**: Blanco (#ffffff)
    - **Alineación**: Centrado
  - **Subtítulo**: "Más de 30 años de experiencia"
    - **Fuente**: Poppins Regular (400), ~24px
    - **Color**: Blanco (#ffffff)
    - **Margin-top**: 20px
  - **Descripción**: Párrafo explicativo sobre los servicios
    - **Fuente**: Poppins Light (300), ~16px
    - **Color**: Blanco (#ffffff)
    - **Ancho máximo**: ~600px
    - **Margin-top**: 30px
  - **Botón CTA**: "CONOCER MÁS"
    - **Estilo**: filled-button (fondo dorado #c8a97e)
    - **Margin-top**: 40px

#### **Indicadores de Slider**

- **Posición**: Parte inferior centrada
- **Estilo**: Círculos pequeños (~8px)
- **Color activo**: Dorado (#c8a97e)
- **Color inactivo**: Blanco con opacity (rgba(255,255,255,0.5))

### **3. SECCIÓN DE SERVICIOS**

#### **Contenedor**

- **Padding**: 80px 0
- **Fondo**: Gris claro (#f7f7f7)

#### **Título de Sección**

- **Texto**: "NUESTROS SERVICIOS"
- **Fuente**: Poppins SemiBold (600), ~30px
- **Color**: Azul oscuro (#1e2b4d)
- **Alineación**: Centrado
- **Margin-bottom**: 60px

#### **Grid de Servicios**

- **Layout**: 3 columnas en desktop
- **Gap**: 30px entre cards

#### **Card de Servicio** (x3)

- **Dimensiones**: ~350px ancho, altura automática
- **Fondo**: Blanco (#ffffff)
- **Padding**: 40px 30px
- **Border-radius**: 5px
- **Box-shadow**: 0 5px 15px rgba(0,0,0,0.1)
- **Contenido**:
  - **Icono**: Centrado, ~60px, color dorado (#c8a97e)
  - **Título**: Poppins SemiBold (600), ~20px, azul oscuro
  - **Descripción**: Poppins Regular (400), ~14px, gris medio
  - **Botón**: "VER MÁS" (filled-button, dorado)

#### **Servicios Mostrados**:

1. **Necesidad Inmediata**
   - Icono: Reloj o urgencia
   - Descripción: Servicio 24/7 para situaciones urgentes
2. **Previsión**
   - Icono: Escudo o protección
   - Descripción: Planes de previsión funeraria
3. **Servicios Completos**
   - Icono: Lista o check
   - Descripción: Servicios funerarios integrales

### **4. SECCIÓN ACERCA DE NOSOTROS**

#### **Contenedor**

- **Padding**: 80px 0
- **Fondo**: Blanco (#ffffff)

#### **Layout**

- **Estructura**: 2 columnas (50/50)
- **Gap**: 60px

#### **Columna Izquierda - Texto**

- **Título**: "ACERCA DE NOSOTROS"
  - **Fuente**: Poppins SemiBold (600), ~30px
  - **Color**: Azul oscuro (#1e2b4d)
- **Subtítulo**: "Más de 30 años de experiencia"
  - **Fuente**: Poppins Medium (500), ~18px
  - **Color**: Dorado (#c8a97e)
- **Párrafos**: Descripción de la empresa
  - **Fuente**: Poppins Regular (400), ~16px
  - **Color**: Gris medio (#6a6a6a)
  - **Line-height**: 1.6
- **Botón**: "CONOCER MÁS" (filled-button)

#### **Columna Derecha - Imagen**

- **Imagen**: Instalaciones o equipo de trabajo
- **Border-radius**: 5px
- **Dimensiones**: Proporcional al contenido de texto

### **5. SECCIÓN DE COBERTURA**

#### **Contenedor**

- **Padding**: 80px 0
- **Fondo**: Azul oscuro (#1e2b4d)

#### **Título**

- **Texto**: "COBERTURA EN CDMX"
- **Color**: Blanco (#ffffff)
- **Alineación**: Centrado

#### **Grid de Ubicaciones**

- **Layout**: 4 columnas en desktop
- **Items**: Tarjetas con ubicaciones
  - Aragón, Morelos, Oaxaca, Tlalpan
- **Estilo**: Cards blancas con información de contacto

### **6. FOOTER**

#### **Estructura**

- **Fondo**: Azul oscuro (#1e2b4d)
- **Padding**: 60px 0 20px 0
- **Color de texto**: Blanco (#ffffff)

#### **Layout Principal** (4 columnas)

1. **Logo y descripción**
2. **Enlaces rápidos**
3. **Servicios**
4. **Información de contacto**

#### **Sub-footer**

- **Fondo**: Más oscuro
- **Contenido**: Copyright y enlaces legales
- **Alineación**: Centrado

---

## 🎨 ELEMENTOS ESPECÍFICOS DE DISEÑO

### **BOTONES**

#### **Filled Button**

```css
.filled-button {
  background: #c8a97e;
  color: #ffffff;
  padding: 12px 25px;
  border: none;
  border-radius: 3px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filled-button:hover {
  background: #b8996e;
  transform: translateY(-2px);
}
```

#### **Border Button**

```css
.border-button {
  background: transparent;
  color: #ffffff;
  padding: 12px 25px;
  border: 1px solid #ffffff;
  border-radius: 3px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.border-button:hover {
  background: #ffffff;
  color: #1e2b4d;
}
```

### **CARDS**

```css
.service-card {
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
```

### **ESPACIADO ESTÁNDAR**

- **Secciones**: 80px padding vertical
- **Elementos**: 30px margin-bottom
- **Cards**: 30px gap
- **Contenido**: 60px margin entre título y contenido

---

## 📱 RESPONSIVE BREAKPOINTS

### **Desktop** (1200px+)

- Layout completo como se describe arriba

### **Tablet** (768px - 1199px)

- **Servicios**: 2 columnas
- **Cobertura**: 2 columnas
- **Footer**: 2 columnas

### **Mobile** (< 768px)

- **Servicios**: 1 columna
- **Acerca de**: 1 columna (imagen arriba)
- **Cobertura**: 1 columna
- **Footer**: 1 columna
- **Navegación**: Hamburger menu

---

## 🎯 INSTRUCCIONES ESPECÍFICAS PARA CLAUDE

### **PRIORIDADES DE IMPLEMENTACIÓN**

1. **Estructura HTML semántica**

   - Usar elementos apropiados (header, nav, main, section, footer)
   - Incluir ARIA labels para accesibilidad

2. **CSS Modular**

   - Usar CSS Modules como se especifica en los estándares
   - Seguir convención BEM para nombres de clases

3. **Responsive Design**

   - Mobile-first approach
   - Usar CSS Grid y Flexbox
   - Breakpoints específicos mencionados arriba

4. **Performance**
   - Lazy loading para imágenes
   - Optimización de assets
   - Code splitting por componentes

### **COMPONENTES A CREAR**

```
src/components/
├── layout/
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── Header.module.css
│   │   └── SubHeader.tsx
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   └── Footer.module.css
│   └── Navigation/
│       ├── Navigation.tsx
│       └── Navigation.module.css
├── sections/
│   ├── Hero/
│   │   ├── HeroSlider.tsx
│   │   └── HeroSlider.module.css
│   ├── Services/
│   │   ├── ServicesSection.tsx
│   │   ├── ServiceCard.tsx
│   │   └── Services.module.css
│   ├── About/
│   │   ├── AboutSection.tsx
│   │   └── About.module.css
│   └── Coverage/
│       ├── CoverageSection.tsx
│       └── Coverage.module.css
└── ui/
    ├── Button/
    │   ├── Button.tsx
    │   └── Button.module.css
    └── Card/
        ├── Card.tsx
        └── Card.module.css
```

---

**¡Con esta guía detallada, Claude puede implementar el diseño pixel perfect sin necesidad de ver las imágenes!** 🎨✨

---

## 👥 NOSOTROS.PNG - DESCRIPCIÓN DETALLADA

### **ESTRUCTURA ESPECÍFICA**

#### **Hero Section**

- **Altura**: ~400px
- **Fondo**: Imagen de instalaciones con overlay azul oscuro (opacity: 0.8)
- **Contenido centrado**:
  - **Título**: "NOSOTROS"
    - **Fuente**: Poppins Bold (700), ~42px
    - **Color**: Blanco (#ffffff)
  - **Breadcrumb**: "Inicio > Nosotros"
    - **Fuente**: Poppins Regular (400), ~14px
    - **Color**: Blanco con opacity (rgba(255,255,255,0.8))

#### **Contenido Principal**

- **Layout**: 2 columnas asimétricas (60/40)
- **Padding**: 80px 0

#### **Columna Principal (Izquierda)**

- **Título**: "NUESTRA HISTORIA"
  - **Fuente**: Poppins SemiBold (600), ~28px
  - **Color**: Azul oscuro (#1e2b4d)
- **Contenido**: Múltiples párrafos sobre la historia de la empresa
  - **Fuente**: Poppins Regular (400), ~16px
  - **Line-height**: 1.7
  - **Color**: Gris medio (#6a6a6a)

#### **Sidebar (Derecha)**

- **Card de Información**:
  - **Fondo**: Gris claro (#f7f7f7)
  - **Padding**: 30px
  - **Border-radius**: 5px
  - **Contenido**:
    - Años de experiencia
    - Número de familias atendidas
    - Ubicaciones
    - Servicios disponibles

---

## 🛠️ SERVICIOS.PNG - DESCRIPCIÓN DETALLADA

### **ESTRUCTURA ESPECÍFICA**

#### **Hero Section**

- Similar a la página de nosotros pero con título "SERVICIOS"

#### **Grid de Servicios Detallado**

- **Layout**: 2 columnas en desktop
- **Cards más grandes**: ~500px ancho

#### **Servicios Principales**:

1. **Necesidad Inmediata**

   - **Icono**: Reloj con fondo dorado
   - **Título**: "NECESIDAD INMEDIATA"
   - **Descripción**: Texto detallado sobre servicio 24/7
   - **Lista de características**:
     - Atención inmediata
     - Servicio 24 horas
     - Personal especializado
   - **Botón**: "SOLICITAR SERVICIO"

2. **Previsión Funeraria**
   - **Icono**: Escudo protector
   - **Título**: "PREVISIÓN FUNERARIA"
   - **Descripción**: Planes de previsión
   - **Lista de beneficios**:
     - Planes flexibles
     - Sin intereses
     - Cobertura completa
   - **Botón**: "VER PLANES"

#### **Sección de Beneficios**

- **Fondo**: Azul oscuro (#1e2b4d)
- **Grid**: 3 columnas
- **Items**: Iconos con texto explicativo

---

## 📞 CONTACTO.PNG - DESCRIPCIÓN DETALLADA

### **ESTRUCTURA ESPECÍFICA**

#### **Hero Section**

- Título "CONTACTO" con imagen de fondo

#### **Contenido Principal**

- **Layout**: 2 columnas (50/50)

#### **Columna Izquierda - Información**

- **Título**: "INFORMACIÓN DE CONTACTO"
- **Lista de contactos**:
  - **Teléfono principal**: Con icono de teléfono
  - **Email**: Con icono de email
  - **Dirección**: Con icono de ubicación
  - **Horarios**: Con icono de reloj

#### **Columna Derecha - Formulario**

- **Título**: "ENVÍANOS UN MENSAJE"
- **Campos**:
  - Nombre completo
  - Email
  - Teléfono
  - Mensaje
- **Botón**: "ENVIAR MENSAJE" (filled-button)

#### **Mapa**

- **Altura**: ~400px
- **Ancho**: 100%
- **Ubicación**: Debajo del contenido principal

---

## 🚨 NECESIDAD-INMEDIATA.PNG - DESCRIPCIÓN DETALLADA

### **CARACTERÍSTICAS ESPECÍFICAS**

#### **Hero Urgente**

- **Fondo**: Rojo oscuro o azul muy oscuro para transmitir urgencia
- **Título**: "NECESIDAD INMEDIATA"
- **Subtítulo**: "SERVICIO 24 HORAS"
- **Botón prominente**: "LLAMAR AHORA" (más grande, color llamativo)

#### **Información de Contacto Destacada**

- **Teléfono grande**: Número principal muy visible
- **Disponibilidad**: "24 HORAS / 7 DÍAS"
- **Tiempo de respuesta**: "RESPUESTA INMEDIATA"

#### **Proceso de Servicio**

- **Steps numerados**: 1, 2, 3, 4
- **Cada step**: Icono + título + descripción breve

---

## 🛡️ PREVISION.PNG - DESCRIPCIÓN DETALLADA

### **CARACTERÍSTICAS ESPECÍFICAS**

#### **Hero Tranquilo**

- **Colores**: Azules y verdes suaves
- **Título**: "PREVISIÓN FUNERARIA"
- **Subtítulo**: "PLANIFICA CON TRANQUILIDAD"

#### **Planes Disponibles**

- **Layout**: 3 columnas (cards de planes)
- **Cada plan**:
  - Nombre del plan
  - Precio mensual
  - Lista de beneficios incluidos
  - Botón "CONTRATAR"

#### **Beneficios de la Previsión**

- **Grid**: 2x2 o 3x2
- **Items**: Iconos con beneficios clave

---

## 🕊️ OBITUARIO.PNG - DESCRIPCIÓN DETALLADA

### **CARACTERÍSTICAS ESPECÍFICAS**

#### **Diseño Sobrio**

- **Colores**: Grises y azules suaves
- **Tipografía**: Más elegante y formal

#### **Lista de Obituarios**

- **Layout**: Lista vertical
- **Cada obituario**:
  - Foto del difunto (placeholder si no hay)
  - Nombre completo
  - Fechas de nacimiento y fallecimiento
  - Información del servicio
  - Botón "VER DETALLES"

#### **Formulario de Búsqueda**

- **Campos**: Nombre, fecha, ubicación
- **Filtros**: Por fecha, por ubicación

---

## 🎨 PATRONES DE DISEÑO COMUNES

### **Consistencia Visual**

#### **Espaciado Estándar**

```css
/* Secciones principales */
.section {
  padding: 80px 0;
}

/* Títulos de sección */
.section-title {
  margin-bottom: 60px;
  text-align: center;
}

/* Cards */
.card {
  margin-bottom: 30px;
}

/* Elementos internos */
.element {
  margin-bottom: 20px;
}
```

#### **Animaciones Sutiles**

```css
/* Hover effects para cards */
.card:hover {
  transform: translateY(-5px);
  transition: all 0.3s ease;
}

/* Botones */
.button:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
```

#### **Sombras Consistentes**

```css
/* Sombra suave para cards */
.card-shadow {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Sombra más pronunciada en hover */
.card-shadow:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
```

---

## 📋 CHECKLIST PARA CLAUDE

### **Antes de Empezar**

- [ ] Leer completamente esta guía
- [ ] Revisar VISUAL_SPEC.md para colores y tipografía
- [ ] Configurar TypeScript correctamente
- [ ] Crear estructura de componentes

### **Durante la Implementación**

- [ ] Seguir la estructura de componentes sugerida
- [ ] Usar CSS Modules para estilos
- [ ] Implementar responsive design mobile-first
- [ ] Incluir ARIA labels para accesibilidad
- [ ] Optimizar imágenes y assets

### **Testing Visual**

- [ ] Comparar con sitio actual HTML
- [ ] Verificar responsive en diferentes tamaños
- [ ] Probar navegación y interacciones
- [ ] Validar accesibilidad
- [ ] Optimizar performance

---

**¡Con esta guía completa, Claude tiene toda la información necesaria para crear un sitio pixel perfect!** 🎯✨
