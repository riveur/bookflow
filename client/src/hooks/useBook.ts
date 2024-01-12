import { useQuery } from "react-query"
import { useAuth } from "@/hooks/useAuth"
import { getBook } from "@/lib/client";

export const useBook = (isbn: string) => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: ["books", isbn],
    queryFn: () => getBook(isbn),
    enabled: !!user,
  });
}