import { User } from "@/lib/validation";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { EyeIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

interface UserListProps {
  users: User[],
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom complet</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Adresse</TableHead>
          <TableHead>Numéro de tel.</TableHead>
          <TableHead>Rôle</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length !== 0 && users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.fullname}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.address}</TableCell>
            <TableCell>{user.number_phone}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Link className={buttonVariants({size: "icon", variant: "ghost"})} to={`/users/${user.id}`}>
                <EyeIcon className="h-4 w-4" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
        {users.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">Aucun utilisateur</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}