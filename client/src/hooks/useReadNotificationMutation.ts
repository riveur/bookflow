import { readNotification } from "@/lib/client";
import { Notification } from "@/lib/validation";
import { useMutation, useQueryClient } from "react-query";

export const useReadNotificationMutation = (notification: Notification) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => readNotification(notification.user_id, notification.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications', notification.id]);
    }
  });
}