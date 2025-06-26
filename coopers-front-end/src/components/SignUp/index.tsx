import { useEffect, useRef, useState } from "react";
import signinImage from "../../assets/images/sign-in.png";
import { Heading } from "../Heading";
import { useAuth } from "../../contexts/auth/useAuthContext";

import styles from "./styles.module.css";

type SignInProps = {
  onClose: () => void;
  onSwitch: () => void;
};

export function SignUp({ onClose, onSwitch }: SignInProps) {
  const { register, loading, error } = useAuth();
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    // User input focus
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = usernameInputRef.current?.value.trim();
    const password = passwordInputRef.current?.value.trim();

    if (!name || !password) {
      setLocalError("Please fill in all fields.");
      return;
    }

    setLocalError(null);

    try {
      await register(name, password);
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
        <Heading title="Sign up" subtitle="to have your own list" />
      </div>
      <form action="" className={styles.form} onSubmit={handleRegister}>
        <div className={styles.formRow}>
          <label htmlFor="user">User:</label>
          <input type="text" id="user" ref={usernameInputRef} />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" ref={passwordInputRef} />
        </div>
        <button onClick={onSwitch} className={styles.switch}>
          Already have an account ? Sign in
        </button>
        {(error || localError) && (
          <span className={styles.error}>{error || localError}</span>
        )}
        <button type="submit" className={styles.button}>
          {loading ? "Loading..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}
