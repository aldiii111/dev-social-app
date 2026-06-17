import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2, CornerUpRight } from "lucide-react";
import { Post } from "./SidebarNavigation"; // We'll export the Post interface or redeclare it cleanly to resolve dependencies.

export interface Author {
  id: string;
  name: string;
  avatarUrl: string;
  username: string;
}

export interface PostItem {
  id: string;
  author: Author;
  content: string;
  imageUrl?: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  createdAt: string;
}

export interface PostCardProps {
  post: PostItem;
  onLike: (postId: string) => void;
  onCommentClick: (postId: string) => void;
}

export default function PostCard({
  post,
  onLike,
  onCommentClick,
}: PostCardProps) {
  return (
    <Card className="border border-border bg-card/65 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-200 dark:hover:border-zinc-800 shadow-sm">
      <CardContent className="p-5 space-y-4">
        {/* Post Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-background ring-2 ring-border">
              <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
              <AvatarFallback className="bg-zinc-800 text-zinc-100 text-xs">
                {post.author.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <h4 className="font-bold text-sm leading-none">{post.author.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                @{post.author.username} • {post.createdAt}
              </p>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="space-y-3 text-left">
          <p className="text-sm text-foreground/90 leading-relaxed font-light whitespace-pre-wrap">
            {post.content}
          </p>

          {/* Optional Attached Image */}
          {post.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-border bg-muted max-h-96 flex items-center justify-center">
              <img
                src={post.imageUrl}
                alt="Post attachment"
                className="max-h-96 w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Post Action Footer */}
        <div className="flex items-center justify-between border-t border-border/40 pt-3">
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(post.id)}
              className={`rounded-lg h-8 px-3 text-xs font-semibold cursor-pointer transition-colors ${
                post.isLiked
                  ? "text-red-500 bg-red-500/10 hover:bg-red-500/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
              }`}
            >
              <Heart className={`w-4 h-4 mr-1.5 ${post.isLiked ? "fill-red-500" : ""}`} />
              <span>{post.likesCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCommentClick(post.id)}
              className="rounded-lg h-8 px-3 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-accent/40 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 mr-1.5" />
              <span>{post.commentsCount}</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="rounded-lg h-8 px-3 text-xs font-bold text-blue-500 hover:text-blue-600 hover:bg-blue-500/10 cursor-pointer flex items-center gap-1"
          >
            <span>Connect</span>
            <CornerUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
