import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import FeedAppShell from "@/features/feed/components/FeedAppShell";
import FeedHeader from "@/features/feed/components/FeedHeader";
import SidebarNavigation from "@/features/feed/components/SidebarNavigation";
import MobileBottomNav from "@/features/feed/components/MobileBottomNav";
import FeedTabPanel from "@/features/feed/components/FeedTabPanel";
import AddPostTabPanel from "@/features/feed/components/AddPostTabPanel";
import ProfileTabPanel from "@/features/feed/components/ProfileTabPanel";
import CreateCollaborationPostForm from "@/features/feed/components/CreateCollaborationPostForm";
import PostList from "@/features/feed/components/PostList";
import { TrendingWidget } from "@/features/feed/components/TrendingWidget";
import ProfileSummaryCard from "@/features/profile/components/ProfileSummaryCard";
import type {
  CollaborationPostView,
  CreateCollaborationPostValues,
  FeedTab,
  TrendingTagView,
} from "@/features/feed/types";
import { EMPTY_CREATE_POST_VALUES } from "@/features/feed/types";

export default function FeedPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // --- UI state (orchestrator) ---
  const [activeTab, setActiveTab] = useState<FeedTab>("feed");
  const [searchQuery, setSearchQuery] = useState("");
  const [formValues, setFormValues] =
    useState<CreateCollaborationPostValues>(EMPTY_CREATE_POST_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  // --- Data slots: ISI via TanStack Query (lihat panduan di bawah) ---
  const posts: CollaborationPostView[] = [];
  const trends: TrendingTagView[] = [];
  const isPostsLoading = false;
  const isTrendsLoading = false;

  const handleFieldChange = <K extends keyof CreateCollaborationPostValues>(
    field: K,
    value: CreateCollaborationPostValues[K]
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleToggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  };

  const handleCreatePost = () => {
    // STEP 2: ganti dengan useMutation(createPost) — lihat panduan integrasi
    setIsSubmitting(true);
    setSubmitError(undefined);
    setIsSubmitting(false);
  };

  const handleContactAuthor = (postId: string) => {
    // STEP 1: cari post by id, buka author.githubUrl di tab baru
    const post = posts.find((item) => item.id === postId);
    if (post?.author.githubUrl) {
      window.open(post.author.githubUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleTrendingTagClick = (tag: string) => {
    setSearchQuery(`#${tag}`);
    setActiveTab("feed");
  };

  const filteredPosts = posts.filter((post) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().replace(/^#/, "");
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.stacks.some((stack) => stack.toLowerCase().includes(query)) ||
      post.lookingFor.toLowerCase().includes(query)
    );
  });

  const createForm = (
    <CreateCollaborationPostForm
      values={formValues}
      onFieldChange={handleFieldChange}
      onSubmit={handleCreatePost}
      isSubmitting={isSubmitting}
      errorMessage={submitError}
    />
  );

  const renderMainContent = () => {
    switch (activeTab) {
      case "feed":
        return (
          <FeedTabPanel
            showInlineForm
            createForm={createForm}
            postList={
              <PostList
                posts={filteredPosts}
                isLoading={isPostsLoading}
                onContactAuthor={handleContactAuthor}
              />
            }
          />
        );
      case "addpost":
        return <AddPostTabPanel createForm={createForm} />;
      case "profile":
        return (
          <ProfileTabPanel>
            <ProfileSummaryCard
              name={user?.name ?? "Developer"}
              email={user?.email ?? "dev@example.com"}
              avatarUrl={user?.avatar_url}
              githubUrl={user?.github_url}
              postCount={0}
            />
          </ProfileTabPanel>
        );
      default:
        return null;
    }
  };

  return (
    <FeedAppShell
      header={
        <FeedHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          userAvatarUrl={user?.avatar_url}
          userInitials={user?.name?.slice(0, 2).toUpperCase() ?? "DC"}
        />
      }
      sidebar={
        <SidebarNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
          onLogout={handleLogout}
        />
      }
      main={renderMainContent()}
      aside={
        <TrendingWidget
          trends={trends}
          isLoading={isTrendsLoading}
          onTagClick={handleTrendingTagClick}
        />
      }
      mobileNav={
        <MobileBottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
        />
      }
    />
  );
}
