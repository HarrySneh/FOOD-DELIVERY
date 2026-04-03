import { useState, useEffect } from "react";
import { ordersApi } from "../../api/orders";
import { Order } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import styles from "./OwnerDashboard.module.css";

export default function OwnerDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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

  const updateStatus = async (orderId: string, status: string) => {
    try {
      await ordersApi.updateStatus(orderId, status);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order,
        ),
      );
      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Restaurant Owner Dashboard</h1>
      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Orders</h2>
        {orders.length === 0 ? (
          <p className={styles.emptyMessage}>No orders yet.</p>
        ) : (
          <div className={styles.ordersList}>
            {orders.map((order) => (
              <div key={order._id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <span className={styles.orderId}>
                    Order #{order._id.slice(-6)}
                  </span>
                  <span className={styles.orderStatus}>
                    {order.status.replace("_", " ")}
                  </span>
                </div>
                <div className={styles.orderDetails}>
                  <p>Customer: {order.customer?.name}</p>
                  <p>Items: {order.items.length} items</p>
                  <p>Total: GHS {order.totalAmount.toFixed(2)}</p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className={styles.statusSelect}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready_for_pickup">Ready for Pickup</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
