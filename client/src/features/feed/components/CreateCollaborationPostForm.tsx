import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import type { CreateCollaborationPostValues } from "@/features/feed/types";
import LookingForSelectField from "./LookingForSelectField";
import TechStackTagInput from "./TechStackTagInput";

export interface CreateCollaborationPostFormProps {
  values: CreateCollaborationPostValues;
  onFieldChange: <K extends keyof CreateCollaborationPostValues>(
    field: K,
    value: CreateCollaborationPostValues[K]
  ) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

export default function CreateCollaborationPostForm({
  values,
  onFieldChange,
  onSubmit,
  isSubmitting,
  errorMessage,
  disabled = false,
}: CreateCollaborationPostFormProps) {
  const isFormDisabled = disabled || isSubmitting;
  const canSubmit =
    values.title.trim().length > 0 &&
    values.description.trim().length > 0 &&
    values.stacks.length > 0;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit || isFormDisabled) return;
    onSubmit();
  };

  return (
    <Card className="rounded-2xl border border-border bg-card p-4 md:p-6 transition-colors duration-200">
      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        <div className="space-y-2">
          <Label htmlFor="post-title" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Judul Proyek
          </Label>
          <Input
            id="post-title"
            value={values.title}
            onChange={(e) => onFieldChange("title", e.target.value)}
            disabled={isFormDisabled}
            placeholder="Contoh: Side-project SaaS dashboard untuk tim kecil"
            className="rounded-xl bg-background border-input focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="post-description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Deskripsi Kebutuhan
          </Label>
          <Textarea
            id="post-description"
            value={values.description}
            onChange={(e) => onFieldChange("description", e.target.value)}
            disabled={isFormDisabled}
            placeholder="Jelaskan ide proyek, komitmen waktu, dan partner seperti apa yang Anda cari…"
            className="min-h-[120px] resize-none rounded-xl bg-background border-input focus-visible:ring-ring"
          />
        </div>

        <LookingForSelectField
          value={values.looking_for}
          onChange={(value) => onFieldChange("looking_for", value)}
          disabled={isFormDisabled}
        />

        <TechStackTagInput
          stacks={values.stacks}
          onAdd={(stack) => onFieldChange("stacks", [...values.stacks, stack])}
          onRemove={(stack) =>
            onFieldChange(
              "stacks",
              values.stacks.filter((item) => item !== stack)
            )
          }
          disabled={isFormDisabled}
        />

        {errorMessage && (
          <p className="text-xs text-destructive" role="alert">
            {errorMessage}
          </p>
        )}

        <div className="flex justify-end border-t border-border/60 pt-4">
          <Button
            type="submit"
            disabled={isFormDisabled || !canSubmit}
            className="rounded-xl bg-primary text-primary-foreground font-semibold transition-colors duration-200 hover:bg-primary/90 focus-visible:ring-ring"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            {isSubmitting ? "Memposting…" : "Buat Postingan"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

/*
 * ARSITEKTUR IMAGE UPLOAD (future):
 * 1. Buat `PostImageAttachmentField.tsx` sebagai sub-komponen terpisah.
 * 2. Extend props form dengan `imagePreviewUrl?: string` + `onImageSelect?: (file: File) => void`.
 * 3. Render section gambar di atas tombol submit hanya jika `showImageSection={true}`.
 * 4. `CollaborationPostCard` sudah mendukung prop opsional `imageUrl`.
 */
