import { Carousel } from "../Carousel";
import styles from "./styles.module.css";

export function GoodThings() {
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.background}></div>
        <div className={styles.content}>
          <h2 className={styles.title}>good things</h2>
          <Carousel />
        </div>
      </div>
    </section>
  );
}
