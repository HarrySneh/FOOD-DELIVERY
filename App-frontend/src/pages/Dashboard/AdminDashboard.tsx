import { useState, useEffect } from "react";
import { restaurantsApi } from "../../api/restaurants";
import { Restaurant } from "../../types";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    restaurants: 0,
    orders: 0,
    drivers: 0,
  });
  const [pendingRestaurants, setPendingRestaurants] = useState<Restaurant[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: restaurants } = await restaurantsApi.getAll();
        const pending = restaurants.filter((r) => !(r as any).approved);
        setPendingRestaurants(pending);
        setStats({
          users: 156,
          restaurants: restaurants.length,
          orders: 342,
          drivers: 12,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const approveRestaurant = async (id: string) => {
    try {
      await restaurantsApi.approve(id);
      setPendingRestaurants((prev) => prev.filter((r) => r._id !== id));
      toast.success("Restaurant approved");
    } catch (error) {
      toast.error("Failed to approve restaurant");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Users</h3>
          <p className={styles.statValue}>{stats.users}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Restaurants</h3>
          <p className={styles.statValue}>{stats.restaurants}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Orders</h3>
          <p className={styles.statValue}>{stats.orders}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Active Drivers</h3>
          <p className={styles.statValue}>{stats.drivers}</p>
        </div>
      </div>

      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Pending Restaurants</h2>
        {pendingRestaurants.length === 0 ? (
          <p>No pending restaurants</p>
        ) : (
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Cuisine</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingRestaurants.map((rest) => (
                  <tr key={rest._id}>
                    <td>{rest.name}</td>
                    <td>{rest.cuisine?.join(", ")}</td>
                    <td>{rest.address}</td>
                    <td>
                      <button
                        onClick={() => approveRestaurant(rest._id)}
                        className={styles.approveButton}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
