import { Link } from "react-router-dom";
import { Restaurant } from "../types";
import { FaStar } from "react-icons/fa";
import styles from "./RestaurantCard.module.css";

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <Link to={`/restaurant/${restaurant._id}`} className={styles.card}>
      <img
        src={restaurant.image || "https://via.placeholder.com/300x200"}
        alt={restaurant.name}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{restaurant.name}</h3>
        <div className={styles.info}>
          <span className={styles.rating}>
            <FaStar className={styles.star} />
            <span>{restaurant.rating || "New"}</span>
          </span>
          <span>•</span>
          <span>{restaurant.deliveryTime} mins</span>
        </div>
        <p className={styles.cuisine}>{restaurant.cuisine?.join(", ")}</p>
        <p className={styles.deliveryFee}>
          Delivery: GHS {restaurant.deliveryFee}
        </p>
      </div>
    </Link>
  );
}
