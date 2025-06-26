import { useState } from "react";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { SignIn } from "./components/SignIn";
import { Hero } from "./components/Hero";
import { ToDoTitle } from "./components/ToDoTitle";
import { ToDoContent } from "./components/ToDoContent";
import { SignUp } from "./components/SignUp";

function App() {
  const [authMode, setAuthMode] = useState<"signIn" | "signUp" | null>(null);

  return (
    <div className="container">
      <Header handleOpenModal={() => setAuthMode("signIn")} />
      <Modal isOpen={!!authMode} onClose={() => setAuthMode(null)}>
        {authMode === "signIn" ? (
          <SignIn
            onClose={() => setAuthMode(null)}
            onSwitch={() => setAuthMode("signUp")}
          />
        ) : (
          authMode === "signUp" && (
            <SignUp
              onClose={() => setAuthMode(null)}
              onSwitch={() => setAuthMode("signIn")}
            />
          )
        )}
      </Modal>
      <main>
        <Hero />
        <ToDoTitle />
        <ToDoContent />
      </main>
    </div>
  );
}

export default App;
