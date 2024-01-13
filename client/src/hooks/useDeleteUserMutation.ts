import { deleteUser } from "@/lib/client";
import { useMutation, useQueryClient } from "react-query";

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess(_, userId) {
      queryClient.invalidateQueries("users");
      queryClient.invalidateQueries(["users", userId]);
    }
  });
}