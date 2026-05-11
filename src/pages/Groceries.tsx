import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import apiClient from "../api/client";
import styles from "./Groceries.module.css";

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
}

export default function Groceries() {
  const [stores, setStores] = useState<GroceryStore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const targetCity = "Tamale";

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data } = await apiClient.get("/groceries", {
          params: { city: targetCity },
        });
        setStores(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load grocery stores");
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const filtered = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.categories.some((cat) =>
        cat.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  if (loading)
    return <div className={styles.loader}>Loading grocery stores...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Grocery Stores in {targetCity}</h1>
        <p>Fresh produce, essentials & more</p>
      </div>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search stores or categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.storeGrid}>
        {filtered.map((store) => (
          <Link
            to={`/grocery/${store._id}`}
            key={store._id}
            className={styles.storeCard}
          >
            <div className={styles.imageContainer}>
              <img
                src={store.image || "/assets/images/placeholder.jpg"}
                alt={store.name}
                className={styles.storeImage}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{store.name}</h3>
              <div className={styles.info}>
                <span className={styles.rating}>
                  <FaStar className={styles.starIcon} /> {store.rating}
                </span>
                <span>
                  <FaClock /> {store.deliveryTime} min
                </span>
                <span>
                  <FaMapMarkerAlt /> GHS {store.deliveryFee}
                </span>
              </div>
              <p className={styles.categories}>{store.categories.join(", ")}</p>
              <p className={styles.description}>
                {store.description.substring(0, 80)}...
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className={styles.noResults}>
          No grocery stores found in {targetCity}.
        </p>
      )}
    </div>
  );
}
