import type { User } from '@/types';
import { apiClient } from './apiClient';

// --- Placeholder API functions (body to be implemented by Backend team) ---

export const fetchUserProfile = async (_userId: string): Promise<User> => {
  // TODO: implement
  throw new Error('Not implemented');
};

export const updateUserProfile = async (_data: Partial<Pick<User, 'github_url'>>): Promise<User> => {
  // TODO: implement
  const _response = await apiClient.patch<User>('/users/me', _data);
  return _response.data;
};
