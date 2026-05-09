import React from "react";
import styles from "./Carousel.module.css";

export type CarouselItem = {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
};

type Props = {
  items: CarouselItem[];
  reverse?: boolean;
};

const Carousel: React.FC<Props> = ({ items, reverse = false }) => {
  return (
    <div className={styles.rowWrapper}>
      <div
        className={`${styles.track} ${
          reverse ? styles.scrollReverse : styles.scroll
        }`}
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className={styles.card}>
            <img src={item.image} alt={item.title} />

            <div className={styles.overlay} />

            <div className={styles.text}>
              <h3>{item.title}</h3>
              {item.subtitle && <p>{item.subtitle}</p>}
            </div>

            <div className={styles.badge}>Promo</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
