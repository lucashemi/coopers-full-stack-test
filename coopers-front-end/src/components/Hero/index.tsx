import { Heading } from "../Heading";
import office from "../../assets/images/sala.png";
import iconScroll from "../../assets/icons/icon-scroll.svg";

import styles from "./styles.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.leftSide}>
          <Heading hero title="Organize" subtitle="your daily jobs" />
          <p className={styles.description}>The only way to get things done</p>
          <button
            type="button"
            aria-label="Scroll to the to-do list section"
            onClick={() => {
              const target = document.getElementById("Todo-list-title");
              target?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Go to To-do list
          </button>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.fixedBg}></div>
          <div className={styles.imageContainer}>
            <img src={office} alt="" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className={styles.scrollIcon}>
        <img src={iconScroll} alt="" aria-hidden="true" />
      </div>
    </section>
  );
}
