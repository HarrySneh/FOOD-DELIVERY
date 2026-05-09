import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { driverApi } from "../api/driver";
import { FaCar, FaMotorcycle, FaBicycle } from "react-icons/fa";
import styles from "./DriverRegister.module.css";

export default function DriverRegister() {
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await driverApi.register({ vehicleType, vehicleNumber, licenseNumber });
      toast.success("Registration pending admin approval");
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
        <h1>Become a Driver</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.vehicleOptions}>
            <button
              type="button"
              onClick={() => setVehicleType("car")}
              className={vehicleType === "car" ? styles.active : ""}
            >
              <FaCar /> Car
            </button>
            <button
              type="button"
              onClick={() => setVehicleType("motorcycle")}
              className={vehicleType === "motorcycle" ? styles.active : ""}
            >
              <FaMotorcycle /> Motorcycle
            </button>
            <button
              type="button"
              onClick={() => setVehicleType("bicycle")}
              className={vehicleType === "bicycle" ? styles.active : ""}
            >
              <FaBicycle /> Bicycle
            </button>
          </div>
          <input
            type="text"
            placeholder="Vehicle Number (e.g., GR-1234)"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="License Number"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            required
          />
          <button type="submit" disabled={loading || !vehicleType}>
            {loading ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
