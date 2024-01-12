import { addBookExample } from "@/lib/client";
import { CreateExampleInput } from "@/lib/validation";
import { useMutation, useQueryClient } from "react-query";

export const useAddBookExampleMutation = (isbn: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExampleInput) => addBookExample(isbn, data),
    onSuccess() {
      queryClient.invalidateQueries(['books', isbn])
    },
  })
}