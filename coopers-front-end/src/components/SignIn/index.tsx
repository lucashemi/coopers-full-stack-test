import signinImage from "../../assets/images/sign-in.png";
import { Heading } from "../Heading";

import styles from "./styles.module.css";

export function SignIn() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.imageContainer}>
          <img src={signinImage} alt="Person signing in" />
        </div>
        <Heading title="Sign in" subtitle="to access your list" />
      </div>
      <form
        action=""
        className={styles.form}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={styles.formRow}>
          <label htmlFor="user">User:</label>
          <input type="text" id="user" />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <button type="submit" className={styles.button}>
          Sign in
        </button>
      </form>
    </div>
  );
}
