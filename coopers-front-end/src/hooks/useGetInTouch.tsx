import { useState } from "react";
import { api } from "../api/axios";
import type { AxiosError } from "axios";

export function useGetInTouch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendForm = async (
    name: string,
    email: string,
    telephone: string,
    message: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      await api.post("/email/contact", { name, email, telephone, message });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message = error?.response?.data?.message || "Error logging in";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendForm,
    loading,
    error,
  };
}
