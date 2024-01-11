import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/client";
import { useTokenStore } from "@/stores/useTokenStore";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
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
      <div className="container flex items-center justify-between h-full">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Bookflow</h1>
        </div>
        {isLoggedIn() && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost"><User className="h-6 w-6" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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