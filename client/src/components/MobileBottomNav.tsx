import { Button } from "@/components/ui/button";
import { Home, User, LogOut, Plus } from "lucide-react";
import type { FeedTab } from "@/features/feed/types";

export interface MobileBottomNavProps {
  activeTab: FeedTab;
  onTabChange: (tab: FeedTab) => void;
  onLogout: () => void;
}

export default function MobileBottomNav({
  activeTab,
  onTabChange,
  onLogout,
}: MobileBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-border bg-background/95 px-4 backdrop-blur-lg md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onTabChange("feed")}
        aria-label="Feed"
        className={`h-10 w-10 rounded-xl transition-colors duration-200 ${
          activeTab === "feed" ? "bg-secondary text-blue-500" : "text-muted-foreground"
        }`}
      >
        <Home className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onTabChange("addpost")}
        aria-label="Buat postingan"
        className={`h-10 w-10 rounded-xl transition-colors duration-200 ${
          activeTab === "addpost" ? "bg-secondary text-blue-500" : "text-muted-foreground"
        }`}
      >
        <Plus className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onTabChange("profile")}
        aria-label="Profil"
        className={`h-10 w-10 rounded-xl transition-colors duration-200 ${
          activeTab === "profile" ? "bg-secondary text-blue-500" : "text-muted-foreground"
        }`}
      >
        <User className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onLogout}
        aria-label="Keluar"
        className="h-10 w-10 rounded-xl text-red-500 transition-colors duration-200 hover:bg-red-500/10"
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </nav>
  );
}
