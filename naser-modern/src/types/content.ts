/**
 * Type definitions for content items used in the Grupo Naser website.
 */

export interface ContentItem {
  id: string;
  title: string;
  body: string;
  updatedAt: string;
  // Additional fields can be added as needed for specific pages or content types
  metadata?: {
    [key: string]: any;
  };
}
