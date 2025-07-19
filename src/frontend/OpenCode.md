# OpenCode

This document provides instructions for agentic coding agents (like you) to work effectively within this repository.

## Commands

- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Test:** `npm test`
- **Run a single test file:** `npm test -- <file_path>`
- **Run tests in watch mode:** `npm run test:watch`
- **Get test coverage:** `npm run test:coverage`

## Code Style

- **Formatting:** Consistent with Prettier (although not explicitly configured).
- **Imports:**
    - Use absolute paths with aliases defined in `vite.config.js` (e.g., `@components`, `@pages`).
    - Group imports: 1. React, 2. external libraries, 3. internal modules.
- **Components:**
    - Use functional components with TypeScript.
    - Define `Props` interfaces for components.
    - Use CSS Modules for styling (e.g., `styles.header`).
- **Naming Conventions:**
    - Components: `PascalCase` (e.g., `Header.tsx`).
    - CSS Modules: `Component.module.css` (e.g., `Header.module.css`).
    - Interfaces: `PascalCase` with `Props` suffix (e.g., `HeaderProps`).
- **Error Handling:** Implement robust error handling, especially for API calls.
- **Types:** Use TypeScript for static typing. Define clear and concise types for props, state, and API responses.
- **State Management:** For simple cases, use `useState`. For more complex state, consider React Context or a state management library.

## Project Structure

- **`src/components`**: Reusable UI components, organized by atomic design principles (atoms, molecules, organisms).
- **`src/pages`**: Top-level page components.
- **`src/services`**: API client and other services.
- **`src/hooks`**: Custom React hooks.
- **`src/context`**: React context providers.
- **`src/styles`**: Global styles.
- **`src/assets`**: Static assets like images and fonts.
- **`src/constants`**: Constant values used throughout the application.
