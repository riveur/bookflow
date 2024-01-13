import { UpdateUserForm } from "@/components/forms/update-user-form";
import { Loader } from "@/components/shared/loader";
import { useUser } from "@/hooks/useUser";
import { useParams } from "react-router-dom";

export default function UserShowPage() {
  const params = useParams();
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    isSuccess: isSuccessUser
  } = useUser(params.id!);

  if (isLoadingUser) {
    return (
      <Loader />
    );
  }

  if (isErrorUser || !isSuccessUser) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="font-bold">Une erreur est survenue</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <UpdateUserForm user={user} />
    </>
  );
}