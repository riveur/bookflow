import { useQuery } from "react-query";
import { useAuth } from "@/hooks/useAuth";
import { getMyTransactions } from "@/lib/client";

export const useMyTransactions = () => {
  const { data: user } = useAuth();

  return useQuery({
    queryKey: "my-transactions",
    queryFn: getMyTransactions,
    enabled: !!user,
  });
}