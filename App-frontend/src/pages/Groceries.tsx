import { Link } from 'react-router-dom';
import { FaStore, FaStar, FaTruck, FaClock, FaArrowRight } from 'react-icons/fa';
import styles from './Groceries.module.css';

export default function Groceries() {
  return (
    <div className={styles.container}>
      <div className={styles.comingSoon}>
        <div className={styles.comingSoonContent}>
          <FaStore className={styles.comingSoonIcon} />
          <h1>Grocery Delivery Coming Soon!</h1>
          <p>We're working hard to bring you fresh groceries from local stores across Ghana.</p>
          
          <div className={styles.features}>
            <div className={styles.feature}>
              <FaTruck />
              <span>Fast Delivery</span>
            </div>
            <div className={styles.feature}>
              <FaStar />
              <span>Fresh Produce</span>
            </div>
            <div className={styles.feature}>
              <FaClock />
              <span>Same Day Delivery</span>
            </div>
          </div>

          <div className={styles.notifySection}>
            <h3>Get notified when we launch!</h3>
            <div className={styles.emailForm}>
              <input type="email" placeholder="Enter your email" className={styles.emailInput} />
              <button className={styles.notifyButton}>Notify Me</button>
            </div>
          </div>

          <Link to="/" className={styles.backButton}>
            Back to Home <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}