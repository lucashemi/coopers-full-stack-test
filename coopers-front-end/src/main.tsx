import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./styles/global.css";
import "./styles/theme.css";
import { TaskProvider } from "./contexts/task/TaskContextProvider.tsx";
import { AuthProvider } from "./contexts/auth/AuthContextProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
