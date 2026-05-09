import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { ordersApi } from "../api/orders";
import { initializePayment } from "../services/paymentService";
import {
  FaArrowLeft,
  FaCreditCard,
  FaMobileAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./Checkout.module.css";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "momo">("card");
  const [loading, setLoading] = useState(false);

  const deliveryFee = 10;
  const tax = totalPrice * 0.05;
  const finalTotal = totalPrice + deliveryFee + tax;

  const handlePlaceOrder = async () => {
    if (!address) {
      toast.error("Please enter delivery address");
      return;
    }

    setLoading(true);
    try {
      // ✅ Send full cart items (no manual mapping)
      const { data: order } = await ordersApi.create({
        items: cart,
        deliveryAddress: address,
        paymentMethod,
        totalAmount: finalTotal,
      });

      await initializePayment(
        order._id,
        user?.email!,
        order.totalAmount,
        async (success, result) => {
          if (success) {
            clearCart();
            toast.success("Payment successful! Your order is confirmed.");
            navigate(`/tracking/${order._id}`);
          } else {
            toast.error(`Payment failed: ${result}`);
            try {
              await ordersApi.cancel(order._id);
            } catch (err) {
              console.error("Cancel failed", err);
            }
          }
          setLoading(false);
        },
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Order creation failed");
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className={styles.container}>
      <Link to="/cart" className={styles.backLink}>
        <FaArrowLeft /> Back to Cart
      </Link>

      <div className={styles.content}>
        <div className={styles.mainSection}>
          <div className={styles.section}>
            <h2>Delivery Address</h2>
            <textarea
              className={styles.addressInput}
              rows={3}
              placeholder="Enter your address (e.g., House number, street, landmark)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className={styles.section}>
            <h2>Payment Method</h2>
            <div className={styles.paymentMethods}>
              <label
                className={`${styles.paymentOption} ${paymentMethod === "card" ? styles.selected : ""}`}
              >
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <FaCreditCard className={styles.paymentIcon} />
                <div>
                  <strong>Card Payment</strong>
                  <p>Visa, Mastercard, American Express</p>
                </div>
              </label>
              <label
                className={`${styles.paymentOption} ${paymentMethod === "momo" ? styles.selected : ""}`}
              >
                <input
                  type="radio"
                  value="momo"
                  checked={paymentMethod === "momo"}
                  onChange={() => setPaymentMethod("momo")}
                />
                <FaMobileAlt className={styles.paymentIcon} />
                <div>
                  <strong>Mobile Money</strong>
                  <p>MTN MoMo, Vodafone Cash, AirtelTigo Cash</p>
                </div>
              </label>
            </div>
          </div>

          <div className={styles.secureNotice}>
            <FaShieldAlt />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </div>

        <div className={styles.summary}>
          <h3>Order Summary</h3>
          <div className={styles.summaryRow}>
            <span>Subtotal ({cart.length} items)</span>
            <span>GHS {totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Delivery Fee</span>
            <span>GHS {deliveryFee.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Tax (5%)</span>
            <span>GHS {tax.toFixed(2)}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total</span>
            <span>GHS {finalTotal.toFixed(2)}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className={styles.placeOrderButton}
          >
            {loading ? "Processing..." : `Pay GHS ${finalTotal.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
