// 🔧 Validation Utilities - Español México

import { TEXTS } from '../constants/texts';
import { isValidEmail, isValidMexicanPhone } from './formatters';

// ============================================================================
// VALIDATION RULES
// ============================================================================

export interface ValidationRule {
  test: (value: any) => boolean;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// ============================================================================
// COMMON VALIDATION RULES
// ============================================================================

export const validationRules = {
  required: (fieldName?: string): ValidationRule => ({
    test: (value) => {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      return value !== null && value !== undefined && value !== '';
    },
    message: fieldName ? `${fieldName} es obligatorio` : TEXTS.validation.required,
  }),

  email: (): ValidationRule => ({
    test: (value) => !value || isValidEmail(value),
    message: TEXTS.validation.email,
  }),

  phone: (): ValidationRule => ({
    test: (value) => !value || isValidMexicanPhone(value),
    message: 'Ingresa un teléfono válido (10 dígitos)',
  }),

  minLength: (min: number, fieldName?: string): ValidationRule => ({
    test: (value) => !value || value.length >= min,
    message: fieldName 
      ? `${fieldName} debe tener al menos ${min} caracteres`
      : `Debe tener al menos ${min} caracteres`,
  }),

  maxLength: (max: number, fieldName?: string): ValidationRule => ({
    test: (value) => !value || value.length <= max,
    message: fieldName
      ? `${fieldName} no puede tener más de ${max} caracteres`
      : `No puede tener más de ${max} caracteres`,
  }),

  numeric: (): ValidationRule => ({
    test: (value) => !value || /^\d+$/.test(value),
    message: TEXTS.validation.numeric,
  }),

  alphabetic: (): ValidationRule => ({
    test: (value) => !value || /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(value),
    message: 'Solo se permiten letras',
  }),

  alphanumeric: (): ValidationRule => ({
    test: (value) => !value || /^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(value),
    message: TEXTS.validation.alphanumeric,
  }),

  url: (): ValidationRule => ({
    test: (value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message: TEXTS.validation.url,
  }),

  min: (min: number): ValidationRule => ({
    test: (value) => !value || Number(value) >= min,
    message: `El valor mínimo es ${min}`,
  }),

  max: (max: number): ValidationRule => ({
    test: (value) => !value || Number(value) <= max,
    message: `El valor máximo es ${max}`,
  }),

  match: (matchValue: any, fieldName?: string): ValidationRule => ({
    test: (value) => !value || value === matchValue,
    message: fieldName 
      ? `${fieldName} no coincide`
      : TEXTS.validation.match,
  }),

  slug: (): ValidationRule => ({
    test: (value) => !value || /^[a-z0-9-]+$/.test(value),
    message: 'Solo se permiten letras minúsculas, números y guiones',
  }),

  postalCode: (): ValidationRule => ({
    test: (value) => !value || /^\d{5}$/.test(value.replace(/\D/g, '')),
    message: 'Ingresa un código postal válido (5 dígitos)',
  }),

  fileSize: (maxSizeInMB: number): ValidationRule => ({
    test: (file: File) => !file || file.size <= maxSizeInMB * 1024 * 1024,
    message: `El archivo no puede ser mayor a ${maxSizeInMB}MB`,
  }),

  fileType: (allowedTypes: string[]): ValidationRule => ({
    test: (file: File) => !file || allowedTypes.includes(file.type),
    message: `Solo se permiten archivos de tipo: ${allowedTypes.join(', ')}`,
  }),
};

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

export const validationSchemas = {
  // Contact form validation
  contactForm: {
    name: [
      validationRules.required('Nombre'),
      validationRules.minLength(2, 'Nombre'),
      validationRules.maxLength(100, 'Nombre'),
      validationRules.alphabetic(),
    ],
    email: [
      validationRules.required('Email'),
      validationRules.email(),
      validationRules.maxLength(255, 'Email'),
    ],
    phone: [
      validationRules.required('Teléfono'),
      validationRules.phone(),
    ],
    message: [
      validationRules.required('Mensaje'),
      validationRules.minLength(10, 'Mensaje'),
      validationRules.maxLength(1000, 'Mensaje'),
    ],
    subject: [
      validationRules.maxLength(255, 'Asunto'),
    ],
  },

  // Quote request validation
  quoteForm: {
    name: [
      validationRules.required('Nombre'),
      validationRules.minLength(2, 'Nombre'),
      validationRules.maxLength(100, 'Nombre'),
      validationRules.alphabetic(),
    ],
    email: [
      validationRules.required('Email'),
      validationRules.email(),
    ],
    phone: [
      validationRules.required('Teléfono'),
      validationRules.phone(),
    ],
    service_id: [
      validationRules.required('Servicio'),
    ],
    message: [
      validationRules.maxLength(1000, 'Mensaje'),
    ],
  },

  // Emergency contact validation
  emergencyForm: {
    name: [
      validationRules.required('Nombre'),
      validationRules.minLength(2, 'Nombre'),
      validationRules.maxLength(100, 'Nombre'),
    ],
    phone: [
      validationRules.required('Teléfono'),
      validationRules.phone(),
    ],
    location: [
      validationRules.required('Ubicación'),
      validationRules.maxLength(255, 'Ubicación'),
    ],
    situation: [
      validationRules.required('Situación'),
      validationRules.maxLength(500, 'Situación'),
    ],
    contact_name: [
      validationRules.maxLength(100, 'Nombre de contacto'),
    ],
  },

  // Login form validation
  loginForm: {
    email: [
      validationRules.required('Email'),
      validationRules.email(),
    ],
    password: [
      validationRules.required('Contraseña'),
      validationRules.minLength(6, 'Contraseña'),
    ],
  },

  // Page form validation (admin)
  pageForm: {
    title: [
      validationRules.required('Título'),
      validationRules.minLength(1, 'Título'),
      validationRules.maxLength(255, 'Título'),
    ],
    slug: [
      validationRules.required('Slug'),
      validationRules.slug(),
      validationRules.maxLength(255, 'Slug'),
    ],
    content: [
      validationRules.required('Contenido'),
      validationRules.minLength(1, 'Contenido'),
    ],
    excerpt: [
      validationRules.maxLength(500, 'Extracto'),
    ],
    meta_title: [
      validationRules.maxLength(255, 'Meta título'),
    ],
    meta_description: [
      validationRules.maxLength(500, 'Meta descripción'),
    ],
  },

  // Service form validation (admin)
  serviceForm: {
    name: [
      validationRules.required('Nombre'),
      validationRules.minLength(1, 'Nombre'),
      validationRules.maxLength(255, 'Nombre'),
    ],
    slug: [
      validationRules.required('Slug'),
      validationRules.slug(),
      validationRules.maxLength(255, 'Slug'),
    ],
    description: [
      validationRules.required('Descripción'),
      validationRules.minLength(1, 'Descripción'),
    ],
    short_description: [
      validationRules.maxLength(255, 'Descripción corta'),
    ],
    price: [
      validationRules.min(0),
    ],
    category: [
      validationRules.required('Categoría'),
    ],
  },

  // Location form validation (admin)
  locationForm: {
    name: [
      validationRules.required('Nombre'),
      validationRules.minLength(1, 'Nombre'),
      validationRules.maxLength(255, 'Nombre'),
    ],
    slug: [
      validationRules.required('Slug'),
      validationRules.slug(),
      validationRules.maxLength(255, 'Slug'),
    ],
    address: [
      validationRules.required('Dirección'),
      validationRules.minLength(1, 'Dirección'),
      validationRules.maxLength(500, 'Dirección'),
    ],
    city: [
      validationRules.required('Ciudad'),
      validationRules.minLength(1, 'Ciudad'),
      validationRules.maxLength(100, 'Ciudad'),
    ],
    state: [
      validationRules.maxLength(100, 'Estado'),
    ],
    postal_code: [
      validationRules.postalCode(),
    ],
    phone: [
      validationRules.required('Teléfono'),
      validationRules.phone(),
    ],
    email: [
      validationRules.email(),
      validationRules.maxLength(255, 'Email'),
    ],
  },
};

// ============================================================================
// VALIDATION EXECUTOR
// ============================================================================

export const validateField = (value: any, rules: ValidationRule[]): ValidationResult => {
  for (const rule of rules) {
    if (!rule.test(value)) {
      return {
        isValid: false,
        error: rule.message,
      };
    }
  }
  
  return { isValid: true };
};

export const validateForm = <T extends Record<string, any>>(
  formData: T,
  schema: Record<keyof T, ValidationRule[]>
): {
  isValid: boolean;
  errors: Partial<Record<keyof T, string>>;
} => {
  const errors: Partial<Record<keyof T, string>> = {};
  let isValid = true;

  for (const [field, rules] of Object.entries(schema) as Array<[keyof T, ValidationRule[]]>) {
    const result = validateField(formData[field], rules);
    if (!result.isValid) {
      errors[field] = result.error;
      isValid = false;
    }
  }

  return { isValid, errors };
};

// ============================================================================
// CUSTOM ERROR MESSAGES
// ============================================================================

export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error?.code) {
    switch (error.code) {
      case 400:
        return TEXTS.errors.validationError;
      case 401:
        return TEXTS.errors.unauthorized;
      case 403:
        return TEXTS.errors.forbidden;
      case 404:
        return TEXTS.errors.notFound;
      case 429:
        return TEXTS.errors.rateLimitExceeded;
      case 500:
        return TEXTS.errors.serverError;
      default:
        return error.message || TEXTS.errors.general;
    }
  }

  if (error?.message) {
    return error.message;
  }

  return TEXTS.errors.general;
};

// ============================================================================
// FORM HELPERS
// ============================================================================

export const getFieldError = (
  errors: Record<string, string>,
  field: string
): string | undefined => {
  return errors[field];
};

export const hasFieldError = (
  errors: Record<string, string>,
  field: string
): boolean => {
  return !!errors[field];
};

export const isFormValid = (errors: Record<string, string>): boolean => {
  return Object.keys(errors).length === 0;
};