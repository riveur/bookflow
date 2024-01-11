import { buttonVariants } from "@/components/ui/button";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">{isRouteErrorResponse(error) ? error.status : '500'}</h1>
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Oops!</p>
        <p className="my-4 text-gray-500">Une erreur est survenue.</p>
        <Link to="/" className={buttonVariants({ variant: 'default' })}>Retour à l'accueil</Link>
      </div>
    </div>
  );
}