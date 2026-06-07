import { useState, useEffect, useRef } from "react";
import {
  FaStore,
  FaUtensils,
  FaBox,
  FaWallet,
  FaPlus,
  FaTrash,
  FaEnvelope,
  FaSyncAlt,
  FaCheckCircle,
  FaClock,
  FaMotorcycle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import apiClient from "../../api/client";
import styles from "./OwnerDashboard.module.css";

interface Restaurant {
  _id: string;
  name: string;
  coverImage: string;
  isOpen: boolean;
}

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  approved: boolean;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerId: { name: string; phone: string };
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function OwnerDashboard() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"orders" | "menu">("orders");
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: 0,
    category: "Main",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchOwnerData();
  }, []);

  const fetchOwnerData = async () => {
    setLoading(true);
    try {
      // First, get the restaurant assigned to this owner
      const restRes = await apiClient.get("/restaurants/owner/restaurant");
      const rest = restRes.data;
      setRestaurant(rest);

      if (rest) {
        // Fetch menu and orders only if restaurant exists
        const [menuRes, ordersRes] = await Promise.all([
          apiClient.get(`/restaurants/${rest._id}/menu`),
          apiClient.get("/orders/restaurant-orders"),
        ]);
        setMenu(menuRes.data);
        setOrders(ordersRes.data);
      } else {
        // Clear any previous data if restaurant was removed
        setMenu([]);
        setOrders([]);
      }
    } catch (error: any) {
      // If 404, it means no restaurant assigned – this is normal, not an error.
      if (error.response?.status !== 404) {
        console.error(error);
        toast.error("Failed to load dashboard data");
      }
      setRestaurant(null);
      setMenu([]);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleRestaurantStatus = async () => {
    if (!restaurant) return;
    try {
      const { data } = await apiClient.put(`/restaurants/${restaurant._id}`, {
        isOpen: !restaurant.isOpen,
      });
      setRestaurant(data);
      toast.success(`Restaurant is now ${data.isOpen ? "open" : "closed"}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const addMenuItem = async () => {
    if (!restaurant) return;
    try {
      const { data } = await apiClient.post(
        `/restaurants/${restaurant._id}/menu`,
        newItem,
      );
      const newId = data._id;
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        await apiClient.post(
          `/restaurants/${restaurant._id}/menu/${newId}/upload-image`,
          formData,
        );
      }
      await fetchOwnerData(); // refresh menu
      setShowAddMenu(false);
      setNewItem({ name: "", description: "", price: 0, category: "Main" });
      setImageFile(null);
      toast.success("Menu item added");
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  const deleteMenuItem = async (itemId: string) => {
    if (!restaurant) return;
    try {
      await apiClient.delete(`/restaurants/${restaurant._id}/menu/${itemId}`);
      setMenu(menu.filter((item) => item._id !== itemId));
      toast.success("Item deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await apiClient.put(`/orders/${orderId}/status`, { status });
      setOrders(orders.map((o) => (o._id === orderId ? { ...o, status } : o)));
      toast.success(`Order status updated to ${status}`);
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <div className={styles.loader}>Loading dashboard...</div>;

  // Professional "no restaurant assigned" state
  if (!restaurant) {
    return (
      <div className={styles.noRestaurantContainer}>
        <div className={styles.noRestaurantCard}>
          <FaStore className={styles.noRestaurantIcon} />
          <h2>No Restaurant Assigned</h2>
          <p>
            It looks like you haven't been assigned a restaurant yet. Please
            contact the administrator to set up your restaurant.
          </p>
          <button onClick={fetchOwnerData} className={styles.refreshBtn}>
            <FaSyncAlt /> Refresh
          </button>
          <a href="mailto:admin@tamaeat.com" className={styles.contactBtn}>
            <FaEnvelope /> Contact Admin
          </a>
        </div>
      </div>
    );
  }

  // Main dashboard content when restaurant exists
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>{restaurant.name}</h1>
          <button
            onClick={toggleRestaurantStatus}
            className={restaurant.isOpen ? styles.openBtn : styles.closedBtn}
          >
            {restaurant.isOpen ? "🟢 Open Now" : "🔴 Closed"}
          </button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <FaBox />
          <div>
            <p>{orders.length}</p>
            <span>Total Orders</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <FaUtensils />
          <div>
            <p>{menu.length}</p>
            <span>Menu Items</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <FaWallet />
          <div>
            <p>
              GHS {orders.reduce((sum, o) => sum + o.totalAmount, 0).toFixed(2)}
            </p>
            <span>Revenue</span>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={activeTab === "orders" ? styles.active : ""}
          onClick={() => setActiveTab("orders")}
        >
          Orders ({orders.length})
        </button>
        <button
          className={activeTab === "menu" ? styles.active : ""}
          onClick={() => setActiveTab("menu")}
        >
          Menu ({menu.length})
        </button>
      </div>

      {activeTab === "orders" && (
        <div className={styles.ordersList}>
          {orders.length === 0 ? (
            <p className={styles.emptyOrders}>No orders yet</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className={styles.orderCard}>
                <div>
                  <strong>#{order.orderNumber}</strong> –{" "}
                  {order.customerId?.name} – GHS {order.totalAmount.toFixed(2)}
                </div>
                <div>
                  Status: <span className={styles.status}>{order.status}</span>
                </div>
                <div className={styles.orderActions}>
                  {order.status === "pending" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "confirmed")}
                    >
                      Confirm
                    </button>
                  )}
                  {order.status === "confirmed" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "preparing")}
                    >
                      Start Preparing
                    </button>
                  )}
                  {order.status === "preparing" && (
                    <button
                      onClick={() =>
                        updateOrderStatus(order._id, "ready_for_pickup")
                      }
                    >
                      Mark Ready
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "menu" && (
        <div className={styles.menuSection}>
          <button
            onClick={() => setShowAddMenu(true)}
            className={styles.addBtn}
          >
            <FaPlus /> Add Item
          </button>
          <div className={styles.menuGrid}>
            {menu.map((item) => (
              <div key={item._id} className={styles.menuCard}>
                <img
                  src={item.image || "/placeholder-food.jpg"}
                  alt={item.name}
                />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span>GHS {item.price}</span>
                  {!item.approved && (
                    <span className={styles.pendingBadge}>Pending</span>
                  )}
                </div>
                <button
                  onClick={() => deleteMenuItem(item._id)}
                  className={styles.deleteBtn}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddMenu && (
        <div className={styles.modal}>
          <h2>Add Menu Item</h2>
          <input
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) =>
              setNewItem({ ...newItem, price: parseFloat(e.target.value) })
            }
          />
          <select
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
          >
            <option>Main</option>
            <option>Appetizer</option>
            <option>Dessert</option>
            <option>Drink</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          <div className={styles.modalActions}>
            <button onClick={() => setShowAddMenu(false)}>Cancel</button>
            <button onClick={addMenuItem}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
