import { useContext } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth needs to be used inside of <AuthProvider>");
  }
  return context;
}
