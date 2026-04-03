import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ordersApi } from "../api/orders";
import { Order } from "../types";
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

  const statusSteps = [
    "pending",
    "confirmed",
    "preparing",
    "ready_for_pickup",
    "assigned",
    "picked_up",
    "delivered",
  ];
  const currentStep = statusSteps.indexOf(order.status);

  const getStepStatus = (index: number) => {
    if (index < currentStep) return "completed";
    if (index === currentStep) return "active";
    return "pending";
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order #{order._id.slice(-6)}</h1>

      <div className={styles.statusCard}>
        <h2 className={styles.statusTitle}>Order Status</h2>
        <div className={styles.statusSteps}>
          {statusSteps.map((step, idx) => (
            <div key={step} className={styles.step}>
              <div
                className={`${styles.stepCircle} ${styles[getStepStatus(idx)]}`}
              >
                {idx < currentStep ? "✓" : idx + 1}
              </div>
              <span className={styles.stepLabel}>{step.replace("_", " ")}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.infoCard}>
        <h2 className={styles.infoTitle}>Order Details</h2>
        <p>
          <strong>Restaurant:</strong> {order.restaurant?.name}
        </p>
        <p>
          <strong>Delivery Address:</strong> {order.deliveryAddress?.text}
        </p>
        <p>
          <strong>Payment Method:</strong>{" "}
          {order.paymentMethod === "momo" ? "Mobile Money" : "Card"}
        </p>
        <p>
          <strong>Total Amount:</strong> GHS {order.totalAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
