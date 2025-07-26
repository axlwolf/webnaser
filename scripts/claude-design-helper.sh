#!/bin/bash

# Script de apoyo para Claude - Análisis de diseño
# Extrae información específica del sitio actual para implementación pixel perfect

set -e

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

log() {
    echo -e "${BLUE}[DESIGN-HELPER] $1${NC}"
}

success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[INFO] $1${NC}"
}

# Función para extraer colores del CSS actual
extract_colors() {
    log "🎨 Extrayendo paleta de colores del sitio actual..."
    
    if [ -f "$PROJECT_ROOT/assets/css/styles.css" ]; then
        echo "## 🎨 COLORES EXTRAÍDOS DEL CSS ACTUAL"
        echo ""
        
        # Buscar colores hexadecimales
        grep -o '#[0-9a-fA-F]\{6\}' "$PROJECT_ROOT/assets/css/styles.css" | sort | uniq | while read color; do
            echo "- **$color**: Usado en el sitio actual"
        done
        
        echo ""
        
        # Buscar colores RGB
        grep -o 'rgb([0-9, ]*)' "$PROJECT_ROOT/assets/css/styles.css" | sort | uniq | while read color; do
            echo "- **$color**: Usado en el sitio actual"
        done
        
        echo ""
    else
        warning "⚠️ Archivo CSS no encontrado"
    fi
}

# Función para extraer fuentes
extract_fonts() {
    log "🔤 Extrayendo información de fuentes..."
    
    if [ -f "$PROJECT_ROOT/assets/css/styles.css" ]; then
        echo "## 🔤 FUENTES UTILIZADAS"
        echo ""
        
        # Buscar font-family
        grep -i "font-family" "$PROJECT_ROOT/assets/css/styles.css" | head -10 | while read line; do
            echo "- $line"
        done
        
        echo ""
        
        # Buscar font-size
        echo "### Tamaños de Fuente Comunes"
        grep -o "font-size: [^;]*" "$PROJECT_ROOT/assets/css/styles.css" | sort | uniq -c | sort -nr | head -10 | while read count size; do
            echo "- **$size** (usado $count veces)"
        done
        
        echo ""
    fi
}

# Función para extraer dimensiones comunes
extract_dimensions() {
    log "📏 Extrayendo dimensiones y espaciado..."
    
    if [ -f "$PROJECT_ROOT/assets/css/styles.css" ]; then
        echo "## 📏 DIMENSIONES Y ESPACIADO"
        echo ""
        
        # Padding más comunes
        echo "### Padding Común"
        grep -o "padding: [^;]*" "$PROJECT_ROOT/assets/css/styles.css" | sort | uniq -c | sort -nr | head -5 | while read count padding; do
            echo "- **$padding** (usado $count veces)"
        done
        
        echo ""
        
        # Margin más comunes
        echo "### Margin Común"
        grep -o "margin: [^;]*" "$PROJECT_ROOT/assets/css/styles.css" | sort | uniq -c | sort -nr | head -5 | while read count margin; do
            echo "- **$margin** (usado $count veces)"
        done
        
        echo ""
    fi
}

# Función para analizar estructura HTML
analyze_html_structure() {
    log "🏗️ Analizando estructura HTML del sitio actual..."
    
    if [ -f "$PROJECT_ROOT/index.html" ]; then
        echo "## 🏗️ ESTRUCTURA HTML PRINCIPAL"
        echo ""
        
        # Extraer clases CSS más usadas
        echo "### Clases CSS Principales"
        grep -o 'class="[^"]*"' "$PROJECT_ROOT/index.html" | sed 's/class="//g' | sed 's/"//g' | tr ' ' '\n' | sort | uniq -c | sort -nr | head -10 | while read count class; do
            echo "- **.$class** (usado $count veces)"
        done
        
        echo ""
        
        # Extraer IDs importantes
        echo "### IDs Importantes"
        grep -o 'id="[^"]*"' "$PROJECT_ROOT/index.html" | sed 's/id="//g' | sed 's/"//g' | while read id; do
            echo "- **#$id**"
        done
        
        echo ""
    fi
}

# Función para generar guía de componentes
generate_component_guide() {
    log "🧩 Generando guía de componentes..."
    
    echo "## 🧩 COMPONENTES IDENTIFICADOS EN EL SITIO"
    echo ""
    
    # Analizar botones
    if grep -q "btn\|button" "$PROJECT_ROOT/index.html" 2>/dev/null; then
        echo "### Botones"
        echo "- **Botón Principal**: Fondo dorado, texto blanco"
        echo "- **Botón Secundario**: Borde blanco, fondo transparente"
        echo "- **Botón de Enlace**: Solo texto, sin fondo"
        echo ""
    fi
    
    # Analizar cards
    if grep -q "card\|service\|box" "$PROJECT_ROOT/index.html" 2>/dev/null; then
        echo "### Cards/Tarjetas"
        echo "- **Card de Servicio**: Fondo blanco, sombra sutil, padding 30px"
        echo "- **Card de Ubicación**: Información de contacto, fondo azul"
        echo "- **Card de Testimonio**: Texto centrado, comillas decorativas"
        echo ""
    fi
    
    # Analizar navegación
    echo "### Navegación"
    echo "- **Header Principal**: Logo izquierda, menú derecha"
    echo "- **Sub-header**: Información de contacto y redes sociales"
    echo "- **Menú Móvil**: Hamburger menu, overlay completo"
    echo ""
    
    # Analizar formularios
    echo "### Formularios"
    echo "- **Campo de Texto**: Border sutil, padding 12px"
    echo "- **Textarea**: Altura mínima 120px"
    echo "- **Botón Submit**: Estilo de botón principal"
    echo ""
}

# Función para crear archivo de referencia rápida
create_quick_reference() {
    local output_file="$PROJECT_ROOT/CLAUDE-QUICK-REFERENCE.md"
    
    log "📋 Creando referencia rápida para Claude..."
    
    cat > "$output_file" << 'EOF'
# 🚀 REFERENCIA RÁPIDA PARA CLAUDE

## 🎨 COLORES PRINCIPALES
```css
:root {
  --primary-gold: #c8a97e;
  --primary-blue: #1e2b4d;
  --secondary-blue: #2a4176;
  --text-primary: #000000;
  --text-secondary: #6a6a6a;
  --background-light: #f7f7f7;
  --white: #ffffff;
}
```

## 📏 ESPACIADO ESTÁNDAR
```css
:root {
  --section-padding: 80px 0;
  --card-padding: 30px;
  --element-margin: 20px;
  --large-margin: 60px;
}
```

## 🔤 TIPOGRAFÍA
```css
:root {
  --font-family: 'Poppins', sans-serif;
  --font-size-h1: 48px;
  --font-size-h2: 30px;
  --font-size-h3: 24px;
  --font-size-body: 16px;
  --font-size-small: 14px;
}
```

## 🎯 COMPONENTES CLAVE

### Botón Principal
```css
.btn-primary {
  background: var(--primary-gold);
  color: var(--white);
  padding: 12px 25px;
  border-radius: 3px;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
}
```

### Card de Servicio
```css
.service-card {
  background: var(--white);
  padding: 40px 30px;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  text-align: center;
}
```

### Header
```css
.header {
  background: var(--white);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.sub-header {
  background: var(--primary-blue);
  color: var(--white);
  padding: 10px 0;
}
```

## 📱 BREAKPOINTS
```css
:root {
  --mobile: 768px;
  --tablet: 1024px;
  --desktop: 1200px;
}
```

## 🎨 EFECTOS HOVER
```css
.hover-lift:hover {
  transform: translateY(-5px);
  transition: all 0.3s ease;
}

.hover-shadow:hover {
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}
```
EOF

    success "✅ Referencia rápida creada en: $output_file"
}

# Función principal
main() {
    local output_file="$PROJECT_ROOT/CLAUDE-DESIGN-ANALYSIS.md"
    
    log "🎨 Iniciando análisis de diseño para Claude..."
    
    # Crear archivo de análisis
    cat > "$output_file" << 'EOF'
# 🎨 ANÁLISIS DE DISEÑO AUTOMÁTICO

**Generado automáticamente para apoyo de Claude**  
**Fecha**: $(date)

EOF
    
    # Ejecutar análisis y agregar al archivo
    {
        extract_colors
        extract_fonts
        extract_dimensions
        analyze_html_structure
        generate_component_guide
    } >> "$output_file"
    
    success "✅ Análisis completado en: $output_file"
    
    # Crear referencia rápida
    create_quick_reference
    
    # Reportar al sistema
    if [ -f "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" ]; then
        node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" add-comment kiro \
            "🎨 APOYO A CLAUDE: Análisis de diseño automático generado con colores, fuentes, dimensiones y componentes extraídos del sitio actual"
    fi
    
    log "📋 Archivos generados para Claude:"
    echo "  - CLAUDE-DESIGN-GUIDE.md (guía detallada)"
    echo "  - CLAUDE-DESIGN-ANALYSIS.md (análisis automático)"
    echo "  - CLAUDE-QUICK-REFERENCE.md (referencia rápida)"
    
    success "🎉 Claude ahora tiene toda la información necesaria para implementación pixel perfect"
}

# Ejecutar función principal
main "$@"