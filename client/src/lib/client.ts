import ky from "ky";
import { LoginResponseSchema, UserSchema } from "./validation";
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