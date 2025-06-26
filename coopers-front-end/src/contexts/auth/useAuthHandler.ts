import { useState } from "react";
import { api } from "../../api/axios";
import type { User } from "../../types/User";
import type { AxiosError } from "axios";

export function useAuthHandler() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (name: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      await api.post(
        "/auth/login",
        { name, password },
        { withCredentials: true }
      );

      // Get user after successful login
      const { data } = await api.get("/auth/me", { withCredentials: true });
      setUser(data);
      setIsAuthenticated(true);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message = error?.response?.data?.message || "Erro ao fazer login";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message = error?.response?.data?.message || "Erro ao fazer logout";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      await api.post(
        "/auth/register",
        { name, password },
        { withCredentials: true }
      );
      const { data } = await api.get("/auth/me", { withCredentials: true });
      setUser(data);
      setIsAuthenticated(true);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message = error?.response?.data?.message || "Erro ao registrar";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/auth/me", { withCredentials: true });
      setUser(data);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    register,
    fetchUser,
  };
}
