import { Button } from "@/components/ui/button";
import { Home, User, LogOut, Sun, Moon, Plus } from "lucide-react";
import type { FeedTab } from "@/features/feed/types";

export interface SidebarNavigationProps {
  activeTab: FeedTab;
  onTabChange: (tab: FeedTab) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
}

export default function SidebarNavigation({
  activeTab,
  onTabChange,
  isDarkMode,
  onToggleTheme,
  onLogout,
}: SidebarNavigationProps) {
  const navItemClass = (tab: FeedTab) =>
    `w-full justify-start gap-3 rounded-xl px-4 py-5 text-sm font-medium transition-colors duration-200 cursor-pointer ${
      activeTab === tab
        ? "bg-secondary font-semibold text-foreground"
        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
    }`;

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-80px)] w-64 shrink-0 flex-col justify-between pb-6 md:flex">
      <nav className="space-y-1.5">
        <Button variant="ghost" onClick={() => onTabChange("feed")} className={navItemClass("feed")}>
          <Home className={`h-4 w-4 ${activeTab === "feed" ? "text-blue-500" : ""}`} />
          Feed / Home
        </Button>

        <Button variant="ghost" onClick={() => onTabChange("addpost")} className={navItemClass("addpost")}>
          <Plus className={`h-4 w-4 ${activeTab === "addpost" ? "text-blue-500" : ""}`} />
          Buat Postingan
        </Button>

        <Button variant="ghost" onClick={() => onTabChange("profile")} className={navItemClass("profile")}>
          <User className={`h-4 w-4 ${activeTab === "profile" ? "text-blue-500" : ""}`} />
          Profil Saya
        </Button>
      </nav>

      <div className="space-y-3 border-t border-border/60 pt-4">
        <Button
          variant="ghost"
          onClick={onToggleTheme}
          className="w-full justify-start gap-3 rounded-xl px-4 py-5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-accent/50 hover:text-foreground"
        >
          {isDarkMode ? (
            <>
              <Sun className="h-4 w-4 text-amber-500" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 text-zinc-500" />
              Dark Mode
            </>
          )}
        </Button>

        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start gap-3 rounded-xl px-4 py-5 text-sm font-medium text-red-500 transition-colors duration-200 hover:bg-red-500/10 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </Button>
      </div>
    </aside>
  );
}
