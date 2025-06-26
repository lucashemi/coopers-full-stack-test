import { useState } from "react";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { Hero } from "./components/Hero";
import { AuthForm } from "./components/AuthForm";
import type { AuthMode } from "./types/AuthMode";
import { ToDo } from "./components/ToDo";

function App() {
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);

  return (
    <div className="container">
      <Header handleOpenModal={() => setAuthMode("signIn")} />
      <Modal isOpen={!!authMode} onClose={() => setAuthMode(null)}>
        {authMode && (
          <AuthForm
            mode={authMode}
            onClose={() => setAuthMode(null)}
            onSwitch={() =>
              setAuthMode(authMode === "signIn" ? "signUp" : "signIn")
            }
          />
        )}
      </Modal>
      <main>
        <Hero />
        <ToDo />
        {/* TODO: <Posts /> */}
        {/* TODO: <Contact /> */}
      </main>
      {/* TODO: <Footer /> */}
    </div>
  );
}

export default App;
