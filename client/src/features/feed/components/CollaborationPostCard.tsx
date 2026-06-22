import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import type { CollaborationPostView } from "@/features/feed/types";
import LookingForBadge from "./LookingForBadge";
import TechStackBadge from "./TechStackBadge";

export interface CollaborationPostCardProps {
  post: CollaborationPostView;
  onContactClick: (postId: string) => void;
}

export default function CollaborationPostCard({
  post,
  onContactClick,
}: CollaborationPostCardProps) {
  const hasGithub = Boolean(post.author.githubUrl);
  const displayHandle =
    post.author.githubUsername ??
    post.author.name.toLowerCase().replace(/\s+/g, "");

  return (
    <Card className="overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-border/80">
      <CardContent className="space-y-4 p-5 text-left">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 border-2 border-background ring-1 ring-border">
            <AvatarImage src={post.author.avatarUrl ?? undefined} alt={post.author.name} />
            <AvatarFallback className="bg-muted text-xs">
              {post.author.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-none">{post.author.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              @{displayHandle} · {post.createdAt}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight">{post.title}</h3>
          <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
            {post.description}
          </p>
        </div>

        {post.imageUrl && (
          <div className="flex max-h-80 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted">
            <img
              src={post.imageUrl}
              alt={`Ilustrasi proyek ${post.title}`}
              className="max-h-80 w-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <LookingForBadge role={post.looking_for} />
          {post.stacks.map((stack) => (
            <TechStackBadge key={`${post.id}-${stack}`} stack={stack} />
          ))}
        </div>

        <div className="border-t border-border/60 pt-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!hasGithub}
            onClick={() => onContactClick(post.id)}
            title={
              hasGithub
                ? "Buka profil GitHub author"
                : "Author belum menautkan GitHub"
            }
            className="rounded-lg font-semibold transition-colors duration-200 hover:bg-accent focus-visible:ring-ring"
          >
            <ExternalLink className="mr-1.5 h-4 w-4" />
            Hubungi via GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
