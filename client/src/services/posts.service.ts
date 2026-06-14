import { api } from './apiClient';
import type { Post, CreatePostPayload, ApiResponse } from '@/types';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get<ApiResponse<Post[]>>('/posts');
  return response.data.data;
};

export const createPost = async (_payload: CreatePostPayload): Promise<Post> => {
  const response = await api.post<ApiResponse<Post>>('/posts', _payload);
  return response.data.data;
};
