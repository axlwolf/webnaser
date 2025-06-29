# Traditional Migration Plan for Grupo Naser Website (PHP + Angular) - Not Selected

This document outlines a migration plan for the Grupo Naser website from its current static HTML structure to a modern yet traditional web application stack using **PHP** for backend services and **Angular** for the frontend. This approach was designed to be compatible with the client's existing server infrastructure, which does not support Next.js deployments, while providing a robust, scalable, and maintainable solution. However, the client has opted for Grav CMS as the primary migration strategy due to its simplicity and flat-file architecture. This plan is preserved for reference, with the Next.js approach also noted as a future option when infrastructure upgrades are completed next year.

## Objectives

- **Compatibility**: Ensure the solution runs on the client's current server environment, likely a standard LAMP (Linux, Apache, MySQL, PHP) stack.
- **Modernization**: Introduce modern web development practices, including a dynamic frontend with Angular and a backend API with PHP.
- **Maintainability**: Structure the codebase for easy updates and scalability.
- **Preservation**: Retain the visual identity and content structure of the original site as outlined in the `look_and_feel_guide.md`.
- **Future-Proofing**: Design with modularity to facilitate a potential transition back to Next.js or other frameworks in the future.

## Technology Stack

### Backend: PHP
- **Framework**: Laravel (a popular PHP framework for building RESTful APIs and handling backend logic)
  - **Reason**: Laravel provides a robust structure for API development, authentication, and database management with an active community and extensive documentation. It is widely supported on most hosting environments.
- **Database**: MySQL (for storing dynamic content like obituaries, contact form submissions, etc.)
  - **Reason**: Commonly supported on shared hosting and pairs well with Laravel.
- **Purpose**: Handle API requests, form submissions, content management, and server-side logic.

### Frontend: Angular
- **Version**: Latest stable version (currently Angular 15 or 16, depending on release timeline)
- **Reason**: Angular offers a full-featured framework for building dynamic single-page applications (SPAs) with TypeScript, component-based architecture, and strong tooling. It can be deployed as static files on any web server, making it compatible with the client's infrastructure.
- **Purpose**: Render the user interface, manage client-side routing, and interact with the PHP backend via RESTful API calls.

### Additional Tools
- **CSS Framework**: Bootstrap (to maintain consistency with the original site's styling approach)
  - **Reason**: The original site uses Bootstrap, and continuing with it ensures visual consistency while providing responsive design utilities. Tailwind CSS could be considered as an alternative if the client approves.
- **Version Control**: Git (for tracking changes and collaboration)
- **Deployment**: Static Angular files served via Apache with PHP backend handling API routes.

## Migration Steps

### Phase 1: Setup and Environment Preparation
1. **Server Assessment**:
   - Confirm the server's PHP version (aim for PHP 8.x for Laravel compatibility) and MySQL availability.
   - Ensure Apache or equivalent web server is configured to support .htaccess for URL rewriting.
2. **Project Structure**:
   - Create a new directory `naser-traditional` for this approach, separate from `naser-modern` (Next.js project).
   - Structure: 
     - `/backend` for Laravel (API and server-side logic)
     - `/frontend` for Angular (client-side application)
3. **Install Dependencies**:
   - Backend: Install Composer (PHP dependency manager) if not already on the server, then set up Laravel via Composer.
   - Frontend: Install Node.js (if possible on the server for build purposes, otherwise build locally) and Angular CLI for project scaffolding.

### Phase 2: Backend Development (Laravel)
1. **API Development**:
   - Set up Laravel project in `/backend`.
   - Define RESTful API endpoints for:
     - Content retrieval (e.g., static page content, obituaries).
     - Form submissions (e.g., contact forms).
     - Potential future admin features (e.g., content management).
   - Use Laravel's Eloquent ORM for database interactions.
2. **Database Setup**:
   - Create MySQL database for dynamic content.
   - Migrate initial schema for storing form data, user inquiries, and obituary listings.
3. **Security**:
   - Implement basic authentication for API endpoints if admin features are needed.
   - Use Laravel's built-in CSRF protection and validation for form submissions.
4. **Deployment**:
   - Configure `.env` file for database credentials and environment settings.
   - Deploy backend to the server under a subdomain or subdirectory (e.g., `api.naser.com` or `naser.com/api`).

### Phase 3: Frontend Development (Angular)
1. **Project Setup**:
   - Scaffold an Angular project in `/frontend` using Angular CLI.
   - Configure routing for main pages (Inicio, Necesidad Inmediata, Previsión, Servicios, Obituario, Contacto, Nosotros).
2. **Component Development**:
   - Create reusable components for Header, Footer, and page-specific content, mirroring the structure from the Next.js approach.
   - Use Angular's HTTP client to fetch data from the Laravel API.
3. **Styling**:
   - Integrate Bootstrap via npm and configure in `angular.json` for global styles.
   - Refer to `look_and_feel_guide.md` to apply consistent styling (colors, typography, spacing) from the original site.
   - Create a custom theme override for Bootstrap if necessary to match `#524030` and `#cfbfaa` colors.
4. **Static Content Migration**:
   - Convert static HTML content from the original site into Angular templates, ensuring all images and assets are copied to the Angular `assets` folder.
5. **Build and Deployment**:
   - Build Angular project for production (`ng build --prod`), generating static files in `dist/` folder.
   - Deploy these static files to the root of the web server or a subdirectory (e.g., `naser.com`).

### Phase 4: Integration and Testing
1. **API Integration**:
   - Ensure Angular frontend correctly calls Laravel API endpoints for dynamic content (e.g., contact form submission, obituary listings).
2. **Responsive Testing**:
   - Test responsiveness across devices to match the original site's breakpoints (768px, 992px) using Bootstrap's grid system.
3. **User Testing**:
   - Validate that all functionalities (navigation, forms, content display) work as expected.
4. **Performance Optimization**:
   - Optimize Angular build for faster load times (lazy loading modules, AOT compilation).
   - Ensure Laravel API responses are cached where appropriate.

### Phase 5: Documentation and Handoff
1. **Documentation**:
   - Document API endpoints, Angular component structure, and deployment steps for the client's team.
   - Update `migration_roadmap.md` to reflect this traditional approach alongside the Next.js plan.
2. **Training**:
   - Provide basic guidance or resources for the client's team on managing content via Laravel (if admin panel is implemented).
3. **Future Transition Plan**:
   - Note in documentation that the Next.js project (`naser-modern`) is preserved in Git for potential use next year with infrastructure upgrades. Ensure assets and content are reusable across both approaches.

## Timeline Estimate
- **Phase 1 (Setup)**: 1-2 days (depending on server access and configuration)
- **Phase 2 (Backend)**: 3-5 days (API setup, database, basic endpoints)
- **Phase 3 (Frontend)**: 5-7 days (Angular setup, component creation, styling)
- **Phase 4 (Integration & Testing)**: 2-3 days
- **Phase 5 (Documentation & Handoff)**: 1-2 days
- **Total**: Approximately 12-19 working days, adjustable based on client feedback and server constraints.

## Key Considerations
- **Server Limitations**: If Node.js cannot be installed on the server for Angular builds, development and builds must occur locally or on a separate environment, with only the `dist/` folder uploaded.
- **Client Approval**: Confirm with the client if Bootstrap is preferred over Tailwind CSS for this traditional approach, as it aligns with the original site.
- **Content Management**: Discuss with the client if a simple CMS (via Laravel) is desired for managing dynamic content like obituaries, or if manual updates are sufficient.
- **Preservation of Next.js Work**: Ensure the `naser-modern` directory and its Git history are maintained separately for future use, avoiding any overwrites during this traditional migration.

## Next Steps (On Hold)
1. This plan is on hold as the client has selected Grav CMS for the current migration. No immediate action is required.
2. If reconsidered in the future, client confirmation on the use of Laravel + Angular and Bootstrap would be needed.
3. Server access details and compatibility checks (PHP version, MySQL availability, Apache configuration) would be requested at that time.

This plan was explored as a potential solution to modernize the Grupo Naser website within the constraints of the current infrastructure. However, Grav CMS has been chosen as the active approach, with the Next.js solution preserved for future opportunities when infrastructure upgrades occur next year.
