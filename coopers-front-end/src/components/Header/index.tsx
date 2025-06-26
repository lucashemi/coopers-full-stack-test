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
        <img src={coopersLogo} alt="Logo da Coopers" />
      </div>
      {user?.name ? (
        <span>
          <button onClick={logout}>sign out ({user.name})</button>
        </span>
      ) : (
        <button onClick={handleOpenModal}>entrar</button>
      )}
    </header>
  );
}
