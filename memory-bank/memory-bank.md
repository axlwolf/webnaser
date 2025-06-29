# Memory Bank for Grupo Naser Website Migration

This Memory Bank serves as a centralized repository of context, plans, and progress for the migration of the Grupo Naser website from a static HTML site to a modern content management system (CMS). The current primary approach is based on **Grav CMS**, selected by the client for compatibility with their existing server infrastructure. This document provides an overview and links to detailed files within the `memory-bank` directory for comprehensive project documentation.

## Project Overview
- **Objective**: Migrate the Grupo Naser static HTML website to a CMS-based solution to enable easier content management while maintaining visual identity and functionality.
- **Client Constraint**: The current server infrastructure does not support modern JavaScript frameworks like Next.js, necessitating a PHP-based solution.
- **Target Audience**: ISSSTE affiliates and families seeking funeral services, requiring accessible navigation and immediate contact options.
- **Current Strategy**: Grav CMS, a lightweight PHP-based flat-file CMS, chosen for its simplicity, performance, and compatibility with standard LAMP stacks.

## Active Migration Approach: Grav CMS
- **Technology**: Grav CMS with a custom theme (Bootstrap or Tailwind CSS, pending client confirmation).
- **Reason for Selection**: Grav CMS offers a database-free solution with a user-friendly admin interface, ideal for the client's server environment and content management needs.
- **Status**: Planning and initial setup phase (Phase 1 - Setup and Environment Preparation).
- **Project Directory**: `naser-modern` (cleared and repurposed for Grav CMS setup).
- **Timeline**: Estimated 8-12 working days for completion across six phases (setup, theme development, content migration, plugins/functionality, testing/deployment, documentation/handoff).
- **Key Files**:
  - **Migration Plan**: `grav_migration_plan.md`, `migration_plan.md` - Detailed steps and timeline for Grav CMS implementation.
  - **Progress Report**: `progress.md` - Tracks completed tasks and upcoming milestones.
  - **Technical Context**: `techContext.md` - Outlines the technology stack and server requirements for Grav CMS.
  - **Active Context**: `activeContext.md` - Summarizes the current focus on Grav CMS with immediate next steps.
  - **Project Brief**: `projectbrief.md` - Overview of project goals, deliverables, and constraints.
  - **Styling Guide**: `look_and_feel_guide.md` - Guidelines for maintaining visual consistency with the original site.

## Previous Approaches (Inactive)
- **Next.js with TypeScript and Tailwind CSS**: On hold, preserved in a separate branch for future use when infrastructure upgrades occur next year. Significant progress was made with layout components.
  - **Documentation**: Referenced in `migration_roadmap.md`, `look_and_feel_guide.md`.
- **PHP + Angular Traditional Stack**: Explored but not selected, with a comparative analysis of four options and a detailed plan.
  - **Documentation**: `traditional_migration_plan.md`, `php_angular_comparative_options.md`.

## CMS Migration Guidelines
The migration to a CMS follows these key principles to ensure success within the client's constraints:
1. **Level of Control**: Opt for a CMS that provides full control over content and design, which Grav CMS achieves through its admin interface and customizable themes.
2. **Minimum Functionalities**: Ensure the CMS supports content CRUD (Create, Read, Update, Delete) operations, form handling, and SEO features, all of which are covered by Grav CMS and its plugins.
3. **Stack Decision**: Given the no-budget constraint and server limitations, Grav CMS is selected as a free, open-source PHP-based solution that requires minimal setup and no database.
4. **Batch Implementation**: Follow the phased approach outlined in `grav_migration_plan.md` to break the migration into manageable steps, ensuring client approval at key stages.
5. **Documentation**: Maintain comprehensive records in the `memory-bank` directory to track plans, progress, and technical details for transparency and future reference.

## Next Steps
- **Client Input**: Await server access details (PHP version, web server type) and styling preference (Bootstrap vs. Tailwind) to confirm compatibility and design direction.
- **Phase 1 Execution**: Install Grav CMS in the `naser-modern` directory and configure the environment as per `grav_migration_plan.md`.
- **Progress Tracking**: Update `progress.md` after each phase to document advancements and any issues encountered.

## Additional Resources in Memory Bank
- **Product Context**: `productContext.md` - Details on the funeral services offered by Grupo Naser and user needs.
- **System Patterns**: `systemPatterns.md` - Potential design patterns or architectural considerations (may require updates to align with Grav CMS).
- **Ripper Five Protocol**: `ripperFive.md` - Guidelines for adaptive development in batches, followed in the Grav CMS phased approach.
- **Master Prompt**: `master_prompt.md` - Core instructions or prompts guiding the project (if applicable).
- **Generate Sitemap Script**: `generate_sitemap.py` - Utility for SEO sitemap generation, adaptable for Grav CMS.

This Memory Bank ensures all aspects of the Grupo Naser website migration are documented and accessible, focusing on the Grav CMS approach to meet current needs while preserving previous work for future opportunities when infrastructure upgrades are available.
