import styles from "./styles.module.css";

type HeadingProps = {
  title: string;
  subtitle: string;
  hero?: boolean;
};

export function Heading({ title, subtitle, hero = false }: HeadingProps) {
  const titleStyle = `${styles.title} ${hero ? styles.hero : ""}`;
  return (
    <h1 className={titleStyle}>
      {title} <span>{subtitle}</span>
    </h1>
  );
}
