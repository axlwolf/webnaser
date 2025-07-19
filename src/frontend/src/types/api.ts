// API Response Types - Based on contracts
export interface ApiResponse<T> {
  data: T;
  meta: ApiMeta;
}

export interface ApiListResponse<T> {
  data: T[];
  pagination: Pagination;
  meta: ApiMeta;
}

export interface ApiMeta {
  timestamp: string;
  version: string;
  request_id: string;
}

export interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface ApiError {
  error: string;
  message: string;
  code: number;
}

export interface ValidationError extends ApiError {
  violations: Record<string, string[]>;
}

export interface RateLimitError extends ApiError {
  retry_after: number;
}

// Type Guards
export function isApiListResponse<T>(value: unknown): value is ApiListResponse<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'data' in value &&
    'pagination' in value &&
    'meta' in value &&
    Array.isArray((value as ApiListResponse<T>).data)
  );
}

export function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'error' in value &&
    'message' in value &&
    'code' in value
  );
}

export function isValidationError(value: unknown): value is ValidationError {
  return (
    isApiError(value) &&
    'violations' in value &&
    typeof (value as ValidationError).violations === 'object'
  );
}

export function isRateLimitError(value: unknown): value is RateLimitError {
  return (
    isApiError(value) &&
    'retry_after' in value &&
    typeof (value as RateLimitError).retry_after === 'number'
  );
}