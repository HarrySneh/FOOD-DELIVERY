import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../../api/client";
import styles from "./CreateRestaurant.module.css";

export default function CreateRestaurant() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "Accra",
    deliveryTime: 30,
    deliveryFee: 10,
    minimumOrder: 20,
    cuisine: [] as string[],
    phone: "",
  });
  const [cuisineInput, setCuisineInput] = useState("");
  const [loading, setLoading] = useState(false);

  const cities = ["Accra", "Kumasi", "Tamale", "Tema", "Cape Coast"];

  const addCuisine = () => {
    if (cuisineInput && !formData.cuisine.includes(cuisineInput)) {
      setFormData({
        ...formData,
        cuisine: [...formData.cuisine, cuisineInput],
      });
      setCuisineInput("");
    }
  };

  const removeCuisine = (cuisineToRemove: string) => {
    setFormData({
      ...formData,
      cuisine: formData.cuisine.filter((c) => c !== cuisineToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.post("/restaurants", formData);
      toast.success("Restaurant created! Awaiting admin approval.");
      navigate("/owner-dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register Your Restaurant</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Restaurant Name *</label>
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
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label>Address *</label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>City *</label>
            <select
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            >
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Phone *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Delivery Time (minutes) *</label>
            <input
              type="number"
              required
              value={formData.deliveryTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deliveryTime: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label>Delivery Fee (GHS) *</label>
            <input
              type="number"
              required
              step="0.5"
              value={formData.deliveryFee}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deliveryFee: parseFloat(e.target.value),
                })
              }
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Cuisine Types</label>
          <div className={styles.cuisineInput}>
            <input
              type="text"
              placeholder="e.g., Ghanaian, Continental, Pizza"
              value={cuisineInput}
              onChange={(e) => setCuisineInput(e.target.value)}
            />
            <button type="button" onClick={addCuisine}>
              Add
            </button>
          </div>
          <div className={styles.cuisineTags}>
            {formData.cuisine.map((c) => (
              <span key={c} className={styles.cuisineTag}>
                {c}{" "}
                <button type="button" onClick={() => removeCuisine(c)}>
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Minimum Order (GHS)</label>
          <input
            type="number"
            value={formData.minimumOrder}
            onChange={(e) =>
              setFormData({
                ...formData,
                minimumOrder: parseFloat(e.target.value),
              })
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? "Creating..." : "Create Restaurant"}
        </button>
      </form>
    </div>
  );
}
