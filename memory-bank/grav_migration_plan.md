# Migration Plan for Grupo Naser Website Using Grav CMS

This document outlines a migration plan for the Grupo Naser website from its current static HTML structure to **Grav**, a modern flat-file Content Management System (CMS) built on PHP. Grav was selected by the client (https://getgrav.org/) for its simplicity, performance, and compatibility with their existing server infrastructure, which does not support more complex deployments like Next.js. This plan ensures the website retains its visual identity and content while leveraging Grav's ease of use for content management.

## Objectives

- **Compatibility**: Ensure the solution runs on the client's current server environment, likely a standard LAMP (Linux, Apache, MySQL, PHP) stack, though Grav does not require a database.
- **Simplicity**: Utilize Grav's flat-file architecture to minimize setup and maintenance complexity.
- **Content Management**: Enable the client to easily update content (e.g., obituaries, news) without technical expertise.
- **Preservation**: Retain the visual identity and content structure of the original site as outlined in `look_and_feel_guide.md`.
- **Future-Proofing**: Maintain the possibility of revisiting the Next.js approach (`naser-modern`) when infrastructure upgrades occur next year.

## Technology Stack

### Backend & CMS: Grav
- **Framework**: Grav CMS (PHP-based, flat-file CMS)
  - **Reason**: Grav offers a lightweight, database-free solution with a user-friendly admin interface for content management. It is highly compatible with most PHP-enabled servers and requires minimal setup.
- **Purpose**: Manage content, handle page structure, and serve as the backend for static page generation.

### Frontend: Grav Themes & Templates
- **Styling**: Custom Grav theme based on Bootstrap or Tailwind CSS (to be confirmed with client)
  - **Reason**: The original site uses Bootstrap, ensuring visual consistency. Tailwind CSS could be an alternative if the client prefers a modern utility-first approach as used in the Next.js version.
- **Purpose**: Render the user interface with templates that mirror the original site's design and structure.

### Additional Tools
- **Version Control**: Git (for tracking changes and collaboration)
- **Deployment**: Grav files deployed directly to the web server via FTP or SSH.

## Migration Steps

### Phase 1: Setup and Environment Preparation
1. **Server Assessment**:
   - Confirm the server's PHP version (Grav requires PHP 7.3.6 or higher, ideally PHP 8.x for optimal performance).
   - Ensure the web server (Apache or Nginx) supports URL rewriting (via `.htaccess` for Apache).
2. **Install Grav**:
   - Download the latest Grav core + admin bundle from https://getgrav.org/download.
   - Upload and extract Grav to a new directory `naser-grav` on the server (or locally for development, then deploy).
   - Follow Grav's installation guide to set up file permissions and create an admin user via the command line or web interface.
3. **Project Structure**:
   - Grav operates within its own directory structure. Key folders include:
     - `/user/pages` for content.
     - `/user/themes` for custom themes.
     - `/user/plugins` for additional functionality.

### Phase 2: Theme Development and Styling
1. **Create Custom Theme**:
   - Develop a custom Grav theme in `/user/themes/naser-theme` by either:
     - Starting from an existing Grav theme (e.g., Quark or Learn2) and modifying it.
     - Creating a new theme based on the original site's HTML/CSS structure.
   - Use the styling guidelines from `look_and_feel_guide.md` to match colors (`#524030`, `#cfbfaa`), typography ('Poppins'), and layout.
2. **Integrate CSS Framework**:
   - Integrate Bootstrap (preferred to match the original site) or Tailwind CSS into the theme.
   - If using Bootstrap, install via npm or CDN and configure in theme templates.
   - If using Tailwind, set up a build process (if server allows Node.js) or pre-build CSS locally.
3. **Template Creation**:
   - Create Twig templates (Grav's templating engine) for main pages (Inicio, Necesidad Inmediata, Previsión, Servicios, Obituario, Contacto, Nosotros).
   - Reuse HTML structure from the original site, adapting it to Grav's modular content blocks.

### Phase 3: Content Migration
1. **Static Content Migration**:
   - Convert static HTML content from the original site into Markdown files or HTML snippets within Grav's `/user/pages` directory.
   - Organize pages hierarchically (e.g., `/user/pages/01.inicio`, `/user/pages/02.necesidad-inmediata`) to match the site structure.
   - Copy all images and assets to `/user/images` or a custom asset folder within the theme.
2. **Dynamic Content Setup**:
   - For dynamic content like obituaries, use Grav's page collections or a plugin like "Simple Content" to manage lists.
   - Set up forms for contact submissions using Grav's built-in Forms plugin, storing data as files or integrating with email services.
3. **Navigation and Layout**:
   - Configure Grav menus to replicate the original site's navigation (Header and Footer links).
   - Ensure consistent layout across pages using theme inheritance and partials (e.g., `header.twig`, `footer.twig`).

### Phase 4: Plugins and Functionality
1. **Install Necessary Plugins**:
   - **Admin Plugin**: Already included in the Grav Admin bundle for a user-friendly content editor.
   - **Forms Plugin**: For contact forms and user submissions.
   - **SEO Plugin**: To manage meta tags and sitemap generation.
   - **Markdown Editor**: Enhance content editing if needed.
2. **Custom Functionality**:
   - For specific features (e.g., obituary listings with filters), explore Grav's plugin ecosystem or develop custom shortcodes/snippets.
   - Implement WhatsApp integration (as in the original site) via a static link or custom plugin.

### Phase 5: Testing and Deployment
1. **Local Testing** (if possible):
   - Test Grav setup locally using a tool like XAMPP or Docker to ensure all pages, forms, and styles render correctly.
   - Validate responsiveness to match original breakpoints (768px, 992px).
2. **Deployment**:
   - Upload the entire `naser-grav` directory to the client's server if not already there.
   - Update Grav's configuration (`/user/config/system.yaml`) for the correct base URL and environment settings.
   - Set up caching (Grav's built-in caching) to optimize performance on the server.
3. **User Testing**:
   - Verify navigation, content display, and form functionality on the live server.
   - Ensure client can access the admin panel (`/admin`) to manage content.

### Phase 6: Documentation and Handoff
1. **Documentation**:
   - Provide a guide for the client on using Grav's admin interface to update content (e.g., adding obituaries, editing pages).
   - Document theme customization and plugin usage for future reference.
   - Update `migration_roadmap.md` to include this Grav-based approach alongside Next.js and PHP+Angular plans.
2. **Training**:
   - Offer a brief walkthrough or video tutorial on Grav's admin panel for non-technical users.
3. **Future Transition Plan**:
   - Note that the Next.js project (`naser-modern`) remains preserved in Git for potential use next year with infrastructure upgrades. Assets and content from Grav can be reused in future migrations.

## Timeline Estimate
- **Phase 1 (Setup)**: 1 day (server setup and Grav installation)
- **Phase 2 (Theme Development)**: 2-3 days (custom theme and styling)
- **Phase 3 (Content Migration)**: 2-3 days (converting HTML to Grav pages)
- **Phase 4 (Plugins & Functionality)**: 1-2 days (adding forms, SEO, etc.)
- **Phase 5 (Testing & Deployment)**: 1-2 days
- **Phase 6 (Documentation & Handoff)**: 1 day
- **Total**: Approximately 8-12 working days, adjustable based on client feedback and server constraints.

## Key Considerations
- **Server Requirements**: Grav is lightweight and should run on most PHP servers, but confirm PHP version and file write permissions for the flat-file system.
- **Client Approval on Styling**: Confirm if Bootstrap or Tailwind CSS is preferred for the theme to align with either the original site or the Next.js approach.
- **Content Management Training**: Ensure the client is comfortable with Grav's admin interface; additional support may be needed initially.
- **Backup of Original Site**: Before deployment, ensure the original static site is backed up in case of rollback needs.
- **Preservation of Next.js Work**: Maintain the `naser-modern` directory and Git history separately for future use, avoiding overwrites during this Grav migration.

## Next Steps
1. Await client confirmation on this Grav migration plan, specifically regarding the CSS framework (Bootstrap vs. Tailwind).
2. Request server access details or specifications to confirm compatibility (PHP version, web server type).
3. Begin Phase 1 by downloading and installing Grav, setting up the project structure for development.

This plan ensures the Grupo Naser website is modernized quickly and efficiently using Grav CMS, meeting the client's infrastructure constraints while providing an intuitive content management solution.
