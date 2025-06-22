import coopersLogo from "../../assets/logos/header-logo.svg";
import styles from "./styles.module.css";

type HeaderProps = {
  handleOpenModal: () => void;
};

export function Header({ handleOpenModal }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={coopersLogo} alt="Logo da Coopers" />
      </div>
      <button onClick={handleOpenModal}>entrar</button>
    </header>
  );
}
