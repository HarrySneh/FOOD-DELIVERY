import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStore, FaStar, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import apiClient from "../api/client"; // corrected path
import styles from "./GroceryDashboard.module.css";

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
}

export default function Groceries() {
  const [stores, setStores] = useState<GroceryStore[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const params: any = {};
        if (selectedCity !== "all") params.city = selectedCity;
        const { data } = await apiClient.get("/groceries", { params });
        setStores(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, [selectedCity]);

  const filtered = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading)
    return <div className={styles.loader}>Loading grocery stores...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Grocery Stores in Ghana</h1>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search stores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className={styles.citySelect}
        >
          <option value="all">All Cities</option>
          <option value="Accra">Accra</option>
          <option value="Kumasi">Kumasi</option>
          <option value="Tamale">Tamale</option>
          <option value="Tema">Tema</option>
        </select>
      </div>
      <div className={styles.storesGrid}>
        {filtered.map((store) => (
          <Link
            to={`/grocery/${store._id}`}
            key={store._id}
            className={styles.storeCard}
          >
            <img
              src={store.image || "https://via.placeholder.com/300x200"}
              alt={store.name}
            />
            <div className={styles.cardContent}>
              <h3>{store.name}</h3>
              <div className={styles.rating}>
                <FaStar /> <span>{store.rating || "New"}</span>
                <span className={styles.dot}>•</span>
                <FaClock /> <span>{store.deliveryTime} mins</span>
              </div>
              <p className={styles.address}>
                <FaMapMarkerAlt /> {store.address}, {store.city}
              </p>
              <p className={styles.deliveryFee}>
                Delivery: GHS {store.deliveryFee}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className={styles.noResults}>No grocery stores found.</p>
      )}
    </div>
  );
}
