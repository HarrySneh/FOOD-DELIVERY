import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ordersApi } from "../api/orders";
import { Order } from "../types";
import Loader from "../components/Loader";
import styles from "./Orders.module.css";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await ordersApi.getUserOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
        // Set mock data for demo
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  if (orders.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>No Orders Yet</h2>
        <p>You haven't placed any orders.</p>
        <Link to="/restaurants" className={styles.browseButton}>
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Orders</h1>
      <div className={styles.ordersList}>
        {orders.map((order) => (
          <div key={order._id} className={styles.orderCard}>
            <div className={styles.orderInfo}>
              <p className={styles.orderId}>Order #{order._id.slice(-6)}</p>
              <p className={styles.date}>
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className={styles.status}>
                <span>Status:</span> {order.status.replace("_", " ")}
              </p>
              <p>Total: GHS {order.totalAmount.toFixed(2)}</p>
            </div>
            <Link to={`/tracking/${order._id}`} className={styles.trackButton}>
              Track Order
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
