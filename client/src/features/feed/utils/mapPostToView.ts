import type { Post } from "@/types";
import type { CollaborationPostView } from "@/features/feed/types";

function extractGithubUsername(githubUrl: string | null): string | undefined {
  if (!githubUrl) return undefined;
  try {
    const pathname = new URL(githubUrl).pathname.replace(/^\/+|\/+$/g, "");
    return pathname.split("/")[0] || undefined;
  } catch {
    const cleaned = githubUrl.replace(/^https?:\/\/(www\.)?github\.com\//i, "");
    return cleaned.split("/")[0] || undefined;
  }
}

export function mapPostToCollaborationView(post: Post): CollaborationPostView {
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    looking_for: post.looking_for,
    stacks: post.stacks.map((stack) => stack.stack_name),
    createdAt: post.created_at,
    imageUrl: post.image_url,
    author: {
      id: post.user.id,
      name: post.user.name,
      avatarUrl: post.user.avatar_url,
      githubUrl: post.user.github_url,
      githubUsername: extractGithubUsername(post.user.github_url),
    },
  };
}

export function mapPostsToCollaborationViews(posts: Post[]): CollaborationPostView[] {
  return posts.map(mapPostToCollaborationView);
}
