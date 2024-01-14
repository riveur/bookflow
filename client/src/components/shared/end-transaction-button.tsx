import { useEndTransactionMutation } from "@/hooks/useEndTransactionMutation";
import { Transaction } from "@/lib/validation";
import * as React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangleIcon, LoaderIcon, SendIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EndTransactionButtonProps extends ButtonProps {
  transaction: Transaction,
}

export const EndTransactionButton = React.forwardRef<
  HTMLButtonElement,
  EndTransactionButtonProps
>(({ transaction, size = 'icon', variant = 'ghost', ...props }, ref) => {
  const { mutate: endTransaction, isLoading } = useEndTransactionMutation(transaction);

  const handleClick = () => {
    endTransaction(undefined, {
      onSuccess() {
        toast("Le livre a bien été rendu !");
      },
      onError() {
        toast("Une erreur est survenue, réessayez plus tard.", { icon: <AlertTriangleIcon className="h-4 w-4" /> });
      }
    });
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={ref}
            onClick={handleClick}
            size={size}
            variant={variant}
            {...props}
          >
            {isLoading && <LoaderIcon className="h-4 w-4 animate-spin" />}
            {!isLoading && <SendIcon className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Rendre le livre</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});