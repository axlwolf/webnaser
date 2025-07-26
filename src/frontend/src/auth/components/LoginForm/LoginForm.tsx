/**
 * LoginForm Component - Grupo Naser CMS
 * Complete login form with validation, accessibility, and integration with AuthContext
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LoginCredentials } from '../../types/auth';
import styles from './LoginForm.module.css';

interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
  className?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export function LoginForm({
  onSuccess,
  redirectTo = "/dashboard",
  className,
}: LoginFormProps) {
  const { state, login, clearError } = useAuth();
  const { loading, error } = state;

  // Form state
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation patterns
  const emailValidation = {
    required: "El correo electrónico es obligatorio",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Ingresa un correo electrónico válido",
    },
  };

  const passwordValidation = {
    required: "La contraseña es obligatoria",
    minLength: {
      value: 8,
      message: "La contraseña debe tener al menos 8 caracteres",
    },
  };

  // Validation function
  const validateField = (name: keyof LoginCredentials, value: string): string | undefined => {
    switch (name) {
      case 'email':
        if (!value.trim()) {
          return emailValidation.required;
        }
        if (!emailValidation.pattern.value.test(value)) {
          return emailValidation.pattern.message;
        }
        break;
      case 'password':
        if (!value) {
          return passwordValidation.required;
        }
        if (value.length < passwordValidation.minLength.value) {
          return passwordValidation.minLength.message;
        }
        break;
    }
    return undefined;
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof LoginCredentials;

    setFormData(prev => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear auth error when user starts typing
    if (error) {
      clearError();
    }

    // Real-time validation if field has been touched
    if (touched[fieldName]) {
      const fieldError = validateField(fieldName, value);
      setErrors(prev => ({
        ...prev,
        [fieldName]: fieldError,
      }));
    }
  };

  // Handle blur for validation
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof LoginCredentials;

    setTouched(prev => ({
      ...prev,
      [fieldName]: true,
    }));

    const fieldError = validateField(fieldName, value);
    setErrors(prev => ({
      ...prev,
      [fieldName]: fieldError,
    }));
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const fieldName = key as keyof LoginCredentials;
      const fieldError = validateField(fieldName, formData[fieldName]);
      if (fieldError) {
        newErrors[fieldName] = fieldError;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
    });

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      await login(formData);
      onSuccess?.();
    } catch (error) {
      // Error is handled by AuthContext
      console.error('Login error:', error);
    }
  };

  // Check if form is valid
  const isFormValid = !errors.email && !errors.password && formData.email && formData.password;

  // Clear form errors when component mounts
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, []);

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`${styles.loginForm} ${className || ''}`}
      noValidate
    >
      <div className={styles.formHeader}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        <p className={styles.subtitle}>
          Accede al panel de administración de Grupo Naser
        </p>
      </div>

      {/* Email Field */}
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
          autoComplete="email"
          disabled={loading}
          placeholder="admin@naser.com.mx"
        />
        {errors.email && (
          <div id="email-error" className={styles.error} role="alert">
            {errors.email}
          </div>
        )}
      </div>

      {/* Password Field */}
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
          value={formData.password}
          onChange={handleInputChange}
          onBlur={handleBlur}
          aria-describedby={errors.password ? "password-error" : undefined}
          aria-invalid={!!errors.password}
          autoComplete="current-password"
          disabled={loading}
          placeholder="••••••••"
        />
        {errors.password && (
          <div id="password-error" className={styles.error} role="alert">
            {errors.password}
          </div>
        )}
      </div>

      {/* Auth Error */}
      {error && (
        <div className={styles.authError} role="alert">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={styles.submitButton}
        disabled={loading || !isFormValid}
        aria-describedby="submit-status"
      >
        {loading ? (
          <>
            <span className={styles.loading} aria-hidden="true"></span>
            <span className="sr-only">Iniciando sesión...</span>
            Iniciando sesión...
          </>
        ) : (
          'Iniciar sesión'
        )}
      </button>

      {/* Forgot Password Link */}
      <div className={styles.forgotPassword}>
        <a href="#" className={styles.forgotLink}>
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {/* Screen reader status */}
      <div id="submit-status" className="sr-only" aria-live="polite">
        {loading ? 'Iniciando sesión, por favor espere...' : ''}
      </div>
    </form>
  );
}