import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import styles from "./DriverRegister.module.css";

export default function DriverRegister() {
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(
        "Driver registration successful! You can now accept deliveries.",
      );
      navigate("/driver-dashboard");
    } catch (error) {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Become a Delivery Driver</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Vehicle Type</label>
          <select
            className={styles.select}
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          >
            <option value="">Select vehicle type</option>
            <option value="Car">Car</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="Bicycle">Bicycle</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Vehicle Number</label>
          <input
            type="text"
            className={styles.input}
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            placeholder="e.g., GR-1234-20"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? "Registering..." : "Register as Driver"}
        </button>
        <div className={styles.info}>
          <strong>Note:</strong> Once registered, you'll be able to accept
          delivery orders and earn money.
        </div>
      </form>
    </div>
  );
}
