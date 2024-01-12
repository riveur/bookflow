import { useQuery } from "react-query"
import { useAuth } from "@/hooks/useAuth"
import { getBooks } from "@/lib/client";

export const useBooks = () => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: "books",
    queryFn: getBooks,
    enabled: !!user,
  });
}