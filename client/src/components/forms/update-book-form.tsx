import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Book, CreateBookInput, CreateBookSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuthors } from "@/hooks/useAuthors";
import { useCategories } from "@/hooks/useCategories";
import { useUpdateBookMutation } from "@/hooks/useUpdateBookMutation";
import { toast } from "sonner";
import { useDeleteBookMutation } from "@/hooks/useDeleteBookMutation";
import { AlertDeleteBook } from "@/components/shared/alert-delete-book";
import { useNavigate } from "react-router-dom";

interface UpdateBookFormProps {
  book: Book;
}

export function UpdateBookForm({ book }: UpdateBookFormProps) {
  const navigate = useNavigate();
  const { data: authors } = useAuthors();
  const { data: categories } = useCategories();
  const { mutate: updateBook } = useUpdateBookMutation(book.isbn);
  const { mutate: deleteBook } = useDeleteBookMutation();
  const form = useForm<CreateBookInput>({
    resolver: zodResolver(CreateBookSchema),
    defaultValues: { ...book, category: "", author: "" }
  });

  const onSubmit: SubmitHandler<CreateBookInput> = (data) => {
    updateBook(data, {
      onSuccess(data) {
        form.reset(data);
        toast("Les modifications ont bien été enregistrées");
      }
    });
  }

  const onDeleteBook = () => {
    deleteBook(book.isbn, {
      onSuccess() {
        toast("Le livre a bien été supprimé");
        navigate('/');
      }
    });
  }

  return (
    <Form {...form}>
      <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="pt-6">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="isbn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(form.formState.errors.isbn && 'font-bold')}>Isbn</FormLabel>
                      <FormControl>
                        <Input placeholder="000-000-000-000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(form.formState.errors.title && 'font-bold')}>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="La belle et la bête" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="cover_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(form.formState.errors.cover_url && 'font-bold')}>Lien de la couverture</FormLabel>
                      <FormControl>
                        <Input placeholder="https://google.com/images/la-belle-et-la-bete.png" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col space-y-1.5 w-full">
                  <FormField
                    control={form.control}
                    name="author_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(form.formState.errors.author_id && 'font-bold')}>Auteur</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choissisez un auteur" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(authors || []).map((author) => (<SelectItem key={author.id} value={author.id}>{author.name}</SelectItem>))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(form.formState.errors.category_id && 'font-bold')}>Catégorie</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choisissez une catégorie" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(categories || []).map((category) => (<SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap justify-end gap-2">
            <AlertDeleteBook handleAction={onDeleteBook}>
              <Button variant="destructive">Supprimer</Button>
            </AlertDeleteBook>
            <Button variant="outline" disabled={!form.formState.isDirty}>Enregistrer les modifications</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}