import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import styles from "./Cart.module.css";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, itemCount } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Your cart is empty</h2>
        <Link to="/restaurants" className={styles.browseButton}>
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping Cart ({itemCount} items)</h1>
      <div className={styles.cartItems}>
        {cart.map((item) => (
          <div key={item._id} className={styles.cartItem}>
            <div className={styles.itemInfo}>
              <p className={styles.itemName}>{item.name}</p>
              <p className={styles.itemPrice}>GHS {item.price.toFixed(2)}</p>
            </div>
            <div className={styles.controls}>
              <button
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className={styles.quantityButton}
              >
                <FaMinus size={10} />
              </button>
              <span className={styles.quantity}>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className={styles.quantityButton}
              >
                <FaPlus size={10} />
              </button>
              <button
                onClick={() => removeFromCart(item._id)}
                className={styles.deleteButton}
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.total}>
          <span>Total:</span>
          <span>GHS {totalPrice.toFixed(2)}</span>
        </div>
        <Link to="/checkout" className={styles.checkoutButton}>
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
