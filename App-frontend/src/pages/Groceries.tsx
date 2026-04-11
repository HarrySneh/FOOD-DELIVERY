import { Link } from "react-router-dom";
import {
  FaStore,
  FaStar,
  FaTruck,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import styles from "./Groceries.module.css";

export default function Groceries() {
  return (
    <div className={styles.container}>
      <div className={styles.locationBanner}>
        <FaMapMarkerAlt />
        <span>
          Delivering to <strong>Tamale</strong> and across Ghana
        </span>
      </div>

      <div className={styles.comingSoon}>
        <div className={styles.comingSoonContent}>
          <FaStore className={styles.comingSoonIcon} />
          <h1>Grocery Delivery Coming Soon to Tamale!</h1>
          <p>
            We're working hard to bring you fresh groceries from local stores in
            Tamale and across Ghana.
          </p>

          <div className={styles.tamalePreview}>
            <h3>Coming to Tamale:</h3>
            <div className={styles.storePreview}>
              <div className={styles.previewStore}>
                <span>🛒</span>
                <p>Tamale Central Market</p>
              </div>
              <div className={styles.previewStore}>
                <span>🥬</span>
                <p>Northern Fresh Produce</p>
              </div>
              <div className={styles.previewStore}>
                <span>🍚</span>
                <p>Savanna Mart</p>
              </div>
            </div>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <FaTruck />
              <span>Fast Delivery to Tamale</span>
            </div>
            <div className={styles.feature}>
              <FaStar />
              <span>Fresh Local Produce</span>
            </div>
            <div className={styles.feature}>
              <FaClock />
              <span>Same Day Delivery</span>
            </div>
          </div>

          <div className={styles.notifySection}>
            <h3>Get notified when we launch in Tamale!</h3>
            <div className={styles.emailForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.emailInput}
              />
              <button className={styles.notifyButton}>Notify Me</button>
            </div>
          </div>

          <Link to="/" className={styles.backButton}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
