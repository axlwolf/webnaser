## System Patterns

### Architecture Overview
The Grupo Naser website follows a traditional static website architecture, primarily built with HTML, CSS, and JavaScript. It is a client-side rendered application, meaning all content is delivered to the browser as static files and rendered there. There is no server-side processing for content generation, only for serving the static assets.

### Design Patterns
-   **Responsive Design**: Utilizes Bootstrap framework to ensure the website adapts to various screen sizes (desktops, tablets, mobile devices).
-   **Modular Structure**: The website's content is organized into distinct HTML files for different sections (e.g., `index.html`, `servicios.html`, `contacto.html`), promoting maintainability and scalability.
-   **Navigation Pattern**: A consistent header and navigation bar are present across pages, providing clear access to main sections of the site. This includes a main navigation menu and a sub-header for contact information and social media links.
-   **Preloader Pattern**: A preloader (`#preloader`) is implemented to enhance user experience by displaying a loading animation while the page content is being prepared.
-   **Slider/Carousel Pattern**: The main banner on `index.html` uses an Owl Carousel for dynamic content display, showcasing key messages or promotions.

### Data Flow
-   **Static Content Delivery**: HTML, CSS, JavaScript, and image files are served directly from the web server to the client's browser.
-   **External Script Integration**: Third-party scripts like Crisp chat and Google Fonts are loaded directly from their respective CDNs.

### SEO and Indexing
-   **Sitemap Generation**: A Python script (`generate_sitemap.py`) automates the creation of `sitemap.xml`, which lists all discoverable HTML pages. This is a crucial pattern for improving search engine visibility and ensuring all relevant content is indexed.
-   **Meta Tags**: HTML `<meta>` tags are used for description and viewport settings, contributing to SEO and responsive behavior.

### Communication Patterns
-   **Direct Contact**: Email and phone numbers are prominently displayed for direct communication.
-   **Social Media Integration**: Links to Facebook, Instagram, and LinkedIn facilitate engagement through external platforms.
-   **Live Chat**: The Crisp chat integration provides an immediate, interactive communication channel for user support.

### File Naming Conventions
-   HTML files are named descriptively (e.g., `necesidad-inmediata.html`, `prevision.html`).
-   Assets are organized into `assets/css`, `assets/images`, and `vendor/bootstrap` directories.