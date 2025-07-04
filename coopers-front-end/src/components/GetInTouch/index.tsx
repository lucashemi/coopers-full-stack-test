import { useRef } from "react";
import tatiana from "../../assets/images/tatiana.png";
import iconEmail from "../../assets/icons/icon-mail.svg";

import styles from "./styles.module.css";

export function GetInTouch() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telephoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  return (
    <section className={styles.container}>
      <div className={styles.avatar}>
        <div className={styles.graphism}></div>
        <img src={tatiana} alt="Photo of Tatiana working" aria-hidden />
      </div>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <img src={iconEmail} alt="Email icon" />
          <h3 className={styles.title}>
            get in <span>touch</span>
          </h3>
        </div>
        <form action="" className={styles.form}>
          <div className={styles.formRow}>
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              id="name"
              placeholder="type your name here..."
              ref={nameRef}
            />
          </div>
          <div className={styles.formRowDouble}>
            <div className={styles.formRow}>
              <label htmlFor="email">Email*</label>
              <input
                type="text"
                id="email"
                placeholder="example@example.com"
                ref={emailRef}
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="telephone">Telephone*</label>
              <input
                type="tel"
                id="telephone"
                placeholder="( ) ____-____"
                ref={telephoneRef}
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <label htmlFor="message">Message*</label>
            <textarea
              id="message"
              placeholder="Type what you want to say to us"
              ref={messageRef}
              className={styles.message}
            />
          </div>
          <button type="submit" className={styles.button}>
            Send now
          </button>
        </form>
      </div>
    </section>
  );
}
