import { useSearchParams } from "react-router-dom";
import { Code2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

export default function FeedHeader() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if(value.trim()) {
      params.set("search", value)
    }else {
      params.delete("search")
    }

    setSearchParams(params, { replace: true })
  };
  
  const userInitials = user?.name?.slice(0, 2).toUpperCase() ?? "DC";

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md transition-colors duration-200">
      <div className="flex items-center gap-2.5">
        <div className="rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 p-1.5 text-white">
          <Code2 className="h-5 w-5" />
        </div>
        <span className="text-lg font-bold tracking-tight">DevConnect</span>
      </div>

      <div className="relative hidden w-96 items-center md:flex">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Cari proyek, stack, atau peran…"
          className="rounded-full border-zinc-200 bg-secondary/50 py-1.5 pl-9 pr-4 text-sm focus-visible:ring-blue-500/30 dark:border-zinc-800"
        />
      </div>

      <Avatar className="h-8 w-8 border border-border">
        <AvatarImage src={user?.avatar_url ?? undefined} alt="User avatar" />
        <AvatarFallback className="text-xs font-bold">{userInitials}</AvatarFallback>
      </Avatar>
    </header>
  );
}
