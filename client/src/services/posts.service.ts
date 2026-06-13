import { api } from './apiClient';
import type { Post, CreatePostPayload, ApiResponse } from '@/types';

export const fetchPosts = async (): Promise<Post[]> => {
  // TODO: implement
  const _response = await api.get<ApiResponse<Post[]>>('/posts');
  return _response.data.data;
};

export const createPost = async (_payload: CreatePostPayload): Promise<Post> => {
  
};
