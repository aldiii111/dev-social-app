import { useSearchParams } from "react-router-dom";
import CreateCollaborationPostForm from "@/features/feed/components/CreateCollaborationPostForm";
import PostList from "@/features/feed/components/PostList";
import { usePosts, useCreatePost } from "@/hooks/queries/usePost";
import type {
  CollaborationPostView,
  CreateCollaborationPostValues,
} from "@/features/feed/types";
import { EMPTY_CREATE_POST_VALUES } from "@/features/feed/types";
import { useState } from "react";
import FetchError from "@/components/FetchError";
import SearchNotFound from "@/components/SearchNotFound";

export default function FeedPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";
  const [formValues, setFormValues] =
    useState<CreateCollaborationPostValues>(EMPTY_CREATE_POST_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();
  const { data: posts = [], isPending: isPostsLoading, isError } = usePosts();

  if (isError) {
    return <FetchError />
  }

  const handleFieldChange = <K extends keyof CreateCollaborationPostValues>(
    field: K,
    value: CreateCollaborationPostValues[K]
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const createPostMutation = useCreatePost();
  const handleCreatePost = () => {
    setIsSubmitting(true);
    setSubmitError(undefined);

    createPostMutation.mutate(formValues, {
      onSuccess: () => {
        setIsSubmitting(false);
      },
      onError: (error: any) => {
        setIsSubmitting(false);
        setSubmitError(error.response?.data?.message || "Terjadi Kesalahan");
      }
    })
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
      post.looking_for.toLowerCase().includes(query)
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
