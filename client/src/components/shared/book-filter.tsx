import { useAuthors } from "@/hooks/useAuthors"
import { useCategories } from "@/hooks/useCategories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useBooks } from "@/hooks/useBooks";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

interface BookFilterInput {
  q?: string;
  category?: string;
  author?: string
}

export const BookFilter = () => {
  const { data: authors } = useAuthors();
  const { data: categories } = useCategories();
  const { setFilters } = useBooks();

  const { watch, ...form } = useForm<BookFilterInput>({
    defaultValues: {
      q: '',
      category: '',
      author: ''
    }
  });

  useEffect(() => {
    const subscription = watch((values) => {
      const searchParams = Object.fromEntries(Object.entries(values).filter(([, value]) => value !== undefined && value.length));
      setFilters(searchParams);
    });

    return () => {
      subscription.unsubscribe();
    }
  }, [watch, setFilters]);

  return (
    <Form watch={watch} {...form}>
      <FormField
        control={form.control}
        name="q"
        render={({ field }) => (
          <FormItem className="flex-grow">
            <FormControl>
              <Input placeholder="Rechercher..." {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="author"
        render={({ field }) => (
          <FormItem className="flex-grow">
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Auteur" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {(authors || []).map((author) => (<SelectItem key={author.id} value={author.name}>{author.name}</SelectItem>))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="flex-grow">
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {(categories || []).map((category) => (<SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      {form.formState.isDirty && (
        <Button variant="outline" size="icon" type="button" onClick={() => form.reset()}>
          <TrashIcon className="w-4 h-4" />
        </Button>
      )}
    </Form>
  );
}