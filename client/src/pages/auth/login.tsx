import { LoginForm } from "@/components/forms/login-form";
import { useTokenStore } from "@/stores/useTokenStore";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const isLoggedIn = useTokenStore((state) => state.isLoggedIn);

  if(isLoggedIn()) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div className="container h-dvh flex flex-col items-center justify-center">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <h1 className="font-bold text-center text-3xl">Bookflow</h1>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Se connecter
              </h1>
              <p className="text-sm text-muted-foreground">
                Entrez vos identifiants pour vous connecter
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}