import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import {
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaWhatsapp,
  FaMoon,
  FaSun,
  FaStore,
  FaUtensils,
} from "react-icons/fa";
import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./Header.module.css";

export default function Header() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext)!;

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setIsDropdownOpen(false);
  };

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/233123456789?text=Hello%20TamaEat%2C%20I%20need%20help%20with%20my%20order",
      "_blank",
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Tama<span>Eat</span>
        </Link>

        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/restaurants" className={styles.navLink}>
            <FaUtensils className={styles.navIcon} /> Restaurants
          </Link>
          <Link to="/groceries" className={styles.navLink}>
            <FaStore className={styles.navIcon} /> Groceries
          </Link>
          <Link to="/about" className={styles.navLink}>
            About
          </Link>

          <button
            onClick={openWhatsApp}
            className={styles.whatsappButton}
            aria-label="WhatsApp Support"
          >
            <FaWhatsapp />
          </button>

          <button
            onClick={toggleDarkMode}
            className={styles.themeToggle}
            aria-label="Dark Mode"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          <Link to="/cart" className={styles.cartLink}>
            <FaShoppingCart size={20} />
            {itemCount > 0 && (
              <span className={styles.cartBadge}>{itemCount}</span>
            )}
          </Link>

          {user ? (
            <div className={styles.userMenu}>
              <button
                className={styles.userButton}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FaUser />
                <span>{user.name.split(" ")[0]}</span>
              </button>
              {isDropdownOpen && (
                <div className={styles.dropdown}>
                  <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
                    Profile
                  </Link>
                  <Link to="/orders" onClick={() => setIsDropdownOpen(false)}>
                    Orders
                  </Link>
                  {user.role === "owner" && (
                    <Link
                      to="/owner-dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Owner Dashboard
                    </Link>
                  )}
                  {user.role === "admin" && (
                    <Link
                      to="/admin-dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  {user.role === "driver" && (
                    <Link
                      to="/driver-dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Driver Dashboard
                    </Link>
                  )}
                  {user.role === "customer" && (
                    <Link
                      to="/driver-register"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Become a Driver
                    </Link>
                  )}
                  <button onClick={handleLogout}>
                    <FaSignOutAlt
                      style={{ display: "inline", marginRight: "0.5rem" }}
                    />{" "}
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className={styles.loginButton}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
