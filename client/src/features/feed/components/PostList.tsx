import React from "react";
import PostCard, { PostItem } from "./PostCard";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface PostListProps {
  posts: PostItem[];
  isLoading: boolean;
  onLikePost: (postId: string) => void;
  onCommentPost: (postId: string) => void;
}

export default function PostList({
  posts,
  isLoading,
  onLikePost,
  onCommentPost,
}: PostListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <Card key={n} className="border border-border bg-card/65 p-5 rounded-2xl">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border rounded-2xl bg-card/20 text-center">
        <AlertCircle className="w-10 h-10 text-muted-foreground mb-3" />
        <h4 className="font-bold text-base">No posts yet</h4>
        <p className="text-xs text-muted-foreground max-w-xs mt-1">
          Be the first to share your status or collaborating interests with other developers!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={onLikePost}
          onCommentClick={onCommentPost}
        />
      ))}
    </div>
  );
}
