import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CreateBookInput, CreateBookSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuthors } from "@/hooks/useAuthors";
import { useCategories } from "@/hooks/useCategories";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAddBookMutation } from "@/hooks/useAddBookMutation";
import { useNavigate } from "react-router-dom";

export function CreateBookForm() {
  const navigate = useNavigate();
  const { data: authors } = useAuthors();
  const { data: categories } = useCategories();
  const { mutate: addBook } = useAddBookMutation();
  const form = useForm<CreateBookInput>({
    resolver: zodResolver(CreateBookSchema),
    defaultValues: {
      isbn: "",
      title: "",
      cover_url: "",
      author: "",
      category: ""
    }
  });

  const [isNewAuthor, setIsNewAuthor] = useState(false);
  const [isNewCategory, setIsNewCategory] = useState(false);

  const handleChangeNewAuthor = (value: boolean) => {
    form.resetField(value ? 'author_id' : 'author');
    setIsNewAuthor(value);
  }

  const handleChangeNewCategory = (value: boolean) => {
    form.resetField(value ? 'category_id' : 'category');
    setIsNewCategory(value);
  }

  const onSubmit: SubmitHandler<CreateBookInput> = (data) => {
    addBook(data, {
      onSuccess(data) {
        navigate(`/books/${data.isbn}`);
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
                  <div className="flex items-center space-x-2">
                    <Switch id="new-author-mode" checked={isNewAuthor} onCheckedChange={handleChangeNewAuthor} />
                    <Label htmlFor="new-author-mode">Nouvel auteur ?</Label>
                  </div>
                  {isNewAuthor ? (
                    <FormField
                      control={form.control}
                      name="author"
                      render={() => (
                        <FormItem>
                          <FormLabel className={cn(form.formState.errors.author && 'font-bold')}>Auteur</FormLabel>
                          <FormControl>
                            <Input placeholder="Jean Dupont" {...form.register('author')} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
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
                  )}
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <div className="flex items-center space-x-2">
                    <Switch id="new-category-mode" checked={isNewCategory} onCheckedChange={handleChangeNewCategory} />
                    <Label htmlFor="new-category-mode">Nouvelle catégorie ?</Label>
                  </div>
                  {isNewCategory ? (
                    <FormField
                      control={form.control}
                      name="category"
                      render={() => (
                        <FormItem>
                          <FormLabel className={cn(form.formState.errors.category && 'font-bold')}>Catégorie</FormLabel>
                          <FormControl>
                            <Input placeholder="Roman" {...form.register('category')} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
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
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline">Ajouter</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}