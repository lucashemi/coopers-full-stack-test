import { Heading } from "../Heading";
import sala from "../../assets/images/sala.png";
import iconScroll from "../../assets/icons/icon-scroll.svg";

import styles from "./styles.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.leftSide}>
          <Heading hero title="Organize" subtitle="your daily jobs" />
          <p className={styles.description}>The only way to get things done</p>
          <a href="#Todo-list-title">
            <button>Go to To-do list</button>
          </a>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.fixedBg}></div>
          <div className={styles.imageContainer}>
            <img src={sala} alt={"Imagem de uma sala"} />
          </div>
        </div>
      </div>
      <div className={styles.scrollIcon}>
        <img src={iconScroll} alt={"Seta para baixo"} />
      </div>
    </section>
  );
}
