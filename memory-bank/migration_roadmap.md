# Migration Roadmap for Grupo Naser Website

## Overview
This roadmap outlines the migration of the Grupo Naser static HTML website to a modern stack with a content management system (CMS), focusing on easier content management. The current primary approach is based on **Grav CMS**, a lightweight PHP-based flat-file CMS, selected by the client for compatibility with their existing server infrastructure. The previously developed Next.js approach remains preserved for future use when infrastructure upgrades are available next year.

## Project Context
- **Current State**: Static HTML site with Bootstrap 5, PHP form handling, and SEO-focused sitemap.
- **Goal**: Implement Grav CMS for content management, ensuring simplicity and compatibility with current server constraints.
- **Constraints**: Client's server does not support Next.js deployments; migration must prioritize solutions compatible with standard LAMP stacks.
- **Target Audience**: ISSSTE affiliates and families seeking funeral services, requiring accessible navigation and immediate contact options.

## Current Approach: Grav CMS (Primary Focus)
- **Status**: Planned and Approved by Client
- **Details**: Migration to Grav CMS, a flat-file PHP-based system that requires no database and offers a user-friendly admin interface. This approach ensures compatibility with the client's infrastructure while providing content management capabilities for pages like obituaries and contact forms.
- **Key Files**:
  - Project directory: `naser-grav` (to be created)
  - Documentation: `memory-bank/grav_migration_plan.md` (detailed migration steps and timeline)
  - Styling Guide: `memory-bank/look_and_feel_guide.md` (mapping original Bootstrap styles, adaptable to Grav themes)
- **Implementation Batches**: As outlined in `grav_migration_plan.md`, the migration is divided into phases:
  - **Phase 1: Setup and Environment Preparation** (1 day)
  - **Phase 2: Theme Development and Styling** (2-3 days)
  - **Phase 3: Content Migration** (2-3 days)
  - **Phase 4: Plugins and Functionality** (1-2 days)
  - **Phase 5: Testing and Deployment** (1-2 days)
  - **Phase 6: Documentation and Handoff** (1 day)
- **Total Timeline**: Approximately 8-12 working days.
- **Next Steps**:
  - Confirm server compatibility (PHP version, web server type).
  - Install Grav CMS and set up the project structure in `naser-grav`.
  - Develop a custom theme to match the original site's design.
  - Migrate content and test functionality before deployment.

## Future Approach: Next.js with TypeScript and Tailwind CSS (Pending Until Next Year)
- **Status**: On Hold (Pending Infrastructure Upgrade)
- **Details**: Significant progress was made on a Next.js-based solution with TypeScript and Tailwind CSS, including layout consistency using shared components (`Header` and `Footer`) across all main pages. This modern approach leverages React practices and server-side rendering for performance but is currently incompatible with the client's server. It is preserved for potential deployment next year.
- **Key Files**:
  - Project directory: `naser-modern`
  - Pages: `src/app/page.tsx`, `src/app/contacto/page.tsx`, etc.
  - Components: `src/components/Header.tsx`, `src/components/Footer.tsx`
- **Documentation**:
  - Look & Feel Guide: `memory-bank/look_and_feel_guide.md` (mapping original Bootstrap styles to Tailwind CSS)
- **Next Steps (Postponed)**:
  - Revisit deployment when client infrastructure supports Next.js (expected next year).
  - Complete any remaining content migration or dynamic features if needed at that time.

## Alternative Approaches (Explored and Documented)
Due to the client's server limitations, alternative strategies were explored before settling on Grav CMS:
1. **PHP + Angular Traditional Stack**:
   - **Status**: Explored, Not Selected
   - **Details**: A traditional approach using PHP (e.g., Laravel) for backend API and Angular for frontend SPA was planned. Detailed in `traditional_migration_plan.md` with comparative options in `php_angular_comparative_options.md`.
   - **Reason for Non-Selection**: Client opted for Grav CMS for its simplicity and flat-file architecture over a full-stack framework solution.

## Long-Term Vision
- The Grav CMS approach addresses immediate needs for content management and server compatibility, allowing the client to maintain and update the website efficiently.
- The Next.js solution in `naser-modern` remains the preferred modern approach and will be revisited when the client upgrades infrastructure next year. Content and assets migrated to Grav are designed to be reusable for future transitions to Next.js or other frameworks.

## Adherence to Guidelines
- **RipperFive Protocol**: The roadmap for Grav CMS includes clear pause points for client approval after key phases, ensuring alignment with project goals as development progresses.
- **Memory-Bank CMS Migration**: The Grav approach incorporates guidelines from `memory-bank.md` by defining the level of control (CMS-based), listing minimum functionalities (content CRUD, form handling), and selecting a stack (Grav CMS) tailored to the client's constraints.

## Next Steps
Request client confirmation on server access details and CSS framework preference (Bootstrap or Tailwind) for the Grav theme. Begin Phase 1 of the Grav migration by setting up the environment and installing Grav CMS in the `naser-grav` directory. Each phase will be implemented only after client approval, following a structured process to ensure alignment with project goals.

**PAUSE POINT**: Approve the updated roadmap and Phase 1 of the Grav migration to initiate the process.
