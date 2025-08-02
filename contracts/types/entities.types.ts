// 🎯 TypeScript Types - Core Entities (Claude Frontend)
// Equivalencias PHP: api/models/*, api/services/*

// ============================================================================
// PAGES TYPES
// ============================================================================

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  featured_image?: string;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface PageInput {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  featured_image?: string;
  status?: 'published' | 'draft';
}

export interface PageFilter {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'published' | 'draft';
}

// ============================================================================
// SERVICES TYPES
// ============================================================================

export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  price?: number;
  image?: string;
  icon?: string;
  features: string[];
  category: 'funeral' | 'cremacion' | 'prevencion' | 'emergencia';
  is_featured: boolean;
  location_ids: number[];
  created_at: string;
  updated_at: string;
}

export interface ServiceInput {
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  price?: number;
  image?: string;
  icon?: string;
  features?: string[];
  category: 'funeral' | 'cremacion' | 'prevencion' | 'emergencia';
  is_featured?: boolean;
  location_ids?: number[];
}

export interface ServiceFilter {
  page?: number;
  limit?: number;
  search?: string;
  category?: 'funeral' | 'cremacion' | 'prevencion' | 'emergencia';
  featured?: boolean;
}

export interface ServiceSummary {
  id: number;
  name: string;
  slug: string;
  short_description?: string;
  price?: number;
  icon?: string;
}

// ============================================================================
// LOCATIONS TYPES
// ============================================================================

export interface Location {
  id: number;
  name: string;
  slug: string;
  address: string;
  city: string;
  state?: string;
  postal_code?: string;
  phone: string;
  email?: string;
  image?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  hours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  features?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocationDetail extends Location {
  description?: string;
  services_count?: number;
  nearby_locations?: LocationSummary[];
}

export interface LocationSummary {
  id: number;
  name: string;
  slug: string;
  city: string;
  phone: string;
  image?: string;
}

export interface LocationInput {
  name: string;
  slug: string;
  address: string;
  city: string;
  state?: string;
  postal_code?: string;
  phone: string;
  email?: string;
  image?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  hours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  features?: string[];
  description?: string;
  is_active?: boolean;
}

export interface LocationFilter {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
  active?: boolean;
}

// ============================================================================
// CONTACT TYPES
// ============================================================================

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
  preferred_contact?: 'email' | 'phone' | 'whatsapp';
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  service_id: number;
  location_id?: number;
  message?: string;
  budget_range?: '0-10000' | '10000-25000' | '25000-50000' | '50000+';
  urgency?: 'immediate' | 'within_week' | 'within_month' | 'planning';
}

export interface EmergencyContact {
  name: string;
  phone: string;
  location: string;
  situation: string;
  contact_name?: string;
  preferred_location_id?: number;
}

export interface ContactRecord {
  id: number;
  reference: string;
  type: 'general' | 'quote' | 'emergency';
  name: string;
  email?: string;
  phone: string;
  message?: string;
  subject?: string;
  status: 'pending' | 'contacted' | 'resolved';
  service_id?: number;
  location_id?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactResponse {
  id: number;
  reference: string;
  message: string;
  estimated_response?: string;
  phone_contact?: string;
  whatsapp_contact?: string;
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
}

export interface ValidationError extends ApiError {
  violations: Record<string, string[]>;
}

export interface RateLimitError extends ApiError {
  retry_after: number;
}

// ============================================================================
// SERVICE INTERFACES
// ============================================================================

export interface PagesService {
  getAll(filter?: PageFilter): Promise<ApiListResponse<Page>>;
  getBySlug(slug: string): Promise<ApiResponse<Page>>;
  create(data: PageInput): Promise<ApiResponse<Page>>;
  update(slug: string, data: PageInput): Promise<ApiResponse<Page>>;
  delete(slug: string): Promise<ApiResponse<{ message: string }>>;
}

export interface ServicesService {
  getAll(filter?: ServiceFilter): Promise<ApiListResponse<Service>>;
  getBySlug(slug: string): Promise<ApiResponse<Service>>;
  create(data: ServiceInput): Promise<ApiResponse<Service>>;
  update(slug: string, data: ServiceInput): Promise<ApiResponse<Service>>;
  delete(slug: string): Promise<ApiResponse<{ message: string }>>;
}

export interface LocationsService {
  getAll(filter?: LocationFilter): Promise<ApiListResponse<Location>>;
  getBySlug(slug: string): Promise<ApiResponse<LocationDetail>>;
  getServices(slug: string): Promise<ApiResponse<ServiceSummary[]>>;
  create(data: LocationInput): Promise<ApiResponse<Location>>;
  update(slug: string, data: LocationInput): Promise<ApiResponse<Location>>;
  delete(slug: string): Promise<ApiResponse<{ message: string }>>;
}

export interface ContactService {
  submit(data: ContactSubmission): Promise<ApiResponse<ContactResponse>>;
  requestQuote(data: QuoteRequest): Promise<ApiResponse<ContactResponse>>;
  submitEmergency(data: EmergencyContact): Promise<ApiResponse<ContactResponse>>;
  getSubmissions(filter?: ContactFilter): Promise<ApiListResponse<ContactRecord>>;
  getSubmission(id: number): Promise<ApiResponse<ContactRecord>>;
  updateStatus(id: number, status: ContactStatus, notes?: string): Promise<ApiResponse<ContactRecord>>;
}

// ============================================================================
// ADDITIONAL TYPES
// ============================================================================

export interface ContactFilter {
  page?: number;
  limit?: number;
  type?: 'general' | 'quote' | 'emergency';
  status?: 'pending' | 'contacted' | 'resolved';
  date_from?: string;
  date_to?: string;
}

export type ContactStatus = 'pending' | 'contacted' | 'resolved';
export type ServiceCategory = 'funeral' | 'cremacion' | 'prevencion' | 'emergencia';
export type PageStatus = 'published' | 'draft';
export type PreferredContact = 'email' | 'phone' | 'whatsapp';
export type BudgetRange = '0-10000' | '10000-25000' | '25000-50000' | '50000+';
export type Urgency = 'immediate' | 'within_week' | 'within_month' | 'planning';

// ============================================================================
// TYPE GUARDS
// ============================================================================

export function isPage(value: unknown): value is Page {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'title' in value &&
    'slug' in value &&
    'content' in value &&
    'status' in value &&
    typeof (value as Page).id === 'number' &&
    typeof (value as Page).title === 'string' &&
    ['published', 'draft'].includes((value as Page).status)
  );
}

export function isService(value: unknown): value is Service {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'slug' in value &&
    'category' in value &&
    typeof (value as Service).id === 'number' &&
    typeof (value as Service).name === 'string' &&
    ['funeral', 'cremacion', 'prevencion', 'emergencia'].includes((value as Service).category)
  );
}

export function isLocation(value: unknown): value is Location {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'slug' in value &&
    'address' in value &&
    'city' in value &&
    'phone' in value &&
    typeof (value as Location).id === 'number' &&
    typeof (value as Location).name === 'string'
  );
}

export function isContactRecord(value: unknown): value is ContactRecord {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'reference' in value &&
    'type' in value &&
    'name' in value &&
    'phone' in value &&
    'status' in value &&
    typeof (value as ContactRecord).id === 'number' &&
    ['general', 'quote', 'emergency'].includes((value as ContactRecord).type) &&
    ['pending', 'contacted', 'resolved'].includes((value as ContactRecord).status)
  );
}

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

export function isRateLimitError(value: unknown): value is RateLimitError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'error' in value &&
    'code' in value &&
    'retry_after' in value &&
    (value as RateLimitError).code === 429
  );
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const SERVICE_CATEGORIES = {
  FUNERAL: 'funeral',
  CREMACION: 'cremacion',
  PREVENCION: 'prevencion',
  EMERGENCIA: 'emergencia',
} as const;

export const CONTACT_TYPES = {
  GENERAL: 'general',
  QUOTE: 'quote',
  EMERGENCY: 'emergency',
} as const;

export const CONTACT_STATUS = {
  PENDING: 'pending',
  CONTACTED: 'contacted',
  RESOLVED: 'resolved',
} as const;

export const PAGE_STATUS = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
} as const;

// ============================================================================
// EXPORT COLLECTIONS
// ============================================================================

export type EntityTypes = {
  Page: Page;
  PageInput: PageInput;
  Service: Service;
  ServiceInput: ServiceInput;
  Location: Location;
  LocationInput: LocationInput;
  ContactSubmission: ContactSubmission;
  QuoteRequest: QuoteRequest;
  EmergencyContact: EmergencyContact;
  ContactRecord: ContactRecord;
};