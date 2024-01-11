
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangleIcon, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoginInput, LoginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/lib/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTokenStore } from "@/stores/useTokenStore";
import { useLocation, useNavigate } from "react-router-dom";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function LoginForm({ className, ...props }: LoginFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const initTokenStore = useTokenStore((state) => state.init);

  const from = location.state?.from ?? "/";

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    setIsLoading(true);
    setError(null);

    login(data.email, data.password)
      .then((result) => {
        initTokenStore(result);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch(async (error) => {
        const data = await error.response.json();
        if (data.message) {
          setError(data.message);
        } else {
          setError(error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          {error && (
            <Alert variant="destructive">
              <AlertTriangleIcon className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...form.register("email")}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="password"
              placeholder="Mot de passe"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...form.register("password")}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Connexion
          </Button>
        </div>
      </form>
    </div>
  )
}