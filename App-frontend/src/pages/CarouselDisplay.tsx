import React from "react";
import Carousel, { CarouselItem } from "../components/Layout/Carousel";
import styles from "./CarouselDisplay.module.css";

const data: CarouselItem[] = [
  {
    id: 1,
    image: "/images/food1.jpg",
    title: "50% Off Pizza",
    subtitle: "🚴 20 min",
  },
  {
    id: 2,
    image: "/images/food2.jpg",
    title: "Free Delivery",
    subtitle: "Orders over £15",
  },
  {
    id: 3,
    image: "/images/food3.jpg",
    title: "Top Rated Sushi",
    subtitle: "⭐ 4.8",
  },
  {
    id: 4,
    image: "/images/food4.jpg",
    title: "Burger Deals",
    subtitle: "From £5.99",
  },
];

const CarouselDisplay: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* <Carousel items={data} /> */}
      <Carousel items={data} reverse />

      {/* Hide 3rd row on mobile */}
      {/* <div className={styles.desktopOnly}>
        <Carousel items={data} />
      </div> */}
    </div>
  );
};

export default CarouselDisplay;
