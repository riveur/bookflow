import { useAuth } from "@/hooks/useAuth";
import { readNotification } from "@/lib/client";
import { useMutation, useQueryClient } from "react-query";

export const useReadNotificationMutation = () => {
  const { data: user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => readNotification(user!.id, notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications', user?.id]);
    }
  });
}