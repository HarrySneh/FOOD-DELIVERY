import { useState, useEffect } from "react";
import { driverApi } from "../../api/driver";
import { Order } from "../../types";
import { Link } from "react-router-dom";
import { FaMotorcycle, FaWallet, FaStar, FaCheckCircle } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import styles from "./DriverDashboard.module.css";

export default function DriverDashboard() {
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState(450);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [availableRes, myOrdersRes] = await Promise.all([
          driverApi.getAvailableOrders(),
          driverApi.getMyOrders(),
        ]);
        setAvailableOrders(availableRes.data);
        setMyOrders(myOrdersRes.data);
      } catch (error) {
        console.error(error);
        setAvailableOrders([]);
        setMyOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const acceptOrder = async (orderId: string) => {
    try {
      await driverApi.acceptOrder(orderId);
      const accepted = availableOrders.find((o) => o._id === orderId);
      setAvailableOrders((prev) => prev.filter((o) => o._id !== orderId));
      if (accepted) {
        setMyOrders((prev) => [{ ...accepted, status: "assigned" }, ...prev]);
      }
      toast.success("Order accepted!");
    } catch (error) {
      toast.error("Failed to accept order");
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    status: "picked_up" | "delivered",
  ) => {
    try {
      await driverApi.updateOrderStatus(orderId, status);
      setMyOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o)),
      );
      toast.success(`Order marked as ${status}`);
      if (status === "delivered") {
        setEarnings((prev) => prev + 15);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Driver Dashboard</h1>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <FaWallet className={styles.statIcon} />
          <h3>Total Earnings</h3>
          <p className={styles.earnings}>GHS {earnings}</p>
        </div>
        <div className={styles.statCard}>
          <FaStar className={styles.statIcon} />
          <h3>Rating</h3>
          <p className={styles.rating}>4.9 ★</p>
        </div>
        <div className={styles.statCard}>
          <FaCheckCircle className={styles.statIcon} />
          <h3>Completed</h3>
          <p className={styles.completed}>
            {myOrders.filter((o) => o.status === "delivered").length}
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Available Orders ({availableOrders.length})</h2>
        {availableOrders.length === 0 ? (
          <p className={styles.emptyMessage}>No orders available</p>
        ) : (
          availableOrders.map((order) => (
            <div key={order._id} className={styles.orderCard}>
              <div className={styles.orderInfo}>
                <p className={styles.restaurantName}>
                  {order.restaurant?.name}
                </p>
                <p className={styles.orderDetails}>Delivery Fee: GHS 15</p>
              </div>
              <button
                onClick={() => acceptOrder(order._id)}
                className={styles.acceptButton}
              >
                <FaMotorcycle /> Accept
              </button>
            </div>
          ))
        )}
      </div>

      <div className={styles.section}>
        <h2>My Orders</h2>
        {myOrders.length === 0 ? (
          <p className={styles.emptyMessage}>No orders assigned</p>
        ) : (
          myOrders.map((order) => (
            <div key={order._id} className={styles.orderCard}>
              <div className={styles.orderInfo}>
                <p className={styles.restaurantName}>
                  {order.restaurant?.name}
                </p>
                <p className={styles.orderStatus}>
                  {order.status?.replace("_", " ")}
                </p>
              </div>
              <div className={styles.orderActions}>
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
                <Link
                  to={`/tracking/${order._id}`}
                  className={styles.trackLink}
                >
                  Track
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
