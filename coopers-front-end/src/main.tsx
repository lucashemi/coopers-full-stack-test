import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./styles/global.css";
import "./styles/theme.css";
import { TaskProvider } from "./contexts/task/TaskContextProvider.tsx";
import { AuthProvider } from "./contexts/auth/AuthContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
  </StrictMode>
);
