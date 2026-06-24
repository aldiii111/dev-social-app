import { api } from './apiClient';
import type { Post, CreatePostPayload, ApiResponse } from '@/types';
import type { TrendingTagView } from '@/features/feed/types';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get<ApiResponse<Post[]>>('/posts');
  return response.data.data;
};

export const createPost = async (_payload: CreatePostPayload): Promise<Post> => {
  const response = await api.post<ApiResponse<Post>>('/posts', _payload);
  return response.data.data;
};

export const fetchPostUser = async (userId: string): Promise<Post[]> => {
  const response = await api.get<ApiResponse<Post[]>>(`/posts?user_id=${userId}`);
  return response.data.data;
}

export const fetchTrendingPosts = async (): Promise<TrendingTagView[]> => {
  const response = await api.get<ApiResponse<TrendingTagView[]>>('/posts/trending');
  return response.data.data;
};