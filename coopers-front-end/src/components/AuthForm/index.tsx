import { useEffect, useRef, useState } from "react";
import signinImage from "../../assets/images/sign-in.png";
import { Heading } from "../Heading";
import { useAuth } from "../../contexts/auth/useAuthContext";
import type { AuthMode } from "../../types/AuthMode";

import styles from "./styles.module.css";

const modeConfig = {
  signIn: {
    title: "Sign in",
    subtitle: "to access your list",
    onSwitchText: "Don't have an account? Sign up",
    onSubmitText: "Sign in",
  },
  signUp: {
    title: "Sign up",
    subtitle: "to have your own list",
    onSwitchText: "Already have an account? Sign in",
    onSubmitText: "Sign up",
  },
} as const;

type AuthFormProps = {
  mode: AuthMode;
  onClose: () => void;
  onSwitch: () => void;
};

export function AuthForm({ mode, onClose, onSwitch }: AuthFormProps) {
  const { login, register, loading, error } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const isSignIn = mode === "signIn";
  const config = modeConfig[mode];

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = usernameRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();

    if (!name || !password) {
      setLocalError("Please fill in all fields.");
      return;
    }

    setLocalError(null);

    try {
      if (isSignIn) {
        await login(name, password);
      } else {
        await register(name, password);
      }
      onClose();
    } catch {
      return;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.imageContainer}>
          <img src={signinImage} alt="Person signing in" />
        </div>
        <Heading title={config.title} subtitle={config.subtitle} />
      </div>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <label htmlFor="user">User:</label>
          <input type="text" id="user" ref={usernameRef} />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" ref={passwordRef} />
        </div>
        <button onClick={onSwitch} className={styles.switch} type="button">
          {config.onSwitchText}
        </button>
        {(error || localError) && (
          <span className={styles.error}>{error || localError}</span>
        )}
        <button type="submit" className={styles.button}>
          {loading ? "Loading..." : config.onSubmitText}
        </button>
      </form>
    </div>
  );
}
