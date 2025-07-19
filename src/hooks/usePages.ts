import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PagesService, pagesKeys, Page, PageInput, PageFilter } from '../services/PagesService';
import { ApiError } from '../types/api';

// Hook for getting all pages
export const usePages = (filter?: PageFilter) => {
  return useQuery({
    queryKey: pagesKeys.list(filter),
    queryFn: () => PagesService.getAll(filter),
    select: (data) => ({
      pages: data.data,
      pagination: data.pagination,
      meta: data.meta,
    }),
  });
};

// Hook for getting a single page by slug
export const usePage = (slug: string, enabled = true) => {
  return useQuery({
    queryKey: pagesKeys.detail(slug),
    queryFn: () => PagesService.getBySlug(slug),
    enabled: enabled && !!slug,
    select: (data) => ({
      page: data.data,
      meta: data.meta,
    }),
  });
};

// Hook for creating a page
export const useCreatePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PageInput) => PagesService.create(data),
    onSuccess: (response) => {
      // Invalidate and refetch pages list
      queryClient.invalidateQueries({ queryKey: pagesKeys.lists() });
      
      // Add the new page to the cache
      queryClient.setQueryData(
        pagesKeys.detail(response.data.slug),
        response
      );
    },
    onError: (error: ApiError) => {
      console.error('Error creating page:', error);
    },
  });
};

// Hook for updating a page
export const useUpdatePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: PageInput }) => 
      PagesService.update(slug, data),
    onSuccess: (response, variables) => {
      // Update the specific page cache
      queryClient.setQueryData(
        pagesKeys.detail(variables.slug),
        response
      );
      
      // Invalidate pages list to reflect changes
      queryClient.invalidateQueries({ queryKey: pagesKeys.lists() });
    },
    onError: (error: ApiError) => {
      console.error('Error updating page:', error);
    },
  });
};

// Hook for deleting a page
export const useDeletePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => PagesService.delete(slug),
    onSuccess: (_, slug) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: pagesKeys.detail(slug) });
      
      // Invalidate pages list
      queryClient.invalidateQueries({ queryKey: pagesKeys.lists() });
    },
    onError: (error: ApiError) => {
      console.error('Error deleting page:', error);
    },
  });
};

// Hook for prefetching a page
export const usePrefetchPage = () => {
  const queryClient = useQueryClient();

  return (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: pagesKeys.detail(slug),
      queryFn: () => PagesService.getBySlug(slug),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };
};

// Custom hook that combines all page operations
export const usePagesManager = (filter?: PageFilter) => {
  const pages = usePages(filter);
  const createPage = useCreatePage();
  const updatePage = useUpdatePage();
  const deletePage = useDeletePage();
  const prefetchPage = usePrefetchPage();

  return {
    // Data
    pages: pages.data?.pages || [],
    pagination: pages.data?.pagination,
    meta: pages.data?.meta,
    
    // Loading states
    isLoading: pages.isLoading,
    isCreating: createPage.isPending,
    isUpdating: updatePage.isPending,
    isDeleting: deletePage.isPending,
    
    // Error states
    error: pages.error as ApiError | null,
    createError: createPage.error as ApiError | null,
    updateError: updatePage.error as ApiError | null,
    deleteError: deletePage.error as ApiError | null,
    
    // Actions
    refetch: pages.refetch,
    createPage: createPage.mutate,
    updatePage: updatePage.mutate,
    deletePage: deletePage.mutate,
    prefetchPage,
    
    // Success handlers
    onCreateSuccess: createPage.isSuccess,
    onUpdateSuccess: updatePage.isSuccess,
    onDeleteSuccess: deletePage.isSuccess,
  };
};