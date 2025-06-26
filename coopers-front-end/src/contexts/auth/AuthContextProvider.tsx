import { useEffect, useState } from "react";
import { useAuthHandler } from "./useAuthHandler";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthHandler();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Fetch the logged user when the app loads
    auth.fetchUser().finally(() => setInitialized(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!initialized) return <div></div>;
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
