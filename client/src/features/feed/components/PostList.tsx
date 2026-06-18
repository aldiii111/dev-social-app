import { Users } from "lucide-react";
import type { CollaborationPostView } from "@/features/feed/types";
import CollaborationPostCard from "./CollaborationPostCard";
import PostListSkeleton from "./PostListSkeleton";

export interface PostListProps {
  posts: CollaborationPostView[];
  isLoading: boolean;
  onContactAuthor: (postId: string) => void;
}

export default function PostList({
  posts,
  isLoading,
  onContactAuthor,
}: PostListProps) {
  if (isLoading) {
    return <PostListSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/20 p-12 text-center">
        <Users className="mb-3 h-10 w-10 text-muted-foreground" />
        <h4 className="text-base font-bold">Belum ada postingan kolaborasi</h4>
        <p className="mt-1 max-w-xs text-xs text-muted-foreground">
          Jadilah developer pertama yang membagikan kebutuhan tim side-project Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <CollaborationPostCard
          key={post.id}
          post={post}
          onContactClick={onContactAuthor}
        />
      ))}
    </div>
  );
}
