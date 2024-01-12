import { deleteBook } from "@/lib/client";
import { useMutation, useQueryClient } from "react-query";

export function useDeleteBookMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,
    onSuccess(_, isbn) {
      queryClient.invalidateQueries("books");
      queryClient.invalidateQueries(["books", isbn]);
    }
  });
}