import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, User, LogOut, Sun, Moon, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function SidebarNavigation() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const handleToggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-80px)] w-64 shrink-0 flex-col justify-between pb-6 md:flex">
      <nav className="space-y-1.5">
        <NavLink to="/feed">
          {({ isActive }) => (
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 rounded-xl px-4 py-5 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                isActive
                  ? "bg-secondary font-semibold text-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              <Home className={`h-4 w-4 ${isActive ? "text-blue-500" : ""}`} />
              Feed / Home
            </Button>
          )}
        </NavLink>

        <NavLink to="/add-post">
          {({ isActive }) => (
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 rounded-xl px-4 py-5 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                isActive
                  ? "bg-secondary font-semibold text-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              <Plus className={`h-4 w-4 ${isActive ? "text-blue-500" : ""}`} />
              Buat Postingan
            </Button>
          )}
        </NavLink>

        <NavLink to="/profile">
          {({ isActive }) => (
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 rounded-xl px-4 py-5 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                isActive
                  ? "bg-secondary font-semibold text-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              <User className={`h-4 w-4 ${isActive ? "text-blue-500" : ""}`} />
              Profil Saya
            </Button>
          )}
        </NavLink>
      </nav>

      <div className="space-y-3 border-t border-border/60 pt-4">
        <Button
          variant="ghost"
          onClick={handleToggleTheme}
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
          onClick={handleLogout}
          className="w-full justify-start gap-3 rounded-xl px-4 py-5 text-sm font-medium text-red-500 transition-colors duration-200 hover:bg-red-500/10 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </Button>
      </div>
    </aside>
  );
}
