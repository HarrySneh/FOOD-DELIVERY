import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  FaMotorcycle,
  FaCar,
  FaBicycle,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./DriverRegister.module.css";

export default function DriverRegister() {
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const vehicleOptions = [
    { value: "Car", icon: FaCar, label: "Car" },
    { value: "Motorcycle", icon: FaMotorcycle, label: "Motorcycle" },
    { value: "Bicycle", icon: FaBicycle, label: "Bicycle" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
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
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Become a Delivery Driver</h1>
          <p>Join our team and start earning today</p>
        </div>

        <div className={styles.benefits}>
          <div className={styles.benefit}>
            <FaShieldAlt />
            <span>Flexible Hours</span>
          </div>
          <div className={styles.benefit}>
            <FaShieldAlt />
            <span>Competitive Pay</span>
          </div>
          <div className={styles.benefit}>
            <FaShieldAlt />
            <span>Weekly Bonuses</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Vehicle Type</label>
            <div className={styles.vehicleOptions}>
              {vehicleOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`${styles.vehicleOption} ${vehicleType === option.value ? styles.selected : ""}`}
                  onClick={() => setVehicleType(option.value)}
                >
                  <option.icon />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Vehicle Number</label>
            <input
              type="text"
              className={styles.input}
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              placeholder="e.g., GR-1234-20"
              required
            />
          </div>

          <div className={styles.requirements}>
            <h4>Requirements:</h4>
            <ul>
              <li>Valid driver's license</li>
              <li>Valid vehicle registration</li>
              <li>Smartphone with GPS</li>
              <li>Minimum age 18 years</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading || !vehicleType}
            className={styles.submitButton}
          >
            {loading ? "Registering..." : "Register as Driver"} <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
}
