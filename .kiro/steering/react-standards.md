---
inclusion: fileMatch
fileMatchPattern: "**/*.{js,jsx,ts,tsx}"
---

# React Development Standards for Grupo Naser CMS

## Component Structure

- Use functional components with hooks instead of class components
- Keep components small and focused on a single responsibility
- Use named exports for components
- Place each component in its own file

## State Management

- Use React Context for global state that changes infrequently
- Prefer local component state for UI-specific state
- Consider using React Query for server state management

## Styling

- Use CSS modules for component styling
- Follow BEM naming convention for CSS classes
- Use responsive design principles with mobile-first approach

## Performance

- Use React.memo for components that render often but rarely change
- Avoid unnecessary re-renders by using useCallback and useMemo
- Implement code splitting with React.lazy and Suspense

## Accessibility

- All images must have alt text
- Use semantic HTML elements
- Ensure keyboard navigation works for all interactive elements
- Maintain proper heading hierarchy

## GoDaddy Compatibility

- Ensure all code is compatible with GoDaddy's hosting environment
- Use relative paths for assets and API endpoints
- Optimize bundle size for shared hosting limitations
