import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaStore,
  FaUtensils,
} from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>TamaEat</h3>
            <p>Taste the Best, Eat with Ease</p>
            <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>
              Delivering food and groceries across Ghana
            </p>
            <div className={styles.socialLinks}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/233123456789"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Quick Links</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/restaurants">Restaurants</Link>
              </li>
              <li>
                <Link to="/groceries">Groceries</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Services</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/restaurants">
                  <FaUtensils style={{ marginRight: "0.5rem" }} /> Food Delivery
                </Link>
              </li>
              <li>
                <Link to="/groceries">
                  <FaStore style={{ marginRight: "0.5rem" }} /> Grocery Delivery
                </Link>
              </li>
              <li>
                <Link to="/driver-register">Become a Driver</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Legal</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/return-policy">Return Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-use">Terms of Use</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Contact</h3>
            <ul className={styles.footerContact}>
              <li>📧 support@tamaeat.com</li>
              <li>📞 +233 123 456 789</li>
              <li>📍 Accra, Ghana</li>
              <li>⏰ Mon-Sun: 8am - 10pm</li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} TamaEat. All rights reserved.</p>
          <p className={styles.tagline}>Taste the Best, Eat with Ease</p>
        </div>
      </div>
    </footer>
  );
}
