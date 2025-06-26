# ⚰️ Grupo Naser - Servicios Funerarios y Previsión

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT "MIT License")
![GitHub repo size](https://img.shields.io/github/repo-size/axlwolf/webnaser)
[![Active](http://img.shields.io/badge/Status-Active-green.svg)](https://github.com/axlwolf/webnaser)
[![Generic badge](https://img.shields.io/badge/lang-html%2Bcss%2Bjs-blue.svg)](https://developer.mozilla.org/en-US/docs/Web)
[![Generic badge](https://img.shields.io/badge/framework-bootstrap%205-red.svg)](https://getbootstrap.com/)
[![Generic badge](https://img.shields.io/badge/last%20updated-06--2025-blue)](https://github.com/axlwolf/webnaser)

![Grupo Naser Logo](assets/images/logo_naser.png)

Grupo Naser es un sitio web moderno dedicado a servicios funerarios y previsión funeraria, diseñado para ofrecer información clara, contacto inmediato y atención personalizada a través de chat en línea.

## Características

- **Información de Servicios**: Presentación clara de los servicios funerarios y planes de previsión.
- **Formulario de Contacto**: Formulario funcional con procesamiento PHP, validación y envío de correos.
- **Contacto Inmediato**: Datos directos de correo, teléfono y WhatsApp (footer).
- **Chat en Vivo**: Integración con Crisp Chat para atención al cliente.
- **UI Moderna y Responsive**: Basado en Bootstrap 5, con componentes interactivos y diseño adaptable.
- **Preloader y Animaciones**: Experiencia de usuario fluida al navegar por el sitio.
- **SEO**: Sitemap generado automáticamente mediante script Python.

## Cambios recientes (2025-06-22)
- Refactorización de HTML para accesibilidad y formato.
- Footer reestructurado y simplificado.
- Eliminación de formularios y secciones comentadas innecesarias.
- Mejor legibilidad en scripts y estilos.
- Se formalizó el proceso de documentación: tras cada feature, se deben actualizar los archivos de `memory-bank/`, `memory-bank.md`, `README.md` y cerrar el commit.
- [FIX] Corregido error en custom.js (protección contra offset undefined en función visible).
- [FIX] Solucionado problema en index.html donde algunas imágenes no cargaban correctamente.

## Arquitectura y Estructura

El proyecto sigue una estructura clara y modular:

```
web_naser_23/
├── assets/
│   ├── css/
│   │   ├── fontawesome.css
│   │   ├── owl.css
│   │   └── styles.css
│   └── images/
│       └── logo_naser.png
├── memory-bank/
│   ├── activeContext.md
│   ├── memory-bank.md
│   ├── productContext.md
│   ├── progress.md
│   ├── projectbrief.md
│   ├── ripperFive.md
│   ├── systemPatterns.md
│   ├── techContext.md
├── vendor/
│   └── bootstrap/
│       ├── css/
│       └── js/
├── index.html
├── generate_sitemap.py
└── ...
```

- **HTML Principal**: `index.html` contiene la estructura y contenido principal del sitio.
- **Estilos y Recursos**: Carpeta `assets/` para CSS y recursos gráficos.
- **Bootstrap**: Framework para UI responsiva en `vendor/bootstrap/`.
- **Scripts**: Integraciones y scripts personalizados en `assets/js/`.
- **Documentación y Contexto**: Carpeta `memory-bank/` con documentación, contexto y bitácora de avances.

## Tecnologías Utilizadas

- **Framework:** Next.js 14+ (App Router), Lenguaje: TypeScript.
- **UI:** Tailwind CSS + Shadcn/UI.
- **Base de Datos:** Vercel Postgres (basado en Neon).
- **ORM:** Drizzle ORM.
- **Autenticación:** Clerk.
- **Caché:** Vercel KV (basado en Redis).
- **Generación de Contenido AI:** OpenAI (API gpt-4o), DeepSeek AI (deepseek-chat), Google AI (Gemini Flash/Pro).
- **Despliegue:** Vercel.

## Uso y Desarrollo

### Prerrequisitos

- Node.js (v18+)
- npm / yarn

### Instalación y Ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/axlwolf/webnaser.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el entorno de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre `http://localhost:3000` en tu navegador.

### Estructura de Archivos Clave

- `index.html`: Página principal del sitio.
- `assets/css/styles.css`: Estilos personalizados.
- `assets/images/logo_naser.png`: Logo institucional.
- `vendor/bootstrap/`: Archivos de Bootstrap 5.
- `assets/js/`: Scripts adicionales para interactividad.
- `generate_sitemap.py`: Script para generar el sitemap.
- `memory-bank/`: Documentación y bitácora del proyecto.

## Documentación

- `memory-bank/memory-bank.md`: Resumen de alcance, funcionalidades y contexto.
- `memory-bank/ripperFive.md`: Protocolo estricto para IA en desarrollo y mantenimiento.
- `memory-bank/progress.md`: Bitácora de avances y cambios relevantes.
- `memory-bank/techContext.md`: Tecnologías y frameworks utilizados.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
