import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaArrowLeft,
} from "react-icons/fa";
import styles from "./Cart.module.css";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, itemCount } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any items yet</p>
        <Link to="/restaurants" className={styles.browseButton}>
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/restaurants" className={styles.backLink}>
          <FaArrowLeft /> Continue Shopping
        </Link>
        <h1>Shopping Cart ({itemCount} items)</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.cartItems}>
          {cart.map((item) => (
            <div key={item._id} className={styles.cartItem}>
              <div className={styles.itemInfo}>
                <h3>{item.name}</h3>
                <p className={styles.itemPrice}>GHS {item.price.toFixed(2)}</p>
              </div>
              <div className={styles.controls}>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className={styles.quantityButton}
                >
                  <FaMinus />
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className={styles.quantityButton}
                >
                  <FaPlus />
                </button>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className={styles.deleteButton}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h3>Order Summary</h3>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>GHS {totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Delivery Fee</span>
            <span>GHS 10.00</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Tax</span>
            <span>GHS {(totalPrice * 0.05).toFixed(2)}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total</span>
            <span>GHS {(totalPrice + 10 + totalPrice * 0.05).toFixed(2)}</span>
          </div>
          <Link to="/checkout" className={styles.checkoutButton}>
            Proceed to Checkout <FaShoppingCart />
          </Link>
        </div>
      </div>
    </div>
  );
}
