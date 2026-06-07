import { useState, useEffect } from "react";
import { driverApi } from "../../api/driver";
import { ordersApi } from "../../api/orders";
import { useAuth } from "../../hooks/useAuth";
import {
  FaMotorcycle,
  FaStar,
  FaWallet,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaToggleOn,
  FaToggleOff,
  FaArrowRight,
  FaHistory,
} from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./DriverDashboard.module.css";

interface Order {
  _id: string;
  orderNumber: string;
  restaurantId: { name: string; address: string };
  customerId: { name: string; phone: string };
  deliveryAddress: { text: string };
  totalAmount: number;
  deliveryFee: number;
  status: string;
  createdAt: string;
}

interface DriverStats {
  totalEarnings: number;
  completedOrders: number;
  rating: number;
  isAvailable: boolean;
}

export default function DriverDashboard() {
  const { user } = useAuth();
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<DriverStats>({
    totalEarnings: 0,
    completedOrders: 0,
    rating: 5,
    isAvailable: true,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "available" | "active" | "history"
  >("available");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [availableRes, myOrdersRes, profileRes] = await Promise.all([
        driverApi.getAvailableOrders(),
        driverApi.getMyOrders(),
        driverApi.getProfile(),
      ]);
      setAvailableOrders(availableRes.data);
      setMyOrders(myOrdersRes.data);
      setStats({
        totalEarnings: profileRes.data.totalEarnings,
        completedOrders: profileRes.data.completedOrders,
        rating: profileRes.data.rating,
        isAvailable: profileRes.data.isAvailable,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async () => {
    try {
      const res = await driverApi.toggleAvailability();
      setStats((prev) => ({ ...prev, isAvailable: res.data.isAvailable }));
      toast.success(
        stats.isAvailable ? "You are now offline" : "You are now online",
      );
    } catch (error) {
      toast.error("Failed to toggle status");
    }
  };

  const acceptOrder = async (orderId: string) => {
    try {
      await driverApi.acceptOrder(orderId);
      toast.success("Order accepted!");
      fetchDashboardData(); // refresh lists
    } catch (error) {
      toast.error("Failed to accept order");
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    status: "picked_up" | "delivered",
  ) => {
    try {
      await driverApi.updateOrderStatus(orderId, status);
      toast.success(`Order marked as ${status}`);
      fetchDashboardData();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const updateLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          await driverApi.updateLocation(
            position.coords.latitude,
            position.coords.longitude,
          );
          toast.success("Location updated");
        } catch (error) {
          toast.error("Failed to update location");
        }
      });
    } else {
      toast.error("Geolocation not supported");
    }
  };

  if (loading) return <div className={styles.loader}>Loading dashboard...</div>;

  const activeOrders = myOrders.filter((o) => o.status !== "delivered");
  const completedOrders = myOrders.filter((o) => o.status === "delivered");

  return (
    <div className={styles.container}>
      {/* Header with driver name and status toggle */}
      <div className={styles.header}>
        <div>
          <h1>Driver Dashboard</h1>
          <p className={styles.welcome}>Welcome back, {user?.name}</p>
        </div>
        <div className={styles.statusToggle}>
          <button onClick={toggleAvailability} className={styles.toggleBtn}>
            {stats.isAvailable ? <FaToggleOn /> : <FaToggleOff />}
            {stats.isAvailable ? "Online" : "Offline"}
          </button>
          <button onClick={updateLocation} className={styles.locationBtn}>
            <FaMapMarkerAlt /> Update Location
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <FaWallet className={styles.statIcon} />
          <div>
            <p className={styles.statValue}>
              GHS {stats.totalEarnings.toFixed(2)}
            </p>
            <p className={styles.statLabel}>Total Earnings</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <FaStar className={styles.statIcon} style={{ color: "#fbbf24" }} />
          <div>
            <p className={styles.statValue}>{stats.rating.toFixed(1)} ★</p>
            <p className={styles.statLabel}>Rating</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <FaCheckCircle
            className={styles.statIcon}
            style={{ color: "#10b981" }}
          />
          <div>
            <p className={styles.statValue}>{stats.completedOrders}</p>
            <p className={styles.statLabel}>Delivered</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "available" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("available")}
        >
          Available ({availableOrders.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === "active" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("active")}
        >
          Active ({activeOrders.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === "history" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("history")}
        >
          History ({completedOrders.length})
        </button>
      </div>

      {/* Available Orders Tab */}
      {activeTab === "available" && (
        <div className={styles.ordersContainer}>
          {availableOrders.length === 0 ? (
            <div className={styles.emptyState}>
              <FaMotorcycle className={styles.emptyIcon} />
              <p>No orders available nearby</p>
              <span>Check back later</span>
            </div>
          ) : (
            availableOrders.map((order) => (
              <div key={order._id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div>
                    <h3>{order.restaurantId.name}</h3>
                    <p className={styles.orderAddress}>
                      {order.restaurantId.address}
                    </p>
                  </div>
                  <span className={styles.deliveryFee}>
                    GHS {order.deliveryFee}
                  </span>
                </div>
                <div className={styles.orderDetails}>
                  <p>
                    <FaMapMarkerAlt /> Delivery: {order.deliveryAddress.text}
                  </p>
                  <p>
                    <FaClock /> Est. pickup:{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={() => acceptOrder(order._id)}
                  className={styles.acceptButton}
                >
                  Accept Order <FaArrowRight />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Active Orders Tab */}
      {activeTab === "active" && (
        <div className={styles.ordersContainer}>
          {activeOrders.length === 0 ? (
            <div className={styles.emptyState}>
              <FaClock className={styles.emptyIcon} />
              <p>No active orders</p>
              <span>Accept an order to start</span>
            </div>
          ) : (
            activeOrders.map((order) => (
              <div
                key={order._id}
                className={`${styles.orderCard} ${styles.activeCard}`}
              >
                <div className={styles.orderHeader}>
                  <div>
                    <h3>Order #{order.orderNumber}</h3>
                    <p>
                      {order.restaurantId.name} → {order.customerId.name}
                    </p>
                  </div>
                  <span className={styles.statusBadge}>
                    {order.status.replace("_", " ")}
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={`${styles.progressStep} ${order.status === "assigned" ? styles.active : ""} ${["picked_up", "delivered"].includes(order.status) ? styles.completed : ""}`}
                  >
                    Assigned
                  </div>
                  <div
                    className={`${styles.progressStep} ${order.status === "picked_up" ? styles.active : ""} ${order.status === "delivered" ? styles.completed : ""}`}
                  >
                    Picked Up
                  </div>
                  <div
                    className={`${styles.progressStep} ${order.status === "delivered" ? styles.active : ""}`}
                  >
                    Delivered
                  </div>
                </div>
                <div className={styles.orderActions}>
                  {order.status === "assigned" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "picked_up")}
                      className={styles.pickupButton}
                    >
                      Mark as Picked Up
                    </button>
                  )}
                  {order.status === "picked_up" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "delivered")}
                      className={styles.deliverButton}
                    >
                      Complete Delivery
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div className={styles.ordersContainer}>
          {completedOrders.length === 0 ? (
            <div className={styles.emptyState}>
              <FaHistory className={styles.emptyIcon} />
              <p>No delivery history</p>
              <span>Completed orders will appear here</span>
            </div>
          ) : (
            completedOrders.map((order) => (
              <div key={order._id} className={styles.historyCard}>
                <div className={styles.historyHeader}>
                  <span className={styles.orderNumber}>
                    #{order.orderNumber}
                  </span>
                  <span className={styles.historyDate}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p>
                  {order.restaurantId.name} → {order.customerId.name}
                </p>
                <div className={styles.historyFooter}>
                  <span>Earned: GHS {order.deliveryFee}</span>
                  <FaCheckCircle className={styles.checkIcon} />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
