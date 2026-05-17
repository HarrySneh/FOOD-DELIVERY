import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      // Wait a moment for localStorage to be updated (fixes timing issues)
      await new Promise((resolve) => setTimeout(resolve, 100));
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      console.log("User after login:", user); // Check console to see if role is present
      if (user.role === "admin") navigate("/admin-dashboard");
      else if (user.role === "owner") navigate("/owner-dashboard");
      else if (user.role === "driver") navigate("/driver-dashboard");
      else navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Welcome Back</h1>
          <p>Login to your TamaEat account</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <FaEnvelope className={styles.inputIcon} />
            <input
              type="email"
              placeholder="Email address"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <FaLock className={styles.inputIcon} />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.options}>
            <label className={styles.checkbox}>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password" className={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.loginButton}
          >
            {loading ? "Logging in..." : "Login"} <FaArrowRight />
          </button>
        </form>

        <div className={styles.registerLink}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
