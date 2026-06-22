import type { LookingFor } from "@/types";

export interface CollaborationPostAuthorView {
  id: string;
  name: string;
  avatarUrl: string | null;
  githubUrl: string | null;
  githubUsername?: string;
}

export interface CollaborationPostView {
  id: string;
  title: string;
  description: string;
  looking_for: LookingFor;
  stacks: string[];
  createdAt: string;
  imageUrl?: string | null;
  author: CollaborationPostAuthorView;
}

export interface TrendingTagView {
  tag: string;
  postCount: number;
}

export interface CreateCollaborationPostValues {
  title: string;
  description: string;
  looking_for: LookingFor;
  stacks: string[];
}

export const LOOKING_FOR_OPTIONS: LookingFor[] = [
  "Frontend",
  "Backend",
  "UI/UX",
  "Fullstack",
  "Mobile",
  "DevOps",
];

export const EMPTY_CREATE_POST_VALUES: CreateCollaborationPostValues = {
  title: "",
  description: "",
  looking_for: "Frontend",
  stacks: [],
};
