// TypeScript interfaces for DevConnect API entities

export interface User {
  id: string;
  google_id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  github_url: string | null;
  created_at: string;
}

export interface PostStack {
  id: number;
  post_id: string;
  stack_name: string;
}

export type LookingFor = 'Frontend' | 'Backend' | 'UI/UX' | 'Fullstack' | 'Mobile' | 'DevOps';

export interface Post {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image_url: string | null;
  looking_for: LookingFor;
  created_at: string;
  // Joined relations from API
  user: User;
  stacks: PostStack[];
}

export interface CreatePostPayload {
  title: string;
  description: string;
  looking_for: LookingFor;
  stacks: string[];
  image_url?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
