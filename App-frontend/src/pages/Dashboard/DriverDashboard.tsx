import { useState, useEffect } from "react";
import {
  FaMotorcycle,
  FaWallet,
  FaStar,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import apiClient from "../../api/client";
import { useAuth } from "../../hooks/useAuth";
import styles from "./DriverDashboard.module.css";

interface DriverProfile {
  _id: string;
  vehicleType: string;
  vehicleNumber: string;
  isAvailable: boolean;
  isVerified: boolean;
  totalEarnings: number;
  completedOrders: number;
  rating: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  restaurantId: { name: string; address: string };
  customerId: { name: string; phone: string };
  deliveryAddress: { text: string };
  totalAmount: number;
  deliveryFee: number;
  status: string;
}

export default function DriverDashboard() {
  const { user } = useAuth();
  const [driver, setDriver] = useState<DriverProfile | null>(null);
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDriverData();
    // Start location tracking (every 10 seconds)
    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        try {
          await apiClient.put("/driver/location", {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        } catch (error) {
          console.error("Location update failed");
        }
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, interval: 10000 },
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const fetchDriverData = async () => {
    try {
      const [profileRes, availableRes, myRes] = await Promise.all([
        apiClient.get("/driver/profile"),
        apiClient.get("/driver/available-orders"),
        apiClient.get("/driver/my-orders"),
      ]);
      setDriver(profileRes.data);
      setAvailableOrders(availableRes.data);
      setMyOrders(myRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load driver data");
    } finally {
      setLoading(false);
    }
  };

  const acceptOrder = async (orderId: string) => {
    try {
      await apiClient.post(`/driver/orders/${orderId}/accept`);
      const accepted = availableOrders.find((o) => o._id === orderId);
      setAvailableOrders((prev) => prev.filter((o) => o._id !== orderId));
      if (accepted) setMyOrders((prev) => [accepted, ...prev]);
      toast.success("Order accepted!");
    } catch (error) {
      toast.error("Accept failed");
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    status: "picked_up" | "delivered",
  ) => {
    try {
      await apiClient.put(`/driver/orders/${orderId}/status`, { status });
      setMyOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o)),
      );
      toast.success(
        `Order ${status === "picked_up" ? "picked up" : "delivered"}`,
      );
      if (status === "delivered") {
        // Refresh driver earnings
        const profileRes = await apiClient.get("/driver/profile");
        setDriver(profileRes.data);
      }
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const toggleAvailability = async () => {
    try {
      await apiClient.put("/driver/toggle-availability");
      setDriver((prev) =>
        prev ? { ...prev, isAvailable: !prev.isAvailable } : null,
      );
      toast.success(
        `You are now ${driver?.isAvailable ? "offline" : "online"}`,
      );
    } catch (error) {
      toast.error("Failed to toggle status");
    }
  };

  if (loading) return <div className={styles.loader}>Loading dashboard...</div>;

  if (!driver) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Driver Dashboard</h1>
        <div className={styles.noDriver}>
          <FaMotorcycle className={styles.noDriverIcon} />
          <h2>You are not registered as a driver</h2>
          <p>Click below to become a driver</p>
          <button className={styles.registerButton}>Register as Driver</button>
        </div>
      </div>
    );
  }

  if (!driver.isVerified) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Driver Dashboard</h1>
        <div className={styles.pendingVerification}>
          <FaCheckCircle className={styles.pendingIcon} />
          <h2>Awaiting Verification</h2>
          <p>
            Your account is pending admin approval. You'll be notified once
            verified.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Driver Dashboard</h1>

      <div className={styles.driverInfo}>
        <div className={styles.statusToggle}>
          <span>Status:</span>
          <button
            onClick={toggleAvailability}
            className={`${styles.statusButton} ${driver.isAvailable ? styles.online : styles.offline}`}
          >
            {driver.isAvailable ? "Online" : "Offline"}
          </button>
        </div>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <FaWallet className={styles.statIcon} />
            <h3>Total Earnings</h3>
            <p className={styles.earnings}>
              GHS {driver.totalEarnings.toFixed(2)}
            </p>
          </div>
          <div className={styles.statCard}>
            <FaStar className={styles.statIcon} />
            <h3>Rating</h3>
            <p className={styles.rating}>{driver.rating} ★</p>
          </div>
          <div className={styles.statCard}>
            <FaCheckCircle className={styles.statIcon} />
            <h3>Completed</h3>
            <p className={styles.completed}>{driver.completedOrders}</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Available Orders ({availableOrders.length})</h2>
        {availableOrders.length === 0 && (
          <p className={styles.emptyMessage}>No orders ready for pickup.</p>
        )}
        {availableOrders.map((order) => (
          <div key={order._id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <span className={styles.orderNumber}>{order.orderNumber}</span>
              <span className={styles.restaurantName}>
                {order.restaurantId?.name}
              </span>
            </div>
            <div className={styles.orderDetails}>
              <p>
                <FaMapMarkerAlt /> {order.restaurantId?.address}
              </p>
              <p>Delivery Fee: GHS {order.deliveryFee}</p>
            </div>
            <button
              onClick={() => acceptOrder(order._id)}
              className={styles.acceptButton}
            >
              Accept Order
            </button>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h2>My Orders</h2>
        {myOrders.length === 0 && (
          <p className={styles.emptyMessage}>No orders assigned.</p>
        )}
        {myOrders.map((order) => (
          <div key={order._id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <span className={styles.orderNumber}>{order.orderNumber}</span>
              <span className={`${styles.orderStatus} ${styles[order.status]}`}>
                {order.status.replace("_", " ")}
              </span>
            </div>
            <div className={styles.orderDetails}>
              <p>
                <strong>Restaurant:</strong> {order.restaurantId?.name}
              </p>
              <p>
                <strong>Customer:</strong> {order.customerId?.name} (
                {order.customerId?.phone})
              </p>
              <p>
                <strong>Address:</strong> {order.deliveryAddress?.text}
              </p>
            </div>
            <div className={styles.actions}>
              {order.status === "assigned" && (
                <button
                  onClick={() => updateOrderStatus(order._id, "picked_up")}
                  className={styles.pickupButton}
                >
                  Picked Up
                </button>
              )}
              {order.status === "picked_up" && (
                <button
                  onClick={() => updateOrderStatus(order._id, "delivered")}
                  className={styles.deliverButton}
                >
                  Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
