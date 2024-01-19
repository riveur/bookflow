import { BorrowBookInput, BorrowBookSchema, Example } from "@/lib/validation"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import * as React from "react";
import format from "@/lib/date";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useBorrowBookMutation } from "@/hooks/useBorrowBookMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface BorrowBookFormProps extends React.HTMLAttributes<HTMLDivElement> {
  example: Example
}

export const BorrowBookForm: React.FC<BorrowBookFormProps> = ({ example, className, ...props }) => {
  const navigate = useNavigate();
  const { mutate: borrowBook } = useBorrowBookMutation(example.book_isbn);
  const form = useForm<BorrowBookInput>({
    resolver: zodResolver(BorrowBookSchema),
    defaultValues: {
      example_id: example.id,
      expected_return_date: new Date()
    }
  });

  const onSubmit: SubmitHandler<BorrowBookInput> = (data) => {
    borrowBook({
      example_id: data.example_id,
      expected_return_date: format(data.expected_return_date, "yyyy-MM-dd")
    }, {
      onSuccess: () => {
        toast("Livre emprunté avec succès");
        navigate('/');
      }
    });
  }

  return (
    <Form {...form}>
      <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
        <Card className={className} {...props}>
          <CardContent className="pt-6">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="expected_return_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className={cn(form.formState.errors.expected_return_date && 'font-bold')}>Date de retour</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date()
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Renseignez la date à laquelle vous comptez rendre l'exemplaire.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="secondary" disabled={!example.available}>{example.available ? "Emprunter" : "Indisponible"}</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}