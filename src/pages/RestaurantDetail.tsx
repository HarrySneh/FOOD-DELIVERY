import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { restaurantsApi } from "../api/restaurants";
import { useCart } from "../hooks/useCart";
import {
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTag,
  FaPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./RestaurantDetail.module.css";

interface Restaurant {
  _id: string;
  name: string;
  description: string;
  image: string;
  coverImage: string;
  cuisine: string[];
  address: string;
  city: string;
  deliveryTime: number;
  deliveryFee: number;
  rating: number;
  reviewsCount: number;
  isOpen: boolean;
  closingTime: string;
  phone: string;
  email: string;
}

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"menu" | "reviews" | "info">(
    "menu",
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
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
        toast.error("Failed to load restaurant details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = (item: MenuItem) => {
    if (!restaurant) return;
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

  const categories = ["all", ...new Set(menu.map((item) => item.category))];
  const filteredMenu = menu
    .filter(
      (item) =>
        selectedCategory === "all" || item.category === selectedCategory,
    )
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  if (loading)
    return <div className={styles.loader}>Loading restaurant...</div>;
  if (!restaurant)
    return <div className={styles.error}>Restaurant not found</div>;

  return (
    <div className={styles.container}>
      {/* Hero Banner */}
      <div className={styles.hero}>
        <img
          src={
            restaurant.coverImage || restaurant.image || "/placeholder-hero.jpg"
          }
          alt={restaurant.name}
        />
      </div>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>{restaurant.name}</h1>
          <div className={styles.verified}>
            <FaCheckCircle /> Verified
          </div>
          <div className={styles.rating}>
            <FaStar /> {restaurant.rating} ({restaurant.reviewsCount || 256}{" "}
            reviews) · {restaurant.cuisine?.join(" · ")}
          </div>
          <div className={styles.details}>
            <span>
              <FaClock /> {restaurant.deliveryTime}–
              {restaurant.deliveryTime + 10} min
            </span>
            <span>
              <FaMapMarkerAlt /> GHS {restaurant.deliveryFee} delivery
            </span>
            <span>
              {restaurant.address}, {restaurant.city}
            </span>
          </div>
          <div className={styles.status}>
            <span className={restaurant.isOpen ? styles.open : styles.closed}>
              {restaurant.isOpen ? "Open now" : "Closed"} · Closes at{" "}
              {restaurant.closingTime}
            </span>
          </div>
        </div>
        <div className={styles.promoBanner}>
          <FaTag /> Get 10% off on orders over GHS 100{" "}
          <strong>Use code: TAMAEAT10</strong>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "menu" ? styles.active : ""}`}
          onClick={() => setActiveTab("menu")}
        >
          Menu
        </button>
        <button
          className={`${styles.tab} ${activeTab === "reviews" ? styles.active : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({restaurant.reviewsCount || 256})
        </button>
        <button
          className={`${styles.tab} ${activeTab === "info" ? styles.active : ""}`}
          onClick={() => setActiveTab("info")}
        >
          Info
        </button>
      </div>

      {/* Search & Filter */}
      {activeTab === "menu" && (
        <>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search for dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className={styles.categoryFilter}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.activeCategory : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
          <div className={styles.menuGrid}>
            {filteredMenu.map((item) => (
              <div key={item._id} className={styles.menuCard}>
                <div className={styles.menuImage}>
                  <img
                    src={item.image || "/placeholder-food.jpg"}
                    alt={item.name}
                  />
                </div>
                <div className={styles.menuContent}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className={styles.menuFooter}>
                    <span className={styles.price}>
                      GHS {item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={styles.addButton}
                    >
                      <FaPlus /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "reviews" && (
        <div className={styles.reviews}>Customer reviews will appear here.</div>
      )}
      {activeTab === "info" && (
        <div className={styles.info}>
          <h3>About {restaurant.name}</h3>
          <p>{restaurant.description}</p>
          <h3>Contact</h3>
          <p>Phone: {restaurant.phone || "N/A"}</p>
          <p>Email: {restaurant.email || "N/A"}</p>
          <h3>Address</h3>
          <p>
            {restaurant.address}, {restaurant.city}
          </p>
        </div>
      )}
    </div>
  );
}
