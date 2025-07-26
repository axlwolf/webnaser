# Design Document

## Overview

This design document outlines the architecture and implementation details for the React CMS for Grupo Naser's website that will be deployed on GoDaddy hosting. The system consists of two main components: a React frontend for public users and a React+PHP admin panel for content management. This design ensures compatibility with GoDaddy's hosting environment while providing a modern, maintainable solution.

### Project Structure

The project will follow this directory structure to maintain clear separation of concerns:

```
/
├── /src
│   ├── /frontend             # Public-facing React website
│   │   ├── /components       # Reusable UI components
│   │   ├── /pages            # Page components
│   │   ├── /hooks            # Custom React hooks
│   │   ├── /context          # React context providers
│   │   ├── /services         # API service clients
│   │   ├── /utils            # Utility functions
│   │   ├── /assets           # Static assets (images, fonts)
│   │   └── /styles           # Global styles and theme
│   │
│   └── /admin                # Admin React application
│       ├── /components       # Admin UI components
│       ├── /pages            # Admin page components
│       ├── /hooks            # Admin-specific hooks
│       ├── /context          # Admin context providers
│       ├── /services         # Admin API service clients
│       └── /utils            # Admin utility functions
│
├── /api                      # PHP backend
│   ├── /controllers          # API endpoint controllers
│   ├── /models               # Data models
│   ├── /services             # Business logic services
│   ├── /repositories         # Data access repositories
│   ├── /middleware           # Request/response middleware
│   └── /utils                # Helper utilities
│
├── /database                 # Database related files
│   ├── /migrations           # Database migration scripts
│   └── /seeds                # Seed data for development
│
├── /public                   # Public assets directory
│   ├── /uploads              # User uploaded content
│   └── /static               # Static assets
│
└── /tests                    # Test files
    ├── /unit                 # Unit tests
    ├── /integration          # Integration tests
    └── /e2e                  # End-to-end tests
```

## Architecture

The system follows a Clean Architecture with Hexagonal pattern that combines React for frontend rendering with PHP for backend services:

1. **Frontend Layer**: React-based Single Page Application (SPA) that renders the public-facing website

   - Pre-rendered React components for SEO optimization
   - Client-side routing with React Router for smooth navigation
   - Responsive design using mobile-first approach
   - Component-based architecture with reusable UI elements
   - State management with React Context API or Redux

2. **Admin Layer**: React-based admin interface with PHP backend

   - Secure authentication system with JWT tokens
   - Content management interfaces with rich text editing
   - Media management system with image optimization
   - Dashboard with content analytics
   - Role-based access control

3. **Data Layer**:

   - MySQL database for content storage
   - JSON-based RESTful API for frontend consumption
   - PHP backend services for data manipulation
   - Repository pattern for data access abstraction
   - Data validation and sanitization middleware

4. **Deployment Layer**:
   - Static asset optimization for GoDaddy hosting
   - PHP compatibility configuration for GoDaddy environment
   - Build process for React applications with code splitting
   - Environment-specific configuration management
   - Automated deployment scripts

### Clean Architecture Overview

The system implements Clean Architecture principles to ensure separation of concerns and maintainability:

```mermaid
graph TD
    A[UI Layer] -->|Uses| B[Application Layer]
    B -->|Uses| C[Domain Layer]
    B -->|Uses| D[Infrastructure Layer]
    D -->|Implements| E[Domain Interfaces]

    subgraph "UI Layer"
    A1[React Components]
    A2[Admin Interface]
    end

    subgraph "Application Layer"
    B1[Use Cases]
    B2[Services]
    end

    subgraph "Domain Layer"
    C1[Entities]
    C2[Domain Services]
    C3[Repository Interfaces]
    end

    subgraph "Infrastructure Layer"
    D1[API Clients]
    D2[Database Repositories]
    D3[External Services]
    end

    A --> A1
    A --> A2
    B --> B1
    B --> B2
    C --> C1
    C --> C2
    C --> C3
    D --> D1
    D --> D2
    D --> D3
```

### System Architecture

```mermaid
graph TD
    A[Public Users] -->|Access| B[React Frontend]
    C[Admin Users] -->|Authenticate| D[React Admin UI]
    D -->|API Calls| E[PHP Backend Services]
    E -->|CRUD Operations| F[MySQL Database]
    B -->|Fetch Content| G[JSON Content API]
    G -->|Served by| E
    H[Build Process] -->|Generates| B
    H -->|Generates| D

    subgraph "Frontend Clean Architecture"
    B1[UI Components] -->|Uses| B2[Application Services]
    B2 -->|Uses| B3[Domain Models]
    B2 -->|Uses| B4[Repository Interfaces]
    B5[API Clients] -->|Implements| B4
    end

    subgraph "Backend Clean Architecture"
    E1[Controllers] -->|Uses| E2[Use Cases]
    E2 -->|Uses| E3[Domain Entities]
    E2 -->|Uses| E4[Repository Interfaces]
    E5[Database Repositories] -->|Implements| E4
    end

    B --> B1
    E --> E1
```

### Frontend Architecture

The frontend architecture follows a component-based approach with clear separation of concerns:

```mermaid
graph TD
    A[App Entry Point] -->|Renders| B[Router]
    B -->|Routes to| C[Page Components]
    C -->|Composed of| D[UI Components]
    C -->|Uses| E[Hooks]
    C -->|Consumes| F[Context Providers]
    F -->|Manages| G[Application State]
    E -->|Calls| H[API Services]
    H -->|Communicates with| I[Backend API]

    subgraph "Component Layer"
    D1[Layout Components]
    D2[Form Components]
    D3[Display Components]
    D4[Navigation Components]
    end

    subgraph "State Management"
    G1[Auth Context]
    G2[Content Context]
    G3[UI State Context]
    end

    subgraph "Service Layer"
    H1[Content Service]
    H2[Auth Service]
    H3[Form Service]
    end

    D --> D1
    D --> D2
    D --> D3
    D --> D4
    G --> G1
    G --> G2
    G --> G3
    H --> H1
    H --> H2
    H --> H3
```

### Admin Panel Architecture

The admin panel architecture is designed for content management with secure authentication:

```mermaid
graph TD
    A[Admin App] -->|Renders| B[Protected Router]
    B -->|Requires| C[Authentication]
    B -->|Routes to| D[Admin Pages]
    D -->|Composed of| E[Admin Components]
    D -->|Uses| F[Admin Hooks]
    D -->|Consumes| G[Admin Context]
    G -->|Manages| H[Admin State]
    F -->|Calls| I[Admin Services]
    I -->|Communicates with| J[Admin API]

    subgraph "Admin Component Layer"
    E1[Dashboard Components]
    E2[Content Editor Components]
    E3[Media Manager Components]
    E4[Settings Components]
    end

    subgraph "Admin State Management"
    H1[Auth Context]
    H2[Content Management Context]
    H3[Media Context]
    H4[Settings Context]
    end

    subgraph "Admin Service Layer"
    I1[Content Management Service]
    I2[Media Service]
    I3[User Management Service]
    I4[Settings Service]
    end

    E --> E1
    E --> E2
    E --> E3
    E --> E4
    H --> H1
    H --> H2
    H --> H3
    H --> H4
    I --> I1
    I --> I2
    I --> I3
    I --> I4
```

### Backend API Architecture

The PHP backend follows a layered architecture with clear separation of concerns:

```mermaid
graph TD
    A[API Endpoints] -->|Route to| B[Controllers]
    B -->|Validate| C[Request Data]
    B -->|Use| D[Services]
    D -->|Implement| E[Business Logic]
    D -->|Use| F[Repositories]
    F -->|Access| G[Database]
    B -->|Return| H[API Response]

    subgraph "Controller Layer"
    B1[Page Controller]
    B2[Service Controller]
    B3[Location Controller]
    B4[Media Controller]
    B5[Auth Controller]
    B6[Form Controller]
    end

    subgraph "Service Layer"
    D1[Page Service]
    D2[Service Management]
    D3[Location Service]
    D4[Media Service]
    D5[Auth Service]
    D6[Form Service]
    end

    subgraph "Repository Layer"
    F1[Page Repository]
    F2[Service Repository]
    F3[Location Repository]
    F4[Media Repository]
    F5[User Repository]
    F6[Form Repository]
    end

    B --> B1
    B --> B2
    B --> B3
    B --> B4
    B --> B5
    B --> B6
    D --> D1
    D --> D2
    D --> D3
    D --> D4
    D --> D5
    D --> D6
    F --> F1
    F --> F2
    F --> F3
    F --> F4
    F --> F5
    F --> F6
```

## Components and Interfaces

### Frontend Components

1. **Public Website Components**

   - Header/Navigation Component
   - Home Page Component
   - Services Page Component
   - Locations Page Components
   - Contact Form Component
   - Footer Component

2. **Core UI Components**

   - Button Component
   - Card Component
   - Form Input Components
   - Modal Component
   - Image Gallery Component

3. **Admin Interface Components**
   - Login Component
   - Dashboard Component
   - Page Editor Component
   - Media Manager Component
   - Settings Component

### Backend Services

1. **Authentication Service**

   - Login/Logout API
   - Session Management
   - Permission Handling

2. **Content Management API**

   - Page CRUD Operations
   - Service CRUD Operations
   - Location CRUD Operations
   - Contact Information Management

3. **Media Management API**

   - Image Upload/Optimization
   - Media Library Management
   - File System Operations

4. **Form Handling Service**
   - Form Submission Processing
   - Email Notification System
   - Form Data Storage

### Interfaces

1. **Content API Interface**

```typescript
interface ContentAPI {
  getPage(slug: string): Promise<PageData>;
  getServices(): Promise<Service[]>;
  getLocations(): Promise<Location[]>;
  getContactInfo(): Promise<ContactInfo>;
}
```

2. **Admin API Interface**

```typescript
interface AdminAPI {
  login(username: string, password: string): Promise<AuthResponse>;
  logout(): Promise<void>;
  updatePage(pageId: number, data: PageData): Promise<PageData>;
  uploadMedia(file: File): Promise<MediaItem>;
  // Additional admin operations
}
```

3. **Form Submission Interface**

```typescript
interface FormSubmission {
  submitContactForm(formData: ContactFormData): Promise<SubmissionResult>;
}
```

## Data Models

### Page Model

```typescript
interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  status: "published" | "draft";
  createdAt: string;
  updatedAt: string;
}
```

### Service Model

```typescript
interface Service {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  order: number;
  status: "active" | "inactive";
}
```

### Location Model

```typescript
interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
  content: string;
  imageUrl: string;
}
```

### Media Model

```typescript
interface MediaItem {
  id: number;
  filename: string;
  originalFilename: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl: string;
  createdAt: string;
}
```

### User Model

```typescript
interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "editor";
  lastLogin: string;
}
```

## Testing Strategy

### Test Suite Configuration

The project implements a comprehensive testing strategy with the following components:

1. **Unit Testing**

   - Jest for JavaScript/React unit tests
   - PHPUnit for PHP backend tests
   - Test coverage reporting with minimum 80% coverage requirement

2. **Integration Testing**

   - React Testing Library for component integration tests
   - API integration tests with supertest
   - Database integration tests

3. **End-to-End Testing**

   - Playwright for cross-browser E2E tests
   - Automated user flow testing
   - Visual regression testing

4. **Git Hooks with Husky**
   - Pre-commit hooks for linting and formatting
   - Pre-push hooks for running unit tests
   - Commit message validation

```mermaid
graph TD
    A[Development Process] -->|Write Code| B[Local Tests]
    B -->|Commit Code| C[Pre-commit Hook]
    C -->|Run Linting| D{Linting Passes?}
    D -->|No| E[Fix Linting Issues]
    E --> C
    D -->|Yes| F[Format Code]
    F --> G[Commit Accepted]
    G -->|Push Code| H[Pre-push Hook]
    H -->|Run Unit Tests| I{Tests Pass?}
    I -->|No| J[Fix Failing Tests]
    J --> H
    I -->|Yes| K[Push Accepted]
    K --> L[CI Pipeline]
    L -->|Run All Tests| M{All Tests Pass?}
    M -->|No| N[Fix Issues]
    N --> A
    M -->|Yes| O[Deploy]
```

### Test Directory Structure

```
/tests
├── /unit
│   ├── /frontend
│   │   ├── /components
│   │   ├── /services
│   │   └── /utils
│   └── /backend
│       ├── /controllers
│       ├── /models
│       └── /services
├── /integration
│   ├── /api
│   ├── /components
│   └── /database
└── /e2e
    ├── /admin
    └── /public
```

## Error Handling

1. **Frontend Error Handling**

   - Global error boundary for React components
   - API request error handling with user-friendly messages
   - Form validation error display

2. **Backend Error Handling**

   - Structured error responses with HTTP status codes
   - Detailed logging for debugging
   - Graceful fallbacks for database connection issues

3. **Error Response Format**

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "User-friendly error message",
    "details": "Technical details (admin only)"
  }
}
```

## Implementation Methodology

To ensure a successful implementation of this project, we will follow the Ripper Five Optimized methodology, which is an adaptive development protocol specifically designed for complex software projects. This methodology combines Agile principles with structured batch-based development and clear mode transitions:

1. **Ripper Five Development Modes**

   - **Research Mode**: Information gathering and project understanding
   - **Innovate Mode**: Brainstorming potential approaches and solutions
   - **Plan Mode**: Creating technical specifications in manageable batches
   - **Code Mode**: Writing or modifying actual code based on approved plans
   - **Execute Mode**: Testing, verifying, and validating implemented changes

2. **Batch-Based Implementation Strategy**

   - Implement features in small, manageable batches (3-5 items per batch)
   - Use layer-based batching (foundation → logic → interface → integration)
   - Clear pause points between batches for review and approval
   - Adaptive batch sizing based on task complexity

3. **Global Operating Principles**

   - **Project Awareness**: Always reference project documentation before starting work
   - **Code Structure**: Limit files to 500 lines maximum and organize in clear modules
   - **Testing**: Create unit tests for all new functionality with expected, edge, and failure cases
   - **Task Management**: Track task completion and document new discoveries
   - **Documentation**: Maintain clear comments and update documentation with changes

4. **Technology-Specific Adaptations**

   - **Frontend**: Components → State → Routing → Integration
   - **Backend**: Models → Controllers → Services → Middleware
   - **Full-Stack**: Backend foundation → Frontend → Integration → Deployment

5. **Quality Assurance Integration**

   - Implement pre-commit and pre-push hooks for code quality checks
   - Maintain comprehensive test coverage across all system components
   - Regular code reviews with clear acceptance criteria
   - Continuous integration to validate all changes

### Implementation Phases

The implementation will follow these phases to ensure steady progress and early validation:

```mermaid
graph TD
    A[Phase 1: Foundation] -->|Complete| B[Phase 2: Core Features]
    B -->|Complete| C[Phase 3: Advanced Features]
    C -->|Complete| D[Phase 4: Optimization]
    D -->|Complete| E[Phase 5: Deployment]

    subgraph "Phase 1: Foundation"
    A1[Project Setup]
    A2[Architecture Implementation]
    A3[CI/CD Pipeline]
    A4[Basic Authentication]
    end

    subgraph "Phase 2: Core Features"
    B1[Content Models]
    B2[Basic CRUD Operations]
    B3[Frontend Routing]
    B4[Admin Dashboard]
    end

    subgraph "Phase 3: Advanced Features"
    C1[Rich Text Editing]
    C2[Media Management]
    C3[Form Processing]
    C4[SEO Features]
    end

    subgraph "Phase 4: Optimization"
    D1[Performance Tuning]
    D2[Accessibility]
    D3[Security Hardening]
    D4[Cross-browser Testing]
    end

    subgraph "Phase 5: Deployment"
    E1[Production Build]
    E2[GoDaddy Configuration]
    E3[Data Migration]
    E4[Launch Verification]
    end

    A --> A1
    A --> A2
    A --> A3
    A --> A4
    B --> B1
    B --> B2
    B --> B3
    B --> B4
    C --> C1
    C --> C2
    C --> C3
    C --> C4
    D --> D1
    D --> D2
    D --> D3
    D --> D4
    E --> E1
    E --> E2
    E --> E3
    E --> E4
```

### Quality Assurance Strategy

To maintain high quality throughout the implementation:

1. **Automated Testing**

   - Unit tests for business logic and components
   - Integration tests for API endpoints and data flow
   - End-to-end tests for critical user journeys
   - Visual regression tests for UI components

2. **Code Quality Tools**

   - ESLint and Prettier for JavaScript/TypeScript
   - PHP CodeSniffer for PHP code
   - SonarQube for static code analysis
   - Husky for pre-commit and pre-push hooks

3. **Performance Monitoring**

   - Lighthouse audits for frontend performance
   - New Relic or similar for backend monitoring
   - Core Web Vitals tracking
   - Regular performance review sessions

4. **Security Practices**
   - Regular dependency vulnerability scanning
   - OWASP security checklist implementation
   - Penetration testing before launch
   - Data validation at all system boundaries

## Deployment Strategy

1. **Build Process**

   - React application bundling with optimization
   - Asset minification and compression
   - Environment-specific configuration
   - Tree-shaking and code splitting for optimal bundle size

2. **GoDaddy Deployment**

   - PHP configuration for GoDaddy environment
   - Database setup and migration scripts
   - Static asset deployment strategy
   - Rollback procedures for emergency situations

3. **Maintenance Considerations**
   - Automated backup procedures
   - Documented update mechanisms
   - Comprehensive performance monitoring
   - User feedback collection system

### Deployment Flow

```mermaid
graph TD
    A[Development] -->|Code Complete| B[Build Process]
    B -->|Generate Assets| C[Test Build]
    C -->|Verify| D{Build OK?}
    D -->|No| E[Fix Build Issues]
    E --> B
    D -->|Yes| F[Deploy to Staging]
    F -->|Test| G{Tests Pass?}
    G -->|No| H[Fix Issues]
    H --> A
    G -->|Yes| I[Deploy to Production]
    I -->|Configure| J[GoDaddy Environment]
    J -->|Verify| K[Post-Deployment Tests]
    K -->|Monitor| L[Performance Metrics]
```

## Security Considerations

1. **Authentication Security**

   - Secure password hashing
   - Session management
   - CSRF protection

2. **Data Security**

   - Input validation and sanitization
   - SQL injection prevention
   - XSS protection

3. **File Upload Security**
   - File type validation
   - Size limitations
   - Malware scanning

### Security Implementation

```mermaid
graph TD
    A[User Input] -->|Validate| B{Valid?}
    B -->|No| C[Return Error]
    B -->|Yes| D[Sanitize Input]
    D -->|Process| E[Business Logic]
    E -->|Access| F{Authorization Check}
    F -->|Denied| G[Return 403]
    F -->|Granted| H[Execute Operation]
    H -->|Log| I[Audit Trail]

    J[File Upload] -->|Scan| K{Malware Check}
    K -->|Infected| L[Reject File]
    K -->|Clean| M[Validate Type]
    M -->|Invalid| N[Reject File]
    M -->|Valid| O[Process File]
    O -->|Store| P[Secure Storage]
```

## Performance Optimization

1. **Frontend Optimization**

   - Code splitting
   - Lazy loading of components
   - Image optimization

2. **Backend Optimization**

   - Database query optimization
   - Caching strategies
   - API response optimization

3. **Asset Delivery**
   - CDN integration where possible
   - Browser caching configuration
   - Compressed asset delivery

### Performance Monitoring

```mermaid
graph TD
    A[User Request] -->|Measure| B[Response Time]
    B -->|Log| C[Performance Metrics]
    C -->|Analyze| D{Performance Issue?}
    D -->|Yes| E[Identify Bottleneck]
    E -->|Fix| F[Implement Optimization]
    F --> A
    D -->|No| G[Continue Monitoring]

    H[Page Load] -->|Track| I[Core Web Vitals]
    I -->|Analyze| J{Meet Targets?}
    J -->|No| K[Optimize Frontend]
    K --> H
    J -->|Yes| L[Monitor Changes]
```
