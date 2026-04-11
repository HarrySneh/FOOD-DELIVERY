import { useState, useEffect } from "react";
import { ordersApi } from "../../api/orders";
import { Order } from "../../types";
import { FaBox, FaCheckCircle, FaClock, FaMotorcycle } from "react-icons/fa";
import Loader from "../../components/Loader";
import styles from "./OwnerDashboard.module.css";

export default function OwnerDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await ordersApi.getUserOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <FaCheckCircle />;
      case "out_for_delivery":
        return <FaMotorcycle />;
      case "preparing":
        return <FaClock />;
      default:
        return <FaBox />;
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Restaurant Owner Dashboard</h1>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Total Orders</h3>
          <p className={styles.statNumber}>{orders.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Pending</h3>
          <p className={styles.statNumber}>
            {orders.filter((o) => o.status === "pending").length}
          </p>
        </div>
        <div className={styles.statCard}>
          <h3>Completed</h3>
          <p className={styles.statNumber}>
            {orders.filter((o) => o.status === "delivered").length}
          </p>
        </div>
      </div>

      <div className={styles.ordersList}>
        <h2>Recent Orders</h2>
        {orders.length === 0 ? (
          <p className={styles.emptyMessage}>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <span className={styles.orderId}>#{order._id.slice(-8)}</span>
                <span
                  className={`${styles.orderStatus} ${styles[order.status]}`}
                >
                  {getStatusIcon(order.status)} {order.status.replace("_", " ")}
                </span>
              </div>
              <div className={styles.orderDetails}>
                <p>
                  <strong>Customer:</strong> {order.customer?.name}
                </p>
                <p>
                  <strong>Items:</strong> {order.items.length} items
                </p>
                <p>
                  <strong>Total:</strong> GHS {order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
