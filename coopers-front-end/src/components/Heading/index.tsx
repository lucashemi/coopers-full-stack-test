import styles from "./styles.module.css";

type HeadingProps = {
  title: string;
  subtitle: string;
};

export function Heading({ title, subtitle }: HeadingProps) {
  return (
    <h1 className={styles.title}>
      {title} <span>{subtitle}</span>
    </h1>
  );
}
