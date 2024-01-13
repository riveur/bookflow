import { addUser } from "@/lib/client";
import { useMutation, useQueryClient } from "react-query"

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess() {
      queryClient.invalidateQueries("users");
    }
  });
}