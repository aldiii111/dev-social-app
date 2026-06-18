import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface TechStackBadgeProps {
  stack: string;
  onClick?: (stack: string) => void;
  className?: string;
}

export default function TechStackBadge({ stack, onClick, className }: TechStackBadgeProps) {
  const isInteractive = Boolean(onClick);

  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-lg font-mono text-xs transition-colors duration-200",
        isInteractive && "cursor-pointer hover:bg-accent",
        className
      )}
      onClick={onClick ? () => onClick(stack) : undefined}
    >
      {stack}
    </Badge>
  );
}
