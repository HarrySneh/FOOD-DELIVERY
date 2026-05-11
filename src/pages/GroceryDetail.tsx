import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import {
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";
import apiClient from "../api/client";
import Loader from "../components/Loader";
import styles from "./GroceryDetail.module.css";

interface GroceryStore {
  _id: string;
  name: string;
  description: string;
  image: string;
  address: string;
  city: string;
  deliveryTime: number;
  deliveryFee: number;
  rating: number;
  categories: string[];
  minimumOrder: number;
}

interface GroceryItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  unit: string;
}

export default function GroceryDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [store, setStore] = useState<GroceryStore | null>(null);
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [storeRes, itemsRes] = await Promise.all([
          apiClient.get(`/groceries/${id}`),
          apiClient.get(`/groceries/${id}/items`),
        ]);
        setStore(storeRes.data);
        setItems(itemsRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load store details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = (item: GroceryItem) => {
    if (!store) return;
    addToCart({
      _id: item._id,
      name: item.name,
      price: item.price,
      quantity: 1,
      restaurantId: store._id, // reuse restaurantId field for store ID
      restaurantName: store.name,
      description: item.description,
      category: item.category,
      image: item.image,
    });
    toast.success(`Added ${item.name} to cart`);
  };

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!store) return <div className={styles.error}>Store not found</div>;

  // Group items by category
  const groupedItems = items.reduce(
    (acc, item) => {
      const cat = item.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    },
    {} as Record<string, GroceryItem[]>,
  );

  return (
    <div className={styles.container}>
      <Link to="/groceries" className={styles.backLink}>
        <FaArrowLeft /> Back to grocery stores
      </Link>

      <div className={styles.banner}>
        <img
          src={store.image || "/assets/images/placeholder.jpg"}
          alt={store.name}
          className={styles.bannerImage}
        />
        <div className={styles.bannerOverlay}>
          <h1>{store.name}</h1>
          <div className={styles.storeInfo}>
            <span>
              <FaStar className={styles.star} /> {store.rating}
            </span>
            <span>
              <FaClock /> {store.deliveryTime} min
            </span>
            <span>
              <FaMapMarkerAlt /> GHS {store.deliveryFee}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.description}>
        <h2>About</h2>
        <p>{store.description}</p>
        <p className={styles.address}>
          {store.address}, {store.city}
        </p>
        <p>
          <strong>Categories:</strong> {store.categories.join(", ")}
        </p>
        <p>
          <strong>Minimum Order:</strong> GHS {store.minimumOrder}
        </p>
      </div>

      <h2 className={styles.itemsTitle}>Shop by Category</h2>
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div key={category} className={styles.categorySection}>
          <h3 className={styles.categoryTitle}>{category}</h3>
          <div className={styles.itemsList}>
            {categoryItems.map((item) => (
              <div key={item._id} className={styles.itemCard}>
                <img
                  src={item.image || "/assets/images/placeholder.jpg"}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemInfo}>
                  <h4>{item.name}</h4>
                  <p className={styles.itemDescription}>{item.description}</p>
                  <p className={styles.itemPrice}>
                    GHS {item.price.toFixed(2)} / {item.unit}
                  </p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={styles.addButton}
                  >
                    <FaShoppingCart /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <p className={styles.noItems}>
          No grocery items available at this store.
        </p>
      )}
    </div>
  );
}
