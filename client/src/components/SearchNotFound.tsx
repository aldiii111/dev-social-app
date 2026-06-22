import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SearchNotFoundProps {
  query: string;
  onClearSearch: () => void;
}

export default function SearchNotFound({
  query,
  onClearSearch,
}: SearchNotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/20 p-12 text-center transition-colors duration-200">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Search className="h-5 w-5" />
      </div>
      <h4 className="text-sm font-bold text-foreground">
        Pencarian tidak ditemukan
      </h4>
      <p className="mt-2 max-w-sm text-xs text-muted-foreground">
        Tidak ada hasil kolaborasi yang cocok dengan pencarian{" "}
        <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[11px] font-semibold text-foreground">
          "{query}"
        </span>
        . Coba gunakan kata kunci atau teknologi lain.
      </p>
      <Button
        onClick={onClearSearch}
        variant="secondary"
        size="sm"
        className="mt-5 cursor-pointer text-xs gap-1.5 transition-all duration-200"
      >
        <X className="h-3 w-3" />
        Hapus Pencarian
      </Button>
    </div>
  );
}
