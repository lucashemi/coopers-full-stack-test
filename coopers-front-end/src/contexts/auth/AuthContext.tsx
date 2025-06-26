import { createContext } from "react";
import type { User } from "../../types/User";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (name: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
