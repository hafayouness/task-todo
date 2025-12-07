import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../service/api";

export interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
}

type SetState<T> = (state: Partial<T> | ((state: T) => Partial<T>)) => void;
type GetState<T> = () => T;

// Création du store
export const useAuthStore = create<AuthStore>(
  (set: SetState<AuthStore>, get: GetState<AuthStore>) => ({
    user: null,
    loading: true,

    loadUser: async () => {
      set({ loading: true });
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await api.get<User>("/auth/me");
          set({ user: response.data });
        }
      } catch (error) {
        await AsyncStorage.removeItem("token");
        set({ user: null });
      } finally {
        set({ loading: false });
      }
    },

    login: async (email: string, password: string) => {
      const response = await api.post<{ token: string; user: User }>(
        "/auth/login",
        { email, password }
      );
      await AsyncStorage.setItem("token", response.data.token);
      console.log("Token après login:", response.data.token);

      set({ user: response.data.user });
    },

    register: async (username: string, email: string, password: string) => {
      const response = await api.post<{ token: string; user: User }>(
        "/auth/register",
        { username, email, password }
      );
      await AsyncStorage.setItem("token", response.data.token);
      set({ user: response.data.user });
    },

    logout: async () => {
      await AsyncStorage.removeItem("token");
      set({ user: null });
    },
  })
);
