import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CreateUserInput, CreateUserSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAddUserMutation } from "@/hooks/useAddUserMutation";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { roles } from "@/stores/constants";

export const AddUserForm = () => {
  const navigate = useNavigate();
  const { mutate: addUser } = useAddUserMutation();

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      number_phone: "",
      role: "USER",
    }
  });

  const onSubmit: SubmitHandler<CreateUserInput> = (data) => {
    addUser(data, {
      onSuccess() {
        toast("L'utilisateur a bien été ajouté !");
        navigate("/users");
      },
      onError() {
        toast("Erreur lors de l'ajout de l'utilisateur, réessayez plus tard.");
      }
    })
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
          <CardFooter className="flex flex-wrap justify-between gap-2">
            <CardDescription>Un email contenant les informations de connexion sera envoyé au mail renseigné.</CardDescription>
            <Button variant="outline">Ajouter</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}