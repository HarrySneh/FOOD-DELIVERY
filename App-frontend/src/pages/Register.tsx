import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./Restaurants.module.css";

const sampleRestaurants = [
  {
    id: 1,
    name: "Tasty Jollof",
    cuisine: "Jollof Rice",
    deliveryFee: 10,
    image: "🍛",
    rating: 4.8,
    deliveryTime: 25,
  },
  {
    id: 2,
    name: "Banku Paradise",
    cuisine: "Banku & Tilapia",
    deliveryFee: 12,
    image: "🐟",
    rating: 4.9,
    deliveryTime: 30,
  },
  {
    id: 3,
    name: "Waakye House",
    cuisine: "Waakye",
    deliveryFee: 8,
    image: "🍚",
    rating: 4.7,
    deliveryTime: 20,
  },
  {
    id: 4,
    name: "Kelewele Spot",
    cuisine: "Kelewele",
    deliveryFee: 5,
    image: "🍌",
    rating: 4.8,
    deliveryTime: 15,
  },
  {
    id: 5,
    name: "Fufu Palace",
    cuisine: "Fufu & Light Soup",
    deliveryFee: 15,
    image: "🍲",
    rating: 4.9,
    deliveryTime: 35,
  },
  {
    id: 6,
    name: "Red Red Joint",
    cuisine: "Red Red",
    deliveryFee: 7,
    image: "🫘",
    rating: 4.6,
    deliveryTime: 20,
  },
];

export default function Restaurants() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");

  const filteredRestaurants = sampleRestaurants.filter(
    (rest) =>
      rest.name.toLowerCase().includes(search.toLowerCase()) ||
      rest.cuisine.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAddToCart = (restaurantName: string) => {
    addToCart({
      _id: `sample-${Date.now()}`,
      name: `Sample Dish from ${restaurantName}`,
      price: 25,
      quantity: 1,
      restaurantId: restaurantName,
    });
    toast.success(`Added from ${restaurantName}!`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Restaurants in Ghana</h1>
        <p>Discover the best local cuisine</p>
      </div>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search restaurants or dishes..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.restaurantGrid}>
        {filteredRestaurants.map((rest) => (
          <div key={rest.id} className={styles.restaurantCard}>
            <div className={styles.imagePlaceholder}>
              <span className={styles.emojiImage}>{rest.image}</span>
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{rest.name}</h3>
              <div className={styles.rating}>
                <FaStar className={styles.starIcon} />
                <span>{rest.rating}</span>
                <span className={styles.dot}>•</span>
                <span>{rest.deliveryTime} mins</span>
              </div>
              <p className={styles.cuisine}>{rest.cuisine}</p>
              <p className={styles.deliveryFee}>
                Delivery: GHS {rest.deliveryFee}
              </p>
              <button
                onClick={() => handleAddToCart(rest.name)}
                className={styles.addButton}
              >
                <FaShoppingCart /> Add Sample Item
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <p className={styles.noResults}>No restaurants found.</p>
      )}
    </div>
  );
}
