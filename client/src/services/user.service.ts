import type { User } from '@/types';
import { api } from './apiClient';

// --- Placeholder API functions (body to be implemented by Backend team) ---

export const fetchUserProfile = async (_userId: string): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const updateUserProfile = async (_data: Partial<Pick<User, 'github_url'>>): Promise<User> => {
  const response = await api.patch<User>('/users/me', _data);
  return response.data;
};
