import * as React from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CreateUserInput, CreateUserSchema, User } from "@/lib/validation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useUpdateUserMutation } from "@/hooks/useUpdateUserMutation";
import { AlertDeleteUser } from "@/components/shared/alert-delete-user";
import { useDeleteUserMutation } from "@/hooks/useDeleteUserMutation";
import { useNavigate } from "react-router-dom";

const roles: Array<{ label: string, value: User['role'] }> = [
  { label: "Libraire", value: "LIBRARIAN" },
  { label: "Utilisateur", value: "USER" },
];

interface UpdateUserFormProps {
  user: User,
}

export const UpdateUserForm: React.FC<UpdateUserFormProps> = ({ user }) => {
  const navigate = useNavigate();
  const { mutate: updateUser } = useUpdateUserMutation(user.id);
  const { mutate: deleteUser } = useDeleteUserMutation();

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: user
  });

  const onSubmit: SubmitHandler<CreateUserInput> = (data) => {
    updateUser(data, {
      onSuccess(data) {
        toast("L'utilisateur a bien été modifié !");
        form.reset(data);
      },
      onError() {
        toast("Erreur lors de l'ajout de l'utilisateur, réessayez plus tard.");
      }
    })
  }

  const onDeleteUser = () => {
    deleteUser(user.id, {
      onSuccess() {
        toast("L'utilisateur a bien été supprimé");
        navigate('/users');
      }
    });
  }

  return (
    <Form {...form}>
      <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="pt-6">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col space-y-1.5 w-full">
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(form.formState.errors.lastname && 'font-bold')}>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(form.formState.errors.firstname && 'font-bold')}>Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col space-y-1.5 w-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(form.formState.errors.email && 'font-bold')}>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <FormField
                    control={form.control}
                    name="number_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(form.formState.errors.number_phone && 'font-bold')}>Numéro de téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="0693001122" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(form.formState.errors.address && 'font-bold')}>Adresse</FormLabel>
                      <FormControl>
                        <Input placeholder="100 Rue des inconnus" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-full">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(form.formState.errors.role && 'font-bold')}>Rôle</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choissisez un auteur" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((role) => (<SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap justify-end gap-2">
            <AlertDeleteUser handleAction={onDeleteUser}>
              <Button variant="destructive" type="button">Supprimer</Button>
            </AlertDeleteUser>
            <Button variant="outline" disabled={!form.formState.isDirty}>Enregistrer les modifications</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}