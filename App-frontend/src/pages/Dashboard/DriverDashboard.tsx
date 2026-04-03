import { useState, useEffect } from "react";
import { driverApi } from "../../api/driver";
import { Order } from "../../types";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import styles from "./DriverDashboard.module.css";

export default function DriverDashboard() {
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [availableRes, myOrdersRes] = await Promise.all([
          driverApi.getAvailableOrders(),
          driverApi.getMyOrders(),
        ]);
        setAvailableOrders(availableRes.data);
        setMyOrders(myOrdersRes.data);
        const deliveredOrders = myOrdersRes.data.filter(
          (o) => o.status === "delivered",
        );
        const total = deliveredOrders.reduce(
          (sum, o) => sum + (o.deliveryFee || 10),
          0,
        );
        setEarnings(total);
      } catch (error) {
        console.error(error);
        // Mock data for demo
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
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Driver Dashboard</h1>

      <div className={styles.earningsCard}>
        <h3>Total Earnings</h3>
        <p className={styles.earningsAmount}>GHS {earnings.toFixed(2)}</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Available Orders</h2>
        {availableOrders.length === 0 ? (
          <p className={styles.emptyMessage}>No orders ready for pickup.</p>
        ) : (
          <div className={styles.ordersGrid}>
            {availableOrders.map((order) => (
              <div key={order._id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <span className={styles.orderId}>
                    Order #{order._id?.slice(-6)}
                  </span>
                  <span className={styles.orderStatus}>Ready for Pickup</span>
                </div>
                <div className={styles.orderDetails}>
                  <p>Restaurant: {order.restaurant?.name}</p>
                  <p>Pickup: {order.restaurant?.address}</p>
                  <p>Delivery Fee: GHS {order.deliveryFee || 10}</p>
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
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>My Orders</h2>
        {myOrders.length === 0 ? (
          <p className={styles.emptyMessage}>No orders assigned to you.</p>
        ) : (
          <div className={styles.ordersGrid}>
            {myOrders.map((order) => (
              <div key={order._id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <span className={styles.orderId}>
                    Order #{order._id?.slice(-6)}
                  </span>
                  <span className={styles.orderStatus}>
                    {order.status?.replace("_", " ")}
                  </span>
                </div>
                <div className={styles.orderDetails}>
                  <p>Restaurant: {order.restaurant?.name}</p>
                  <p>Customer: {order.customer?.name}</p>
                  <p>Delivery Address: {order.deliveryAddress?.text}</p>
                </div>
                {order.status === "assigned" && (
                  <button
                    onClick={() => updateOrderStatus(order._id, "picked_up")}
                    className={styles.actionButton}
                  >
                    Mark as Picked Up
                  </button>
                )}
                {order.status === "picked_up" && (
                  <button
                    onClick={() => updateOrderStatus(order._id, "delivered")}
                    className={styles.deliverButton}
                  >
                    Mark as Delivered
                  </button>
                )}
                <Link
                  to={`/tracking/${order._id}`}
                  className={styles.trackLink}
                >
                  Track Order →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
