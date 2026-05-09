import { useState, useEffect } from "react";
import { FaWallet, FaStar, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import apiClient from "../../api/client";
import styles from "./DriverDashboard.module.css";

export default function DriverDashboard() {
  const [driver, setDriver] = useState<any>(null);
  const [availableOrders, setAvailableOrders] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
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
    loadData();
  }, []);

  if (loading) return <div className={styles.loader}>Loading...</div>;

  if (!driver)
    return (
      <div>
        Not a driver. <a href="/driver-register">Register</a>
      </div>
    );
  if (!driver.isVerified)
    return <div>Your account is pending verification.</div>;

  return (
    <div className={styles.container}>
      <h1>Driver Dashboard</h1>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <FaWallet />
          <h3>Earnings</h3>
          <p>GHS {driver.totalEarnings}</p>
        </div>
        <div className={styles.statCard}>
          <FaStar />
          <h3>Rating</h3>
          <p>{driver.rating} ★</p>
        </div>
        <div className={styles.statCard}>
          <FaCheckCircle />
          <h3>Completed</h3>
          <p>{driver.completedOrders}</p>
        </div>
      </div>
      <div className={styles.section}>
        <h2>Available Orders ({availableOrders.length})</h2>
        {availableOrders.map((order: any) => (
          <div key={order._id} className={styles.orderCard}>
            <p>
              <strong>Order #{order.orderNumber}</strong> -{" "}
              {order.restaurantId?.name}
            </p>
            <button
              onClick={async () => {
                try {
                  await apiClient.post(`/driver/orders/${order._id}/accept`);
                  toast.success("Order accepted");
                  window.location.reload();
                } catch {
                  toast.error("Failed");
                }
              }}
            >
              Accept
            </button>
          </div>
        ))}
      </div>
      <div className={styles.section}>
        <h2>My Orders</h2>
        {myOrders.map((order: any) => (
          <div key={order._id} className={styles.orderCard}>
            <p>
              <strong>{order.orderNumber}</strong> - {order.status}
            </p>
            {order.status === "assigned" && (
              <button
                onClick={async () => {
                  try {
                    await apiClient.put(`/driver/orders/${order._id}/status`, {
                      status: "picked_up",
                    });
                    toast.success("Marked picked up");
                    window.location.reload();
                  } catch {
                    toast.error("Failed");
                  }
                }}
              >
                Picked Up
              </button>
            )}
            {order.status === "picked_up" && (
              <button
                onClick={async () => {
                  try {
                    await apiClient.put(`/driver/orders/${order._id}/status`, {
                      status: "delivered",
                    });
                    toast.success("Delivered");
                    window.location.reload();
                  } catch {
                    toast.error("Failed");
                  }
                }}
              >
                Delivered
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
