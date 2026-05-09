import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import {
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaShoppingCart,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { RESTAURANT_IMAGES } from "../constants/imageConstants";
import styles from "./RestaurantDetail.module.css";

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [menu, setMenu] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // For demo, we set a mock restaurant matching one of our constants
    const mockRestaurants = [
      {
        _id: "1",
        name: "Tuo Zaafi Palace",
        description: "Authentic Northern Ghanaian cuisine",
        image: RESTAURANT_IMAGES.tuoZaafiPalace,
        rating: 4.9,
        deliveryTime: 25,
        deliveryFee: 8,
        address: "Tamale Central, Tamale",
        cuisine: ["Northern Ghanaian"],
      },
      {
        _id: "2",
        name: "Tamale Chop Bar",
        image: RESTAURANT_IMAGES.tamaleChopBar,
        description: "Traditional Northern dishes",
        rating: 4.7,
        deliveryTime: 20,
        deliveryFee: 6,
        address: "Tamale South",
        cuisine: ["Local Ghanaian"],
      },
    ];
    const found =
      mockRestaurants.find((r) => r._id === id) || mockRestaurants[0];
    setRestaurant(found);
    setMenu([
      {
        _id: "m1",
        name: "Tuo Zaafi",
        description: "Millet dumpling with ayoyo soup",
        price: 25,
        category: "Main",
      },
      {
        _id: "m2",
        name: "Wasawasa",
        description: "Yam flour dumplings",
        price: 20,
        category: "Main",
      },
      {
        _id: "m3",
        name: "Kinkheba",
        description: "Spicy grilled meat",
        price: 30,
        category: "Main",
      },
    ]);
    setLoading(false);
  }, [id]);

  const handleAddToCart = (item: any) => {
    addToCart({
      _id: item._id,
      name: item.name,
      price: item.price,
      quantity: 1,
      restaurantId: restaurant._id,
      restaurantName: restaurant.name,
      description: item.description,
      category: item.category,
      image: "",
    });
    toast.success(`Added ${item.name} to cart`);
  };

  if (loading) return <Loader />;
  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <div className={styles.container}>
      <Link to="/restaurants" className={styles.backLink}>
        <FaChevronLeft /> Back to Restaurants
      </Link>
      <div className={styles.banner}>
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className={styles.bannerImage}
        />
        <div className={styles.bannerOverlay}>
          <h1>{restaurant.name}</h1>
          <div className={styles.restaurantInfo}>
            <span>
              <FaStar className={styles.star} /> {restaurant.rating}
            </span>
            <span>
              <FaClock /> {restaurant.deliveryTime} mins
            </span>
            <span>
              <FaMapMarkerAlt /> GHS {restaurant.deliveryFee} delivery
            </span>
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <h2>About Us</h2>
        <p>{restaurant.description}</p>
        <p className={styles.address}>{restaurant.address}</p>
      </div>
      <h2 className={styles.menuTitle}>Our Menu</h2>
      <div className={styles.menuList}>
        {menu.map((item) => (
          <div key={item._id} className={styles.menuItem}>
            <div className={styles.menuItemInfo}>
              <h3>{item.name}</h3>
              <p className={styles.menuItemDescription}>{item.description}</p>
              <p className={styles.menuItemPrice}>
                GHS {item.price.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => handleAddToCart(item)}
              className={styles.addButton}
            >
              <FaShoppingCart /> Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
