import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import type { TrendingTagView } from "@/features/feed/types";

export interface TrendingWidgetProps {
  trends: TrendingTagView[];
  isLoading: boolean;
  onTagClick: (tag: string) => void;
}

export function TrendingWidget({
  trends,
  isLoading,
  onTagClick,
}: TrendingWidgetProps) {
  return (
    <Card className="rounded-2xl border border-border bg-card p-5 transition-colors duration-200">
      <h4 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-tight">
        <TrendingUp className="h-4 w-4 text-emerald-500" />
        Trending Technologies
      </h4>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center justify-between">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-3 w-12 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      ) : trends.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          Belum ada data trending. Data akan muncul setelah feed terhubung ke API.
        </p>
      ) : (
        <div className="space-y-3.5 text-left text-xs">
          {trends.map((item) => (
            <button
              key={item.tag}
              type="button"
              onClick={() => onTagClick(item.tag)}
              className="group flex w-full cursor-pointer items-center justify-between text-left transition-colors duration-200 hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span className="rounded-lg bg-secondary px-2.5 py-1 font-mono text-zinc-700 transition-colors duration-200 group-hover:bg-blue-500/10 group-hover:text-blue-500 dark:text-zinc-300">
                #{item.tag}
              </span>
              <span className="font-semibold text-muted-foreground">
                {item.postCount} posts
              </span>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
