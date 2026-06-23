import { useAuth } from "@/hooks/useAuth";
import ProfileSummaryCard from "@/features/profile/components/ProfileSummaryCard";
import { usePostUser } from "@/hooks/queries/usePost";
import PostList from "@/features/feed/components/PostList";
import { useSearchParams } from "react-router-dom";


export default function ProfilePage() {
  const { user } = useAuth();
  const { data: userPosts = [], isPending: isPostsLoading } = usePostUser(user?.id);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";

  const handleContactAuthor = (postId: string) => {
    const post = userPosts.find((item) => item.id === postId);
    if(post?.author.githubUrl) {
      window.open(post.author.githubUrl, "_blank", "noopener,noreferrer")
    }
  };

  const filteredPosts = userPosts.filter((post) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().replace(/^#/, "");
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.stacks.some((stack) => stack.toLowerCase().includes(query)) ||
      post.looking_for.toLowerCase().includes(query)
    );
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-left">Profil Saya</h1>
        <p className="text-sm text-muted-foreground text-left">Kelola informasi profil dan riwayat kolaborasi Anda.</p>
      </div>
      <ProfileSummaryCard
        name={user?.name ?? "Developer"}
        email={user?.email ?? "dev@example.com"}
        avatarUrl={user?.avatar_url}
        githubUrl={user?.github_url}
        postCount={userPosts?.length ?? 0}
      />
      <PostList
        posts={filteredPosts}
        isLoading={isPostsLoading}
        onContactAuthor={handleContactAuthor}
      />
    </div>
  );
}
