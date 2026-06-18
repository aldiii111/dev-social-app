import { useState, type KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import TechStackBadge from "./TechStackBadge";

export interface TechStackTagInputProps {
  stacks: string[];
  onAdd: (stack: string) => void;
  onRemove: (stack: string) => void;
  disabled?: boolean;
  maxStacks?: number;
}

export default function TechStackTagInput({
  stacks,
  onAdd,
  onRemove,
  disabled = false,
  maxStacks = 8,
}: TechStackTagInputProps) {
  const [draft, setDraft] = useState("");

  const commitDraft = () => {
    const normalized = draft.trim();
    if (!normalized || disabled) return;
    if (stacks.length >= maxStacks) return;
    if (stacks.some((s) => s.toLowerCase() === normalized.toLowerCase())) {
      setDraft("");
      return;
    }
    onAdd(normalized);
    setDraft("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commitDraft();
    }
  };

  return (
    <div className="space-y-2 text-left">
      <Label htmlFor="tech-stack-input" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Tech Stack
      </Label>

      <div className="flex gap-2">
        <Input
          id="tech-stack-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitDraft}
          disabled={disabled || stacks.length >= maxStacks}
          placeholder="Ketik stack lalu Enter (React, Node.js, …)"
          className="rounded-xl bg-background border-input focus-visible:ring-ring"
        />
        <Button
          type="button"
          variant="outline"
          onClick={commitDraft}
          disabled={disabled || !draft.trim() || stacks.length >= maxStacks}
          className="shrink-0 rounded-xl transition-colors duration-200"
        >
          Tambah
        </Button>
      </div>

      {stacks.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {stacks.map((stack) => (
            <span key={stack} className="inline-flex items-center gap-1">
              <TechStackBadge stack={stack} />
              <button
                type="button"
                onClick={() => onRemove(stack)}
                disabled={disabled}
                aria-label={`Hapus ${stack}`}
                className="rounded-md p-0.5 text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        {stacks.length}/{maxStacks} stack ditambahkan
      </p>
    </div>
  );
}
