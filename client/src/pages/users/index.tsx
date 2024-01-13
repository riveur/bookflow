import { Loader } from "@/components/shared/loader";
import { UserList } from "@/components/shared/user-list";
import { buttonVariants } from "@/components/ui/button";
import { useUsers } from "@/hooks/useUsers";
import { Link } from "react-router-dom";

export default function UserIndexPage() {
  const {
    data: users,
    isSuccess: isSuccessUsers,
    isLoading: isLoadingUsers,
    isError: isErrorUsers
  } = useUsers();

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Liste des utilisateurs</h2>
        <Link to={`/users/add`} className={buttonVariants()}>Ajouter un utilisateur</Link>
      </div>
      {isLoadingUsers && (
        <Loader />
      )}
      {isErrorUsers && (
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="font-bold">Une erreur est survenue</p>
          </div>
        </div>
      )}
      {isSuccessUsers && (<UserList users={users} />)}
    </>
  );
}