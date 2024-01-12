import { addBook } from "@/lib/client";
import { Author, Category } from "@/lib/validation";
import { useMutation, useQueryClient } from "react-query";

export function useAddBookMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBook,
    onSuccess(data) {

      queryClient.invalidateQueries("books");
      const authors = queryClient.getQueryData<Author[]>("authors");
      const categories = queryClient.getQueryData<Category[]>("categories");

      if (authors && !authors.find(author => author.id === data.author_id)) {
        queryClient.invalidateQueries("authors");
      }

      if (categories && !categories.find(category => category.id === data.category_id)) {
        queryClient.invalidateQueries("categories");
      }
    }
  });
}