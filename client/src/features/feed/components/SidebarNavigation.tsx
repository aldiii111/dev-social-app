import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, User, LogOut, Sun, Moon, Plus } from "lucide-react";

export interface SidebarNavigationProps {
  currentTab: "feed" | "profile" | "addpost";
  onTabChange: (tab: "feed" | "profile" | "addpost") => void;
  onLogout: () => void;
}

export default function SidebarNavigation({
  currentTab,
  onTabChange,
  onLogout,
}: SidebarNavigationProps) {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  return (
    <>
      {/* Desktop Navigation Sidebar (Column 1) */}
      <aside className="hidden md:flex flex-col justify-between w-64 shrink-0 h-[calc(100vh-80px)] sticky top-20 pb-6">
        <div className="space-y-6">
          <nav className="space-y-1.5">
            <Button
              variant="ghost"
              onClick={() => onTabChange("feed")}
              className={`w-full justify-start gap-3 text-sm font-medium py-5 px-4 rounded-xl transition-all duration-200 cursor-pointer ${
                currentTab === "feed"
                  ? "bg-secondary text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              <Home className={`w-4 h-4 ${currentTab === "feed" ? "text-blue-500" : ""}`} />
              Feed / Home
            </Button>

            <Button
              variant="ghost"
              onClick={() => onTabChange("profile")}
              className={`w-full justify-start gap-3 text-sm font-medium py-5 px-4 rounded-xl transition-all duration-200 cursor-pointer ${
                currentTab === "profile"
                  ? "bg-secondary text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              <User className={`w-4 h-4 ${currentTab === "profile" ? "text-blue-500" : ""}`} />
              My Profile
            </Button>

            <Button
              variant="ghost"
              onClick={() => onTabChange("addpost")}
              className={`w-full justify-start gap-3 text-sm font-medium py-5 px-4 rounded-xl transition-all duration-200 cursor-pointer ${
                currentTab === "addpost"
                  ? "bg-secondary text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              <Plus className={`w-4 h-4 ${currentTab === "addpost" ? "text-blue-500" : ""}`} />
              Create Post
            </Button>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="space-y-3 pt-4 border-t border-border/60">
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="w-full justify-start gap-3 text-sm font-medium py-5 px-4 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl cursor-pointer"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-zinc-500" />
                <span>Dark Mode</span>
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start gap-3 text-sm font-medium py-5 px-4 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-xl cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (h-16 fixed) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-lg border-t border-border flex justify-around items-center px-4 z-40">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onTabChange("feed")}
          className={`rounded-xl h-10 w-10 transition-colors ${
            currentTab === "feed" ? "text-blue-500 bg-secondary/80" : "text-muted-foreground"
          }`}
        >
          <Home className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onTabChange("addpost")}
          className={`rounded-xl h-10 w-10 transition-colors ${
            currentTab === "addpost" ? "text-blue-500 bg-secondary/80" : "text-muted-foreground"
          }`}
        >
          <Plus className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onTabChange("profile")}
          className={`rounded-xl h-10 w-10 transition-colors ${
            currentTab === "profile" ? "text-blue-500 bg-secondary/80" : "text-muted-foreground"
          }`}
        >
          <User className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onLogout}
          className="rounded-xl h-10 w-10 text-red-500 hover:bg-red-500/10"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </nav>
    </>
  );
}
