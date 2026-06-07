import { useState, useEffect, useRef } from "react";
import {
  FaUsers,
  FaStore,
  FaBox,
  FaWallet,
  FaMotorcycle,
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaPlus,
  FaCog,
  FaUserShield,
  FaCreditCard,
  FaClipboardList,
  FaChartPie,
  FaUtensils,
  FaTruck,
  FaBell,
  FaGlobe,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import apiClient from "../../api/client";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  // Dashboard data
  const [stats, setStats] = useState<any>(null);
  const [pendingRestaurants, setPendingRestaurants] = useState([]);
  const [unverifiedDrivers, setUnverifiedDrivers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [allGroceryStores, setAllGroceryStores] = useState([]);
  const [allDrivers, setAllDrivers] = useState([]);
  const [pendingMenuItems, setPendingMenuItems] = useState([]);
  const [pendingGroceryProducts, setPendingGroceryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto‑refresh
  const [autoRefresh, setAutoRefresh] = useState(false);
  const refreshInterval = useRef<NodeJS.Timeout | null>(null);

  // Create restaurant modal state
  const [showCreateRestaurant, setShowCreateRestaurant] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    description: "",
    address: "",
    city: "Accra",
    deliveryTime: 30,
    deliveryFee: 10,
    cuisine: "",
    phone: "",
    email: "",
    ownerEmail: "",
  });

  // Create grocery store modal state
  const [showCreateGrocery, setShowCreateGrocery] = useState(false);
  const [newGrocery, setNewGrocery] = useState({
    name: "",
    description: "",
    address: "",
    city: "Accra",
    deliveryTime: 45,
    deliveryFee: 10,
    categories: "",
    phone: "",
    ownerEmail: "",
  });

  // ========== DATA FETCHING ==========
  const fetchDashboardData = async () => {
    try {
      const [
        statsRes,
        pendingRes,
        driversRes,
        usersRes,
        restaurantsRes,
        groceryRes,
        menuPendingRes,
        groceryProductsPendingRes,
      ] = await Promise.all([
        apiClient.get("/admin/stats"),
        apiClient.get("/admin/pending-restaurants"),
        apiClient.get("/admin/unverified-drivers"),
        apiClient.get("/admin/users"),
        apiClient.get("/admin/all-restaurants"),
        apiClient.get("/admin/all-grocery-stores"),
        apiClient.get("/admin/pending-menu-items"),
        apiClient.get("/admin/pending-grocery-products"),
      ]);
      setStats(statsRes.data);
      setPendingRestaurants(pendingRes.data);
      setUnverifiedDrivers(driversRes.data);
      setAllUsers(usersRes.data);
      setAllRestaurants(restaurantsRes.data);
      setAllGroceryStores(groceryRes.data);
      setAllDrivers(driversRes.data);
      setPendingMenuItems(menuPendingRes.data);
      setPendingGroceryProducts(groceryProductsPendingRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // Light refresh for stats and pending counts (used by auto‑refresh)
  const refreshStats = async () => {
    try {
      const [statsRes, pendingRes, driversRes] = await Promise.all([
        apiClient.get("/admin/stats"),
        apiClient.get("/admin/pending-restaurants"),
        apiClient.get("/admin/unverified-drivers"),
      ]);
      setStats(statsRes.data);
      setPendingRestaurants(pendingRes.data);
      setUnverifiedDrivers(driversRes.data);
      toast.info("Dashboard refreshed");
    } catch (error) {
      console.error(error);
      toast.error("Failed to refresh dashboard");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Auto‑refresh effect
  useEffect(() => {
    if (autoRefresh) {
      refreshInterval.current = setInterval(() => {
        refreshStats();
      }, 30000); // 30 seconds
    } else if (refreshInterval.current) {
      clearInterval(refreshInterval.current);
      refreshInterval.current = null;
    }
    return () => {
      if (refreshInterval.current) clearInterval(refreshInterval.current);
    };
  }, [autoRefresh]);

  // ========== ACTION HANDLERS ==========
  const approveRestaurant = async (id: string) => {
    try {
      await apiClient.put(`/restaurants/${id}/approve`);
      setPendingRestaurants((prev) => prev.filter((r) => r._id !== id));
      toast.success("Restaurant approved");
    } catch {
      toast.error("Approval failed");
    }
  };

  const verifyDriver = async (id: string) => {
    try {
      await apiClient.put(`/admin/drivers/${id}/verify`);
      setUnverifiedDrivers((prev) => prev.filter((d) => d._id !== id));
      toast.success("Driver verified");
    } catch {
      toast.error("Verification failed");
    }
  };

  const approveMenuItem = async (id: string) => {
    try {
      await apiClient.put(`/admin/menu-items/${id}/approve`);
      setPendingMenuItems((prev) => prev.filter((item) => item._id !== id));
      toast.success("Menu item approved");
    } catch {
      toast.error("Approval failed");
    }
  };

  const approveGroceryProduct = async (id: string) => {
    try {
      await apiClient.put(`/admin/grocery-products/${id}/approve`);
      setPendingGroceryProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product approved");
    } catch {
      toast.error("Approval failed");
    }
  };

  const createRestaurant = async () => {
    if (!newRestaurant.ownerEmail) {
      toast.error("Owner email is required");
      return;
    }
    try {
      await apiClient.post("/restaurants/admin/create", {
        ...newRestaurant,
        cuisine: newRestaurant.cuisine.split(",").map((s) => s.trim()),
      });
      toast.success("Restaurant created and assigned to owner");
      setShowCreateRestaurant(false);
      fetchDashboardData();
      setNewRestaurant({
        name: "",
        description: "",
        address: "",
        city: "Accra",
        deliveryTime: 30,
        deliveryFee: 10,
        cuisine: "",
        phone: "",
        email: "",
        ownerEmail: "",
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Creation failed");
    }
  };

  const createGroceryStore = async () => {
    if (!newGrocery.ownerEmail) {
      toast.error("Owner email is required");
      return;
    }
    try {
      await apiClient.post("/groceries/admin/create", {
        ...newGrocery,
        categories: newGrocery.categories.split(",").map((s) => s.trim()),
      });
      toast.success("Grocery store created");
      setShowCreateGrocery(false);
      fetchDashboardData();
      setNewGrocery({
        name: "",
        description: "",
        address: "",
        city: "Accra",
        deliveryTime: 45,
        deliveryFee: 10,
        categories: "",
        phone: "",
        ownerEmail: "",
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Creation failed");
    }
  };

  if (loading) return <div className={styles.loader}>Loading dashboard...</div>;

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.sidebarHeader}>
          <h2>TamaEat</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className={styles.closeSidebar}
          >
            ×
          </button>
        </div>
        <div className={styles.adminInfo}>
          <FaUserShield className={styles.adminIcon} />
          <div>
            <h3>Admin</h3>
            <span>Super Administrator</span>
          </div>
        </div>
        <nav className={styles.sidebarNav}>
          <button
            className={`${styles.navItem} ${activeTab === "overview" ? styles.activeNav : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <FaChartLine /> Dashboard
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "users" ? styles.activeNav : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <FaUsers /> All Users
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "restaurants" ? styles.activeNav : ""}`}
            onClick={() => setActiveTab("restaurants")}
          >
            <FaStore /> All Restaurants
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "groceryStores" ? styles.activeNav : ""}`}
            onClick={() => setActiveTab("groceryStores")}
          >
            <FaStore /> Grocery Stores
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "drivers" ? styles.activeNav : ""}`}
            onClick={() => setActiveTab("drivers")}
          >
            <FaMotorcycle /> All Drivers
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "pendingMenu" ? styles.activeNav : ""}`}
            onClick={() => setActiveTab("pendingMenu")}
          >
            <FaUtensils /> Pending Menu Items ({pendingMenuItems.length})
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "pendingGrocery" ? styles.activeNav : ""}`}
            onClick={() => setActiveTab("pendingGrocery")}
          >
            <FaTruck /> Pending Products ({pendingGroceryProducts.length})
          </button>
          <div className={styles.settingsGroup}>
            <p>Settings</p>
            <button
              className={`${styles.navItem} ${activeTab === "settings" ? styles.activeNav : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <FaCog /> Settings
            </button>
            <button
              className={`${styles.navItem} ${activeTab === "system" ? styles.activeNav : ""}`}
              onClick={() => setActiveTab("system")}
            >
              <FaCog /> System
            </button>
            <button
              className={`${styles.navItem} ${activeTab === "reports" ? styles.activeNav : ""}`}
              onClick={() => setActiveTab("reports")}
            >
              <FaChartPie /> Reports
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className={styles.mainContent}>
        <div className={styles.topBar}>
          <button
            onClick={() => setSidebarOpen(true)}
            className={styles.hamburger}
          >
            ☰
          </button>
          <div className={styles.topBarRight}>
            <button onClick={refreshStats} className={styles.refreshBtn}>
              🔄 Refresh
            </button>
            <label className={styles.autoRefreshLabel}>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              Auto-refresh (30s)
            </label>
            <button
              onClick={() => setShowCreateRestaurant(true)}
              className={styles.createBtn}
            >
              + Restaurant
            </button>
            <button
              onClick={() => setShowCreateGrocery(true)}
              className={styles.createBtn}
            >
              + Grocery Store
            </button>
          </div>
        </div>

        {/* ==================== OVERVIEW TAB ==================== */}
        {activeTab === "overview" && (
          <>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <FaUsers className={styles.statIcon} />
                <div>
                  <p className={styles.statValue}>{stats?.totalUsers ?? 0}</p>
                  <p className={styles.statLabel}>Total Users</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <FaStore className={styles.statIcon} />
                <div>
                  <p className={styles.statValue}>
                    {stats?.totalRestaurants ?? 0}
                  </p>
                  <p className={styles.statLabel}>Restaurants</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <FaBox className={styles.statIcon} />
                <div>
                  <p className={styles.statValue}>{stats?.totalOrders ?? 0}</p>
                  <p className={styles.statLabel}>Total Orders</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <FaWallet className={styles.statIcon} />
                <div>
                  <p className={styles.statValue}>
                    GHS {(stats?.totalRevenue ?? 0).toLocaleString()}
                  </p>
                  <p className={styles.statLabel}>Revenue</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <FaStore
                  className={styles.statIcon}
                  style={{ color: "#f59e0b" }}
                />
                <div>
                  <p className={styles.statValue}>
                    {stats?.pendingRestaurants ?? 0}
                  </p>
                  <p className={styles.statLabel}>Pending Restaurants</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <FaMotorcycle
                  className={styles.statIcon}
                  style={{ color: "#10b981" }}
                />
                <div>
                  <p className={styles.statValue}>
                    {stats?.unverifiedDrivers ?? 0}
                  </p>
                  <p className={styles.statLabel}>Unverified Drivers</p>
                </div>
              </div>
            </div>

            <div className={styles.twoColumn}>
              <div className={styles.pendingCard}>
                <h3>Pending Restaurants</h3>
                {pendingRestaurants.length === 0 ? (
                  <p className={styles.empty}>✅ All approved</p>
                ) : (
                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Owner</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingRestaurants.map((r) => (
                          <tr key={r._id}>
                            <td>
                              {r.name}
                              <br />
                              <span className={styles.subtext}>{r.city}</span>
                            </td>
                            <td>
                              {r.ownerId?.name}
                              <br />
                              <span className={styles.subtext}>
                                {r.ownerId?.email}
                              </span>
                            </td>
                            <td>
                              <button
                                onClick={() => approveRestaurant(r._id)}
                                className={styles.approveBtn}
                              >
                                <FaCheckCircle /> Approve
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className={styles.pendingCard}>
                <h3>Unverified Drivers</h3>
                {unverifiedDrivers.length === 0 ? (
                  <p className={styles.empty}>✅ All verified</p>
                ) : (
                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Vehicle</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {unverifiedDrivers.map((d) => (
                          <tr key={d._id}>
                            <td>
                              {d.userId?.name}
                              <br />
                              <span className={styles.subtext}>
                                {d.userId?.phone}
                              </span>
                            </td>
                            <td>
                              {d.vehicleType} - {d.vehicleNumber}
                            </td>
                            <td>
                              <button
                                onClick={() => verifyDriver(d._id)}
                                className={styles.verifyBtn}
                              >
                                <FaCheckCircle /> Verify
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

            <div className={styles.recentOrders}>
              <h3>Recent Orders</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.ordersTable}>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Restaurant</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats?.recentOrders?.map((order) => (
                      <tr key={order._id}>
                        <td>#{order.orderNumber || order._id.slice(-8)}</td>
                        <td>{order.customerId?.name || "Guest"}</td>
                        <td>{order.restaurantId?.name}</td>
                        <td>GHS {order.totalAmount?.toFixed(2)}</td>
                        <td>
                          <span
                            className={`${styles.statusBadge} ${styles[order.status]}`}
                          >
                            {order.status?.replace("_", " ")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ==================== ALL USERS TAB ==================== */}
        {activeTab === "users" && (
          <div className={styles.tableCard}>
            <h2>All Users</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>City</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <strong>{user.name}</strong>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                      <td>{user.city}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== ALL RESTAURANTS TAB ==================== */}
        {activeTab === "restaurants" && (
          <div className={styles.tableCard}>
            <h2>All Restaurants</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Owner</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allRestaurants.map((rest) => (
                    <tr key={rest._id}>
                      <td>
                        <strong>{rest.name}</strong>
                      </td>
                      <td>{rest.address}</td>
                      <td>{rest.city}</td>
                      <td>
                        {rest.ownerId?.name}
                        <br />
                        <span className={styles.subtext}>
                          {rest.ownerId?.email}
                        </span>
                      </td>
                      <td>{rest.approved ? "✅ Approved" : "⏳ Pending"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== GROCERY STORES TAB ==================== */}
        {activeTab === "groceryStores" && (
          <div className={styles.tableCard}>
            <h2>Grocery Stores</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Owner</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allGroceryStores.map((store) => (
                    <tr key={store._id}>
                      <td>
                        <strong>{store.name}</strong>
                      </td>
                      <td>{store.address}</td>
                      <td>{store.city}</td>
                      <td>
                        {store.ownerId?.name}
                        <br />
                        <span className={styles.subtext}>
                          {store.ownerId?.email}
                        </span>
                      </td>
                      <td>{store.approved ? "✅ Approved" : "⏳ Pending"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== ALL DRIVERS TAB ==================== */}
        {activeTab === "drivers" && (
          <div className={styles.tableCard}>
            <h2>All Drivers</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Vehicle</th>
                    <th>Verified</th>
                    <th>Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {allDrivers.map((driver) => (
                    <tr key={driver._id}>
                      <td>
                        <strong>{driver.userId?.name}</strong>
                      </td>
                      <td>{driver.userId?.email}</td>
                      <td>{driver.userId?.phone}</td>
                      <td>
                        {driver.vehicleType} - {driver.vehicleNumber}
                      </td>
                      <td>{driver.isVerified ? "✅ Yes" : "❌ No"}</td>
                      <td>GHS {driver.totalEarnings?.toFixed(2) || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== PENDING MENU ITEMS TAB ==================== */}
        {activeTab === "pendingMenu" && (
          <div className={styles.tableCard}>
            <h2>Pending Menu Items (Awaiting Admin Approval)</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Restaurant</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingMenuItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <strong>{item.name}</strong>
                      </td>
                      <td>{item.restaurantId?.name || "Unknown"}</td>
                      <td>GHS {item.price}</td>
                      <td>
                        <button
                          onClick={() => approveMenuItem(item._id)}
                          className={styles.approveBtn}
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== PENDING GROCERY PRODUCTS TAB ==================== */}
        {activeTab === "pendingGrocery" && (
          <div className={styles.tableCard}>
            <h2>Pending Grocery Products (Awaiting Admin Approval)</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Store</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingGroceryProducts.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <strong>{product.name}</strong>
                      </td>
                      <td>{product.storeId?.name || "Unknown"}</td>
                      <td>GHS {product.price}</td>
                      <td>
                        <button
                          onClick={() => approveGroceryProduct(product._id)}
                          className={styles.approveBtn}
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== SETTINGS TAB ==================== */}
        {activeTab === "settings" && (
          <div className={styles.settingsCard}>
            <h2>User Settings</h2>
            <div className={styles.settingRow}>
              <FaBell />{" "}
              <div>
                <label>Push Notifications</label>
                <p>Receive order updates and promotions</p>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" defaultChecked />
                <span className={styles.slider}></span>
              </label>
            </div>
            <div className={styles.settingRow}>
              <FaGlobe />{" "}
              <div>
                <label>Language</label>
                <p>English (UK)</p>
              </div>
              <button className={styles.changeBtn}>Change</button>
            </div>
            <div className={styles.settingRow}>
              <FaCog />{" "}
              <div>
                <label>Email Notifications</label>
                <p>Receive email summaries</p>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        )}

        {/* ==================== SYSTEM TAB ==================== */}
        {activeTab === "system" && (
          <div className={styles.settingsCard}>
            <h2>System Configuration</h2>
            <div className={styles.settingRow}>
              <FaCog />{" "}
              <div>
                <label>Backup Database</label>
                <p>Manual backup of all data</p>
              </div>
              <button className={styles.actionBtn}>Run Backup</button>
            </div>
            <div className={styles.settingRow}>
              <FaCog />{" "}
              <div>
                <label>Clear Cache</label>
                <p>Clear application cache</p>
              </div>
              <button className={styles.actionBtn}>Clear</button>
            </div>
            <div className={styles.settingRow}>
              <FaCog />{" "}
              <div>
                <label>System Logs</label>
                <p>View recent activity logs</p>
              </div>
              <button className={styles.actionBtn}>View</button>
            </div>
          </div>
        )}

        {/* ==================== REPORTS TAB ==================== */}
        {activeTab === "reports" && (
          <div className={styles.settingsCard}>
            <h2>Reports</h2>
            <div className={styles.reportRow}>
              <FaChartLine /> <span>Sales Report (Last 30 days)</span>
              <button className={styles.downloadBtn}>Download PDF</button>
            </div>
            <div className={styles.reportRow}>
              <FaChartLine /> <span>User Activity Report</span>
              <button className={styles.downloadBtn}>Download CSV</button>
            </div>
            <div className={styles.reportRow}>
              <FaChartLine /> <span>Restaurant Performance</span>
              <button className={styles.downloadBtn}>Download PDF</button>
            </div>
          </div>
        )}

        {/* CREATE RESTAURANT MODAL */}
        {showCreateRestaurant && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Create New Restaurant</h2>
              <input
                placeholder="Restaurant Name"
                value={newRestaurant.name}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, name: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                value={newRestaurant.description}
                onChange={(e) =>
                  setNewRestaurant({
                    ...newRestaurant,
                    description: e.target.value,
                  })
                }
              />
              <input
                placeholder="Address"
                value={newRestaurant.address}
                onChange={(e) =>
                  setNewRestaurant({
                    ...newRestaurant,
                    address: e.target.value,
                  })
                }
              />
              <select
                value={newRestaurant.city}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, city: e.target.value })
                }
              >
                <option>Accra</option>
                <option>Kumasi</option>
                <option>Tamale</option>
                <option>Tema</option>
              </select>
              <input
                type="number"
                placeholder="Delivery Time (min)"
                value={newRestaurant.deliveryTime}
                onChange={(e) =>
                  setNewRestaurant({
                    ...newRestaurant,
                    deliveryTime: Number(e.target.value),
                  })
                }
              />
              <input
                type="number"
                placeholder="Delivery Fee (GHS)"
                value={newRestaurant.deliveryFee}
                onChange={(e) =>
                  setNewRestaurant({
                    ...newRestaurant,
                    deliveryFee: Number(e.target.value),
                  })
                }
              />
              <input
                placeholder="Cuisine (comma separated, e.g., Ghanaian, African)"
                value={newRestaurant.cuisine}
                onChange={(e) =>
                  setNewRestaurant({
                    ...newRestaurant,
                    cuisine: e.target.value,
                  })
                }
              />
              <input
                placeholder="Phone"
                value={newRestaurant.phone}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, phone: e.target.value })
                }
              />
              <input
                placeholder="Restaurant Email"
                value={newRestaurant.email}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, email: e.target.value })
                }
              />
              <input
                placeholder="Owner Email (must be registered as owner)"
                value={newRestaurant.ownerEmail}
                onChange={(e) =>
                  setNewRestaurant({
                    ...newRestaurant,
                    ownerEmail: e.target.value,
                  })
                }
              />
              <div className={styles.modalActions}>
                <button onClick={() => setShowCreateRestaurant(false)}>
                  Cancel
                </button>
                <button onClick={createRestaurant}>Create</button>
              </div>
            </div>
          </div>
        )}

        {/* CREATE GROCERY STORE MODAL */}
        {showCreateGrocery && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Create New Grocery Store</h2>
              <input
                placeholder="Store Name"
                value={newGrocery.name}
                onChange={(e) =>
                  setNewGrocery({ ...newGrocery, name: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                value={newGrocery.description}
                onChange={(e) =>
                  setNewGrocery({ ...newGrocery, description: e.target.value })
                }
              />
              <input
                placeholder="Address"
                value={newGrocery.address}
                onChange={(e) =>
                  setNewGrocery({ ...newGrocery, address: e.target.value })
                }
              />
              <select
                value={newGrocery.city}
                onChange={(e) =>
                  setNewGrocery({ ...newGrocery, city: e.target.value })
                }
              >
                <option>Accra</option>
                <option>Kumasi</option>
                <option>Tamale</option>
                <option>Tema</option>
              </select>
              <input
                type="number"
                placeholder="Delivery Time (min)"
                value={newGrocery.deliveryTime}
                onChange={(e) =>
                  setNewGrocery({
                    ...newGrocery,
                    deliveryTime: Number(e.target.value),
                  })
                }
              />
              <input
                type="number"
                placeholder="Delivery Fee (GHS)"
                value={newGrocery.deliveryFee}
                onChange={(e) =>
                  setNewGrocery({
                    ...newGrocery,
                    deliveryFee: Number(e.target.value),
                  })
                }
              />
              <input
                placeholder="Categories (comma separated, e.g., Vegetables, Dairy, Snacks)"
                value={newGrocery.categories}
                onChange={(e) =>
                  setNewGrocery({ ...newGrocery, categories: e.target.value })
                }
              />
              <input
                placeholder="Phone"
                value={newGrocery.phone}
                onChange={(e) =>
                  setNewGrocery({ ...newGrocery, phone: e.target.value })
                }
              />
              <input
                placeholder="Owner Email (must be registered as owner)"
                value={newGrocery.ownerEmail}
                onChange={(e) =>
                  setNewGrocery({ ...newGrocery, ownerEmail: e.target.value })
                }
              />
              <div className={styles.modalActions}>
                <button onClick={() => setShowCreateGrocery(false)}>
                  Cancel
                </button>
                <button onClick={createGroceryStore}>Create</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
