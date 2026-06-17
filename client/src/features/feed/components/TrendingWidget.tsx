import React from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Skeleton } from "lucide-react";

export interface TrendingItem {
  tag: string;
  postCount: number;
}

export interface TrendingWidgetProps {
  trends: TrendingItem[];
  isLoading: boolean;
  onTagClick: (tag: string) => void;
}

export default function TrendingWidget({
  trends,
  isLoading,
  onTagClick,
}: TrendingWidgetProps) {
  return (
    <Card className="border border-border bg-card/45 backdrop-blur-md rounded-2xl p-5">
      <h4 className="font-bold text-sm tracking-tight mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-emerald-500" />
        Trending Technologies
      </h4>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex justify-between items-center">
              <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-3 w-12 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3.5 text-xs text-left">
          {trends.map((item) => (
            <button
              key={item.tag}
              onClick={() => onTagClick(item.tag)}
              className="flex justify-between items-center w-full group hover:text-blue-500 cursor-pointer transition-colors text-left"
            >
              <span className="font-mono bg-secondary px-2.5 py-1 rounded-lg text-zinc-700 dark:text-zinc-300 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors">
                #{item.tag}
              </span>
              <span className="text-muted-foreground font-semibold">
                {item.postCount} posts
              </span>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
