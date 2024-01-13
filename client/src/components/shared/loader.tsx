import { LoaderIcon } from "lucide-react";

export const Loader = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="font-bold">Chargement...</p>
        <p><LoaderIcon className="h-8 w-8 animate-spin" /></p>
      </div>
    </div>
  );
}