import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../../api/client";
import { useAuth } from "../../hooks/useAuth";
import styles from "./AddMenuItem.module.css";

export default function AddMenuItem() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "Main",
    isAvailable: true,
    isPopular: false,
    preparationTime: 15,
  });
  const [loading, setLoading] = useState(false);

  const categories = ["Appetizer", "Main", "Dessert", "Drink", "Snack"];

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await apiClient.get("/restaurants");
        // Filter restaurants owned by this user
        const owned = res.data.filter((r: any) => r.ownerId === user?._id);
        setRestaurants(owned);
        if (owned.length > 0) setSelectedRestaurant(owned[0]._id);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load restaurants");
      }
    };
    fetchRestaurants();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRestaurant) {
      toast.error("You need a restaurant first");
      return;
    }
    setLoading(true);
    try {
      await apiClient.post(`/restaurants/${selectedRestaurant}/menu`, formData);
      toast.success("Menu item added!");
      navigate("/owner-dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Menu Item</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Select Restaurant *</label>
          <select
            value={selectedRestaurant}
            onChange={(e) => setSelectedRestaurant(e.target.value)}
            required
          >
            <option value="">-- Choose restaurant --</option>
            {restaurants.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Item Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Price (GHS) *</label>
            <input
              type="number"
              required
              step="0.5"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label>Category *</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Preparation Time (minutes)</label>
            <input
              type="number"
              value={formData.preparationTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preparationTime: parseInt(e.target.value),
                })
              }
            />
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={formData.isAvailable}
              onChange={(e) =>
                setFormData({ ...formData, isAvailable: e.target.checked })
              }
            />
            Available
          </label>
          <label>
            <input
              type="checkbox"
              checked={formData.isPopular}
              onChange={(e) =>
                setFormData({ ...formData, isPopular: e.target.checked })
              }
            />
            Mark as Popular
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? "Adding..." : "Add to Menu"}
        </button>
      </form>
    </div>
  );
}
