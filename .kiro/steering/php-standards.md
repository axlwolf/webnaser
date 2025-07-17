---
inclusion: fileMatch
fileMatchPattern: "**/*.php"
---

# PHP Development Standards for Grupo Naser CMS

## Code Structure

- Follow PSR-4 autoloading standard
- Use namespaces for all classes
- Implement MVC pattern where appropriate

## Security

- Always sanitize user input
- Use prepared statements for database queries
- Implement CSRF protection for all forms
- Validate file uploads thoroughly
- Store passwords using password_hash()

## Error Handling

- Use try/catch blocks for error handling
- Log errors but display user-friendly messages
- Never expose sensitive information in error messages

## Database

- Use PDO for database connections
- Implement connection pooling when possible
- Use transactions for related operations

## GoDaddy Compatibility

- Ensure code is compatible with GoDaddy's PHP version (check current version)
- Avoid functions that may be disabled in shared hosting
- Use relative paths for file operations
- Be mindful of memory and execution time limits
