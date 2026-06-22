import { useAuth } from "@/hooks/useAuth";
import ProfileSummaryCard from "@/features/profile/components/ProfileSummaryCard";
import { usePostUser } from "@/hooks/queries/usePost";

export default function ProfilePage() {
  const { user } = useAuth();
  const { data: userPosts = [] } = usePostUser(user?.id);

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
    </div>
  );
}
