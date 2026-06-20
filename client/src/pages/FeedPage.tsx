import { useSearchParams } from "react-router-dom";
import CreateCollaborationPostForm from "@/features/feed/components/CreateCollaborationPostForm";
import PostList from "@/features/feed/components/PostList";
import type {
  CollaborationPostView,
  CreateCollaborationPostValues,
} from "@/features/feed/types";
import { EMPTY_CREATE_POST_VALUES } from "@/features/feed/types";
import { useState } from "react";

export default function FeedPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";

  const [formValues, setFormValues] =
    useState<CreateCollaborationPostValues>(EMPTY_CREATE_POST_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();

  // --- Data slots: ISI via TanStack Query (lihat panduan di bawah) ---
  const posts: CollaborationPostView[] = [];
  const isPostsLoading = false;

  const handleFieldChange = <K extends keyof CreateCollaborationPostValues>(
    field: K,
    value: CreateCollaborationPostValues[K]
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
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

  return (
    <div className="space-y-6">
      <CreateCollaborationPostForm
        values={formValues}
        onFieldChange={handleFieldChange}
        onSubmit={handleCreatePost}
        isSubmitting={isSubmitting}
        errorMessage={submitError}
      />
      <PostList
        posts={filteredPosts}
        isLoading={isPostsLoading}
        onContactAuthor={handleContactAuthor}
      />
    </div>
  );
}
