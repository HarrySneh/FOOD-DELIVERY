import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { restaurantsApi } from "../api/restaurants";
import { useCart } from "../hooks/useCart";
import { FaStar, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import styles from "./RestaurantDetail.module.css";

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [menu, setMenu] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restRes, menuRes] = await Promise.all([
          restaurantsApi.getById(id!),
          restaurantsApi.getMenu(id!),
        ]);
        setRestaurant(restRes.data);
        setMenu(menuRes.data);
      } catch (error) {
        console.error(error);
        // Mock data for demo
        setRestaurant({
          _id: id,
          name: "Sample Restaurant",
          description: "Delicious Ghanaian cuisine",
          image: "https://via.placeholder.com/1200x400",
          rating: 4.5,
          deliveryTime: 30,
          deliveryFee: 10,
          address: "123 Main Street, Accra",
          cuisine: ["Ghanaian", "African"],
        });
        setMenu([
          {
            _id: "1",
            name: "Jollof Rice",
            description: "Spicy rice with chicken",
            price: 25,
            category: "Main",
          },
          {
            _id: "2",
            name: "Banku & Tilapia",
            description: "Fermented corn dough with grilled tilapia",
            price: 35,
            category: "Main",
          },
          {
            _id: "3",
            name: "Waakye",
            description: "Rice and beans with stew",
            price: 20,
            category: "Main",
          },
          {
            _id: "4",
            name: "Kelewele",
            description: "Spicy fried plantains",
            price: 15,
            category: "Snack",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = (item: any) => {
    addToCart({
      _id: item._id,
      name: item.name,
      price: item.price,
      quantity: 1,
      restaurantId: restaurant._id,
      restaurantName: restaurant.name,
    });
    toast.success(`Added ${item.name} to cart`);
  };

  if (loading) return <Loader />;
  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <div>
      <div className={styles.banner}>
        <img
          src={restaurant.image || "https://via.placeholder.com/1200x400"}
          alt={restaurant.name}
          className={styles.bannerImage}
        />
        <div className={styles.overlay}>
          <h1 className={styles.restaurantName}>{restaurant.name}</h1>
          <div className={styles.info}>
            <span className={styles.infoItem}>
              <FaStar className={styles.star} /> {restaurant.rating || "New"}
            </span>
            <span className={styles.infoItem}>
              <FaClock /> {restaurant.deliveryTime} mins
            </span>
            <span className={styles.infoItem}>
              <FaMapMarkerAlt /> GHS {restaurant.deliveryFee} delivery
            </span>
          </div>
        </div>
      </div>

      <div className={styles.description}>
        <p>{restaurant.description}</p>
        <p className={styles.address}>{restaurant.address}</p>
      </div>

      <h2 className={styles.menuTitle}>Menu</h2>
      <div className={styles.menuList}>
        {menu.map((item) => (
          <div key={item._id} className={styles.menuItem}>
            <div className={styles.menuItemInfo}>
              <h3 className={styles.menuItemName}>{item.name}</h3>
              <p className={styles.menuItemDescription}>{item.description}</p>
              <p className={styles.menuItemPrice}>
                GHS {item.price.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => handleAddToCart(item)}
              className={styles.addButton}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
