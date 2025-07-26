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
