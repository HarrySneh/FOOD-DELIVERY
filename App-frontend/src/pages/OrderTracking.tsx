import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ordersApi } from "../api/orders";
import { Order } from "../types";
import {
  FaCheckCircle,
  FaClock,
  FaMotorcycle,
  FaStore,
  FaHome,
} from "react-icons/fa";
import Loader from "../components/Loader";
import styles from "./OrderTracking.module.css";

export default function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      try {
        const { data } = await ordersApi.getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <Loader />;
  if (!order) return <div>Order not found</div>;

  const steps = [
    {
      key: "pending",
      icon: FaClock,
      label: "Order Placed",
      description: "Your order has been received",
    },
    {
      key: "confirmed",
      icon: FaCheckCircle,
      label: "Confirmed",
      description: "Restaurant accepted your order",
    },
    {
      key: "preparing",
      icon: FaStore,
      label: "Preparing",
      description: "Restaurant is preparing your food",
    },
    {
      key: "ready_for_pickup",
      icon: FaCheckCircle,
      label: "Ready",
      description: "Order ready for pickup",
    },
    {
      key: "assigned",
      icon: FaMotorcycle,
      label: "Assigned",
      description: "Driver assigned to your order",
    },
    {
      key: "picked_up",
      icon: FaMotorcycle,
      label: "Picked Up",
      description: "Driver picked up your order",
    },
    {
      key: "delivered",
      icon: FaHome,
      label: "Delivered",
      description: "Order delivered to your door",
    },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === order.status);

  // Helper to get restaurant name safely
  const restaurantName =
    typeof order.restaurantId === "object"
      ? order.restaurantId.name
      : "Restaurant";
  const restaurantAddress =
    typeof order.restaurantId === "object" ? order.restaurantId.address : "";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Track Your Order</h1>
        <p className={styles.orderId}>
          Order #{order.orderNumber?.slice(-8) || order._id.slice(-8)}
        </p>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>
        <div className={styles.steps}>
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isActive = index === currentStepIndex;
            const Icon = step.icon;
            return (
              <div
                key={step.key}
                className={`${styles.step} ${isCompleted ? styles.completed : ""} ${isActive ? styles.active : ""}`}
              >
                <div className={styles.stepIcon}>
                  <Icon />
                </div>
                <div className={styles.stepLabel}>{step.label}</div>
                <div className={styles.stepDesc}>{step.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.orderDetails}>
        <h2>Order Details</h2>
        <div className={styles.detailsGrid}>
          <div className={styles.detailCard}>
            <h3>Restaurant</h3>
            <p>{restaurantName}</p>
          </div>
          <div className={styles.detailCard}>
            <h3>Delivery Address</h3>
            <p>{order.deliveryAddress?.text}</p>
          </div>
          <div className={styles.detailCard}>
            <h3>Payment Method</h3>
            <p>{order.paymentMethod === "momo" ? "Mobile Money" : "Card"}</p>
          </div>
          <div className={styles.detailCard}>
            <h3>Total Amount</h3>
            <p className={styles.totalAmount}>
              GHS {order.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.orderItems}>
        <h2>Items Ordered</h2>
        <div className={styles.itemsList}>
          {order.items.map((item, idx) => (
            <div key={idx} className={styles.itemRow}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemQuantity}>x{item.quantity}</span>
              <span className={styles.itemPrice}>
                GHS {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Link to="/orders" className={styles.backButton}>
        ← Back to Orders
      </Link>
    </div>
  );
}
