import { LoginResponse } from "@/lib/validation";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = LoginResponse | null;

type Actions = {
  reset: () => void;
  getToken(): string | null;
  init(state: NonNullable<State>): void;
  isLoggedIn(): boolean;
}

const storageKey = 'auth';
const initialState: State = {
  type: '',
  token: '',
  expires_at: '',
};

export const useTokenStore = create(persist<State & Actions>(
  (set, get) => ({
    ...initialState,
    reset: () => set(initialState),
    getToken: () => get().token.length > 0 ? get().token : null,
    init: (state) => set(() => ({ ...state })),
    isLoggedIn: () => get().token.length > 0,
  }),
  {
    name: storageKey,
    storage: createJSONStorage(() => localStorage)
  },
))
