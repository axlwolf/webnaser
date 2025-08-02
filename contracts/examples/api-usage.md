# 📋 API Usage Examples - Grupo Naser CMS

## 🔐 Authentication Flow

### 1. Login
```typescript
// Frontend Request
const response = await fetch('/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@naser.com.mx',
    password: 'admin123'
  })
});

// Expected Response
{
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "user": {
      "id": 1,
      "name": "Administrador",
      "email": "admin@naser.com.mx",
      "role": "admin",
      "created_at": "2025-07-18T10:00:00Z",
      "updated_at": "2025-07-18T10:00:00Z"
    },
    "expires_at": "2025-07-19T14:30:00Z"
  },
  "meta": {
    "timestamp": "2025-07-18T14:30:00Z",
    "version": "1.0.0",
    "request_id": "req_123456789"
  }
}
```

### 2. Authenticated Request
```typescript
// Using JWT Token
const response = await fetch('/api/v1/pages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'
  },
  body: JSON.stringify({
    title: 'Nueva Página',
    slug: 'nueva-pagina',
    content: '<p>Contenido de la página...</p>',
    status: 'published'
  })
});
```

---

## 📄 Pages Management

### 1. Get All Pages
```typescript
// Public Request
const response = await fetch('/api/v1/pages?page=1&limit=10&search=nosotros');

// Expected Response
{
  "data": [
    {
      "id": 1,
      "title": "Nosotros - Grupo Naser",
      "slug": "nosotros",
      "content": "<p>Grupo Naser es una empresa...</p>",
      "excerpt": "Grupo Naser es una empresa líder en servicios funerarios",
      "meta_title": "Nosotros - Grupo Naser | Servicios Funerarios",
      "meta_description": "Conoce la historia y valores de Grupo Naser",
      "featured_image": "/uploads/pages/nosotros-hero.jpg",
      "status": "published",
      "created_at": "2025-07-18T10:00:00Z",
      "updated_at": "2025-07-18T10:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total": 25,
    "total_pages": 3,
    "has_next": true,
    "has_previous": false
  },
  "meta": {
    "timestamp": "2025-07-18T14:30:00Z",
    "version": "1.0.0",
    "request_id": "req_123456789"
  }
}
```

### 2. Get Page by Slug
```typescript
// Public Request
const response = await fetch('/api/v1/pages/nosotros');

// Expected Response
{
  "data": {
    "id": 1,
    "title": "Nosotros - Grupo Naser",
    "slug": "nosotros",
    "content": "<p>Grupo Naser es una empresa...</p>",
    "excerpt": "Grupo Naser es una empresa líder en servicios funerarios",
    "meta_title": "Nosotros - Grupo Naser | Servicios Funerarios",
    "meta_description": "Conoce la historia y valores de Grupo Naser",
    "featured_image": "/uploads/pages/nosotros-hero.jpg",
    "status": "published",
    "created_at": "2025-07-18T10:00:00Z",
    "updated_at": "2025-07-18T10:00:00Z"
  },
  "meta": {
    "timestamp": "2025-07-18T14:30:00Z",
    "version": "1.0.0",
    "request_id": "req_123456789"
  }
}
```

---

## 🏢 Services Management

### 1. Get All Services with Filters
```typescript
// Public Request
const response = await fetch('/api/v1/services?category=funeral&featured=true&page=1&limit=6');

// Expected Response
{
  "data": [
    {
      "id": 1,
      "name": "Servicio Funeral Básico",
      "slug": "servicio-funeral-basico",
      "description": "Descripción completa del servicio funeral básico...",
      "short_description": "Servicio completo con atención personalizada",
      "price": 15000.00,
      "image": "/uploads/services/servicio-01.jpg",
      "icon": "/uploads/services/icons/servicio-01.png",
      "features": [
        "Ataúd de calidad",
        "Sala de velación",
        "Trámites legales",
        "Carroza fúnebre"
      ],
      "category": "funeral",
      "is_featured": true,
      "location_ids": [1, 2, 3],
      "created_at": "2025-07-18T10:00:00Z",
      "updated_at": "2025-07-18T10:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 6,
    "total": 18,
    "total_pages": 3,
    "has_next": true,
    "has_previous": false
  },
  "meta": {
    "timestamp": "2025-07-18T14:30:00Z",
    "version": "1.0.0",
    "request_id": "req_123456789"
  }
}
```

### 2. Create New Service (Admin)
```typescript
// Admin Request
const response = await fetch('/api/v1/services', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'
  },
  body: JSON.stringify({
    name: 'Servicio Premium',
    slug: 'servicio-premium',
    description: 'Descripción completa del servicio premium...',
    short_description: 'Servicio premium con todas las comodidades',
    price: 35000.00,
    image: '/uploads/services/servicio-premium.jpg',
    icon: '/uploads/services/icons/servicio-premium.png',
    features: [
      'Ataúd premium',
      'Sala VIP',
      'Servicio completo',
      'Atención 24/7'
    ],
    category: 'funeral',
    is_featured: true,
    location_ids: [1, 2, 3, 4]
  })
});

// Expected Response (201 Created)
{
  "data": {
    "id": 9,
    "name": "Servicio Premium",
    "slug": "servicio-premium",
    // ... resto de campos
  },
  "meta": {
    "timestamp": "2025-07-18T14:30:00Z",
    "version": "1.0.0",
    "request_id": "req_123456789"
  }
}
```

---

## 📍 Locations Management

### 1. Get All Locations
```typescript
// Public Request
const response = await fetch('/api/v1/locations?city=Ciudad%20de%20México&active=true');

// Expected Response
{
  "data": [
    {
      "id": 1,
      "name": "Funeraria Naser Aragón",
      "slug": "naser-aragon",
      "address": "Av. Central 123, Col. Doctores, Ciudad de México",
      "city": "Ciudad de México",
      "state": "CDMX",
      "postal_code": "06720",
      "phone": "55 5688 7866",
      "email": "aragon@naser.com.mx",
      "image": "/uploads/locations/naser-aragon.jpg",
      "coordinates": {
        "lat": 19.4326,
        "lng": -99.1332
      },
      "hours": {
        "monday": "24 horas",
        "tuesday": "24 horas",
        "wednesday": "24 horas",
        "thursday": "24 horas",
        "friday": "24 horas",
        "saturday": "24 horas",
        "sunday": "24 horas"
      },
      "features": [
        "Estacionamiento",
        "Sala de velación",
        "Capilla",
        "Cafetería"
      ],
      "is_active": true,
      "created_at": "2025-07-18T10:00:00Z",
      "updated_at": "2025-07-18T10:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total": 4,
    "total_pages": 1,
    "has_next": false,
    "has_previous": false
  },
  "meta": {
    "timestamp": "2025-07-18T14:30:00Z",
    "version": "1.0.0",
    "request_id": "req_123456789"
  }
}
```

### 2. Get Location Services
```typescript
// Public Request
const response = await fetch('/api/v1/locations/naser-aragon/services');

// Expected Response
{
  "data": [
    {
      "id": 1,
      "name": "Servicio Funeral Básico",
      "slug": "servicio-funeral-basico",
      "short_description": "Servicio completo con atención personalizada",
      "price": 15000.00,
      "icon": "/uploads/services/icons/servicio-01.png"
    },
    {
      "id": 2,
      "name": "Servicio de Cremación",
      "slug": "servicio-cremacion",
      "short_description": "Servicio de cremación con ceremonias",
      "price": 12000.00,
      "icon": "/uploads/services/icons/servicio-02.png"
    }
  ],
  "meta": {
    "timestamp": "2025-07-18T14:30:00Z",
    "version": "1.0.0",
    "request_id": "req_123456789"
  }
}
```

---

## 📧 Contact Forms

### 1. Submit General Contact
```typescript
// Public Request
const response = await fetch('/api/v1/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '5551234567',
    message: 'Me interesa conocer más sobre sus servicios...',
    subject: 'Consulta sobre servicios',
    preferred_contact: 'phone'
  })
});

// Expected Response (200 OK)
{
  "data": {
    "id": 123,
    "reference": "CONTACT-2025-000123",
    "message": "Thank you for contacting us. We will respond within 24 hours.",
    "estimated_response": "2025-07-19T14:30:00Z"
  },
  "meta": {
    "timestamp": "2025-07-18T14:30:00Z",
    "version": "1.0.0",
    "request_id": "req_123456789"
  }
}
```

### 2. Request Quote
```typescript
// Public Request
const response = await fetch('/api/v1/contact/quote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '5551234567',
    service_id: 1,
    location_id: 2,
    message: 'Necesito cotización para servicio funeral...',
    budget_range: '10000-25000',
    urgency: 'within_week'
  })
});

// Expected Response (200 OK)
{
  "data": {
    "id": 456,
    "reference": "QUOTE-2025-000456",
    "message": "Thank you for your quote request. Our team will contact you within 4 hours.",
    "estimated_response": "2025-07-18T18:30:00Z"
  },
  "meta": {
    "timestamp": "2025-07-18T14:30:00Z",
    "version": "1.0.0",
    "request_id": "req_123456789"
  }
}
```

### 3. Submit Emergency Contact
```typescript
// Public Request
const response = await fetch('/api/v1/contact/emergency', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Carlos Ruiz',
    phone: '5551234567',
    location: 'Hospital ABC, Av. Principal 123',
    situation: 'Necesito asistencia inmediata...',
    contact_name: 'Dr. López',
    preferred_location_id: 1
  })
});

// Expected Response (200 OK)
{
  "data": {
    "id": 789,
    "reference": "EMERGENCY-2025-000789",
    "message": "Emergency request received. Our team will contact you immediately.",
    "phone_contact": "55 5688 7866",
    "whatsapp_contact": "https://wa.me/525556887866"
  },
  "meta": {
    "timestamp": "2025-07-18T14:30:00Z",
    "version": "1.0.0",
    "request_id": "req_123456789"
  }
}
```

---

## 🚨 Error Handling

### 1. Validation Error (422)
```typescript
// Request with invalid data
const response = await fetch('/api/v1/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: '', // Empty name
    email: 'invalid-email', // Invalid email
    phone: '123', // Too short phone
    message: 'Hi' // Too short message
  })
});

// Expected Response (422 Unprocessable Entity)
{
  "error": "validation_error",
  "message": "The given data was invalid",
  "violations": {
    "name": ["The name field is required"],
    "email": ["The email must be a valid email address"],
    "phone": ["The phone must be at least 10 characters"],
    "message": ["The message must be at least 10 characters"]
  }
}
```

### 2. Authentication Error (401)
```typescript
// Request without valid token
const response = await fetch('/api/v1/pages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer invalid-token'
  },
  body: JSON.stringify({
    title: 'Nueva Página',
    slug: 'nueva-pagina',
    content: '<p>Contenido...</p>'
  })
});

// Expected Response (401 Unauthorized)
{
  "error": "unauthorized",
  "message": "Token invalid or expired",
  "code": 401
}
```

### 3. Rate Limit Error (429)
```typescript
// Too many requests
const response = await fetch('/api/v1/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '5551234567',
    message: 'Spam message...'
  })
});

// Expected Response (429 Too Many Requests)
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Please try again later.",
  "code": 429,
  "retry_after": 60
}
```

---

## 📊 Admin Panel Usage

### 1. Get Contact Submissions
```typescript
// Admin Request
const response = await fetch('/api/v1/admin/contact?type=quote&status=pending&page=1&limit=20', {
  headers: {
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'
  }
});

// Expected Response
{
  "data": [
    {
      "id": 123,
      "reference": "QUOTE-2025-000123",
      "type": "quote",
      "name": "Juan Pérez",
      "email": "juan.perez@email.com",
      "phone": "5551234567",
      "message": "Necesito cotización...",
      "status": "pending",
      "service_id": 1,
      "location_id": 2,
      "notes": null,
      "created_at": "2025-07-18T10:00:00Z",
      "updated_at": "2025-07-18T10:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total": 147,
    "total_pages": 8,
    "has_next": true,
    "has_previous": false
  },
  "meta": {
    "timestamp": "2025-07-18T14:30:00Z",
    "version": "1.0.0",
    "request_id": "req_123456789"
  }
}
```

### 2. Update Contact Status
```typescript
// Admin Request
const response = await fetch('/api/v1/admin/contact/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'
  },
  body: JSON.stringify({
    status: 'contacted',
    notes: 'Client contacted via phone'
  })
});

// Expected Response (200 OK)
{
  "data": {
    "id": 123,
    "reference": "QUOTE-2025-000123",
    "type": "quote",
    "name": "Juan Pérez",
    "email": "juan.perez@email.com",
    "phone": "5551234567",
    "message": "Necesito cotización...",
    "status": "contacted",
    "service_id": 1,
    "location_id": 2,
    "notes": "Client contacted via phone",
    "created_at": "2025-07-18T10:00:00Z",
    "updated_at": "2025-07-18T14:30:00Z"
  },
  "meta": {
    "timestamp": "2025-07-18T14:30:00Z",
    "version": "1.0.0",
    "request_id": "req_123456789"
  }
}
```

---

## 🔧 Implementation Notes

### For Gemini (Backend):
1. **All endpoints** must follow the exact response structure shown
2. **JWT validation** must be implemented for protected routes
3. **Rate limiting** should be implemented for contact forms
4. **Validation** must return the exact error format specified
5. **Pagination** must follow the structure with has_next/has_previous

### For Claude (Frontend):
1. **API Client** should handle all error types shown
2. **Token management** should store JWT and handle expiration
3. **Form validation** should match backend validation rules
4. **Loading states** should be implemented for all API calls
5. **Error handling** should display user-friendly messages

### Common Integration Points:
- **Request/Response IDs** for debugging
- **Timestamp formats** must be consistent (ISO 8601)
- **File uploads** paths must be accessible from frontend
- **CORS headers** must be configured for development
- **Security headers** for production deployment