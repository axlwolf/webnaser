// 🎯 TypeScript Types - Authentication (Claude Frontend)
// Equivalencias PHP: api/models/User.php, api/services/AuthService.php

// ============================================================================
// CORE TYPES
// ============================================================================

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  expires_at: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  data: T;
  meta: ApiMeta;
}

export interface ApiMeta {
  timestamp: string;
  version: string;
  request_id: string;
}

export interface ApiError {
  error: string;
  message: string;
  code: number;
}

export interface ValidationError extends ApiError {
  violations: Record<string, string[]>;
}

// ============================================================================
// SERVICE TYPES
// ============================================================================

export interface AuthService {
  login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>>;
  logout(): Promise<ApiResponse<{ message: string }>>;
  getCurrentUser(): Promise<ApiResponse<User>>;
  isAuthenticated(): boolean;
  getToken(): string | null;
}

// ============================================================================
// HOOK TYPES
// ============================================================================

export interface UseAuthReturn {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: ApiError | null;
  
  // Actions
  login(credentials: LoginCredentials): Promise<void>;
  logout(): Promise<void>;
  checkAuth(): Promise<void>;
  
  // Utils
  clearError(): void;
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

export interface LoginFormProps {
  onSuccess?: (user: User) => void;
  onError?: (error: ApiError) => void;
  redirectTo?: string;
  className?: string;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requiredRole?: 'admin' | 'editor';
}

// ============================================================================
// CONTEXT TYPES
// ============================================================================

export interface AuthContext {
  state: AuthState;
  actions: AuthActions;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: ApiError | null;
}

export interface AuthActions {
  setUser(user: User | null): void;
  setToken(token: string | null): void;
  setLoading(loading: boolean): void;
  setError(error: ApiError | null): void;
  
  // Async actions
  login(credentials: LoginCredentials): Promise<void>;
  logout(): Promise<void>;
  checkAuth(): Promise<void>;
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export interface LoginFormState {
  data: LoginFormData;
  errors: LoginFormErrors;
  isSubmitting: boolean;
  isValid: boolean;
}

// ============================================================================
// STORAGE TYPES
// ============================================================================

export interface AuthStorage {
  token: string | null;
  user: User | null;
  expiresAt: string | null;
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

export function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'email' in value &&
    'role' in value &&
    typeof (value as User).id === 'number' &&
    typeof (value as User).email === 'string' &&
    ['admin', 'editor'].includes((value as User).role)
  );
}

export function isAuthResponse(value: unknown): value is AuthResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'token' in value &&
    'user' in value &&
    'expires_at' in value &&
    typeof (value as AuthResponse).token === 'string' &&
    isUser((value as AuthResponse).user)
  );
}

export function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'error' in value &&
    'message' in value &&
    'code' in value &&
    typeof (value as ApiError).error === 'string' &&
    typeof (value as ApiError).message === 'string' &&
    typeof (value as ApiError).code === 'number'
  );
}

export function isValidationError(value: unknown): value is ValidationError {
  return (
    isApiError(value) &&
    'violations' in value &&
    typeof (value as ValidationError).violations === 'object' &&
    (value as ValidationError).violations !== null
  );
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type UserRole = User['role'];
export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';

export interface JWTPayload {
  sub: number; // user id
  email: string;
  role: UserRole;
  iat: number; // issued at
  exp: number; // expires at
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const AUTH_STORAGE_KEY = 'auth_data';
export const TOKEN_HEADER = 'Authorization';
export const TOKEN_PREFIX = 'Bearer ';

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'invalid_credentials',
  TOKEN_EXPIRED: 'token_expired',
  UNAUTHORIZED: 'unauthorized',
  VALIDATION_ERROR: 'validation_error',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
} as const;

// ============================================================================
// EXPORT COLLECTIONS
// ============================================================================

export type AuthTypes = {
  User: User;
  LoginCredentials: LoginCredentials;
  AuthResponse: AuthResponse;
  AuthService: AuthService;
  UseAuthReturn: UseAuthReturn;
  AuthContext: AuthContext;
  AuthState: AuthState;
  AuthActions: AuthActions;
  LoginFormData: LoginFormData;
  LoginFormErrors: LoginFormErrors;
  LoginFormState: LoginFormState;
};