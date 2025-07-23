# Especificaciones Visuales - Grupo Naser CMS

Este documento define las especificaciones visuales extraídas del sitio actual de Grupo Naser para guiar el rediseño del frontend React.

## Análisis Visual del Sitio Actual

### Paleta de Colores

#### Colores Primarios

- **Dorado**: `#c8a97e` - Color principal de la marca, usado en botones y elementos destacados
- **Azul Oscuro**: `#1e2b4d` - Color de fondo en headers y footers
- **Negro**: `#000000` - Texto principal y algunos fondos
- **Blanco**: `#ffffff` - Texto sobre fondos oscuros y áreas de contenido

#### Colores Secundarios

- **Gris Claro**: `#f7f7f7` - Fondos de secciones alternativas
- **Gris Medio**: `#6a6a6a` - Texto secundario
- **Azul Medio**: `#2a4176` - Elementos de navegación y hover states

### Tipografía

#### Fuentes

- **Principal**: Poppins (100, 200, 300, 400, 500, 600, 700, 800, 900)
  ```css
  @import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap");
  ```

#### Jerarquía Tipográfica

- **Títulos Principales (h1)**: Poppins Bold (700), 36px-48px
- **Subtítulos (h2)**: Poppins SemiBold (600), 24px-30px
- **Títulos de Sección (h4)**: Poppins Medium (500), 18px-24px
- **Texto Destacado (h6)**: Poppins SemiBold (600), 14px-16px, mayúsculas
- **Texto Regular**: Poppins Regular (400), 16px
- **Texto Pequeño**: Poppins Light (300), 14px

### Elementos UI Clave

#### 1. Header

- Barra superior (sub-header) con información de contacto y redes sociales
- Logo centrado a la izquierda
- Menú de navegación horizontal a la derecha
- Fondo azul oscuro con texto blanco

#### 2. Hero Slider

- Imágenes de fondo a pantalla completa con overlay oscuro
- Texto centrado con título grande, subtítulo y descripción
- Botón dorado "filled-button" para llamadas a la acción
- Indicadores de slider en la parte inferior

#### 3. Sección de Servicios

- Cards con bordes sutiles y sombras
- Iconos centrados en la parte superior
- Títulos en azul oscuro
- Botón dorado "filled-button" en cada card

#### 4. Formulario de Contacto

- Fondo azul oscuro con texto blanco
- Botón con borde blanco "border-button"
- Disposición en dos columnas (texto + botón)

#### 5. Footer

- Estructura de 4 columnas
- Títulos en mayúsculas
- Enlaces con iconos para contacto
- Iconos de redes sociales
- Sub-footer con copyright

### Componentes Específicos

#### Botones

1. **Filled Button**

   - Fondo dorado: `#c8a97e`
   - Texto blanco
   - Padding: 12px 25px
   - Border-radius: 3px
   - Transición suave en hover

2. **Border Button**
   - Borde blanco: 1px solid `#ffffff`
   - Texto blanco
   - Fondo transparente
   - Padding: 12px 25px
   - Border-radius: 3px
   - Transición suave en hover

#### Tarjetas (Cards)

- Padding: 30px
- Background: `#ffffff`
- Border-radius: 5px
- Box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1)
- Transición suave en hover

#### Navegación

- Links con transición de color en hover
- Indicador de página activa
- Responsive con hamburger menu en móvil

#### Iconos

- Font Awesome para iconos de redes sociales y contacto
- Iconos personalizados para servicios (formato PNG)

## Elementos Visuales Distintivos

### 1. Slider Cinematográfico

- Imágenes de fondo a pantalla completa
- Overlay oscuro con gradiente
- Texto centrado con estructura jerárquica clara
- Animaciones de transición suaves

### 2. Estética Premium

- Uso prominente del color dorado
- Tipografía elegante con variedad de pesos
- Espaciado generoso entre elementos
- Sombras sutiles para dar profundidad

### 3. Iconografía Personalizada

- Iconos personalizados para cada servicio
- Estilo flat design con colores sólidos
- Tamaño consistente (aproximadamente 64x64px)

### 4. Elementos de Marca

- Logo de Grupo Naser prominente en header
- Paleta de colores consistente (dorado, azul oscuro)
- Estilo fotográfico sobrio y profesional

## Responsive Design

### Breakpoints

- **Móvil**: < 768px
- **Tablet**: 768px - 991px
- **Desktop**: > 992px

### Consideraciones Móviles

- Menú hamburger para navegación
- Stack vertical de cards
- Imágenes de hero reducidas en altura
- Texto más pequeño pero legible (mínimo 14px)

## Animaciones y Transiciones

### Transiciones

- Hover en botones: cambio suave de color (0.3s)
- Hover en cards: ligera elevación con sombra
- Transiciones de página: fade-in (0.5s)

### Slider

- Transición entre slides: fade (1s)
- Autoplay: 5s por slide
- Controles de navegación manual

## Requisitos de Accesibilidad

- Contraste adecuado entre texto y fondo (WCAG AA)
- Textos alternativos para imágenes
- Navegación accesible por teclado
- Estructura semántica HTML5

## Implementación en React

### Componentes Prioritarios

1. **Header**: Incluye sub-header, logo y navegación
2. **HeroSlider**: Slider principal con imágenes y texto
3. **ServiceCard**: Tarjeta individual de servicio
4. **FilledButton**: Botón principal dorado
5. **BorderButton**: Botón secundario con borde
6. **Footer**: Footer completo con 4 columnas

### Estructura de Estilos

- CSS Modules para estilos por componente
- Variables CSS para colores y tipografía
- Media queries para responsive design

### Consideraciones Técnicas

- Optimización de imágenes para carga rápida
- Lazy loading para imágenes y componentes
- Animaciones optimizadas para rendimiento

---

**Última actualización**: 18 de julio de 2025  
**Autor**: Kiro (Orquestador)  
**Para implementación por**: Claude (Frontend)
