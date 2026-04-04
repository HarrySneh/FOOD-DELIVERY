import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { restaurantsApi } from "../api/restaurants";
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
        setRestaurant({
          _id: id,
          name: "Sample Restaurant",
          description:
            "Delicious Ghanaian cuisine made with love and fresh ingredients.",
          image:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=400&fit=crop",
          rating: 4.5,
          deliveryTime: 30,
          deliveryFee: 10,
          address: "123 Main Street, Accra, Ghana",
        });
        setMenu([
          {
            _id: "1",
            name: "Jollof Rice",
            description:
              "Spicy rice cooked with chicken, tomatoes, and special spices",
            price: 25,
            category: "Main",
          },
          {
            _id: "2",
            name: "Banku & Tilapia",
            description:
              "Fermented corn dough served with grilled tilapia and spicy sauce",
            price: 35,
            category: "Main",
          },
          {
            _id: "3",
            name: "Waakye",
            description:
              "Rice and beans cooked with millet leaves, served with stew",
            price: 20,
            category: "Main",
          },
          {
            _id: "4",
            name: "Kelewele",
            description: "Spicy fried plantains with ginger and chili",
            price: 15,
            category: "Snack",
          },
          {
            _id: "5",
            name: "Fried Rice",
            description: "Vegetable fried rice with chicken",
            price: 28,
            category: "Main",
          },
          {
            _id: "6",
            name: "Grilled Chicken",
            description: "Grilled chicken with special sauce",
            price: 30,
            category: "Main",
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
