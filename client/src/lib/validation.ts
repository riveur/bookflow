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
  isbn: z.string(),
  title: z.string(),
  cover_url: z.string(),
  author_id: z.string().optional(),
  category_id: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type User = z.infer<typeof UserSchema>;
export type Author = z.infer<typeof AuthorSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Book = z.infer<typeof BookSchema>;
export type Example = z.infer<typeof ExampleSchema>;
export type CreateBookInput = z.infer<typeof CreateBookSchema>;