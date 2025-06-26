## Tech Context (SaaS CMS AI-First)

### Arquitectura Primaria
-   **Framework:** Next.js 14+ (App Router), Lenguaje: TypeScript.
-   **UI:** Tailwind CSS + Shadcn/UI.
-   **Base de Datos:** Vercel Postgres (basado en Neon).
-   **ORM:** Drizzle ORM.
-   **Autenticación:** Clerk.
-   **Caché:** Vercel KV (basado en Redis).
-   **Generación de Contenido AI:** OpenAI (API gpt-4o), DeepSeek AI (deepseek-chat), Google AI (Gemini Flash/Pro).
-   **Despliegue:** Vercel.

### Tecnologías a ser Deprecadas
-   **PHP**: El manejador de formularios (`form-handler.php`) será reemplazado por una API Route de Next.js.
-   **jQuery**: Toda la manipulación del DOM será reemplazada por la gestión de estado de React.
-   **HTML Estático**: Los archivos `.html` serán reemplazados por páginas de Next.js en el directorio `pages/`.
-   **Bootstrap 5**: Será reemplazado por Tailwind CSS y Shadcn/UI.
-   **Crisp Chat**: La integración de chat en vivo se gestionará a través del nuevo stack.
-   **Python Script (generate_sitemap.py)**: La generación de sitemaps será dinámica a través de Next.js.

### Estructura de Archivos Clave (Nueva Arquitectura)
-   `app/`: Contiene las rutas de la aplicación (dashboard, sitios de inquilinos).
-   `lib/`: Utilidades y funciones auxiliares.
-   `components/`: Componentes de UI reutilizables.
-   `db/`: Esquemas de base de datos y configuraciones.
-   `public/`: Archivos estáticos.
-   `docs/`: Documentación del proyecto.
