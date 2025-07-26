/**
 * Authentication Types for Grupo Naser CMS
 * Based on API contract v1.1
 */

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expires_at: string;
  user: User;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface TokenPayload {
  sub: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  iat: number;
  exp: number;
  jti: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
  timestamp: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    fields?: Record<string, string[]>;
  };
  timestamp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  password_confirmation: string;
}

// Error codes from API contract
export enum AuthErrorCode {
  INVALID_CREDENTIALS = 'AUTH_001',
  INVALID_TOKEN = 'AUTH_002',
  ACCESS_DENIED = 'AUTH_003',
  USER_NOT_FOUND = 'AUTH_004',
  SERVER_ERROR = 'AUTH_005',
  TOO_MANY_ATTEMPTS = 'AUTH_006',
  INVALID_RESET_TOKEN = 'AUTH_007',
  EXPIRED_RESET_TOKEN = 'AUTH_008',
  VALIDATION_ERROR = 'VALIDATION_ERROR'
}