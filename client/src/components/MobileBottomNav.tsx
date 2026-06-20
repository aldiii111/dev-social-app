import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, User, LogOut, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function MobileBottomNav() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-border bg-background/95 px-4 backdrop-blur-lg md:hidden">
      <NavLink to="/feed">
        {({ isActive }) => (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Feed"
            className={`h-10 w-10 rounded-xl transition-colors duration-200 ${
              isActive ? "bg-secondary text-blue-500" : "text-muted-foreground"
            }`}
          >
            <Home className="h-5 w-5" />
          </Button>
        )}
      </NavLink>

      <NavLink to="/add-post">
        {({ isActive }) => (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Buat postingan"
            className={`h-10 w-10 rounded-xl transition-colors duration-200 ${
              isActive ? "bg-secondary text-blue-500" : "text-muted-foreground"
            }`}
          >
            <Plus className="h-5 w-5" />
          </Button>
        )}
      </NavLink>

      <NavLink to="/profile">
        {({ isActive }) => (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Profil"
            className={`h-10 w-10 rounded-xl transition-colors duration-200 ${
              isActive ? "bg-secondary text-blue-500" : "text-muted-foreground"
            }`}
          >
            <User className="h-5 w-5" />
          </Button>
        )}
      </NavLink>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleLogout}
        aria-label="Keluar"
        className="h-10 w-10 rounded-xl text-red-500 transition-colors duration-200 hover:bg-red-500/10"
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </nav>
  );
}
