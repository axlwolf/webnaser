# OpenCode conventions for Grupo Naser CMS API

This document outlines the development conventions for this PHP-based API.

## Commands

- **Install/Update Dependencies**: `composer install`
- **Run All Tests**: `./vendor/bin/phpunit` or `composer test`. Inside the project's Docker container, use the `./run-tests.sh` script.
- **Run Specific Test Suite**: `./run-tests.sh --testsuite Unit`
- **Run Single Test by Name**: `./run-tests.sh --filter AuthControllerTest`
- **Lint (CodeSniffer)**: `composer cs`
- **Fix Linting Issues**: `composer cs-fix`
- **Mess Detector**: `composer md`

## Code Style Guidelines

- **Standard**: Follows PSR-12, with a line length limit of 120 characters, as defined in `phpcs.xml`.
- **Naming**:
    - Classes: `PascalCase` (e.g., `UserService`).
    - Methods/Variables: `camelCase` (e.g., `findById`).
    - Interfaces: `PascalCaseInterface` (e.g., `UserRepositoryInterface`).
- **Types**: Use strict types for class properties, method arguments, and return types. Use nullable types (`?string`) where appropriate.
- **Architecture**:
    - **Controllers**: Handle HTTP requests and responses. Keep them lightweight.
    - **Services**: Contain the core business logic, injected into controllers.
    - **Repositories**: Abstract data access logic, injected into services.
    - **Models**: Represent data entities. Use private properties with public getters/setters.
- **Dependency Injection**: Dependencies (like services and repositories) are injected via the constructor.
- **Configuration**: Application configuration should be managed via `config.php` and environment variables, not hardcoded in classes.
