import { addTransaction } from "@/lib/client"
import { useMutation, useQueryClient } from "react-query"

export const useBorrowBookMutation = (isbn: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTransaction,
    onSuccess() {
      queryClient.invalidateQueries(["books", isbn, "examples"]);
    }
  })
}