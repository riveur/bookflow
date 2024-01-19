import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { TableCell, TableRow } from "@/components/ui/table";
import { CreateExampleInput, CreateExampleSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddBookExampleMutation } from "@/hooks/useAddBookExampleMutation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { exampleAvailability, exampleStates } from "@/stores/constants";

interface AddExampleFormProps {
  isbn: string
}

export const AddExampleForm: React.FC<AddExampleFormProps> = ({ isbn }) => {
  const { mutate: addExample } = useAddBookExampleMutation(isbn);

  const form = useForm<CreateExampleInput>({
    resolver: zodResolver(CreateExampleSchema),
    defaultValues: {
      available: true,
      state: "NEUF"
    }
  });

  const onSubmit: SubmitHandler<CreateExampleInput> = (data) => {
    addExample(data, {
      onSuccess() {
        form.reset();
        toast("Exemplaire ajouté !");
      }
    });
  }

  return (
    <Form {...form}>
      <TableRow>
        <TableCell className="p-2">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {exampleStates.map((state) => (<SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>
        <TableCell className="p-2">
          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {exampleAvailability.map((availability) => (<SelectItem key={availability.value.toString()} value={availability.value.toString()}>{availability.label}</SelectItem>))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>
        <TableCell className="p-2" colSpan={3}>
          <Button variant="outline" onClick={form.handleSubmit(onSubmit)}>Ajouter</Button>
        </TableCell>
      </TableRow>
    </Form>
  );
}