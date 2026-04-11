import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
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
  const [savedAddresses] = useState([
    { id: 1, text: "123 Main Street, Accra, Ghana", isDefault: true },
    { id: 2, text: "45 Independence Avenue, Accra, Ghana", isDefault: false },
  ]);

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
      <Link to="/cart" className={styles.backLink}>
        <FaArrowLeft /> Back to Cart
      </Link>

      <div className={styles.content}>
        <div className={styles.mainSection}>
          <div className={styles.section}>
            <h2>Delivery Address</h2>
            <div className={styles.savedAddresses}>
              {savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`${styles.addressCard} ${address === addr.text ? styles.selected : ""}`}
                  onClick={() => setAddress(addr.text)}
                >
                  <input
                    type="radio"
                    name="address"
                    checked={address === addr.text}
                    onChange={() => setAddress(addr.text)}
                  />
                  <div>
                    <p>{addr.text}</p>
                    {addr.isDefault && (
                      <span className={styles.defaultBadge}>Default</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <textarea
              className={styles.addressInput}
              rows={3}
              placeholder="Or enter new address (e.g., House number, street, landmark)"
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
            {loading
              ? "Processing..."
              : `Place Order • GHS ${finalTotal.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
