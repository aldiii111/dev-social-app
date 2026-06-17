import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Code2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SidebarNavigation from "@/features/feed/components/SidebarNavigation";
import CreatePostForm from "@/features/feed/components/CreatePostForm";
import PostList from "@/features/feed/components/PostList";
import TrendingWidget, { TrendingItem } from "@/features/feed/components/TrendingWidget";
import { PostItem } from "@/features/feed/components/PostCard";

export default function FeedPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<"feed" | "profile" | "addpost">("feed");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock Feed Data - Managed locally in the Orchestrator
  const [posts, setPosts] = useState<PostItem[]>([
    {
      id: "1",
      author: {
        id: "u1",
        name: "Sarah Jenkins",
        username: "sarah_js",
        avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=sarah",
      },
      content: "Exploring collaborative editor backends today. Building out WebSockets handlers with Express! Feel free to connect to join this project.",
      likesCount: 12,
      commentsCount: 3,
      isLiked: false,
      createdAt: "2 hrs ago",
    },
    {
      id: "2",
      author: {
        id: "u2",
        name: "Aris Munandar",
        username: "arismun",
        avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=aris",
      },
      content: "Just dockerized a Redis cluster locally for testing message brokers. Go microservices are running beautifully in clusters.",
      likesCount: 45,
      commentsCount: 19,
      isLiked: true,
      createdAt: "5 hrs ago",
    }
  ]);

  const trends: TrendingItem[] = [
    { tag: "react", postCount: 142 },
    { tag: "go", postCount: 88 },
    { tag: "websockets", postCount: 41 },
    { tag: "docker", postCount: 30 }
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCreatePost = async (content: string, imageFile?: File) => {
    setIsSubmitting(true);
    // Mimic API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newPost: PostItem = {
      id: Date.now().toString(),
      author: {
        id: user?.id || "u-guest",
        name: user?.name || "Guest Developer",
        username: user?.email ? user.email.split("@")[0] : "guest_dev",
        avatarUrl: user?.avatar_url || "https://api.dicebear.com/7.x/adventurer/svg?seed=guest",
      },
      content,
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : undefined,
      likesCount: 0,
      commentsCount: 0,
      isLiked: false,
      createdAt: "Just now",
    };

    setPosts([newPost, ...posts]);
    setIsSubmitting(false);
    setCurrentTab("feed"); // switch back to feed view on mobile/desktop
  };

  const handleLikePost = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const handleCommentClick = (postId: string) => {
    console.log(`Comment modal or view request for post: ${postId}`);
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(`#${tag}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 pb-20 md:pb-0 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">DevConnect</span>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center relative w-96">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts, technologies, or tags..."
            className="pl-9 pr-4 py-1.5 bg-secondary/50 border-zinc-200 dark:border-zinc-800 rounded-full text-sm focus-visible:ring-blue-500/30"
          />
        </div>

        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs">
          {user?.name?.slice(0, 2).toUpperCase() || "GD"}
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="max-w-7xl w-full mx-auto flex-1 flex px-4 lg:px-6 gap-6 pt-6">
        {/* Left Column (Navigation Sidebar) */}
        <SidebarNavigation
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          onLogout={handleLogout}
        />

        {/* Center Feed Column */}
        <main className="flex-1 max-w-2xl mx-auto space-y-6">
          {/* Conditional rendering based on navigation selection */}
          {currentTab === "feed" && (
            <>
              <div className="hidden md:block">
                <CreatePostForm onSubmit={handleCreatePost} isSubmitting={isSubmitting} />
              </div>
              <PostList
                posts={posts}
                isLoading={false}
                onLikePost={handleLikePost}
                onCommentPost={handleCommentClick}
              />
            </>
          )}

          {currentTab === "addpost" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-left">Create New Post</h2>
              <CreatePostForm onSubmit={handleCreatePost} isSubmitting={isSubmitting} />
            </div>
          )}

          {currentTab === "profile" && (
            <div className="text-left space-y-4">
              <h2 className="text-xl font-bold tracking-tight">Profile Playground</h2>
              <div className="border border-border p-6 rounded-2xl bg-card/65 backdrop-blur-md">
                <p className="font-semibold text-lg">{user?.name || "Guest Developer"}</p>
                <p className="text-sm text-muted-foreground">@{user?.email?.split("@")[0] || "guest"}</p>
                <p className="text-sm mt-3 text-zinc-600 dark:text-zinc-400">
                  Welcome to your developer profile sandbox. Real integration steps are outlined for customization.
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Right Column (Widget panel) */}
        <aside className="hidden lg:block w-80 shrink-0 space-y-6">
          <TrendingWidget
            trends={trends}
            isLoading={false}
            onTagClick={handleTagClick}
          />
        </aside>
      </div>
    </div>
  );
}
