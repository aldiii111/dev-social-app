import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link2 } from "lucide-react";

export interface ProfileSummaryCardProps {
  name: string;
  email: string;
  avatarUrl?: string | null;
  githubUrl?: string | null;
  postCount?: number;
}

export default function ProfileSummaryCard({
  name,
  email,
  avatarUrl,
  githubUrl,
  postCount = 0,
}: ProfileSummaryCardProps) {
  const username = email.split("@")[0];

  return (
    <Card className="rounded-2xl border border-border bg-card p-6 transition-colors duration-200">
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14 border-2 border-background ring-1 ring-border">
          <AvatarImage src={avatarUrl ?? undefined} alt={name} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 text-left">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">@{username}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {postCount} postingan kolaborasi
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-3 py-2 text-sm">
        <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="truncate text-blue-600 transition-colors duration-200 hover:underline dark:text-blue-400"
          >
            {githubUrl}
          </a>
        ) : (
          <span className="text-muted-foreground">
            GitHub belum ditautkan — integrasikan via PATCH /users/me
          </span>
        )}
      </div>
    </Card>
  );
}

/*
 * STEP INTEGRASI (Anda kerjakan nanti):
 * - Tambahkan `GithubLinkField` untuk edit github_url
 * - Tambahkan `UserPostHistoryList` yang menerima CollaborationPostView[]
 */
