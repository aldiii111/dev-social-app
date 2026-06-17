import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Image as ImageIcon, Sparkles, AlertCircle } from "lucide-react";

export interface CreatePostFormProps {
  onSubmit: (content: string, imageFile?: File) => Promise<void>;
  isSubmitting: boolean;
}

export default function CreatePostForm({
  onSubmit,
  isSubmitting,
}: CreatePostFormProps) {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !selectedImage) return;

    try {
      await onSubmit(content, selectedImage || undefined);
      setContent("");
      removeImage();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <Card className="border border-border bg-card/65 backdrop-blur-md rounded-2xl shadow-sm p-4 transition-all duration-300">
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="space-y-2">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your project status, programming thoughts, or stack updates..."
            disabled={isSubmitting}
            className="w-full min-h-[100px] bg-transparent border-0 resize-none text-sm placeholder:text-zinc-500 py-1.5 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0 rounded-none shadow-none"
          />

          {/* Image preview space if selected */}
          {imagePreview && (
            <div className="relative rounded-xl overflow-hidden border border-border bg-muted max-h-60 flex items-center justify-center">
              <img
                src={imagePreview}
                alt="Selected preview"
                className="max-h-60 object-contain w-full"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={removeImage}
                className="absolute top-2 right-2 rounded-lg cursor-pointer h-7 px-2.5 text-xs"
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        {/* Form controls & attachments footer */}
        <div className="flex justify-between items-center border-t border-border/60 pt-3">
          <div className="flex items-center gap-1">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              id="post-image-file"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
              className="rounded-lg px-2.5 py-1.5 h-auto text-xs font-semibold text-zinc-500 hover:text-foreground hover:bg-accent/40 cursor-pointer flex items-center gap-1.5"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Image</span>
            </Button>
          </div>

          <Button
            type="submit"
            size="sm"
            disabled={isSubmitting || (!content.trim() && !selectedImage)}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer shadow-md shadow-blue-500/10 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>{isSubmitting ? "Posting..." : "Post"}</span>
          </Button>
        </div>
      </form>
    </Card>
  );
}
