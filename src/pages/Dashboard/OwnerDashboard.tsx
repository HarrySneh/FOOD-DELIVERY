import { useState, useEffect } from "react";
import { FaStore, FaBox, FaChartLine, FaClock } from "react-icons/fa";
import { toast } from "react-toastify";
import apiClient from "../../api/client";
import { useAuth } from "../../hooks/useAuth";
import styles from "./OwnerDashboard.module.css";

interface Restaurant {
  _id: string;
  name: string;
  approved: boolean;
  deliveryFee: number;
  rating: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerId: { name: string; phone: string }; // populated
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function OwnerDashboard() {
  const { user } = useAuth();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({totalOrders: 0,totalRevenue: 0,pendingOrders: 0,});
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchOwnerData();
  }, []);

  const fetchOwnerData = async () => {
    try {
      const restaurantsRes = await apiClient.get("/restaurants");
      const ownerRestaurant = restaurantsRes.data.find(
        (r: any) => r.ownerId === user?._id,
      );
      if (ownerRestaurant) {
        setRestaurant(ownerRestaurant);
        const ordersRes = await apiClient.get(`/orders/restaurant-orders`);
        const ordersData = ordersRes.data;
        setOrders(ordersData);
        const totalOrders = ordersData.length;
        const totalRevenue = ordersData.reduce(
          (sum: number, o: Order) => sum + o.totalAmount,
          0,
        );
        const pendingOrders = ordersData.filter(
          (o: Order) => o.status === "pending" || o.status === "confirmed",
        ).length;
        setStats({ totalOrders, totalRevenue, pendingOrders });
      } else {
        setRestaurant(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await apiClient.put(`/orders/${orderId}/status`, { status });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o)),
      );
      toast.success(`Order ${status}`);
      const newOrders = orders.map((o) =>
        o._id === orderId ? { ...o, status } : o,
      );
      const totalRevenue = newOrders.reduce((sum, o) => sum + o.totalAmount, 0);
      const pendingOrders = newOrders.filter(
        (o) => o.status === "pending" || o.status === "confirmed",
      ).length;
      setStats({ totalOrders: newOrders.length, totalRevenue, pendingOrders });
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !restaurant) return;
    const formData = new FormData();
    formData.append("image", selectedFile);
    await apiClient.post(`/restaurants/${restaurant._id}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("Image uploaded");
    fetchOwnerData(); // refresh
  };

  const markReady = async (orderId: string) => {
    try {
      await apiClient.put(`/orders/${orderId}/ready`);
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "ready_for_pickup" } : o,
        ),
      );
      toast.success("Order ready for pickup");
    } catch (error) {
      toast.error("Failed to mark ready");
    }
  };

  if (loading) return <div className={styles.loader}>Loading dashboard...</div>;

  if (!restaurant) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Owner Dashboard</h1>
        <div className={styles.noRestaurant}>
          <FaStore className={styles.noRestaurantIcon} />
          <h2>You don't have a restaurant yet</h2>
          <p>Click below to register your restaurant</p>
          <button className={styles.createButton}>Create Restaurant</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Owner Dashboard</h1>
      <div className={styles.restaurantInfo}>
        <h2>{restaurant.name}</h2>
        <p>
          Status: {restaurant.approved ? "✅ Approved" : "⏳ Pending Approval"}
        </p>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload}>Upload Image</button>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <FaBox className={styles.statIcon} />
          <h3>Total Orders</h3>
          <p className={styles.statValue}>{stats.totalOrders}</p>
        </div>
        <div className={styles.statCard}>
          <FaChartLine className={styles.statIcon} />
          <h3>Total Revenue</h3>
          <p className={styles.statValue}>
            GHS {stats.totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className={styles.statCard}>
          <FaClock className={styles.statIcon} />
          <h3>Pending Orders</h3>
          <p className={styles.statValue}>{stats.pendingOrders}</p>
        </div>
      </div>

      <div className={styles.ordersSection}>
        <h2>Recent Orders</h2>
        {orders.length === 0 && (
          <p className={styles.emptyMessage}>No orders yet.</p>
        )}
        {orders.map((order) => (
          <div key={order._id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <span className={styles.orderNumber}>{order.orderNumber}</span>
              <span className={`${styles.orderStatus} ${styles[order.status]}`}>
                {order.status.replace("_", " ")}
              </span>
            </div>
            <div className={styles.orderDetails}>
              <p>
                <strong>Customer:</strong> {order.customerId?.name}
              </p>
              <p>
                <strong>Phone:</strong> {order.customerId?.phone}
              </p>
              <p>
                <strong>Total:</strong> GHS {order.totalAmount.toFixed(2)}
              </p>
              <p>
                <strong>Placed:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className={styles.orderActions}>
              {order.status === "pending" && (
                <button
                  onClick={() => updateOrderStatus(order._id, "confirmed")}
                  className={styles.confirmButton}
                >
                  Confirm
                </button>
              )}
              {order.status === "confirmed" && (
                <button
                  onClick={() => updateOrderStatus(order._id, "preparing")}
                  className={styles.prepareButton}
                >
                  Start Preparing
                </button>
              )}
              {order.status === "preparing" && (
                <button
                  onClick={() => markReady(order._id)}
                  className={styles.readyButton}
                >
                  Mark Ready for Pickup
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
