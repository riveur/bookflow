import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/lib/client";
import { cn } from "@/lib/utils";
import { useTokenStore } from "@/stores/useTokenStore";
import { HomeIcon, LogOut, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const { data: user, roleIs } = useAuth();
  const isLoggedIn = useTokenStore(state => state.isLoggedIn);
  const resetTokenStore = useTokenStore(state => state.reset);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        resetTokenStore();
        navigate('/login', { replace: true });
      });
  }
  return (
    <header className="border-b h-16">
      <div className="container flex items-center justify-between h-full gap-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="hidden md:block text-2xl font-bold">Bookflow</Link>
          <Link to="/" className="md:hidden"><HomeIcon className="h-6 w-6" /></Link>
          <div className="flex gap-2">
            {roleIs('LIBRARIAN') && <NavLink className={({ isActive }) => cn(badgeVariants({ variant: isActive ? "default" : "outline" }), "text-base")} to="/users">Utilisateurs</NavLink>}
            <NavLink className={({ isActive }) => cn(badgeVariants({ variant: isActive ? "default" : "outline" }), "text-base")} to="/borrows">Emprunts</NavLink>
          </div>
        </div>
        {(isLoggedIn() && user) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost"><User className="h-6 w-6" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.fullname}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}