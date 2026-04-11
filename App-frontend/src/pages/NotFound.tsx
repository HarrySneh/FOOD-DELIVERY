import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1>Page Not Found</h1>
        <p>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className={styles.homeLink}>
          <FaHome /> Back to Home
        </Link>
      </div>
    </div>
  );
}
