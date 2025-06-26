import { useAuthHandler } from "./useAuthHandler";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthHandler();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
