# Migration Roadmap for Grupo Naser Website

## Overview
This roadmap outlines the migration of the Grupo Naser static HTML website to a modern stack with a custom content management system (CMS), focusing on easier content management. The plan adheres to the protocols defined in `ripperFive.md` for adaptive development in batches and follows guidelines from `memory-bank.md` for CMS migration. The migration must be completed within a one-week deadline with no budget for external resources.

## Project Context
- **Current State**: Static HTML site with Bootstrap 5, PHP form handling, and SEO-focused sitemap.
- **Goal**: Implement a custom CMS for content management using a modern, free stack (Next.js, Tailwind CSS, Firebase, Vercel).
- **Constraints**: One-week deadline, no budget, custom CMS preference for control and personalization.
- **Target Audience**: ISSSTE affiliates and families seeking funeral services, requiring accessible navigation and immediate contact options.

## Implementation Batches
Following the `ripperFive.md` protocol, the migration is divided into manageable batches based on complexity and web development batching strategies (Component-first, API integration, Testing). Each batch corresponds to a day within the one-week timeline to ensure timely completion. The batches are designed as per the PLAN mode template for clarity and user approval.

### BATCH 1: Foundation Setup (Day 1)
**Project**: Grupo Naser Website Migration  
**Phase**: Initial Setup and Environment Configuration (Items 1-5)  
**Technology Stack**: Next.js, Tailwind CSS, Firebase, Vercel

**Prerequisites**:
- Node.js (v18+) and npm installed on the system.
- GitHub account for repository setup and Vercel deployment.

**Implementation Steps**:
1. Create a new directory `naser-modern` for the project to avoid overwriting the existing site. **(Completed)**
2. Initialize a Next.js project with TypeScript and Tailwind CSS in `naser-modern` using `npx create-next-app@latest`. **(Completed)**
3. Set up localStorage and IndexedDB for initial data persistence in the Next.js project to manage content without a backend for the MVP. **(Pending - to be implemented in code during Batch 2)**
4. Set up a GitHub repository for the project and push the initial code for Vercel integration. **(Pending - awaiting user input)**
5. Verify local development environment by running `npm run dev` to ensure the basic Next.js app loads correctly. **(Completed)**

**Success Criteria**:
- Next.js project with Tailwind CSS is initialized and runs locally.
- LocalStorage and IndexedDB are configured for basic content persistence in the MVP.
- Initial code is pushed to GitHub and linked to Vercel for deployment readiness.

**PAUSE POINT**: Approve this batch before proceeding to admin interface development.

### BATCH 2: Custom CMS Admin Interface (Day 2)
**Project**: Grupo Naser Website Migration  
**Phase**: Admin Interface for Content Management (Items 6-9)  
**Technology Stack**: Next.js, localStorage, IndexedDB

**Prerequisites**:
- Batch 1 completed with Next.js setup and localStorage/IndexedDB configuration.

**Implementation Steps**:
6. Create a simple admin interface page in Next.js at `app/admin/page.tsx` for content editing.
7. Implement basic CRUD operations (Create, Read, Update, Delete) for content management using localStorage and IndexedDB to store page data locally.
8. Secure the admin interface with a simple password-based check stored in localStorage, allowing only authorized users to access and edit content (temporary solution for MVP).
9. Test the admin interface locally to ensure content can be added, edited, and deleted via localStorage/IndexedDB.

**Success Criteria**:
- Admin interface is accessible and secured with a basic password check.
- Content can be managed (added, updated, deleted) through the interface and reflects in localStorage/IndexedDB.

**PAUSE POINT**: Approve this batch before proceeding to core page migration.

### BATCH 3: Core Pages Migration (Day 3)
**Project**: Grupo Naser Website Migration  
**Phase**: Migrate Essential Pages to Next.js (Items 10-13)  
**Technology Stack**: Next.js, Tailwind CSS, localStorage/IndexedDB

**Prerequisites**:
- Batch 2 completed with functional admin interface.

**Implementation Steps**:
10. Convert key static HTML pages (`index.html`, `contacto.html`, `servicios.html`) to Next.js pages under `app/` directory, pulling content dynamically from localStorage/IndexedDB.
11. Apply Tailwind CSS styling to match the original design, replacing Bootstrap classes.
12. Ensure SEO elements (meta tags, titles) are preserved using Next.js Head component for each page.
13. Test the migrated pages locally to confirm content display and styling consistency with the original site.

**Success Criteria**:
- Core pages (`index`, `contacto`, `servicios`) are rendered dynamically with content from localStorage/IndexedDB.
- Styling matches the original site using Tailwind CSS.
- SEO meta tags are correctly implemented for each page.

**PAUSE POINT**: Approve this batch before proceeding to additional pages and integrations.

### BATCH 4: Additional Pages and Form Handling (Day 4)
**Project**: Grupo Naser Website Migration  
**Phase**: Migrate Remaining Pages and Replace PHP Forms (Items 14-17)  
**Technology Stack**: Next.js, Tailwind CSS, localStorage/IndexedDB

**Prerequisites**:
- Batch 3 completed with core pages migrated.

**Implementation Steps**:
14. Migrate remaining core pages (`necesidad-inmediata.html`, `prevision.html`, `obituario.html`, `nosotros.html`, `cobertura.html`, `historia.html`) to Next.js, pulling content from localStorage/IndexedDB.
15. Migrate location-specific pages (`naser_aragon.html`, `naser_tlalpan.html`, `naser_morelos.html`, `naser_oaxaca.html`) with placeholder content if time-constrained.
16. Replace PHP form handling in `contacto.html` with Next.js API routes at `app/api/contact/route.ts` for processing form submissions.
17. Test form submission functionality and page rendering locally for all migrated pages.

**Success Criteria**:
- All core and location-specific pages are migrated to Next.js with content from localStorage/IndexedDB or placeholders.
- Contact form submits data via Next.js API route successfully.

**PAUSE POINT**: Approve this batch before proceeding to integrations and testing.

### BATCH 5: Integrations and Testing (Day 5)
**Project**: Grupo Naser Website Migration  
**Phase**: Chat and Social Integrations, Accessibility Testing (Items 18-21)  
**Technology Stack**: Next.js, Tailwind CSS

**Prerequisites**:
- Batch 4 completed with all pages migrated.

**Implementation Steps**:
18. Embed existing Crisp Chat and social media integrations (WhatsApp, Facebook, etc.) into the Next.js application layout or specific pages.
19. Conduct accessibility testing using tools like axe-core to ensure navigation and contact options are accessible.
20. Test responsiveness across devices to confirm Tailwind CSS configurations match the original responsive design.
21. Address any issues or bugs identified during testing for functionality and accessibility.

**Success Criteria**:
- Chat and social media integrations function as in the original site.
- Site passes basic accessibility checks with no critical issues.
- Responsive design works across mobile, tablet, and desktop views.

**PAUSE POINT**: Approve this batch before proceeding to deployment.

### BATCH 6: Deployment and Final Review (Day 6)
**Project**: Grupo Naser Website Migration  
**Phase**: Deploy to Vercel and Review CMS Functionality (Items 22-24)  
**Technology Stack**: Vercel, Next.js

**Prerequisites**:
- Batch 5 completed with integrations and testing.

**Implementation Steps**:
22. Deploy the site to Vercel by linking the GitHub repository for hosting.
23. Conduct a final review of the deployed site to ensure content management via the admin interface works as expected.
24. Verify SEO sitemap generation dynamically using Next.js features and test page load performance.

**Success Criteria**:
- Site is live on Vercel with all pages accessible.
- Admin interface updates content on the live site via localStorage/IndexedDB.
- Sitemap is generated dynamically for SEO purposes.

**PAUSE POINT**: Approve this batch before proceeding to documentation.

### BATCH 7: Documentation and Handover (Day 7)
**Project**: Grupo Naser Website Migration  
**Phase**: Document Usage and Maintenance (Items 25-27)  
**Technology Stack**: Markdown, Documentation

**Prerequisites**:
- Batch 6 completed with successful deployment.

**Implementation Steps**:
25. Document how to use the custom admin interface for content updates in a `README.md` within the project repository.
26. Prepare a brief guide for ongoing maintenance, including localStorage/IndexedDB limitations and potential future enhancements with Supabase.
27. Update `memory-bank/` files with migration details, progress, and next steps as per documentation guidelines.

**Success Criteria**:
- Documentation for CMS usage and maintenance is clear and accessible in the repository.
- Memory Bank files are updated to reflect the migration completion and future considerations.

**FINAL PAUSE POINT**: Approve this batch to conclude the MVP migration project.

### BATCH 8: Post-MVP Supabase Integration (Post-Release)
**Project**: Grupo Naser Website Migration  
**Phase**: Replace Local Storage with Supabase Backend (Items 28-31)  
**Technology Stack**: Supabase, Next.js

**Prerequisites**:
- Batch 7 completed with MVP deployed and documented.
- Sufficient disk space or resources to install Supabase dependencies.

**Implementation Steps**:
28. Set up a Supabase project for backend services, including database and authentication.
29. Install Supabase SDK in the Next.js project and configure environment variables for connection.
30. Migrate content management from localStorage/IndexedDB to Supabase, updating CRUD operations in the admin interface.
31. Test the integration to ensure content updates reflect in Supabase and secure the admin interface with Supabase authentication.

**Success Criteria**:
- Supabase is configured and connected to the Next.js application.
- Content management operates through Supabase with data persistence.
- Admin interface is secured with Supabase authentication.

**POST-MVP PAUSE POINT**: Approve this batch to finalize the transition to a backend solution with Supabase.

## Batch Strategy Rationale
- **Complexity-Based Batching**: Given the tight one-week deadline and the complexity of migrating to a custom CMS, batches are kept small (3-5 items) and focused on daily achievable goals.
- **Layer-Based Batching**: The roadmap follows a foundation-to-interface progression (Setup → Admin Interface → Pages → Integrations → Deployment), ensuring a logical build-up of functionality.
- **Feature-Based Batching**: Core CMS functionality and essential pages are prioritized in early batches, with enhancements and polish in later batches.

## Adherence to RipperFive and Memory-Bank Guidelines
- **RipperFive Protocol**: The roadmap uses the PLAN mode format with clear pause points for user approval after each batch, ensuring no unauthorized changes and maintaining user control. Batch sizes adhere to the recommended limits for web development projects.
- **Memory-Bank CMS Migration**: This roadmap incorporates the initial batch suggestions from `memory-bank.md` by defining the level of control (custom CMS), listing minimum functionalities (content CRUD, form handling), and deciding on a stack (Next.js, Firebase) tailored to the no-budget constraint.

## Next Steps
Request approval for Batch 1 to initiate the setup of the Next.js project and Firebase configuration. Each batch will be implemented only after user confirmation, following the strict protocol to prevent overeager changes and ensure alignment with project goals.

**PAUSE POINT**: Approve the roadmap and Batch 1 to begin the migration process.
