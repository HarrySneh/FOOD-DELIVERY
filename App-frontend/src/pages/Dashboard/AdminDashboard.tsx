import { useState, useEffect } from "react";
import {
  FaUsers,
  FaStore,
  FaBox,
  FaMotorcycle,
  FaCheckCircle,
} from "react-icons/fa";
import Loader from "../../components/Loader";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRestaurants: 0,
    totalOrders: 0,
    totalDrivers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStats({
          totalUsers: 1250,
          totalRestaurants: 85,
          totalOrders: 3420,
          totalDrivers: 45,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;

  const statCards = [
    {
      icon: FaUsers,
      label: "Total Users",
      value: stats.totalUsers,
      color: "#2563eb",
    },
    {
      icon: FaStore,
      label: "Restaurants",
      value: stats.totalRestaurants,
      color: "#ea580c",
    },
    {
      icon: FaBox,
      label: "Total Orders",
      value: stats.totalOrders,
      color: "#10b981",
    },
    {
      icon: FaMotorcycle,
      label: "Active Drivers",
      value: stats.totalDrivers,
      color: "#6366f1",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>

      <div className={styles.statsGrid}>
        {statCards.map((card, idx) => (
          <div key={idx} className={styles.statCard}>
            <card.icon
              className={styles.statIcon}
              style={{ color: card.color }}
            />
            <h3>{card.label}</h3>
            <p className={styles.statValue}>{card.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className={styles.recentActivity}>
        <h2>Recent Activity</h2>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <FaCheckCircle className={styles.activityIcon} />
            <div>
              <p>New restaurant registered: Tasty Jollof</p>
              <span className={styles.activityTime}>2 hours ago</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <FaCheckCircle className={styles.activityIcon} />
            <div>
              <p>New driver approved: Kwame Asante</p>
              <span className={styles.activityTime}>5 hours ago</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <FaCheckCircle className={styles.activityIcon} />
            <div>
              <p>Total orders reached 1000 this week</p>
              <span className={styles.activityTime}>1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
