import { useAuth } from "@/hooks/useAuth";
import { getUsers } from "@/lib/client";
import { useQuery } from "react-query";

export const useUsers = () => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: "users",
    queryFn: getUsers,
    enabled: !!user,
  });
}