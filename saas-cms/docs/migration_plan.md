Prompt Maestro para LLM: Plan de Desarrollo de un SaaS CMS "AI-First" Multi-inquilino

CONTEXTO
Se requiere generar un plan de desarrollo completo y detallado para la creación de un SaaS CMS (Sistema de Gestión de Contenidos como Servicio) multi-inquilino. Este sistema permitirá a los usuarios (inquilinos) registrarse y crear sus propios sitios web optimizados para SEO de manera rápida y sencilla, potenciando la generación y optimización de contenido con Inteligencia Artificial ("AI-First").

La arquitectura del sistema se inspirará en los principios de diseño de microservicios desacoplados, tomando como referencia el diagrama provisto (url-shortener.pdf). El stack tecnológico será moderno, basado en las últimas tendencias de desarrollo con Next.js. El flujo de trabajo se basará en un enfoque paso a paso, replicando la profundidad y el detalle de la metodología "Crea Web de 1$...docx" y el plan de desarrollo de sitios SEO-optimizados con IA. Finalmente, el proyecto adoptará una estricta disciplina de documentación y gestión, inspirada en las prácticas del README.md del proyecto "Grupo Naser" y el protocolo "ripperFive.md".

ROL (PERSONA)
Asume el rol de un Arquitecto de Software Full-Stack Experto, especializado en el diseño y construcción de aplicaciones SaaS escalables con Next.js. Tu experiencia cubre arquitectura de sistemas, diseño de bases de datos, integración de APIs de IA, autenticación, y estrategias de despliegue. Tienes experiencia previa migrando negocios tradicionales (como sitios informativos hechos con Bootstrap/PHP) a plataformas modernas, escalables y centradas en el usuario, y crees firmemente en la documentación como parte integral del desarrollo (Docs-as-Code).

PROYECTO: SaaS CMS "AI-First" Multi-inquilino
Visión General
Una plataforma donde los usuarios (inquilinos) pueden:
*   Registrarse y obtener su propio subdominio o conectar un dominio personalizado.
*   Construir sitios web utilizando un editor visual basado en componentes (block-based editor).
*   Generar y optimizar contenido (texto, imágenes, metadatos SEO) con la ayuda de herramientas de IA integradas, aplicando patrones SEO programáticos.
*   Publicar y servir estos sitios web al público con alto rendimiento y SEO optimizado.
*   Gestionar sus sitios a través de un panel de administración intuitivo.

Caso de Uso Inspirador: La Próxima Generación para "Grupo Naser"
Imaginemos que el propietario de un negocio como "Grupo Naser" (servicios funerarios, un nicho muy específico) quiere expandirse. En lugar de tener un único sitio web estático, podría usar nuestro SaaS para:
*   Crear páginas de aterrizaje específicas para cada servicio (planes de previsión, servicios de cremación, etc.) con contenido generado por IA.
*   Generar artículos de blog optimizados para SEO sobre temas relacionados ("cómo afrontar el duelo", "planificación funeraria anticipada") para atraer tráfico orgánico, utilizando la IA para la redacción y optimización de metadatos.
*   Desplegar rápidamente sitios para diferentes sucursales o ciudades, cada uno con su propio contenido y optimización SEO.
Nuestro SaaS debe ser la herramienta que permita a negocios como este evolucionar de una presencia web simple a un motor de marketing digital dinámico y autogestionado, con la IA como su principal diferenciador.

Tech Stack Propuesto (Modernizado)
*   **Framework:** Next.js 14+ (App Router), Lenguaje: TypeScript.
*   **UI:** Tailwind CSS + Shadcn/UI.
*   **Base de Datos:** Vercel Postgres (basado en Neon).
*   **ORM:** Drizzle ORM.
*   **Autenticación:** Clerk.
*   **Caché:** Vercel KV (basado en Redis).
*   **Generación de Contenido AI:** OpenAI (API gpt-4o), DeepSeek AI (deepseek-chat), Google AI (Gemini Flash/Pro).
*   **Despliegue:** Vercel.

ARQUITECTURA Y DIAGRAMA MERMAID
La arquitectura del sistema se basará en microservicios desacoplados.

```mermaid
graph TD
    subgraph "Usuario Final"
        U(Visitante)
    end

    subgraph "Usuario del CMS (Inquilino)"
        I(Inquilino)
    end

    subgraph "Plataforma Vercel"
        LB(Load Balancer / Edge Network)
        subgraph "Aplicación Next.js"
            API(API Gateway: API Routes / tRPC)
            ContentDelivery(Servicio de Entrega de Contenido <br> `app/[[...path]]/page.tsx`)
            Dashboard(Dashboard del Inquilino <br> `app/(dashboard)/*`)
        end
        subgraph "Servicios Backend"
            Auth(Servicio de Autenticación <br> Clerk)
            Content(Servicio de Contenido <br> CRUD para Sitios/Páginas)
            AIGen(Servicio de Generación IA <br> OpenAI/DeepSeek/Gemini)
        end
        subgraph "Infraestructura de Datos"
            DB[(Vercel Postgres<br>- Users<br>- Sites<br>- Pages<br>- AI_Content_Templates)]
            Cache[(Vercel KV<br>Cache de Páginas/Sesiones)]
        end
    end
    U -- Petición a sitio.com/pagina --> LB --> ContentDelivery
    ContentDelivery -- Consulta --> Cache -- Cache Miss --> ContentDelivery -- Consulta --> DB
    DB -- Devuelve contenido --> ContentDelivery -- Renderiza --> U
    I -- Accede a app.dominio.com --> LB --> Dashboard -- Requiere Auth --> Auth
    Dashboard -- Operaciones CRUD --> API --> Content --> DB
    API -- Llamada IA --> AIGen
    AIGen -- Genera Contenido/Metadatos --> Content
```

PRINCIPIOS DE DOCUMENTACIÓN
Se mantiene la disciplina de documentación, con el directorio `docs/`, `README.md` robusto, `memory-bank/` detallado y commits semánticos. El protocolo `ripperFive.md` será la guía estricta para el desarrollo.

TAREA PRINCIPAL: Generar el Plan de Desarrollo Detallado y Accionable
Tu misión es generar un plan de desarrollo estructurado en 10 pasos. Cada paso debe ser detallado, con objetivos claros, acciones específicas, ejemplos de código o estructura, y prompts de IA cuando sea aplicable, replicando la profundidad del documento "Crea Web de 1$..." y el plan de sitios SEO-optimizados con IA.

---

**Paso 0: Fundamentos y Configuración del Entorno ⚙️**
**Objetivo:** Inicializar el proyecto y configurar las herramientas base para el desarrollo del SaaS CMS.
**Acciones Detalladas:**
1.  **Crear Proyecto Next.js:** Ejecutar `npx create-next-app@latest saas-cms --ts --tailwind --eslint --app`.
2.  **Instalar Dependencias Clave:** Ejecutar `npm install drizzle-orm @neondatabase/serverless drizzle-kit pg @clerk/nextjs openai @radix-ui/react-icons @radix-ui/themes @google/generative-ai clsx tailwind-merge`.
3.  **Inicializar Shadcn/UI:** Ejecutar `npx shadcn-ui@latest init`.
4.  **Configurar Variables de Entorno (.env.local):** Crear el archivo con placeholders para `DATABASE_URL`, `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `OPENAI_API_KEY`, `DEEPSEEK_API_KEY`, `GEMINI_API_KEY`.
5.  **Crear Estructura de Carpetas:** Crear directorios `app`, `lib`, `components`, `db`, `docs`, `public`. Dentro de `docs`, crear `architecture.md`, `tech_stack.md`, `progress_log.md`. Dentro de `components`, crear `ui`, `layout`, `sections`.

**Formato de Respuesta Esperado:** Una lista de comandos ejecutados y la confirmación de que la estructura de archivos y el entorno están listos.

---

**Paso 1: Arquitectura de Datos y Autenticación 🔐**
**Objetivo:** Definir el esquema de la base de datos para el CMS multi-inquilino y configurar la autenticación completa de usuarios (inquilinos).
**Acciones Detalladas:**
1.  **Configurar Clerk:** Envolver el `layout.tsx` principal con `<ClerkProvider>`. Crear los archivos `sign-in/[[...sign-in]]/page.tsx` y `sign-up/[[...sign-up]]/page.tsx` para las rutas de autenticación de Clerk.
2.  **Diseñar Esquema de DB (`db/schema.ts`):**
    *   Definir tablas `users`, `sites`, `pages`.
    *   La tabla `pages` debe incluir campos para almacenar contenido generado por IA y metadatos SEO, como:
        *   `content: jsonb('content')` (para el editor de bloques y contenido principal)
        *   `seoMetadata: jsonb('seoMetadata')` (para metatítulos, metadescripciones, H1s, etc.)
        *   `aiGeneratedDescription: text('ai_generated_description')`
        *   `aiGeneratedH1: text('ai_generated_h1')`
        *   `aiGeneratedKeywords: text('ai_generated_keywords')`
        *   `aiGeneratedTags: jsonb('ai_generated_tags')`
    *   Asegurar relaciones entre `users` y `sites`, y `sites` y `pages`.
3.  **Generar y Ejecutar Migración:** `npx drizzle-kit generate:pg` y `npx drizzle-kit push:pg`.

**Formato de Respuesta Esperado:** El código del esquema, la configuración de Clerk y la confirmación de que la migración se ha ejecutado correctamente.

---

**Paso 2: Núcleo del CMS - API de Contenido 📝**
**Objetivo:** Construir el backend para que los inquilinos gestionen sus sitios y páginas de forma segura, incluyendo la integración inicial para la generación de contenido con IA.
**Acciones Detalladas:**
1.  **Crear API para Sitios (`/api/sites`):** Implementar rutas para:
    *   `GET`: Listar los sitios del usuario autenticado.
    *   `POST`: Crear un nuevo sitio, validando que el subdominio no esté en uso.
2.  **Crear API para Páginas (`/api/sites/[siteId]/pages`):** Implementar rutas para:
    *   `GET`: Listar las páginas de un sitio específico.
    *   `POST`: Crear una nueva página dentro de un sitio.
    *   `PUT /api/pages/[pageId]`: Actualizar el contenido de una página.
    *   `DELETE /api/pages/[pageId]`: Borrar una página.
3.  **Seguridad:** En cada ruta, usar `auth()` de Clerk para obtener el `userId` y asegurar que el usuario solo pueda operar sobre sus propios recursos.
4.  **Integración Inicial de IA en API (Placeholder):** Añadir un endpoint básico (ej. `/api/ai/generate-seo-text`) que reciba un prompt y devuelva una respuesta de IA. Esto será expandido en el Paso 3.

**Formato de Respuesta Esperado:** Código de las rutas de la API, mostrando la lógica de negocio y las comprobaciones de seguridad.

---

**Paso 3: Integración Profunda de IA para Contenido y SEO 🧠**
**Objetivo:** Implementar la lógica detallada para la generación de contenido y metadatos SEO-optimizados utilizando modelos de IA, accesible a través del panel de administración del CMS.
**Acciones Detalladas:**
1.  **Selección y Configuración de Modelo de IA:**
    *   Implementar la lógica para elegir entre GPT-4o-mini, Deepseek V3 o Gemini Flash/Pro.
    *   Configurar las API Keys y `baseURL`s correspondientes.
2.  **Script de Generación de Contenido AI (`lib/ai-content-generator.ts`):**
    *   Crear una utilidad que encapsule las llamadas a las APIs de IA.
    *   Implementar funciones para generar:
        *   Metatítulos y Metadescripciones (basados en keywords y tipo de página).
        *   H1s y subtítulos.
        *   Párrafos de contenido SEO-optimizado.
        *   Tags y categorías relevantes.
    *   Utilizar prompts de IA específicos para cada tipo de generación de contenido, como los ejemplos del Paso 3 del segundo prompt.
3.  **Integración en API Existente:** Modificar las rutas `POST` y `PUT` de páginas (`/api/pages/[pageId]`) para que puedan invocar estas funciones de IA y almacenar el contenido generado en la base de datos.
4.  **Interfaz en Dashboard (Placeholder):** Preparar la interfaz del dashboard para que los inquilinos puedan activar la generación de contenido con IA.

**Formato de Respuesta Esperado:** Código de la utilidad `ai-content-generator.ts` y las modificaciones en las API routes, junto con ejemplos de prompts de IA.

---

**Paso 4: Desarrollo de Componentes Reutilizables y Layouts 🎨**
**Objetivo:** Crear la biblioteca de componentes UI y los layouts generales que serán utilizados tanto en el panel de administración del CMS como en los sitios web generados por los inquilinos.
**Acciones Detalladas:**
1.  **Componentes UI Reutilizables (`components/ui/`):**
    *   Crear componentes básicos de UI utilizando Shadcn/UI y Tailwind CSS (ej. `Button.tsx`, `Card.tsx`, `Input.tsx`, `Dialog.tsx`).
    *   Asegurar que sean accesibles y personalizables.
2.  **Layouts Generales (`components/layout/`):**
    *   Crear layouts para el panel de administración (ej. `DashboardLayout.tsx` con sidebar y header).
    *   Crear layouts para los sitios de los inquilinos (ej. `TenantSiteLayout.tsx` con header, footer y área de contenido dinámico).
3.  **Utilidades Tailwind (`lib/utils.ts`):** Crear un archivo de utilidades para funciones helper de Tailwind (ej. `cn` para combinar clases).

**Formato de Respuesta Esperado:** Código de los componentes UI y layouts principales, junto con el archivo `lib/utils.ts`.

---

**Paso 5: Panel de Administración (Dashboard del Inquilino) 📊**
**Objetivo:** Construir la interfaz de usuario del panel de administración donde los inquilinos pueden gestionar sus sitios, páginas y activar la generación de contenido con IA.
**Acciones Detalladas:**
1.  **Rutas del Dashboard:** Crear la estructura de rutas protegidas para el dashboard (ej. `app/(dashboard)/sites`, `app/(dashboard)/sites/[siteId]/pages`).
2.  **Listado de Sitios:** Desarrollar una página para listar los sitios del inquilino, con opciones para crear, editar y eliminar.
3.  **Gestión de Páginas:** Crear una interfaz para listar las páginas de un sitio específico, con un editor visual (placeholder inicial) y opciones para generar contenido con IA.
4.  **Integración de IA en UI:** Añadir botones o secciones en el editor de páginas que permitan al inquilino invocar las funciones de generación de contenido con IA (Paso 3) y previsualizar/aplicar los resultados.

**Formato de Respuesta Esperado:** Código de las páginas y componentes del dashboard, mostrando la interacción con las APIs de contenido y IA.

---

**Paso 6: Renderizado Dinámico de Sitios de Inquilinos 🌐**
**Objetivo:** Implementar la lógica para servir los sitios web de los inquilinos de forma dinámica, utilizando los datos almacenados en la base de datos y aplicando las optimizaciones SEO.
**Acciones Detalladas:**
1.  **Rutas Dinámicas de Inquilinos:** Configurar Next.js para manejar subdominios o dominios personalizados y rutas dinámicas para los sitios de los inquilinos (ej. `app/[[...path]]/page.tsx` o middleware para enrutamiento de dominios).
2.  **Obtención de Datos:** Implementar la lógica para obtener el contenido de la base de datos (sitio, páginas, contenido AI) basado en el dominio/subdominio y la ruta de la URL.
3.  **Renderizado de Contenido:** Utilizar los componentes UI y layouts (Paso 4) para renderizar el contenido de las páginas de los inquilinos, incluyendo el texto y metadatos generados por IA.
4.  **Generación de Metadatos SEO:** Implementar `generateMetadata` en las páginas dinámicas para aplicar los patrones de metatítulos, metadescripciones y H1s definidos en el Paso 3 del segundo prompt.

**Formato de Respuesta Esperado:** Código de las páginas de renderizado dinámico, mostrando la obtención de datos y la aplicación de metadatos SEO.

---

**Paso 7: Editor Visual de Contenido (Block-Based Editor) 🧱**
**Objetivo:** Desarrollar un editor visual intuitivo que permita a los inquilinos construir y organizar el contenido de sus páginas utilizando bloques predefinidos y personalizados.
**Acciones Detalladas:**
1.  **Selección de Librería/Enfoque:** Evaluar y seleccionar una librería para editores de bloques (ej. BlockNote, Lexical, o construir uno simple con React DnD).
2.  **Implementación del Editor:** Integrar el editor en la interfaz de gestión de páginas del dashboard (Paso 5).
3.  **Bloques Personalizados:** Crear bloques reutilizables que los inquilinos puedan arrastrar y soltar (ej. Bloque de Texto, Bloque de Imagen, Bloque de CTA, Bloque de Contenido AI).
4.  **Guardado de Contenido:** Asegurar que el contenido del editor se guarde en formato JSON en el campo `content` de la tabla `pages`.

**Formato de Respuesta Esperado:** Código del componente del editor visual y ejemplos de bloques personalizados.

---

**Paso 8: Gestión de Dominios Personalizados y Subdominios 🔗**
**Objetivo:** Permitir a los inquilinos conectar sus propios dominios o utilizar subdominios generados por la plataforma para sus sitios.
**Acciones Detalladas:**
1.  **Configuración de Vercel:** Configurar el proyecto en Vercel para manejar dominios personalizados y subdominios dinámicos.
2.  **Interfaz en Dashboard:** Añadir una sección en el dashboard para que los inquilinos puedan añadir y verificar sus dominios.
3.  **Lógica de Enrutamiento:** Implementar la lógica en Next.js (middleware o configuración de Vercel) para mapear los dominios/subdominios a los sitios de los inquilinos.

**Formato de Respuesta Esperado:** Instrucciones de configuración de Vercel y código de la interfaz de gestión de dominios.

---

**Paso 9: Optimización de Rendimiento y SEO Avanzado 🚀**
**Objetivo:** Asegurar que los sitios generados sean de alto rendimiento y estén completamente optimizados para SEO.
**Acciones Detalladas:**
1.  **Caché con Vercel KV:** Implementar estrategias de caché para las páginas de los inquilinos utilizando Vercel KV para reducir la carga de la base de datos y mejorar la velocidad.
2.  **Generación de Sitemaps Dinámicos:** Implementar la generación dinámica de sitemaps (sitemap-index, sitemaps individuales por tipo de página/cantidad de URLs) que reflejen el contenido de todos los sitios de los inquilinos.
3.  **Robots.txt Dinámico:** Generar un `robots.txt` dinámico para cada sitio de inquilino.
4.  **Optimización de Imágenes:** Utilizar el componente `next/image` para optimización automática de imágenes.
5.  **Auditorías de Rendimiento:** Realizar pruebas de rendimiento (Lighthouse) y aplicar mejoras.

**Formato de Respuesta Esperado:** Código para la implementación de caché, generación de sitemaps y `robots.txt`, y estrategias de optimización.

---

**Paso 10: Despliegue, Monitoreo y Mantenimiento 📈**
**Objetivo:** Desplegar la plataforma, configurar el monitoreo y establecer un plan de mantenimiento continuo.
**Acciones Detalladas:**
1.  **Configuración de Despliegue:** Configurar el proyecto para despliegue continuo en Vercel.
2.  **Monitoreo:** Integrar herramientas de monitoreo (ej. Vercel Analytics, Sentry) para rastrear el rendimiento y errores.
3.  **Gestión de Logs:** Configurar el logging para depuración y auditoría.
4.  **Actualizaciones y Mantenimiento:** Establecer un proceso para actualizar dependencias, modelos de IA y aplicar parches de seguridad.
5.  **Documentación Final:** Asegurar que toda la documentación (incluyendo la de usuario para el CMS) esté completa y actualizada.

**Formato de Respuesta Esperado:** Instrucciones de despliegue, configuración de monitoreo y un resumen del plan de mantenimiento.

---

**PUNTO DE PAUSA:** Este es el plan maestro consolidado. Por favor, revísalo y aprueba este documento como la "fuente de verdad" para nuestro proyecto. Una vez aprobado, procederemos con la actualización de la documentación y luego con el "Paso 0" de implementación.