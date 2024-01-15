import { useAuth } from "@/hooks/useAuth";
import { getUserNotifications } from "@/lib/client";
import { useQuery } from "react-query";

export const useMyNotifications = () => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: () => getUserNotifications(user!.id),
    enabled: !!user,
  });
}