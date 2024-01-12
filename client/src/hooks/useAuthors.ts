import { getAuthors } from "@/lib/client";
import { useQuery } from "react-query"
import { useAuth } from "@/hooks/useAuth";

export const useAuthors = () => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: "authors",
    queryFn: getAuthors,
    enabled: !!user
  });
}