# Requirements Document

## Introduction

El sistema de autenticación para el CMS de Grupo Naser proporcionará un mecanismo seguro para que los administradores y editores accedan al panel de administración. Este sistema debe garantizar que solo usuarios autorizados puedan modificar el contenido del sitio web, mientras mantiene un proceso de inicio de sesión sencillo y seguro. La autenticación será implementada utilizando tokens JWT para mantener el estado de la sesión entre el frontend React y el backend PHP.

## Requirements

### Requirement 1: Autenticación de Usuarios

**User Story:** Como administrador del sitio, quiero poder iniciar sesión en el panel de administración utilizando mis credenciales, para poder gestionar el contenido del sitio de manera segura.

#### Acceptance Criteria

1. CUANDO un usuario ingresa credenciales válidas (email y contraseña) ENTONCES el sistema SHALL autenticar al usuario y redirigirlo al panel de administración.
2. CUANDO un usuario ingresa credenciales inválidas ENTONCES el sistema SHALL mostrar un mensaje de error apropiado.
3. CUANDO un usuario intenta acceder al panel de administración sin autenticarse ENTONCES el sistema SHALL redirigirlo a la página de inicio de sesión.
4. CUANDO un usuario autenticado cierra sesión ENTONCES el sistema SHALL invalidar su sesión y redirigirlo a la página de inicio de sesión.
5. CUANDO un usuario permanece inactivo por más de 30 minutos ENTONCES el sistema SHALL cerrar su sesión automáticamente.

### Requirement 2: Gestión de Sesiones

**User Story:** Como usuario autenticado, quiero que mi sesión se mantenga activa mientras uso el sistema, para no tener que iniciar sesión repetidamente durante mi trabajo.

#### Acceptance Criteria

1. CUANDO un usuario se autentica exitosamente ENTONCES el sistema SHALL generar un token JWT con una duración de 2 horas.
2. CUANDO un token JWT está a punto de expirar Y el usuario sigue activo ENTONCES el sistema SHALL renovar automáticamente el token.
3. CUANDO un usuario cierra el navegador Y regresa dentro del período de validez del token ENTONCES el sistema SHALL mantener la sesión activa.
4. CUANDO un usuario accede desde un dispositivo diferente ENTONCES el sistema SHALL permitir mantener sesiones independientes.
5. CUANDO un usuario cambia su contraseña ENTONCES el sistema SHALL invalidar todos los tokens existentes.

### Requirement 3: Roles y Permisos

**User Story:** Como propietario del sitio, quiero que diferentes usuarios tengan diferentes niveles de acceso, para mantener un control adecuado sobre quién puede realizar cambios críticos.

#### Acceptance Criteria

1. CUANDO un usuario con rol de administrador inicia sesión ENTONCES el sistema SHALL otorgar acceso completo a todas las funcionalidades.
2. CUANDO un usuario con rol de editor inicia sesión ENTONCES el sistema SHALL limitar el acceso solo a la gestión de contenido.
3. CUANDO un usuario intenta acceder a una funcionalidad para la que no tiene permisos ENTONCES el sistema SHALL mostrar un mensaje de acceso denegado.
4. CUANDO un administrador crea un nuevo usuario ENTONCES el sistema SHALL permitir asignar un rol específico (administrador o editor).
5. CUANDO un administrador modifica el rol de un usuario ENTONCES el sistema SHALL actualizar los permisos inmediatamente.

### Requirement 4: Seguridad de Autenticación

**User Story:** Como responsable de seguridad, quiero que el sistema implemente medidas de seguridad robustas, para proteger el acceso al CMS contra intentos de intrusión.

#### Acceptance Criteria

1. CUANDO se almacenan contraseñas ENTONCES el sistema SHALL utilizar algoritmos de hash seguros (bcrypt).
2. CUANDO un usuario intenta iniciar sesión múltiples veces sin éxito ENTONCES el sistema SHALL implementar un mecanismo de bloqueo temporal.
3. CUANDO se transmiten credenciales ENTONCES el sistema SHALL utilizar conexiones seguras (HTTPS).
4. CUANDO se genera un token JWT ENTONCES el sistema SHALL incluir información mínima necesaria (ID de usuario, rol, tiempo de expiración).
5. CUANDO un usuario cambia su contraseña ENTONCES el sistema SHALL exigir una contraseña que cumpla con requisitos mínimos de seguridad.

### Requirement 5: Recuperación de Acceso

**User Story:** Como usuario del CMS, quiero poder recuperar el acceso a mi cuenta si olvido mi contraseña, para no perder mi capacidad de gestionar el contenido.

#### Acceptance Criteria

1. CUANDO un usuario solicita restablecer su contraseña ENTONCES el sistema SHALL enviar un correo electrónico con un enlace seguro de un solo uso.
2. CUANDO un usuario accede al enlace de restablecimiento válido ENTONCES el sistema SHALL permitir crear una nueva contraseña.
3. CUANDO un enlace de restablecimiento ha expirado ENTONCES el sistema SHALL mostrar un mensaje apropiado y ofrecer generar un nuevo enlace.
4. CUANDO un usuario restablece su contraseña exitosamente ENTONCES el sistema SHALL confirmar la acción y redirigir a la página de inicio de sesión.
5. CUANDO un usuario intenta usar un enlace de restablecimiento que ya ha sido utilizado ENTONCES el sistema SHALL mostrar un mensaje de error apropiado.
