import styles from "./styles.module.css";

type CarouselCardProps = {
  image: string;
  imageAlt: string;
  tag: string;
  title: string;
};

export function CarouselCard({
  image,
  imageAlt,
  tag,
  title,
}: CarouselCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}></div>
      <div className={styles.cardImageContainer}>
        <img src={image} alt={imageAlt} />
      </div>
      <div className={styles.cardContent}>
        <span className={styles.cardTag}>{tag}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
        <button className={styles.cardButton}>read more</button>
      </div>
    </div>
  );
}
