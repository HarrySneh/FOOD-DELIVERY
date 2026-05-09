import { Link } from "react-router-dom";
import { FaStore, FaArrowRight } from "react-icons/fa";
import styles from "./Groceries.module.css";

export default function Groceries() {
  return (
    <div className={styles.container}>
      <div className={styles.comingSoon}>
        <FaStore className={styles.comingSoonIcon} />
        <h1>Grocery Delivery Coming Soon!</h1>
        <p>Fresh produce, essentials, and more – directly to your door.</p>
        <Link to="/" className={styles.backButton}>
          Back to Home <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}
