import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ordersApi } from "../api/orders";
import Loader from "../components/Loader";
import styles from "./OrderTracking.module.css";

export default function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (orderId)
      ordersApi
        .getOrderById(orderId)
        .then(({ data }) => setOrder(data))
        .catch(console.error)
        .finally(() => setLoading(false));
  }, [orderId]);
  if (loading) return <Loader />;
  if (!order) return <div>Order not found</div>;
  const steps = [
    "pending",
    "confirmed",
    "preparing",
    "ready_for_pickup",
    "assigned",
    "picked_up",
    "delivered",
  ];
  const currentStep = steps.indexOf(order.status);
  return (
    <div className={styles.container}>
      <h1>Order #{order.orderNumber}</h1>
      <div className={styles.statusCard}>
        <div className={styles.statusSteps}>
          {steps.map((step, i) => (
            <div
              key={step}
              className={`${styles.step} ${i <= currentStep ? styles.completed : ""} ${i === currentStep ? styles.active : ""}`}
            >
              <div className={styles.stepCircle}>{i + 1}</div>
              <span>{step.replace("_", " ")}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.details}>
        <p>
          <strong>Restaurant:</strong> {order.restaurantId?.name}
        </p>
        <p>
          <strong>Delivery Address:</strong> {order.deliveryAddress?.text}
        </p>
        <p>
          <strong>Total:</strong> GHS {order.totalAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
