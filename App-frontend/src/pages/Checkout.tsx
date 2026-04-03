import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import styles from "./Checkout.module.css";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "momo">("card");
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!address) {
      toast.error("Please enter delivery address");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      toast.error("Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>

      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Delivery Address</h2>
        <textarea
          className={styles.textarea}
          rows={3}
          placeholder="Enter your address (e.g., House number, street, landmark)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>

        <h2 className={styles.sectionTitle}>Payment Method</h2>
        <div className={styles.paymentMethods}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
              className={styles.radioInput}
            />
            Card (Visa/Mastercard)
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="momo"
              checked={paymentMethod === "momo"}
              onChange={() => setPaymentMethod("momo")}
              className={styles.radioInput}
            />
            Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo Cash)
          </label>
        </div>

        <div className={styles.footer}>
          <div className={styles.total}>
            <span>Total:</span>
            <span>GHS {totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className={styles.placeOrderButton}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
