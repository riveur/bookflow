import ky from "ky";
import {
  AuthorsSchema,
  BookSchema,
  BooksSchema,
  CategoriesSchema,
  CreateBookInput,
  ExamplesSchema,
  LoginResponseSchema,
  UserSchema
} from "@/lib/validation";
import { useTokenStore } from "@/stores/useTokenStore";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const guestClient = ky.create({ prefixUrl: API_URL });

export const client = () => {
  const authToken = useTokenStore.getState();
  const headers = authToken.token.length && authToken.type.length ? { 'Authorization': `${authToken?.type} ${authToken?.token}` } : undefined;
  return ky.create({ prefixUrl: API_URL, headers: headers });
};

export async function login(email: string, password: string) {
  return guestClient.post('auth/login', { json: { email, password } }).json().then(LoginResponseSchema.parse);
}

export async function logout() {
  return client().get('auth/logout');
}

export async function getCurrentUserInformations() {
  return client().get('auth/me').json().then(UserSchema.parse);
}

export async function getBooks() {
  return client().get('books').json().then(BooksSchema.parse);
}

export async function getBook(isbn: string) {
  return client().get(`books/${isbn}`).json().then(BookSchema.parse);
}

export async function getBookExamples(isbn: string) {
  return client().get(`books/${isbn}/examples`).json().then(ExamplesSchema.parse);
}

export async function getAuthors() {
  return client().get('authors').json().then(AuthorsSchema.parse);
}

export async function getCategories() {
  return client().get('categories').json().then(CategoriesSchema.parse);
}

export async function addBook(data: CreateBookInput) {
  return client().post('books', { json: data }).json().then(BookSchema.omit({
    available_examples: true,
    unavailable_examples: true,
    author: true,
    category: true
  }).parse);
}

export async function updateBook(isbn: string, data: CreateBookInput) {
  return client().put(`books/${isbn}`, { json: data }).json().then(BookSchema.omit({
    available_examples: true,
    unavailable_examples: true,
    author: true,
    category: true
  }).parse);
}

export async function deleteBook(isbn: string) {
  return client().delete(`books/${isbn}`);
}