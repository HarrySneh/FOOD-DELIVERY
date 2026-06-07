import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { ordersApi } from "../api/orders";
import { userApi, Address, PaymentMethod } from "../api/user";
import apiClient from "../api/client";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCreditCard,
  FaHistory,
  FaWallet,
  FaStar,
  FaEdit,
  FaTrash,
  FaPlus,
  FaCog,
  FaBell,
  FaGlobe,
  FaSignOutAlt,
  FaCamera,
  FaCheck,
} from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./Profile.module.css";

export default function Profile() {
  const { user, setUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "profile" | "addresses" | "payment" | "settings"
  >("profile");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    city: user?.city || "",
  });
  const [newAddress, setNewAddress] = useState({
    label: "",
    address: "",
    city: "",
    isDefault: false,
  });
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newPayment, setNewPayment] = useState({
    type: "card",
    last4: "",
    phoneNumber: "",
    isDefault: false,
  });
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const [ordersRes, addressesRes, paymentRes] = await Promise.all([
        ordersApi.getUserOrders(),
        userApi.getAddresses(),
        userApi.getPaymentMethods(),
      ]);
      const orders = ordersRes.data;
      setOrdersCount(orders.length);
      const spent = orders.reduce((sum, o) => sum + o.totalAmount, 0);
      setTotalSpent(spent);
      setAddresses(addressesRes.data);
      setPaymentMethods(paymentRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return;
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    try {
      const { data } = await apiClient.post("/users/upload-avatar", formData);
      setUser({ ...user, avatar: data.avatar });
      toast.success("Avatar updated");
    } catch {
      toast.error("Upload failed");
    }
  };

  const updateProfileField = async (field: string, value: string) => {
    try {
      await apiClient.put("/auth/profile", { [field]: value });
      setUser({ ...user, [field]: value });
      toast.success(`${field} updated`);
    } catch {
      toast.error("Update failed");
    }
    setEditingField(null);
  };

  const addAddressHandler = async () => {
    try {
      const { data } = await userApi.addAddress(newAddress);
      setAddresses([...addresses, data]);
      setShowAddAddress(false);
      setNewAddress({ label: "", address: "", city: "", isDefault: false });
      toast.success("Address added");
    } catch {
      toast.error("Failed to add address");
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      await userApi.deleteAddress(id);
      setAddresses(addresses.filter((a) => a._id !== id));
      toast.success("Address deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const setDefaultAddress = async (id: string) => {
    try {
      await userApi.updateAddress(id, { isDefault: true });
      setAddresses(addresses.map((a) => ({ ...a, isDefault: a._id === id })));
      toast.success("Default address updated");
    } catch {
      toast.error("Failed to update");
    }
  };

  const addPaymentMethod = async () => {
    try {
      const { data } = await userApi.addPaymentMethod(newPayment);
      setPaymentMethods([...paymentMethods, data]);
      setShowAddPayment(false);
      setNewPayment({
        type: "card",
        last4: "",
        phoneNumber: "",
        isDefault: false,
      });
      toast.success("Payment method added");
    } catch {
      toast.error("Failed to add");
    }
  };

  const deletePaymentMethod = async (id: string) => {
    try {
      await userApi.deletePaymentMethod(id);
      setPaymentMethods(paymentMethods.filter((p) => p._id !== id));
      toast.success("Payment method deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const setDefaultPayment = async (id: string) => {
    try {
      await userApi.updatePaymentMethod(id, { isDefault: true });
      setPaymentMethods(
        paymentMethods.map((p) => ({ ...p, isDefault: p._id === id })),
      );
      toast.success("Default payment method updated");
    } catch {
      toast.error("Failed to update");
    }
  };

  if (loading) return <div className={styles.loader}>Loading profile...</div>;
  if (!user) return null;

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <img
                src={
                  avatarPreview ||
                  user.avatar ||
                  `https://ui-avatars.com/api/?background=2563eb&color=fff&name=${encodeURIComponent(user.name)}`
                }
                alt="Profile"
              />
              <label className={styles.cameraBtn}>
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  hidden
                />
              </label>
            </div>
            {avatarFile && (
              <button onClick={uploadAvatar} className={styles.saveAvatarBtn}>
                Save Avatar
              </button>
            )}
          </div>
          <div className={styles.userInfo}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <span className={styles.roleBadge}>{user.role}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <FaHistory />
          <div>
            <p className={styles.statValue}>{ordersCount}</p>
            <p>Orders</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <FaWallet />
          <div>
            <p className={styles.statValue}>GHS {totalSpent.toFixed(2)}</p>
            <p>Total Spent</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <FaCreditCard />
          <div>
            <p className={styles.statValue}>GHS 0</p>
            <p>Saved</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <FaStar />
          <div>
            <p className={styles.statValue}>4.8</p>
            <p>Rating</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "profile" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`${styles.tab} ${activeTab === "addresses" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("addresses")}
        >
          Addresses ({addresses.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === "payment" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("payment")}
        >
          Payment Methods
        </button>
        <button
          className={`${styles.tab} ${activeTab === "settings" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className={styles.tabContent}>
          <div className={styles.infoCard}>
            <h3>Personal Information</h3>
            <div className={styles.infoRow}>
              <FaUser />
              <div>
                <label>Full Name</label>
                {editingField === "name" ? (
                  <input
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    autoFocus
                  />
                ) : (
                  <p>{user.name}</p>
                )}
              </div>
              {editingField === "name" ? (
                <button
                  onClick={() => updateProfileField("name", editForm.name)}
                >
                  <FaCheck />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingField("name");
                    setEditForm({ ...editForm, name: user.name });
                  }}
                >
                  <FaEdit />
                </button>
              )}
            </div>
            <div className={styles.infoRow}>
              <FaEnvelope />
              <div>
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              <span className={styles.readonly}>Cannot change</span>
            </div>
            <div className={styles.infoRow}>
              <FaPhone />
              <div>
                <label>Phone</label>
                {editingField === "phone" ? (
                  <input
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value })
                    }
                  />
                ) : (
                  <p>{user.phone || "Not provided"}</p>
                )}
              </div>
              {editingField === "phone" ? (
                <button
                  onClick={() => updateProfileField("phone", editForm.phone)}
                >
                  <FaCheck />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingField("phone");
                    setEditForm({ ...editForm, phone: user.phone || "" });
                  }}
                >
                  <FaEdit />
                </button>
              )}
            </div>
            <div className={styles.infoRow}>
              <FaMapMarkerAlt />
              <div>
                <label>City</label>
                {editingField === "city" ? (
                  <input
                    value={editForm.city}
                    onChange={(e) =>
                      setEditForm({ ...editForm, city: e.target.value })
                    }
                  />
                ) : (
                  <p>{user.city || "Accra"}</p>
                )}
              </div>
              {editingField === "city" ? (
                <button
                  onClick={() => updateProfileField("city", editForm.city)}
                >
                  <FaCheck />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingField("city");
                    setEditForm({ ...editForm, city: user.city || "Accra" });
                  }}
                >
                  <FaEdit />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Addresses Tab */}
      {activeTab === "addresses" && (
        <div className={styles.tabContent}>
          <div className={styles.sectionHeader}>
            <h3>Saved Addresses</h3>
            <button
              onClick={() => setShowAddAddress(true)}
              className={styles.addButton}
            >
              <FaPlus /> Add New
            </button>
          </div>
          {addresses.map((addr) => (
            <div key={addr._id} className={styles.addressCard}>
              <div>
                <strong>{addr.label}</strong>
                <p>
                  {addr.address}, {addr.city}
                </p>
                {addr.isDefault && (
                  <span className={styles.defaultBadge}>Default</span>
                )}
              </div>
              <div className={styles.cardActions}>
                {!addr.isDefault && (
                  <button onClick={() => setDefaultAddress(addr._id)}>
                    Set Default
                  </button>
                )}
                <button onClick={() => deleteAddress(addr._id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          {showAddAddress && (
            <div className={styles.modal}>
              <h3>Add New Address</h3>
              <input
                placeholder="Label (e.g., Home, Work)"
                value={newAddress.label}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, label: e.target.value })
                }
              />
              <input
                placeholder="Address"
                value={newAddress.address}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, address: e.target.value })
                }
              />
              <input
                placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
              />
              <label>
                <input
                  type="checkbox"
                  checked={newAddress.isDefault}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      isDefault: e.target.checked,
                    })
                  }
                />{" "}
                Set as default
              </label>
              <div className={styles.modalActions}>
                <button onClick={() => setShowAddAddress(false)}>Cancel</button>
                <button onClick={addAddressHandler}>Save</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === "payment" && (
        <div className={styles.tabContent}>
          <div className={styles.sectionHeader}>
            <h3>Payment Methods</h3>
            <button
              onClick={() => setShowAddPayment(true)}
              className={styles.addButton}
            >
              <FaPlus /> Add Payment
            </button>
          </div>
          {paymentMethods.map((pm) => (
            <div key={pm._id} className={styles.addressCard}>
              <div>
                <strong>{pm.type === "card" ? "Card" : "Mobile Money"}</strong>
                <p>
                  {pm.type === "card" ? `**** ${pm.last4}` : pm.phoneNumber}
                </p>
                {pm.isDefault && (
                  <span className={styles.defaultBadge}>Default</span>
                )}
              </div>
              <div className={styles.cardActions}>
                {!pm.isDefault && (
                  <button onClick={() => setDefaultPayment(pm._id)}>
                    Set Default
                  </button>
                )}
                <button onClick={() => deletePaymentMethod(pm._id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          {showAddPayment && (
            <div className={styles.modal}>
              <h3>Add Payment Method</h3>
              <select
                value={newPayment.type}
                onChange={(e) =>
                  setNewPayment({
                    ...newPayment,
                    type: e.target.value as "card" | "momo",
                  })
                }
              >
                <option value="card">Card</option>
                <option value="momo">Mobile Money</option>
              </select>
              {newPayment.type === "card" ? (
                <input
                  placeholder="Last 4 digits"
                  maxLength={4}
                  value={newPayment.last4}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, last4: e.target.value })
                  }
                />
              ) : (
                <input
                  placeholder="Phone number"
                  value={newPayment.phoneNumber}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              )}
              <label>
                <input
                  type="checkbox"
                  checked={newPayment.isDefault}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      isDefault: e.target.checked,
                    })
                  }
                />{" "}
                Set as default
              </label>
              <div className={styles.modalActions}>
                <button onClick={() => setShowAddPayment(false)}>Cancel</button>
                <button onClick={addPaymentMethod}>Save</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className={styles.tabContent}>
          <div className={styles.settingRow}>
            <FaCog />
            <div>
              <label>Dark Mode</label>
              <p>Switch between light and dark theme</p>
            </div>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingRow}>
            <FaBell />
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
            <FaGlobe />
            <div>
              <label>Language</label>
              <p>English (UK)</p>
            </div>
            <button className={styles.changeBtn}>Change</button>
          </div>
          <div className={styles.settingRow}>
            <FaSignOutAlt />
            <div>
              <label>Logout</label>
              <p>Sign out of your account</p>
            </div>
            <button onClick={logout} className={styles.logoutBtn}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
