import ky from "ky";
import {
  AuthorsSchema,
  BookSchema,
  BooksSchema,
  CategoriesSchema,
  CreateBookInput,
  CreateExampleInput,
  CreateUserInput,
  ExampleSchema,
  ExamplesSchema,
  LoginResponseSchema,
  NotificationsSchema,
  StoredTransactionSchema,
  TransactionsSchema,
  UserSchema,
  UsersSchema
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

export async function getBookExample(isbn: string, exampleId: string) {
  return client().get(`books/${isbn}/examples/${exampleId}`).json().then(ExampleSchema.parse);
}

export async function addBookExample(isbn: string, data: CreateExampleInput) {
  return client().post(`books/${isbn}/examples`, { json: data }).json().then(ExampleSchema.parse);
}

export async function addTransaction(data: { example_id: string, expected_return_date: string }) {
  return client().post('transactions', { json: data }).json().then(StoredTransactionSchema.parse);
}

export async function getMyTransactions() {
  return client().get('transactions').json().then(TransactionsSchema.parse);
}

export async function endTransaction(userId: string, transactionId: string) {
  return client().post(`users/${userId}/transactions/${transactionId}/end`).json().then(StoredTransactionSchema.parse);
}

export async function getUsers() {
  return client().get('users').json().then(UsersSchema.parse);
}

export async function getUser(userId: string) {
  return client().get(`users/${userId}`).json().then(UserSchema.parse);
}

export async function addUser(data: CreateUserInput) {
  return client().post('users', { json: data }).json().then(UserSchema.parse);
}

export async function updateUser(userId: string, data: CreateUserInput) {
  return client().put(`users/${userId}`, { json: data }).json().then(UserSchema.parse);
}

export async function deleteUser(userId: string) {
  return client().delete(`users/${userId}`);
}

export async function getUserNotifications(userId: string) {
  return client().get(`users/${userId}/notifications`).json().then(NotificationsSchema.parse);
}

export async function readNotification(userId: string, notificationId: string) {
  return client().post(`users/${userId}/notifications/${notificationId}/read`);
}