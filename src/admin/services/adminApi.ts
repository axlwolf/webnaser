import axios from 'axios';
import { DashboardStats, Page } from '../../types/admin.types';

const API_URL = 'http://localhost:3000/api';

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await axios.get(`${API_URL}/dashboard/stats`);
  return response.data;
};

export const getPages = async (): Promise<Page[]> => {
  const response = await axios.get(`${API_URL}/content/pages`);
  return response.data;
};

export const getPage = async (id: number): Promise<Page> => {
  const response = await axios.get(`${API_URL}/content/pages/${id}`);
  return response.data;
};

export const createPage = async (page: Partial<Page>): Promise<Page> => {
  const response = await axios.post(`${API_URL}/content/pages`, page);
  return response.data;
};

export const updatePage = async (page: Partial<Page>): Promise<Page> => {
  const response = await axios.put(`${API_URL}/content/pages/${page.id}`, page);
  return response.data;
};

export const deletePage = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/content/pages/${id}`);
};

export const getServices = async (): Promise<Service[]> => {
  const response = await axios.get(`${API_URL}/content/services`);
  return response.data;
};

export const getService = async (id: number): Promise<Service> => {
  const response = await axios.get(`${API_URL}/content/services/${id}`);
  return response.data;
};

export const createService = async (service: Partial<Service>): Promise<Service> => {
  const response = await axios.post(`${API_URL}/content/services`, service);
  return response.data;
};

export const updateService = async (service: Partial<Service>): Promise<Service> => {
  const response = await axios.put(`${API_URL}/content/services/${service.id}`, service);
  return response.data;
};

export const deleteService = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/content/services/${id}`);
};

export const getLocations = async (): Promise<Location[]> => {
  const response = await axios.get(`${API_URL}/content/locations`);
  return response.data;
};

export const getLocation = async (id: number): Promise<Location> => {
  const response = await axios.get(`${API_URL}/content/locations/${id}`);
  return response.data;
};

export const createLocation = async (location: Partial<Location>): Promise<Location> => {
  const response = await axios.post(`${API_URL}/content/locations`, location);
  return response.data;
};

export const updateLocation = async (location: Partial<Location>): Promise<Location> => {
  const response = await axios.put(`${API_URL}/content/locations/${location.id}`, location);
  return response.data;
};

export const deleteLocation = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/content/locations/${id}`);
};

export const getUsers = async (): Promise<AdminUser[]> => {
  const response = await axios.get(`${API_URL}/content/users`);
  return response.data;
};

export const getUser = async (id: number): Promise<AdminUser> => {
  const response = await axios.get(`${API_URL}/content/users/${id}`);
  return response.data;
};

export const createUser = async (user: Partial<AdminUser>): Promise<AdminUser> => {
  const response = await axios.post(`${API_URL}/content/users`, user);
  return response.data;
};

export const updateUser = async (user: Partial<AdminUser>): Promise<AdminUser> => {
  const response = await axios.put(`${API_URL}/content/users/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/content/users/${id}`);
};

export const getUserActivity = async (userId: number): Promise<UserActivity[]> => {
  const response = await axios.get(`${API_URL}/content/users/${userId}/activity`);
  return response.data;
};

export const getMedias = async (): Promise<Media[]> => {
  const response = await axios.get(`${API_URL}/content/medias`);
  return response.data;
};

export const getMedia = async (id: number): Promise<Media> => {
  const response = await axios.get(`${API_URL}/content/medias/${id}`);
  return response.data;
};

export const uploadMedia = async (formData: FormData): Promise<Media> => {
  const response = await axios.post(`${API_URL}/content/medias`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateMedia = async (media: Partial<Media>): Promise<Media> => {
  const response = await axios.put(`${API_URL}/content/medias/${media.id}`, media);
  return response.data;
};

export const deleteMedia = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/content/medias/${id}`);
};

export const getGeneralSettings = async (): Promise<GeneralSettings> => {
  const response = await axios.get(`${API_URL}/settings/general`);
  return response.data;
};

export const updateGeneralSettings = async (settings: Partial<GeneralSettings>): Promise<GeneralSettings> => {
  const response = await axios.put(`${API_URL}/settings/general`, settings);
  return response.data;
};

export const getSEOSettings = async (): Promise<SEOSettings> => {
  const response = await axios.get(`${API_URL}/settings/seo`);
  return response.data;
};

export const updateSEOSettings = async (settings: Partial<SEOSettings>): Promise<SEOSettings> => {
  const response = await axios.put(`${API_URL}/settings/seo`, settings);
  return response.data;
};

export const getEmailSettings = async (): Promise<EmailSettings> => {
  const response = await axios.get(`${API_URL}/settings/email`);
  return response.data;
};

export const updateEmailSettings = async (settings: Partial<EmailSettings>): Promise<EmailSettings> => {
  const response = await axios.put(`${API_URL}/settings/email`, settings);
  return response.data;
};

export const getBackupSettings = async (): Promise<BackupSettings> => {
  const response = await axios.get(`${API_URL}/settings/backup`);
  return response.data;
};

export const updateBackupSettings = async (settings: Partial<BackupSettings>): Promise<BackupSettings> => {
  const response = await axios.put(`${API_URL}/settings/backup`, settings);
  return response.data;
};

export const getSystemInfo = async (): Promise<SystemInfo> => {
  const response = await axios.get(`${API_URL}/settings/system`);
  return response.data;
};

export const getUsers = async (): Promise<AdminUser[]> => {
  const response = await axios.get(`${API_URL}/content/users`);
  return response.data;
};

export const getUser = async (id: number): Promise<AdminUser> => {
  const response = await axios.get(`${API_URL}/content/users/${id}`);
  return response.data;
};

export const createUser = async (user: Partial<AdminUser>): Promise<AdminUser> => {
  const response = await axios.post(`${API_URL}/content/users`, user);
  return response.data;
};

export const updateUser = async (user: Partial<AdminUser>): Promise<AdminUser> => {
  const response = await axios.put(`${API_URL}/content/users/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/content/users/${id}`);
};

export const getUserActivity = async (userId: number): Promise<UserActivity[]> => {
  const response = await axios.get(`${API_URL}/content/users/${userId}/activity`);
  return response.data;
};

export interface Media {
  id: number;
  name: string;
  type: 'image' | 'document' | 'video';
  url: string;
  folder: string;
  tags: string[];
  createdAt: string;
}

export const getMedias = async (): Promise<Media[]> => {
  const response = await axios.get(`${API_URL}/content/medias`);
  return response.data;
};

export const getMedia = async (id: number): Promise<Media> => {
  const response = await axios.get(`${API_URL}/content/medias/${id}`);
  return response.data;
};

export const uploadMedia = async (formData: FormData): Promise<Media> => {
  const response = await axios.post(`${API_URL}/content/medias`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateMedia = async (media: Partial<Media>): Promise<Media> => {
  const response = await axios.put(`${API_URL}/content/medias/${media.id}`, media);
  return response.data;
};

export const getGeneralSettings = async (): Promise<GeneralSettings> => {
  const response = await axios.get(`${API_URL}/settings/general`);
  return response.data;
};

export const updateGeneralSettings = async (settings: Partial<GeneralSettings>): Promise<GeneralSettings> => {
  const response = await axios.put(`${API_URL}/settings/general`, settings);
  return response.data;
};

export const getSEOSettings = async (): Promise<SEOSettings> => {
  const response = await axios.get(`${API_URL}/settings/seo`);
  return response.data;
};

export const updateSEOSettings = async (settings: Partial<SEOSettings>): Promise<SEOSettings> => {
  const response = await axios.put(`${API_URL}/settings/seo`, settings);
  return response.data;
};

export const getEmailSettings = async (): Promise<EmailSettings> => {
  const response = await axios.get(`${API_URL}/settings/email`);
  return response.data;
};

export const updateEmailSettings = async (settings: Partial<EmailSettings>): Promise<EmailSettings> => {
  const response = await axios.put(`${API_URL}/settings/email`, settings);
  return response.data;
};

export const getBackupSettings = async (): Promise<BackupSettings> => {
  const response = await axios.get(`${API_URL}/settings/backup`);
  return response.data;
};

export const updateBackupSettings = async (settings: Partial<BackupSettings>): Promise<BackupSettings> => {
  const response = await axios.put(`${API_URL}/settings/backup`, settings);
  return response.data;
};

export const getSystemInfo = async (): Promise<SystemInfo> => {
  const response = await axios.get(`${API_URL}/settings/system`);
  return response.data;
};