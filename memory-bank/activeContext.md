# Active Context for Grupo Naser Website Migration

This document summarizes the active context for the migration of the Grupo Naser website from a static HTML site to a modern content management system (CMS). The current primary approach is based on **Grav CMS**, selected by the client for its compatibility with their existing server infrastructure.

## Current Active Approach: Grav CMS

- **Strategy**: Migration to Grav CMS, a lightweight PHP-based flat-file CMS that requires no database and offers a user-friendly admin interface for content management.
- **Reason for Selection**: Grav CMS was chosen for its simplicity, performance, and ability to run on the client's current server environment, which does not support Next.js deployments.
- **Project Directory**: `naser-modern` (cleared and repurposed for Grav CMS setup)
- **Status**: Planning and initial setup phase
- **Key Documentation**:
  - Migration Plan: `grav_migration_plan.md` and `migration_plan.md`
  - Styling Guide: `look_and_feel_guide.md`
  - Progress Report: `progress.md`
  - Technical Context: `techContext.md`
- **Current Phase**: Phase 1 - Setup and Environment Preparation
- **Immediate Next Steps**:
  - Confirm server specifications (PHP version 7.3.6+ required, web server type) and file write permissions.
  - Obtain client preference on CSS framework (Bootstrap vs. Tailwind) for the Grav theme.
  - Install Grav CMS in the `naser-modern` directory.

## Project Objectives
- **Compatibility**: Ensure the solution operates within the client's server constraints (standard LAMP stack, no database required for Grav).
- **Content Management**: Enable non-technical users to update content (e.g., obituaries, contact forms) via an intuitive admin interface.
- **Preservation**: Maintain the visual identity and content structure of the original site as outlined in `look_and_feel_guide.md`.
- **Future-Proofing**: Preserve content and assets for potential future transitions to Next.js or other frameworks when infrastructure upgrades occur next year.

## Previous Approaches (Inactive)
- **Next.js with TypeScript and Tailwind CSS**: On hold, preserved in a separate branch for future use when infrastructure supports it (expected next year). Previously developed in `naser-modern`.
- **PHP + Angular Traditional Stack**: Explored but not selected, documented in `traditional_migration_plan.md` and `php_angular_comparative_options.md`.

## Key Constraints
- **Server Limitations**: Current infrastructure does not support modern JavaScript frameworks like Next.js, necessitating a PHP-based solution.
- **Timeline**: Estimated 8-12 working days for Grav CMS migration completion, adjustable based on client feedback and server setup.

## Client Action Items
- Provide server access details or specifications (PHP version, web server type) to confirm compatibility with Grav CMS.
- Confirm styling preference (Bootstrap to match original site, or Tailwind CSS for a modern approach) for the Grav theme.

This active context ensures focus on the Grav CMS migration strategy, aligning all efforts with the client's current needs and infrastructure constraints while maintaining a clear path for future upgrades.
