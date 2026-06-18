import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface PostListSkeletonProps {
  count?: number;
}

export default function PostListSkeleton({ count = 3 }: PostListSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, index) => (
        <Card key={index} className="rounded-2xl border border-border bg-card p-5">
          <CardContent className="space-y-4 p-0">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full bg-muted" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-muted" />
                <Skeleton className="h-3 w-24 bg-muted" />
              </div>
            </div>
            <Skeleton className="h-5 w-3/4 bg-muted" />
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-5/6 bg-muted" />
            <div className="flex gap-2 pt-1">
              <Skeleton className="h-5 w-24 rounded-lg bg-muted" />
              <Skeleton className="h-5 w-16 rounded-lg bg-muted" />
              <Skeleton className="h-5 w-20 rounded-lg bg-muted" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
