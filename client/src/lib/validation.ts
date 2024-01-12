import { z } from "zod";
import format from "@/lib/date";

const dateType = z.string().transform((date) => format(date));

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const LoginResponseSchema = z.object({
  type: z.string(),
  token: z.string(),
  expires_at: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  address: z.string(),
  number_phone: z.string(),
  role: z.enum(['LIBRARIAN', 'USER']),
  created_at: z.string(),
  updated_at: z.string(),
  fullname: z.string(),
});

export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const AuthorsSchema = z.array(AuthorSchema);

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const CategoriesSchema = z.array(CategorySchema);

export const BookSchema = z.object({
  isbn: z.string(),
  title: z.string(),
  cover_url: z.string(),
  author_id: z.string(),
  category_id: z.string(),
  author: AuthorSchema,
  category: CategorySchema,
  created_at: dateType,
  updated_at: dateType,
  available_examples: z.string(),
  unavailable_examples: z.string(),
});

export const BooksSchema = z.array(BookSchema);

export const ExampleSchema = z.object({
  id: z.string(),
  state: z.enum(['NEUF', 'BON', 'MOYEN', 'MAUVAIS']),
  available: z.boolean(),
  book_isbn: z.string(),
  created_at: dateType,
  updated_at: dateType,
});

export const ExamplesSchema = z.array(ExampleSchema);

export const CreateBookSchema = z.object({
  isbn: z.string().min(1, { message: 'ISBN requis' }),
  title: z.string().min(1, { message: 'Titre requis' }),
  cover_url: z.string().min(1, { message: 'URL de la couverture requise' }),
  author_id: z.string().optional(),
  category_id: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
})
  .superRefine(({ author, category, author_id, category_id }, ctx) => {
    if ((!author || !author.length) && !author_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Auteur requis',
        path: ['author_id'],
      });
    }

    if ((!category || !category.length) && !category_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Catégorie requis',
        path: ['category_id'],
      });
    }
  });

export const BorrowBookSchema = z.object({
  expected_return_date: z.date(),
  example_id: z.string().min(1, { message: 'Example id is required' })
});

export const TransactionSchema = z.object({
  id: z.string(),
  date: dateType,
  expected_return_date: dateType,
  real_return_date: z.string().pipe(z.coerce.date()).optional(),
  status: z.enum(['EMPRUNTE', 'ATTENTE_RETOUR', 'RENDU']),
  example_id: z.string(),
  user_id: z.string(),
});

export const CreateExampleSchema = z.object({
  state: z.enum(['NEUF', 'BON', 'MOYEN', 'MAUVAIS']),
  available: z.enum(["true", "false"]).transform((value) => value === "true").or(z.boolean()),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type User = z.infer<typeof UserSchema>;
export type Author = z.infer<typeof AuthorSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Book = z.infer<typeof BookSchema>;
export type Example = z.infer<typeof ExampleSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type CreateBookInput = z.infer<typeof CreateBookSchema>;
export type BorrowBookInput = z.infer<typeof BorrowBookSchema>;
export type CreateExampleInput = z.infer<typeof CreateExampleSchema>;