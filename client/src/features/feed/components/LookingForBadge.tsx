import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LookingFor } from "@/types";

const ROLE_STYLES: Record<LookingFor, string> = {
  Frontend: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  Backend: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20",
  "UI/UX": "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20",
  Fullstack: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  Mobile: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
  DevOps: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
};

export interface LookingForBadgeProps {
  role: LookingFor;
  className?: string;
}

export default function LookingForBadge({ role, className }: LookingForBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-lg text-xs font-semibold transition-colors duration-200",
        ROLE_STYLES[role],
        className
      )}
    >
      Butuh {role}
    </Badge>
  );
}
