import coopersLogo from "../../assets/logos/header-logo.svg";
import { useAuth } from "../../contexts/auth/useAuthContext";
import styles from "./styles.module.css";

type HeaderProps = {
  handleOpenModal: () => void;
};

export function Header({ handleOpenModal }: HeaderProps) {
  const { user, logout } = useAuth();
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={coopersLogo} alt="Coopers" />
      </div>
      {user?.name ? (
        <button onClick={logout}>sign out ({user.name})</button>
      ) : (
        <button
          onClick={handleOpenModal}
          aria-label="Sign in to access your list"
        >
          sign in
        </button>
      )}
    </header>
  );
}
