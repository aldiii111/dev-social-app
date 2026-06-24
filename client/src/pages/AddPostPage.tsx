import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateCollaborationPostForm from "@/features/feed/components/CreateCollaborationPostForm";
import type { CreateCollaborationPostValues } from "@/features/feed/types";
import { EMPTY_CREATE_POST_VALUES } from "@/features/feed/types";
import { useCreatePost } from "@/hooks/queries/usePost";

export default function AddPostPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<CreateCollaborationPostValues>(EMPTY_CREATE_POST_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();

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
        setFormValues(EMPTY_CREATE_POST_VALUES);
        navigate("/feed")
      },
      onError: (error: any) => {
        setIsSubmitting(false);
        setSubmitError(error.response?.data?.message || "Terjadi Kesalahan");
      }
    })
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-left">Buat Postingan Baru</h1>
        <p className="text-sm text-muted-foreground text-left">Cari rekan kolaborasi untuk proyek hebatmu berikutnya.</p>
      </div>
      <CreateCollaborationPostForm
        values={formValues}
        onFieldChange={handleFieldChange}
        onSubmit={handleCreatePost}
        isSubmitting={isSubmitting}
        errorMessage={submitError}
      />
    </div>
  );
}