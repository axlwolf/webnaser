// 🎯 TypeScript Types Template - Frontend (Claude)
// Generar tipos específicos reemplazando {Entity} por la entidad real

// ============================================================================
// CORE TYPES
// ============================================================================

export interface {Entity} {
  id: number;
  created_at: string;
  updated_at: string;
  // Agregar propiedades específicas de la entidad
}

export interface {Entity}Input {
  // Agregar propiedades requeridas para crear/actualizar
}

export interface {Entity}Filter {
  search?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  // Agregar filtros específicos
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

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
  details?: Record<string, any>;
}

export interface ValidationError extends ApiError {
  violations: Record<string, string[]>;
}

// ============================================================================
// SERVICE TYPES
// ============================================================================

export interface {Entity}Service {
  getAll(filter?: {Entity}Filter): Promise<ApiListResponse<{Entity}>>;
  getById(id: number): Promise<ApiResponse<{Entity}>>;
  create(data: {Entity}Input): Promise<ApiResponse<{Entity}>>;
  update(id: number, data: {Entity}Input): Promise<ApiResponse<{Entity}>>;
  delete(id: number): Promise<ApiResponse<{ message: string }>>;
}

// ============================================================================
// HOOK TYPES
// ============================================================================

export interface Use{Entity}Return {
  {entities}: {Entity}[];
  {entity}: {Entity} | null;
  loading: boolean;
  error: ApiError | null;
  pagination: Pagination | null;
  
  // Actions
  fetch{Entities}(filter?: {Entity}Filter): Promise<void>;
  fetch{Entity}(id: number): Promise<void>;
  create{Entity}(data: {Entity}Input): Promise<{Entity}>;
  update{Entity}(id: number, data: {Entity}Input): Promise<{Entity}>;
  delete{Entity}(id: number): Promise<void>;
  
  // Utils
  clearError(): void;
  reset(): void;
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

export interface {Entity}ListProps {
  filter?: {Entity}Filter;
  onSelect?: (entity: {Entity}) => void;
  onEdit?: (entity: {Entity}) => void;
  onDelete?: (entity: {Entity}) => void;
  className?: string;
}

export interface {Entity}FormProps {
  entity?: {Entity};
  onSubmit: (data: {Entity}Input) => void;
  onCancel?: () => void;
  loading?: boolean;
  error?: ApiError | null;
  className?: string;
}

export interface {Entity}CardProps {
  entity: {Entity};
  onEdit?: (entity: {Entity}) => void;
  onDelete?: (entity: {Entity}) => void;
  onView?: (entity: {Entity}) => void;
  className?: string;
}

// ============================================================================
// CONTEXT TYPES
// ============================================================================

export interface {Entity}Context {
  state: {Entity}State;
  actions: {Entity}Actions;
}

export interface {Entity}State {
  {entities}: {Entity}[];
  current{Entity}: {Entity} | null;
  loading: boolean;
  error: ApiError | null;
  pagination: Pagination | null;
  filter: {Entity}Filter;
}

export interface {Entity}Actions {
  set{Entities}(entities: {Entity}[]): void;
  setCurrent{Entity}(entity: {Entity} | null): void;
  setLoading(loading: boolean): void;
  setError(error: ApiError | null): void;
  setPagination(pagination: Pagination | null): void;
  setFilter(filter: {Entity}Filter): void;
  
  // Async actions
  load{Entities}(filter?: {Entity}Filter): Promise<void>;
  load{Entity}(id: number): Promise<void>;
  create{Entity}(data: {Entity}Input): Promise<{Entity}>;
  update{Entity}(id: number, data: {Entity}Input): Promise<{Entity}>;
  delete{Entity}(id: number): Promise<void>;
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface {Entity}FormData extends {Entity}Input {
  // Agregar campos específicos del formulario
}

export interface {Entity}FormErrors {
  [K in keyof {Entity}FormData]?: string;
}

export interface {Entity}FormState {
  data: {Entity}FormData;
  errors: {Entity}FormErrors;
  touched: Partial<Record<keyof {Entity}FormData, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type {Entity}SortField = keyof {Entity};
export type SortOrder = 'asc' | 'desc';

export interface Sort{Entity} {
  field: {Entity}SortField;
  order: SortOrder;
}

export type {Entity}Status = 'active' | 'inactive' | 'pending' | 'deleted';

// ============================================================================
// EXPORT COLLECTIONS
// ============================================================================

export type {Entity}Types = {
  Entity: {Entity};
  EntityInput: {Entity}Input;
  EntityFilter: {Entity}Filter;
  EntityService: {Entity}Service;
  EntityFormData: {Entity}FormData;
  EntityFormErrors: {Entity}FormErrors;
  EntityFormState: {Entity}FormState;
};

// ============================================================================
// TYPE GUARDS
// ============================================================================

export function is{Entity}(value: unknown): value is {Entity} {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof (value as {Entity}).id === 'number'
  );
}

export function is{Entity}Input(value: unknown): value is {Entity}Input {
  return typeof value === 'object' && value !== null;
  // Agregar validaciones específicas
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