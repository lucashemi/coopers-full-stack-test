import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.content}>
        <h3 className={styles.title}>Need help?</h3>
        <p className={styles.email}>coopers@coopers.pro</p>
        <small>
          © {new Date().getFullYear()} Coopers. All rights reserved.
        </small>
      </div>
      <div className={styles.graphism}></div>
    </footer>
  );
}
