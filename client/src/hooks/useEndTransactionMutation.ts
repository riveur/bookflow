import { endTransaction } from "@/lib/client";
import { Transaction } from "@/lib/validation";
import { useMutation, useQueryClient } from "react-query";

export const useEndTransactionMutation = (transaction: Transaction) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => endTransaction(transaction.user_id, transaction.id),
    onSuccess() {
      queryClient.invalidateQueries("my-transactions");
    }
  });
}