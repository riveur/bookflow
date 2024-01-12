import { getCategories } from "@/lib/client";
import { useQuery } from "react-query"
import { useAuth } from "@/hooks/useAuth";

export const useCategories = () => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: "categories",
    queryFn: getCategories,
    enabled: !!user
  });
}