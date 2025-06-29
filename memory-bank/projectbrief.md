# Project Brief for Grupo Naser Website Migration

This project brief outlines the migration of the Grupo Naser website from a static HTML site to a modern content management system (CMS) to enhance content management capabilities and user experience. The current primary approach is based on **Grav CMS**, selected by the client for its compatibility with their existing server infrastructure.

## Project Overview
- **Project Name**: Grupo Naser Website Migration
- **Client**: Grupo Naser
- **Objective**: Transition the static HTML website to a CMS-based solution for easier content updates, maintaining visual identity and functionality while adhering to server constraints.
- **Target Audience**: ISSSTE affiliates and families seeking funeral services, requiring accessible navigation, immediate contact options, and information on services like obituaries and coverage.
- **Current Website**: Static HTML with Bootstrap 5 for styling, PHP for form handling, and an SEO-focused sitemap.

## Current Approach: Grav CMS (Active Strategy)
- **Technology**: Grav CMS, a lightweight PHP-based flat-file CMS that requires no database and offers a user-friendly admin interface.
- **Reason for Selection**: Chosen for its simplicity, performance, and compatibility with the client's server environment, which does not support modern JavaScript frameworks like Next.js.
- **Styling**: Custom Grav theme based on Bootstrap or Tailwind CSS (pending client confirmation) to match the original site's design as outlined in `look_and_feel_guide.md`.
- **Project Directory**: `naser-modern` (cleared and repurposed for Grav CMS setup)
- **Status**: Planning and initial setup phase (Phase 1 - Setup and Environment Preparation)
- **Timeline**: Estimated 8-12 working days for completion, covering setup, theme development, content migration, testing, deployment, and handoff.
- **Key Documentation**:
  - Migration Plan: `grav_migration_plan.md` and `migration_plan.md`
  - Progress Report: `progress.md`
  - Technical Context: `techContext.md`
  - Active Context: `activeContext.md`

## Project Goals
1. **Compatibility**: Ensure the solution runs on the client's current server infrastructure (standard LAMP stack, PHP 7.3.6+ required, no database needed).
2. **Content Management**: Enable non-technical users to manage content (e.g., obituaries, contact forms) through an intuitive admin interface provided by Grav CMS.
3. **Visual Consistency**: Retain the original site's look and feel, including colors (`#524030`, `#cfbfaa`), typography ('Poppins'), and responsive design.
4. **Functionality**: Maintain or enhance existing features such as contact forms, navigation, and dynamic content like obituary listings.
5. **Future-Proofing**: Structure content and assets to be reusable for potential future transitions to Next.js or other frameworks when infrastructure upgrades occur next year.

## Previous Approaches (Inactive)
- **Next.js with TypeScript and Tailwind CSS**: On hold, preserved in a separate branch for future use when infrastructure supports it (expected next year). Significant progress was made with layout components in the original `naser-modern` directory.
- **PHP + Angular Traditional Stack**: Explored but not selected, with detailed plans and comparative analysis documented in `traditional_migration_plan.md` and `php_angular_comparative_options.md`.

## Constraints
- **Server Limitations**: The client's infrastructure does not support Next.js or other modern JavaScript frameworks, necessitating a PHP-based solution like Grav CMS.
- **Budget and Resources**: Migration must be completed with existing resources, leveraging free and open-source technologies.
- **Timeline**: Tight schedule with an estimated 8-12 working days for Grav CMS implementation, requiring efficient planning and execution.

## Key Deliverables
- **Grav CMS Implementation**: Fully functional website running on Grav CMS with content migrated from the static HTML site.
- **Custom Theme**: A tailored Grav theme matching the original site's design, using either Bootstrap or Tailwind CSS as per client preference.
- **Admin Interface**: User-friendly CMS interface for content updates, accessible to non-technical users.
- **Documentation and Training**: Guides and walkthroughs for managing content via Grav CMS, documented in project files.
- **Backup and Future Plan**: Preservation of the Next.js approach in a separate branch for potential deployment next year.

## Next Steps
- **Client Confirmation**: Await server access details (PHP version, web server type) and styling preference (Bootstrap vs. Tailwind) to proceed with Grav CMS setup.
- **Phase 1 Implementation**: Install Grav CMS in the `naser-modern` directory and configure the environment as outlined in `grav_migration_plan.md`.
- **Progress Updates**: Regularly update `progress.md` after each phase to maintain transparency on project advancement.

This project brief provides a clear overview of the Grupo Naser website migration, focusing on the Grav CMS approach to meet current needs while preserving options for future technological advancements.
