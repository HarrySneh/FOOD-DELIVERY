import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { FaStar, FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { RESTAURANT_IMAGES } from "../constants/imageConstants";
import styles from "./Restaurants.module.css";

const tamaleRestaurants = [
  {
    id: 1,
    name: "Tuo Zaafi Palace",
    cuisine: "Northern Ghanaian",
    deliveryFee: 8,
    image: RESTAURANT_IMAGES.tuoZaafiPalace,
    rating: 4.9,
    deliveryTime: 25,
    location: "Tamale Central",
    description: "Authentic Tuo Zaafi and Northern delicacies",
  },
  {
    id: 2,
    name: "Tamale Chop Bar",
    cuisine: "Local Ghanaian",
    deliveryFee: 6,
    image: RESTAURANT_IMAGES.tamaleChopBar,
    rating: 4.7,
    deliveryTime: 20,
    location: "Tamale South",
    description: "Traditional Northern Ghanaian dishes",
  },
  {
    id: 3,
    name: "Northern Delight",
    cuisine: "Wasawasa & Kinkheba",
    deliveryFee: 7,
    image: RESTAURANT_IMAGES.northernDelight,
    rating: 4.8,
    deliveryTime: 30,
    location: "Tamale North",
    description: "Best Wasawasa in Tamale",
  },
  {
    id: 4,
    name: "Savanna Restaurant",
    cuisine: "Continental & Local",
    deliveryFee: 10,
    image: RESTAURANT_IMAGES.savannaRestaurant,
    rating: 4.6,
    deliveryTime: 35,
    location: "Tamale Central",
    description: "Mix of local and international cuisine",
  },
  {
    id: 5,
    name: "Zongo Junction",
    cuisine: "Street Food",
    deliveryFee: 5,
    image: RESTAURANT_IMAGES.zongoJunction,
    rating: 4.5,
    deliveryTime: 15,
    location: "Tamale South",
    description: "Best street food in Tamale",
  },
  {
    id: 6,
    name: "Dagbani Kitchen",
    cuisine: "Northern Traditional",
    deliveryFee: 8,
    image: RESTAURANT_IMAGES.dagbaniKitchen,
    rating: 4.8,
    deliveryTime: 28,
    location: "Tamale North",
    description: "Authentic Dagbani cuisine",
  },
];
const accraRestaurants = [
  {
    id: 7,
    name: "Tasty Jollof",
    cuisine: "Jollof Rice",
    deliveryFee: 10,
    image: RESTAURANT_IMAGES.tastyJollof,
    rating: 4.8,
    deliveryTime: 25,
    location: "Accra Central",
    description: "Best Jollof in Accra",
  },
  {
    id: 8,
    name: "Banku Paradise",
    cuisine: "Banku & Tilapia",
    deliveryFee: 12,
    image: RESTAURANT_IMAGES.bankuParadise,
    rating: 4.9,
    deliveryTime: 30,
    location: "Accra East",
    description: "Authentic Banku and fresh Tilapia",
  },
  {
    id: 9,
    name: "Waakye House",
    cuisine: "Waakye",
    deliveryFee: 8,
    image: RESTAURANT_IMAGES.waakyeHouse,
    rating: 4.7,
    deliveryTime: 20,
    location: "Accra West",
    description: "Famous Waakye spot",
  },
];
const kumasiRestaurants = [
  {
    id: 10,
    name: "Kumasi Fufu Spot",
    cuisine: "Fufu & Soup",
    deliveryFee: 12,
    image: RESTAURANT_IMAGES.kumasiFufuSpot,
    rating: 4.8,
    deliveryTime: 30,
    location: "Kumasi Central",
    description: "Traditional Fufu and light soup",
  },
  {
    id: 11,
    name: "Garden City Eats",
    cuisine: "Variety",
    deliveryFee: 10,
    image: RESTAURANT_IMAGES.gardenCityEats,
    rating: 4.6,
    deliveryTime: 25,
    location: "Kumasi South",
    description: "Wide variety of local dishes",
  },
];

const allRestaurants = [
  ...tamaleRestaurants,
  ...accraRestaurants,
  ...kumasiRestaurants,
];

export default function Restaurants() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);
  const cities = ["all", "Tamale", "Accra", "Kumasi"];

  const filtered = allRestaurants.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase());
    const matchCity =
      selectedCity === "all" || r.location.includes(selectedCity);
    return matchSearch && matchCity;
  });

  const handleAddToCart = (restaurant: any) => {
    addToCart({
      _id: `sample-${Date.now()}`,
      name: `Sample Dish from ${restaurant.name}`,
      price: 25,
      quantity: 1,
      restaurantId: restaurant.id.toString(),
      restaurantName: restaurant.name,
      description: `Delicious sample from ${restaurant.name}`,
      category: "Main",
      image: "",
    });
    toast.success(`Added sample item from ${restaurant.name}!`);
  };

  return (
    <div className={styles.container}>
      {showLocationPrompt && (
        <div className={styles.locationPrompt}>
          <FaMapMarkerAlt />
          <div>
            <strong>Delivering to Tamale</strong>
            <p>Is this your correct location?</p>
          </div>
          <button
            onClick={() => setShowLocationPrompt(false)}
            className={styles.confirmButton}
          >
            Yes, Confirm
          </button>
          <button className={styles.changeButton}>Change</button>
        </div>
      )}
      <div className={styles.header}>
        <h1>Restaurants in Ghana</h1>
        <p>Discover the best local cuisine near you</p>
      </div>
      <div className={styles.citySelector}>
        {cities.map((city) => (
          <button
            key={city}
            className={`${styles.cityButton} ${selectedCity === city ? styles.activeCity : ""}`}
            onClick={() => setSelectedCity(city)}
          >
            {city === "all" ? "All Cities" : city}
            {city === "Tamale" && (
              <span className={styles.nearbyBadge}>Near You</span>
            )}
          </button>
        ))}
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
      {selectedCity === "Tamale" && (
        <div className={styles.cityHighlight}>
          <h3>📍 Popular in Tamale</h3>
          <p>Discover the best Northern Ghanaian cuisine</p>
        </div>
      )}
      <div className={styles.restaurantGrid}>
        {filtered.map((rest) => (
          <div key={rest.id} className={styles.restaurantCard}>
            <div className={styles.imageContainer}>
              <img
                src={rest.image}
                alt={rest.name}
                className={styles.restaurantImage}
              />
              {rest.location === "Tamale" && (
                <span className={styles.localBadge}>Local Favorite</span>
              )}
            </div>
            <div className={styles.content}>
              <div className={styles.titleRow}>
                <h3 className={styles.title}>{rest.name}</h3>
                <span className={styles.locationTag}>{rest.location}</span>
              </div>
              <div className={styles.rating}>
                <FaStar className={styles.starIcon} />
                <span>{rest.rating}</span>
                <span className={styles.dot}>•</span>
                <span>{rest.deliveryTime} mins</span>
              </div>
              <p className={styles.cuisine}>{rest.cuisine}</p>
              <p className={styles.description}>{rest.description}</p>
              <p className={styles.deliveryFee}>
                Delivery: GHS {rest.deliveryFee}
              </p>
              <button
                onClick={() => handleAddToCart(rest)}
                className={styles.addButton}
              >
                <FaShoppingCart /> Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className={styles.noResults}>
          No restaurants found in {selectedCity}.
        </p>
      )}
    </div>
  );
}
