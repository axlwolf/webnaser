# Especificaciones API - Grupo Naser CMS

Este documento define las especificaciones detalladas de la API RESTful para el CMS de Grupo Naser, estableciendo el contrato entre el frontend (Claude) y el backend (Gemini).

## 📊 Estado Actual de las APIs

**Última verificación**: 1 de agosto de 2025  
**Estado general**: 🟢 **FUNCIONAL** - Estructura base implementada y operativa  
**Integración Admin Dashboard**: 🔄 **EN PROGRESO** - Qwen trabajando en integración completa  
**Backend Developer**: Gemini (Batch 3) - 5/8 tareas completadas (62.5%)  
**Admin Dashboard Developer**: Qwen (Batch 1) - 0/8 tareas completadas, trabajando activamente

## Convenciones Generales

### Base URL

```
/api/v1
```

### Formato de Respuesta Estándar

#### Respuesta Exitosa

```json
{
  "success": true,
  "data": {
    /* datos específicos del endpoint */
  },
  "message": "Operación exitosa",
  "timestamp": "2025-07-18T10:30:00-06:00"
}
```

#### Respuesta de Error

```json
{
  "success": false,
  "error": "validation_error", // código de error
  "message": "Datos inválidos",
  "violations": {
    "email": "El email es obligatorio",
    "password": "La contraseña debe tener al menos 6 caracteres"
  },
  "timestamp": "2025-07-18T10:30:00-06:00"
}
```

### Códigos de Estado HTTP

- **200 OK**: Solicitud exitosa
- **201 Created**: Recurso creado exitosamente
- **204 No Content**: Solicitud exitosa sin contenido de respuesta
- **400 Bad Request**: Error de validación o solicitud incorrecta
- **401 Unauthorized**: Autenticación requerida o inválida
- **403 Forbidden**: Autenticado pero sin permisos

### Admin Dashboard Integration

**Nota**: Todos los endpoints existentes son compatibles con el Admin Dashboard desarrollado por Qwen. Los endpoints de administración requieren autenticación JWT y permisos específicos según el rol del usuario.

**Configuración de Proxy**: El Admin Dashboard (puerto 3001) utiliza proxy automático hacia la API (puerto 8000) para todas las rutas `/api/*`.

**Documentación DevOps**: Ver `docs/ADMIN-DASHBOARD-CONFIG.md` para configuración técnica del admin dashboard.

### Performance y Optimización

#### Métricas de Performance

Todos los endpoints incluyen métricas de performance en los headers de respuesta:

```http
X-Response-Time: 0.245ms
X-Memory-Usage: 2.1MB
X-Query-Count: 3
X-Cache-Status: HIT|MISS
```

#### Límites de Rate Limiting

- **Endpoints públicos**: 100 requests/minuto por IP
- **Endpoints autenticados**: 1000 requests/minuto por usuario
- **Endpoints de administración**: 500 requests/minuto por usuario

#### Optimizaciones Implementadas

- **OPcache**: Habilitado para mejor performance de PHP
- **Query Optimization**: Índices optimizados para consultas frecuentes
- **Response Caching**: Cache de respuestas para endpoints de solo lectura
- **Compression**: Compresión gzip habilitada para todas las respuestas

#### Endpoint de Health Check

```http
GET /api/v1/health
```

**Respuesta Actual (Implementada):**

```json
{
  "status": "healthy",
  "timestamp": "2025-08-01T10:30:00-06:00",
  "service": "Grupo Naser API",
  "message": "Backend funcionando correctamente"
}
```

**Respuesta Futura (Planificada):**

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "database": "connected",
    "cache": "operational",
    "memory_usage": "45%",
    "response_time": "0.123ms",
    "infrastructure": {
      "apache_status": "healthy",
      "php_version": "8.2",
      "opcache_enabled": true,
      "docker_container": "running"
    }
  },
  "timestamp": "2025-08-01T10:30:00-06:00"
}
```

**Respuesta en caso de problemas críticos:**

```json
{
  "success": false,
  "data": {
    "status": "critical",
    "database": "connected",
    "cache": "operational",
    "memory_usage": "85%",
    "response_time": "2.456ms",
    "infrastructure": {
      "apache_status": "redirect_loop_detected",
      "php_version": "8.2",
      "opcache_enabled": true,
      "docker_container": "unhealthy"
    },
    "critical_issues": [
      "Apache redirection loop detected",
      "High memory usage (>80%)",
      "Slow response time (>2s)"
    ]
  },
  "timestamp": "2025-07-25T10:30:00-06:00"
}
```

**Test Endpoint Adicional:**

```http
GET /api/v1/test
```

**Respuesta:**

```json
{
  "status": "success",
  "message": "Test endpoint funcionando",
  "timestamp": "2025-08-01T10:30:00-06:00"
}
```

**Uso para diagnóstico crítico:**
Este endpoint es utilizado por los scripts de resolución crítica (`fix-apache-backend.sh`) para validar el estado del sistema antes y después de aplicar correcciones.

- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error del servidor

### Autenticación

- Basada en JWT (JSON Web Tokens)
- Token enviado en header: `Authorization: Bearer {token}`
- Tiempo de expiración: 24 horas

## Endpoints API

### 1. Autenticación (`/api/v1/auth`)

#### Login

- **Estado**: Implementado
- **URL**: `/auth/login`
- **Método**: `POST`
- **Descripción**: Autenticar usuario y obtener token JWT
- **Requiere Auth**: No
- **Cuerpo de la Solicitud**:
  ```json
  {
    "email": "admin@naser.com.mx",
    "password": "contraseña_segura"
  }
  ```
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": 1,
        "name": "Administrador",
        "email": "admin@naser.com.mx",
        "role": "admin"
      }
    },
    "message": "Inicio de sesión exitoso",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```
- **Respuesta de Error** (401 Unauthorized):
  ```json
  {
    "success": false,
    "error": "authentication_failed",
    "message": "Credenciales inválidas",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Logout

- **Estado**: Implementado
- **URL**: `/auth/logout`
- **Método**: `POST`
- **Descripción**: Invalidar token JWT actual
- **Requiere Auth**: Sí
- **Respuesta Exitosa** (204 No Content)

#### Refresh Token

- **Estado**: Implementado
- **URL**: `/auth/refresh`
- **Método**: `POST`
- **Descripción**: Renovar token JWT expirado
- **Requiere Auth**: Sí (token expirado)
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "message": "Token renovado exitosamente",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Usuario Actual

- **Estado**: Implementado
- **URL**: `/auth/me`
- **Método**: `GET`
- **Descripción**: Obtener información del usuario autenticado
- **Requiere Auth**: Sí
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "Administrador",
      "email": "admin@naser.com.mx",
      "role": "admin",
      "last_login": "2025-07-17T15:30:00-06:00"
    },
    "message": "Información de usuario obtenida",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

### 2. Páginas (`/api/v1/pages`)

#### Listar Páginas

- **Estado**: Implementado
- **URL**: `/pages`
- **Método**: `GET`
- **Descripción**: Obtener listado de páginas
- **Requiere Auth**: Sí (para admin), No (para públicas)
- **Parámetros Query**:
  - `page` (int, opcional): Número de página, default 1
  - `limit` (int, opcional): Elementos por página, default 10
  - `status` (string, opcional): Filtrar por estado ('published', 'draft')
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "items": [
        {
          "id": 1,
          "title": "Inicio",
          "slug": "inicio",
          "status": "published",
          "meta_title": "Grupo Naser - Servicios Funerarios",
          "updated_at": "2025-06-15T10:30:00-06:00"
        }
        // más páginas...
      ],
      "pagination": {
        "current_page": 1,
        "per_page": 10,
        "total_items": 25,
        "total_pages": 3
      }
    },
    "message": "Páginas obtenidas exitosamente",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Obtener Página

- **Estado**: Implementado
- **URL**: `/pages/{id}`
- **Método**: `GET`
- **Descripción**: Obtener detalle de una página específica
- **Requiere Auth**: Sí (para admin/draft), No (para públicas)
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "title": "Inicio",
      "slug": "inicio",
      "content": "<h1>Bienvenidos a Grupo Naser</h1><p>Contenido...</p>",
      "meta_title": "Grupo Naser - Servicios Funerarios",
      "meta_description": "Servicios funerarios de calidad en México",
      "status": "published",
      "created_at": "2025-01-15T10:30:00-06:00",
      "updated_at": "2025-06-15T10:30:00-06:00"
    },
    "message": "Página obtenida exitosamente",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Crear Página

- **Estado**: Implementado
- **URL**: `/pages`
- **Método**: `POST`
- **Descripción**: Crear nueva página
- **Requiere Auth**: Sí (admin)
- **Cuerpo de la Solicitud**:
  ```json
  {
    "title": "Nueva Página",
    "slug": "nueva-pagina",
    "content": "<h1>Contenido de la nueva página</h1>",
    "meta_title": "Nueva Página - Grupo Naser",
    "meta_description": "Descripción para SEO",
    "status": "draft"
  }
  ```
- **Respuesta Exitosa** (201 Created):
  ```json
  {
    "success": true,
    "data": {
      "id": 5,
      "title": "Nueva Página",
      "slug": "nueva-pagina",
      "content": "<h1>Contenido de la nueva página</h1>",
      "meta_title": "Nueva Página - Grupo Naser",
      "meta_description": "Descripción para SEO",
      "status": "draft",
      "created_at": "2025-07-18T10:30:00-06:00",
      "updated_at": "2025-07-18T10:30:00-06:00"
    },
    "message": "Página creada exitosamente",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Actualizar Página

- **Estado**: Implementado
- **URL**: `/pages/{id}`
- **Método**: `PUT`
- **Descripción**: Actualizar página existente
- **Requiere Auth**: Sí (admin)
- **Cuerpo de la Solicitud**: (similar a crear, campos opcionales)
- **Respuesta Exitosa** (200 OK): (similar a obtener página)

#### Eliminar Página

- **Estado**: Implementado
- **URL**: `/pages/{id}`
- **Método**: `DELETE`
- **Descripción**: Eliminar página
- **Requiere Auth**: Sí (admin)
- **Respuesta Exitosa** (204 No Content)

### 3. Servicios (`/api/v1/services`)

#### Listar Servicios

- **Estado**: Implementado
- **URL**: `/services`
- **Método**: `GET`
- **Descripción**: Obtener listado de servicios funerarios
- **Requiere Auth**: No
- **Parámetros Query**:
  - `page` (int, opcional): Número de página, default 1
  - `limit` (int, opcional): Elementos por página, default 10
  - `status` (string, opcional): Filtrar por estado ('active', 'inactive')
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "items": [
        {
          "id": 1,
          "name": "Servicio Básico",
          "short_description": "Servicio funerario básico con todo lo necesario",
          "image_url": "/uploads/services/basic.jpg",
          "price": 15000.0,
          "status": "active"
        }
        // más servicios...
      ],
      "pagination": {
        "current_page": 1,
        "per_page": 10,
        "total_items": 5,
        "total_pages": 1
      }
    },
    "message": "Servicios obtenidos exitosamente",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Obtener Servicio

- **Estado**: Implementado
- **URL**: `/services/{id}`
- **Método**: `GET`
- **Descripción**: Obtener detalle de un servicio específico
- **Requiere Auth**: No
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "Servicio Básico",
      "short_description": "Servicio funerario básico con todo lo necesario",
      "description": "<p>Descripción detallada del servicio básico...</p>",
      "image_url": "/uploads/services/basic.jpg",
      "price": 15000.0,
      "features": [
        "Ataúd básico",
        "Traslado",
        "Preparación del cuerpo",
        "Sala de velación por 24 horas"
      ],
      "status": "active",
      "created_at": "2025-01-15T10:30:00-06:00",
      "updated_at": "2025-06-15T10:30:00-06:00"
    },
    "message": "Servicio obtenido exitosamente",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Crear/Actualizar/Eliminar Servicio

- Similar a los endpoints de páginas, con campos específicos para servicios

### 4. Ubicaciones (`/api/v1/locations`)

#### Listar Ubicaciones

- **Estado**: Implementado
- **URL**: `/locations`
- **Método**: `GET`
- **Descripción**: Obtener listado de sucursales
- **Requiere Auth**: No
- **Parámetros Query**:
  - `page` (int, opcional): Número de página, default 1
  - `limit` (int, opcional): Elementos por página, default 10
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "items": [
        {
          "id": 1,
          "name": "Sucursal Aragón",
          "address": "Av. Aragón 123, Ciudad de México",
          "phone": "55-1234-5678",
          "email": "aragon@naser.com.mx",
          "latitude": 19.4326,
          "longitude": -99.1332
        }
        // más ubicaciones...
      ],
      "pagination": {
        "current_page": 1,
        "per_page": 10,
        "total_items": 3,
        "total_pages": 1
      }
    },
    "message": "Ubicaciones obtenidas exitosamente",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Obtener/Crear/Actualizar/Eliminar Ubicación

- **Estado**: Implementado
- Similar a los endpoints anteriores, con campos específicos para ubicaciones

### 5. Contactos (`/api/v1/contacts`)

#### Enviar Formulario de Contacto

- **Estado**: Implementado
- **URL**: `/contacts`
- **Método**: `POST`
- **Descripción**: Enviar formulario de contacto
- **Requiere Auth**: No
- **Cuerpo de la Solicitud**:
  ```json
  {
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "phone": "5512345678",
    "subject": "Información sobre servicios",
    "message": "Me gustaría obtener más información sobre sus servicios de previsión."
  }
  ```
- **Respuesta Exitosa** (201 Created):
  ```json
  {
    "success": true,
    "data": {
      "id": 123,
      "reference": "CONT-20250718-123"
    },
    "message": "Formulario enviado exitosamente. Nos pondremos en contacto pronto.",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Listar/Obtener/Actualizar Contactos (Admin)

- **Estado**: Implementado
- Endpoints similares a los anteriores, solo accesibles para administradores

### 6. Medios (`/api/v1/media`)

#### Subir Archivo

- **Estado**: Implementado
- **URL**: `/media`
- **Método**: `POST`
- **Descripción**: Subir archivo de imagen u otro medio
- **Requiere Auth**: Sí (admin)
- **Cuerpo de la Solicitud**: `multipart/form-data` con campo `file`
- **Respuesta Exitosa** (201 Created):
  ```json
  {
    "success": true,
    "data": {
      "id": 42,
      "filename": "5f8d3a1b2c.jpg",
      "original_filename": "imagen.jpg",
      "mime_type": "image/jpeg",
      "size": 153284,
      "url": "/uploads/media/5f8d3a1b2c.jpg",
      "thumbnail_url": "/uploads/media/thumbnails/5f8d3a1b2c.jpg",
      "created_at": "2025-07-18T10:30:00-06:00"
    },
    "message": "Archivo subido exitosamente",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Listar/Obtener/Eliminar Medios

- **Estado**: Implementado
- Endpoints similares a los anteriores, para gestión de archivos multimedia

### 7. AI/ML Services (`/api/v1/ai`) - Qwen Batch 1

**Estado**: 🚀 Iniciado - 0/8 tareas completadas  
**Especialista**: Qwen (Admin Dashboard + CMS Interface Developer)  
**Documentación Técnica**: `docs/ADMIN-DASHBOARD.md`  
**Valor Diferencial**: Panel de administración especializado para servicios funerarios con gestión completa de contenido, usuarios y configuraciones

#### Sistema de Recomendaciones Inteligentes

- **URL**: `/ai/recommendations`
- **Método**: `POST`
- **Descripción**: Obtener recomendaciones personalizadas de servicios basadas en ML
- **Requiere Auth**: No
- **Cuerpo de la Solicitud**:
  ```json
  {
    "user_profile": {
      "age_range": "45-65",
      "location": "tlalpan",
      "budget_range": "15000-25000",
      "previous_services": ["prevision_basic"],
      "family_size": 4
    },
    "service_type": "prevision",
    "urgency": "low",
    "context": {
      "referral_source": "website",
      "session_behavior": ["viewed_services", "compared_prices"]
    }
  }
  ```
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "recommendations": [
        {
          "service_id": 3,
          "service_name": "Previsión Premium",
          "confidence_score": 0.92,
          "reasons": [
            "Coincide con tu rango de edad",
            "Disponible en tu ubicación",
            "Dentro de tu presupuesto",
            "Clientes similares eligieron este servicio"
          ],
          "estimated_price": 18500.0,
          "savings_potential": 2500.0,
          "location_match": "naser_tlalpan"
        }
      ],
      "personalization_factors": [
        "demographic_match",
        "location_preference",
        "budget_alignment",
        "behavioral_similarity"
      ],
      "alternative_options": [
        {
          "service_id": 2,
          "service_name": "Previsión Básica",
          "confidence_score": 0.78,
          "estimated_price": 12000.0
        }
      ]
    },
    "message": "Recomendaciones generadas exitosamente",
    "timestamp": "2025-07-31T10:30:00-06:00"
  }
  ```

#### Chatbot Inteligente

- **URL**: `/ai/chatbot`
- **Método**: `POST`
- **Descripción**: Procesar mensaje del chatbot especializado
- **Requiere Auth**: No
- **Cuerpo de la Solicitud**:
  ```json
  {
    "message": "Necesito ayuda urgente, falleció mi padre",
    "context": {
      "conversation_id": "conv_123",
      "user_location": "cdmx",
      "previous_messages": []
    }
  }
  ```
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "response": "Lamento mucho su pérdida. Entiendo que necesita ayuda inmediata. Nuestro equipo especializado puede asistirle las 24 horas. ¿Me permite conectarle con un asesor ahora mismo?",
      "intent": "emergency_assistance",
      "sentiment": "grief_urgent",
      "actions": [
        {
          "type": "escalate_to_human",
          "priority": "high",
          "department": "emergency_services"
        }
      ],
      "suggested_services": [
        {
          "service_id": 1,
          "name": "Necesidad Inmediata",
          "urgency": "critical"
        }
      ]
    },
    "message": "Mensaje procesado con detección de urgencia",
    "timestamp": "2025-07-31T10:30:00-06:00"
  }
  ```

#### Análisis Predictivo

- **URL**: `/ai/predictions/demand`
- **Método**: `GET`
- **Descripción**: Obtener predicciones de demanda
- **Requiere Auth**: Sí (admin)
- **Parámetros Query**:
  - `location` (string): Ubicación específica
  - `service_type` (string): Tipo de servicio
  - `time_horizon` (string): Horizonte temporal (week, month, quarter)
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "predictions": [
        {
          "period": "2025-08-01",
          "location": "tlalpan",
          "service_type": "prevision",
          "predicted_demand": 15,
          "confidence_interval": [12, 18],
          "factors": [
            "seasonal_trend",
            "demographic_growth",
            "marketing_campaign_effect"
          ]
        }
      ],
      "recommendations": [
        "Incrementar inventario de ataúdes básicos en 20%",
        "Programar personal adicional para primera semana de agosto"
      ]
    },
    "message": "Predicciones generadas exitosamente",
    "timestamp": "2025-07-31T10:30:00-06:00"
  }
  ```

#### Analytics Dashboard

- **URL**: `/ai/analytics/insights`
- **Método**: `GET`
- **Descripción**: Obtener insights automáticos del negocio
- **Requiere Auth**: Sí (admin)
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "insights": [
        {
          "type": "trend_alert",
          "title": "Aumento en demanda de cremaciones",
          "description": "La demanda de cremaciones aumentó 15% este mes comparado con el anterior",
          "impact": "high",
          "action_required": true,
          "recommendations": [
            "Revisar capacidad de crematorio",
            "Actualizar precios si es necesario"
          ]
        }
      ],
      "kpis": {
        "conversion_rate": 0.23,
        "average_service_value": 18500.0,
        "customer_satisfaction": 4.7,
        "response_time_hours": 2.3
      },
      "anomalies": [
        {
          "metric": "website_visits",
          "expected": 1200,
          "actual": 1850,
          "deviation": "+54%",
          "possible_causes": ["viral_social_media", "news_mention"]
        }
      ]
    },
    "message": "Insights generados exitosamente",
    "timestamp": "2025-07-31T10:30:00-06:00"
  }
  ```

## Códigos de Error

| Código                  | Descripción                    |
| ----------------------- | ------------------------------ |
| `authentication_failed` | Credenciales inválidas         |
| `token_expired`         | Token JWT expirado             |
| `token_invalid`         | Token JWT inválido             |
| `unauthorized`          | No autorizado para esta acción |
| `validation_error`      | Error de validación de datos   |
| `resource_not_found`    | Recurso no encontrado          |
| `resource_exists`       | El recurso ya existe           |
| `server_error`          | Error interno del servidor     |

## Validación de Datos

### Reglas Comunes

- **Email**: Formato válido, máximo 100 caracteres
- **Contraseña**: Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
- **Nombres**: Máximo 100 caracteres, sin caracteres especiales
- **Teléfono**: Formato mexicano (10 dígitos)
- **Slug**: Solo letras minúsculas, números y guiones, sin espacios

### Mensajes de Error

Todos los mensajes de error deben estar en español mexicano (es-MX):

```php
$errorMessages = [
    'required' => 'Este campo es obligatorio',
    'email' => 'Ingresa un email válido',
    'min' => 'Este campo debe tener al menos :min caracteres',
    'max' => 'Este campo no puede tener más de :max caracteres',
    'unique' => 'Este valor ya existe',
    'numeric' => 'Este campo debe ser un número',
    'date' => 'Este campo debe ser una fecha válida',
    'url' => 'Este campo debe ser una URL válida',
    'unauthorized' => 'No tienes permisos para realizar esta acción',
    'not_found' => 'El recurso solicitado no fue encontrado',
    'server_error' => 'Error del servidor. Inténtalo más tarde.',
];
```

## Consideraciones de Infraestructura

### Problemas Críticos y Resolución

La API incluye mecanismos para detectar y reportar problemas críticos de infraestructura:

#### Detección de Problemas Apache

- **Redirección Infinita**: El endpoint `/health` detecta bucles de redirección
- **Configuración .htaccess**: Validación automática de reglas de reescritura
- **Estado del Contenedor**: Monitoreo del estado del contenedor Docker

#### Compatibilidad ARM64

- **Arquitectura**: Soporte completo para Mac M1/M2 (ARM64)
- **Dependencias**: Configuración específica para módulos nativos
- **Docker**: Imágenes multi-arquitectura disponibles

#### Scripts de Resolución Automática

El proyecto incluye un **ecosistema completo de herramientas DevOps** desarrollado por Warp para mantener la estabilidad de la API:

```bash
# Verificar salud de la API
curl -f http://localhost:8000/api/v1/health

# Herramientas de Restauración Crítica (Warp)
./fixes/critical/restore-backend.sh        # ⭐ CRÍTICO - Restaura backend ante cambios conflictivos
./fixes/critical/fix-apache-backend.sh     # Resolver problemas Apache automáticamente
./fixes/critical/fix-apache-final.sh       # Enfoque alternativo para Apache

# Validación y Monitoreo
./scripts/emergency/validate-fixes.sh      # Validar correcciones aplicadas
./scripts/emergency/health-check-critical.sh # Verificación de salud crítica
./scripts/testing/continuous-monitoring.sh # Monitoreo continuo 24/7

# Performance y Optimización
./scripts/performance/analyze-performance.sh # Análisis completo de performance API
./scripts/performance/monitor-metrics.sh     # Monitoreo en tiempo real
```

#### Configuración de Producción

- **OPcache**: Habilitado para mejor performance
- **Apache**: Configuración optimizada para GoDaddy hosting
- **PHP**: Configuración de producción con logs de error
- **Headers de Seguridad**: Configurados automáticamente

### Monitoreo y Alertas

#### Métricas Críticas

- **Tiempo de Respuesta**: >2s genera alerta
- **Uso de Memoria**: >80% genera alerta
- **Estado de Contenedores**: Unhealthy genera alerta crítica
- **Errores HTTP 500**: >5 por minuto genera alerta

#### Logs de Infraestructura

```bash
# Logs de Apache
docker logs naser_backend --tail=50

# Logs de PHP
docker exec naser_backend tail -f /var/log/php_errors.log

# Logs críticos consolidados (Warp)
tail -f logs/critical/backend-error.log
tail -f logs/critical/apache-fix.log
tail -f logs/critical/restoration.log

# Reportes de performance automáticos
ls -la reports/performance/*/performance-report.md

# Logs de testing continuo
tail -f logs/testing/continuous-monitoring.log
```

#### Herramientas de Contribución Adicional (Warp)

Warp ha desarrollado herramientas adicionales que van más allá de las tareas asignadas:

- **15 archivos creados** con ~4,400 líneas de código
- **Sistema completo de emergencia y restauración**
- **Suite de testing automatizado**
- **Análisis de performance en tiempo real**
- **Monitoreo continuo 24/7**

```bash
# Registrar nueva contribución de Warp
./scripts/warp-log-contribution.sh "Descripción" "archivo" "propósito"

# Ver todas las contribuciones adicionales
cat WARP-CONTRIBUTIONS-LOG.md
```

## Consideraciones de Seguridad

### Protección CSRF

- Tokens CSRF para formularios públicos
- Validación de origen de solicitud

### Limitación de Tasa

- Máximo 60 solicitudes por minuto para endpoints públicos
- Máximo 300 solicitudes por minuto para endpoints autenticados

### Validación de Archivos

- Tipos permitidos: jpg, jpeg, png, gif, pdf
- Tamaño máximo: 5MB
- Escaneo de malware

### Sanitización de Datos

- Todos los inputs deben ser sanitizados
- HTML permitido solo en campos específicos (content)

## 🎛️ Admin Dashboard Integration

### Admin Dashboard Implementation (Qwen - Batch 1)

**Estado Actual**: 🚀 Iniciado - 0/8 tareas completadas  
**Documentación**: `docs/ADMIN-DASHBOARD.md` - Especificaciones técnicas completas  
**Prompt Actualizado**: `PROMPT-QWEN-BATCH-1-ADMIN-DASHBOARD.md` - Instrucciones refinadas y actualizadas

### 📊 Metodología de Desarrollo

**Análisis de Prompts**: El proyecto ha implementado un análisis comparativo de metodologías de prompts (JSON vs Lenguaje Natural) documentado en `ANALISIS-PROMPTS-JSON-VS-NATURAL.md`.

**Enfoque Híbrido Recomendado**:

- **Mantener**: Especificaciones API en Markdown para contexto rico
- **Agregar**: Metadata JSON para validación automática de endpoints
- **Evolucionar**: Hacia documentación híbrida con schemas JSON Schema para validación

**Impacto en APIs**:

- Documentación más estructurada y parseable
- Validación automática de contratos API
- Mejor integración con herramientas de testing automatizado

**Endpoints Específicos para Admin Dashboard**:

#### Dashboard Metrics

- **URL**: `/admin/dashboard/metrics`
- **Método**: `GET`
- **Descripción**: Obtener métricas del dashboard administrativo
- **Requiere Auth**: Sí (admin)
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "pages": {
        "total": 13,
        "published": 10,
        "drafts": 3,
        "recentlyUpdated": [...]
      },
      "services": {
        "total": 8,
        "byCategory": {
          "prevision": 3,
          "necesidad_inmediata": 2,
          "cremacion": 2,
          "traslados": 1
        },
        "featured": [...],
        "mostRequested": [...]
      },
      "locations": {
        "total": 4,
        "active": 4,
        "servicesPerLocation": {
          "tlalpan": 8,
          "morelos": 6,
          "oaxaca": 5,
          "aragon": 7
        }
      },
      "system": {
        "diskUsage": 45.2,
        "memoryUsage": 67.8,
        "uptime": "15 días, 3 horas",
        "lastBackup": "2025-07-31T02:00:00-06:00",
        "apiResponseTime": 0.245
      },
      "business": {
        "monthlyInquiries": 156,
        "conversionRate": 0.23,
        "averageServiceValue": 18500.0,
        "customerSatisfaction": 4.7
      }
    },
    "message": "Métricas del dashboard obtenidas exitosamente",
    "timestamp": "2025-07-31T10:30:00-06:00"
  }
  ```

#### Recent Activity

- **URL**: `/admin/dashboard/activity`
- **Método**: `GET`
- **Descripción**: Obtener actividad reciente del sistema
- **Requiere Auth**: Sí (admin)
- **Parámetros Query**:
  - `limit` (int, opcional): Número de actividades, default 20
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "activities": [
        {
          "id": 1,
          "type": "page_updated",
          "description": "Página 'Servicios' actualizada",
          "user": "Admin Usuario",
          "timestamp": "2025-07-31T09:15:00-06:00",
          "metadata": {
            "page_id": 3,
            "changes": ["content", "meta_description"]
          }
        },
        {
          "id": 2,
          "type": "service_created",
          "description": "Nuevo servicio 'Previsión Premium' creado",
          "user": "Editor Usuario",
          "timestamp": "2025-07-31T08:30:00-06:00",
          "metadata": {
            "service_id": 9,
            "category": "prevision"
          }
        }
      ]
    },
    "message": "Actividad reciente obtenida exitosamente",
    "timestamp": "2025-07-31T10:30:00-06:00"
  }
  ```

#### System Status

- **URL**: `/admin/system/status`
- **Método**: `GET`
- **Descripción**: Estado detallado del sistema para administradores
- **Requiere Auth**: Sí (admin)
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "server": {
        "php_version": "8.2.0",
        "mysql_version": "8.0.33",
        "apache_version": "2.4.57",
        "disk_space": {
          "total": "10GB",
          "used": "4.5GB",
          "free": "5.5GB",
          "percentage": 45
        },
        "memory": {
          "total": "2GB",
          "used": "1.4GB",
          "free": "600MB",
          "percentage": 70
        }
      },
      "database": {
        "status": "connected",
        "tables": 12,
        "total_records": 1547,
        "last_backup": "2025-07-31T02:00:00-06:00",
        "size": "45.2MB"
      },
      "cache": {
        "status": "operational",
        "hit_rate": 0.87,
        "memory_usage": "128MB"
      },
      "logs": {
        "error_count_24h": 2,
        "warning_count_24h": 8,
        "last_error": "2025-07-30T14:22:00-06:00"
      }
    },
    "message": "Estado del sistema obtenido exitosamente",
    "timestamp": "2025-07-31T10:30:00-06:00"
  }
  ```

## Frontend Integration Status

### Pixel Perfect Implementation (Claude - Batch 5)

**Estado Actual**: 🟡 Progreso sólido con problemas críticos parcialmente resueltos

**Progreso Detectado**:

**✅ PROBLEMA 1: Configuración TypeScript - RESUELTO**

- ✅ `tsconfig.json` completo implementado en el frontend
- ✅ `vite.config.ts` convertido de JS a TS
- ✅ Paths y aliases configurados correctamente
- ✅ Configuración TypeScript completa

**🔄 PROBLEMA 2: Error CSS - EN PROGRESO**

```
Estructura de estilos creada, importaciones en proceso
```

**✅ Soluciones Implementadas**:

1. ✅ TypeScript configurado correctamente siguiendo estándares de React
2. ✅ Arquitectura de componentes establecida con estructura atómica
3. 🔄 Rutas de importación CSS siendo corregidas en `src/frontend/src/index.css`
4. ✅ Design tokens implementados en `src/frontend/src/styles/tokens.css`
5. ✅ Compatibilidad Docker y desarrollo local asegurada

**Páginas a Implementar** (13 páginas HTML):

- `index.html` → Página principal con hero slider
- `nosotros.html` → Página acerca de nosotros
- `historia.html` → Historia de la empresa
- `servicios.html` → Servicios generales
- `necesidad-inmediata.html` → Servicio de necesidad inmediata
- `prevision.html` → Servicio de previsión
- `obituario.html` → Obituarios
- `contacto.html` → Contacto general
- `cobertura.html` → Cobertura de servicios
- `naser_aragon.html` → Sucursal Aragón
- `naser_morelos.html` → Sucursal Morelos
- `naser_oaxaca.html` → Sucursal Oaxaca
- `naser_tlalpan.html` → Sucursal Tlalpan

**Componentes Prioritarios**:

- Header con sub-header y navegación
- Hero slider cinematográfico
- Secciones de servicios
- Footer completo
- Sistema de routing React

**Criterios de Aceptación**:

- [x] Configuración TypeScript completa (tsconfig.json, archivos TSX)
- [ ] Error CSS resuelto
- [x] Design tokens implementados
- [ ] Header pixel perfect
- [ ] Página principal completa
- [ ] Todas las 13 páginas implementadas
- [ ] Responsive design funcional
- [ ] Testing visual automatizado

### Backend API Implementation (Gemini - Batch 3)

**Estado Actual**: 🟢 Excelente progreso - 62.5% completado

**Progreso Detectado**:

**✅ CONTROLADORES IMPLEMENTADOS**:

- ✅ `AuthController.php` - Sistema de autenticación completo con JWT
- ✅ `ServiceController.php` - CRUD completo para servicios funerarios
- ✅ `LocationController.php` - Gestión de sucursales implementada
- ✅ `PageController.php` - Gestión de páginas CMS
- ✅ `MediaController.php` - Gestión de archivos multimedia
- ✅ `ObituaryController.php` - Gestión de obituarios

**✅ MIDDLEWARE Y SEGURIDAD**:

- ✅ `AuthMiddleware.php` - Middleware de autenticación JWT implementado
- ✅ Sistema de autenticación robusto en funcionamiento

**🔄 PENDIENTE**:

- ❌ Sistema de validación robusto (directorio `api/validators/` faltante)
- 🔄 Testing completo de APIs (estructura establecida, tests en progreso)

**Impacto**: APIs core 80% completadas, backend prácticamente listo para integración frontend

## Herramientas DevOps Adicionales

Para información completa sobre el ecosistema de herramientas DevOps desarrollado por Warp, consultar:

- **`docs/DEVOPS-INFRASTRUCTURE.md`**: Documentación completa de herramientas DevOps
- **`docs/CI-CD-PIPELINE.md`**: Pipeline completo de CI/CD con GitHub Actions
- **`WARP-CONTRIBUTIONS-LOG.md`**: Registro detallado de contribuciones adicionales

**Herramientas Destacadas**:

- **CI/CD Pipeline Completo**: GitHub Actions con testing, security scans y deployment automático
- Sistema de restauración automática de backend
- Suite completa de testing automatizado
- Análisis de performance en tiempo real
- Monitoreo continuo 24/7
- Scripts de resolución crítica

---

**Última actualización**: 31 de julio de 2025  
**Autor**: Kiro (Orquestador)  
**DevOps Infrastructure**: Warp (Specialist)  
**Admin Dashboard**: Qwen (Admin Dashboard + CMS Interface Developer)  
**Para implementación por**: Gemini (Backend) + Claude (Frontend Pixel Perfect) + Qwen (Admin Dashboard)
