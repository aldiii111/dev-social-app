import { apiClient } from './apiClient';
import type { Post, CreatePostPayload, ApiResponse } from '@/types';

// --- Placeholder API functions (body to be implemented by Backend team) ---

export const fetchPosts = async (): Promise<Post[]> => {
  // TODO: implement
  const _response = await apiClient.get<ApiResponse<Post[]>>('/posts');
  return _response.data.data;
};

export const createPost = async (_payload: CreatePostPayload): Promise<Post> => {
  // TODO: implement
  throw new Error('Not implemented');
};
