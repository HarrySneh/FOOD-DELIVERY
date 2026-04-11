import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ordersApi } from "../api/orders";
import { Order } from "../types";
import { FaBox, FaClock, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
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
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "delivered":
        return styles.statusDelivered;
      case "out_for_delivery":
        return styles.statusOutForDelivery;
      case "preparing":
        return styles.statusPreparing;
      case "confirmed":
        return styles.statusConfirmed;
      default:
        return styles.statusPending;
    }
  };

  const getStatusText = (status: string) => {
    return status.replace("_", " ").toUpperCase();
  };

  if (loading) return <Loader />;

  if (orders.length === 0) {
    return (
      <div className={styles.empty}>
        <FaBox className={styles.emptyIcon} />
        <h2>No Orders Yet</h2>
        <p>You haven't placed any orders. Start exploring restaurants!</p>
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
            <div className={styles.orderHeader}>
              <div>
                <span className={styles.orderNumber}>
                  Order #{order._id.slice(-8)}
                </span>
                <span
                  className={`${styles.orderStatus} ${getStatusClass(order.status)}`}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
              <span className={styles.orderDate}>
                <FaClock /> {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className={styles.orderDetails}>
              <div className={styles.detailRow}>
                <FaMapMarkerAlt className={styles.detailIcon} />
                <span>{order.deliveryAddress?.text}</span>
              </div>
              <div className={styles.detailRow}>
                <FaRupeeSign className={styles.detailIcon} />
                <span>GHS {order.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.orderItems}>
              <p className={styles.itemsLabel}>Items ({order.items.length}):</p>
              <div className={styles.itemsList}>
                {order.items.slice(0, 3).map((item, idx) => (
                  <span key={idx} className={styles.itemTag}>
                    {item.name} x{item.quantity}
                  </span>
                ))}
                {order.items.length > 3 && (
                  <span className={styles.moreItems}>
                    +{order.items.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className={styles.orderFooter}>
              <Link
                to={`/tracking/${order._id}`}
                className={styles.trackButton}
              >
                Track Order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
