# Technical Context for Grupo Naser Website Migration

This document provides the technical context for the migration of the Grupo Naser website from a static HTML site to a modern content management system (CMS). The current primary approach is based on **Grav CMS**, a lightweight PHP-based flat-file CMS, selected by the client for compatibility with their existing server infrastructure. Previous approaches, including Next.js and PHP + Angular, are documented and preserved for future reference.

## Current Technical Approach: Grav CMS (Active Strategy)

- **Technology Stack**:
  - **Backend & CMS**: Grav CMS (PHP-based, flat-file CMS)
    - **Reason**: Grav offers a lightweight, database-free solution with a user-friendly admin interface for content management. It is highly compatible with most PHP-enabled servers and requires minimal setup.
    - **Purpose**: Manage content, handle page structure, and serve as the backend for static page generation.
  - **Frontend**: Custom Grav theme based on Bootstrap or Tailwind CSS (pending client confirmation)
    - **Reason**: The original site uses Bootstrap for styling, ensuring visual consistency. Tailwind CSS is an alternative if the client prefers a modern utility-first approach as used in the Next.js version.
    - **Purpose**: Render the user interface with templates that mirror the original site's design and structure.
  - **Additional Tools**:
    - **Version Control**: Git (for tracking changes and collaboration)
    - **Deployment**: Grav files deployed directly to the web server via FTP or SSH.
- **Project Directory**: `naser-modern` (cleared and repurposed for Grav CMS setup)
- **Server Requirements**:
  - PHP 7.3.6 or higher (ideally PHP 8.x for optimal performance)
  - Web server (Apache or Nginx) with URL rewriting support (e.g., `.htaccess` for Apache)
  - File write permissions for Grav's flat-file system
- **Key Documentation**:
  - Migration Plan: `grav_migration_plan.md` and `migration_plan.md`
  - Styling Guide: `look_and_feel_guide.md` (mapping original Bootstrap styles, adaptable to Grav themes)
- **Development Status**: Planning and initial setup phase, awaiting server details and styling preferences from the client.

## Previous Technical Approaches (On Hold)

1. **Next.js with TypeScript and Tailwind CSS**:
   - **Status**: On Hold (Pending Infrastructure Upgrade Next Year)
   - **Technology Stack**:
     - **Framework**: Next.js (React-based, with TypeScript)
     - **Styling**: Tailwind CSS
     - **Purpose**: Modern web application with server-side rendering for performance and SEO.
   - **Details**: Significant progress was made with layout consistency using shared components (`Header` and `Footer`) across main pages. This approach is preserved in a separate branch for future use when the client's infrastructure supports Next.js.
   - **Project Directory**: Previously in `naser-modern` (now repurposed for Grav CMS, backup exists in another branch)
   - **Documentation**: Referenced in `migration_roadmap.md` and `look_and_feel_guide.md`.

2. **PHP + Angular Traditional Stack**:
   - **Status**: Explored, Not Selected
   - **Technology Stack**:
     - **Backend**: PHP (Laravel or other frameworks)
     - **Frontend**: Angular
     - **Purpose**: Traditional web application stack compatible with standard LAMP servers.
   - **Details**: A comparative analysis of four PHP + Angular solutions was conducted, with a detailed migration plan drafted in `traditional_migration_plan.md` and `php_angular_comparative_options.md`. The client opted for Grav CMS instead.
   - **Documentation**: Preserved for reference in case of future reconsideration.

## Technical Constraints
- **Server Limitations**: The client's current infrastructure does not support Next.js deployments, necessitating a PHP-based solution like Grav CMS that can run on standard LAMP stacks.
- **Compatibility Needs**: The chosen technology must operate within the constraints of the client's server environment, likely with PHP 7.x or 8.x and Apache or Nginx.
- **Content Management**: The solution must provide an easy-to-use interface for non-technical users to update content such as obituaries and contact information, which Grav CMS addresses through its admin panel.

## Future Technical Vision
- **Grav CMS Implementation**: The immediate focus is on deploying Grav CMS to meet current server constraints and content management needs. This approach allows for quick modernization with minimal setup complexity.
- **Next.js Transition**: When the client's infrastructure is upgraded next year, the Next.js approach can be revisited. Content and assets migrated to Grav CMS are designed to be reusable for future transitions to Next.js or other modern frameworks.
- **Scalability**: Grav CMS provides a foundation that can be extended with plugins or custom functionality if the client's needs grow, while maintaining compatibility with potential future stacks.

## Next Steps
- Confirm server specifications (PHP version, web server type) to ensure compatibility with Grav CMS.
- Obtain client preference on CSS framework (Bootstrap vs. Tailwind) for the Grav theme.
- Install Grav CMS in the `naser-modern` directory and begin Phase 1 of the migration plan as outlined in `grav_migration_plan.md`.

This technical context ensures that the migration strategy aligns with the client's infrastructure constraints while providing a clear path for current implementation and future upgrades.
