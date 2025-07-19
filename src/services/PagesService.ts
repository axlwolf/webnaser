import { apiClient } from './ApiClient';
import { ApiResponse, ApiListResponse } from '../types/api';

// Types based on contracts
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

export class PagesService {
  static async getAll(filter?: PageFilter): Promise<ApiListResponse<Page>> {
    const response = await apiClient.get<Page[]>('/pages', filter);
    return response as ApiListResponse<Page>;
  }

  static async getBySlug(slug: string): Promise<ApiResponse<Page>> {
    const response = await apiClient.get<Page>(`/pages/${slug}`);
    return response as ApiResponse<Page>;
  }

  static async create(data: PageInput): Promise<ApiResponse<Page>> {
    const response = await apiClient.post<Page>('/pages', data);
    return response;
  }

  static async update(slug: string, data: PageInput): Promise<ApiResponse<Page>> {
    const response = await apiClient.put<Page>(`/pages/${slug}`, data);
    return response;
  }

  static async delete(slug: string): Promise<ApiResponse<{ message: string }>> {
    const response = await apiClient.delete<{ message: string }>(`/pages/${slug}`);
    return response;
  }
}

// Query Keys for React Query
export const pagesKeys = {
  all: ['pages'] as const,
  lists: () => [...pagesKeys.all, 'list'] as const,
  list: (filter?: PageFilter) => [...pagesKeys.lists(), filter] as const,
  details: () => [...pagesKeys.all, 'detail'] as const,
  detail: (slug: string) => [...pagesKeys.details(), slug] as const,
};