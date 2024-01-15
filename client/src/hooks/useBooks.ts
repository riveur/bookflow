import { useQuery } from "react-query"
import { useAuth } from "@/hooks/useAuth"
import { getBooks } from "@/lib/client";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { Book } from "@/lib/validation";

export const useBooks = () => {
  const { data: user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterCallback = useCallback((books: Book[]) => {
    return books.filter((book) => {

      const hasAuthorAndCategory = searchParams.has("author") && searchParams.has("category");
      const hasOnlyAuthor = searchParams.has("author") && !searchParams.has("category");
      const hasOnlyCategory = !searchParams.has("author") && searchParams.has("category");
      const hasQuery = searchParams.has("q");
      const isMatchingQuery = book.title.toLowerCase().includes(searchParams.get("q")?.toLowerCase() ?? "");

      if (!searchParams.size) {
        return true;
      }

      if (hasAuthorAndCategory) {
        return (book.author.name.toLowerCase().includes(searchParams.get("author")!.toLowerCase()) &&
          book.category.name.toLowerCase().includes(searchParams.get("category")!.toLowerCase())) &&
          isMatchingQuery;
      }

      if (!hasQuery && (!hasOnlyAuthor && !hasOnlyCategory)) {
        return false;
      }

      if (hasOnlyAuthor) {
        return book.author.name.toLowerCase().includes(searchParams.get("author")!.toLowerCase()) && isMatchingQuery;
      }

      if (hasOnlyCategory) {
        return book.category.name.toLowerCase().includes(searchParams.get("category")!.toLowerCase()) && isMatchingQuery;
      }

      return isMatchingQuery;

    });
  }, [searchParams]);

  const query = useQuery({
    queryKey: ["books", searchParams],
    queryFn: getBooks,
    enabled: !!user,
    select: filterCallback,
  });

  return { ...query, setFilters: setSearchParams };
}