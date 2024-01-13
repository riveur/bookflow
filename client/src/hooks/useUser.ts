import { useQuery } from "react-query"
import { useAuth } from "@/hooks/useAuth"
import { getUser } from "@/lib/client";

export const useUser = (userId: string) => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
    enabled: !!user,
  });
}