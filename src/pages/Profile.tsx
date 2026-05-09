import { useAuth } from "../hooks/useAuth";
import styles from "./Profile.module.css";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Profile</h1>
      <div className={styles.card}>
        <div className={styles.field}>
          <label className={styles.label}>Name</label>
          <p className={styles.value}>{user.name}</p>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <p className={styles.value}>{user.email}</p>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Phone</label>
          <p className={styles.value}>{user.phone || "Not provided"}</p>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Role</label>
          <p className={styles.value} style={{ textTransform: "capitalize" }}>
            {user.role}
          </p>
        </div>
      </div>
    </div>
  );
}
