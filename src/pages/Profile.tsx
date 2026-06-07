import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCreditCard, FaHistory, FaSignOutAlt, FaCog, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import styles from './Profile.module.css';

export default function Profile() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // Mock data for saved addresses and payment methods
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Home', address: '123 Main Street, Accra, Ghana', isDefault: true },
    { id: 2, label: 'Work', address: '45 Independence Avenue, Accra, Ghana', isDefault: false },
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Mobile Money', number: '024******7', isDefault: true },
    { id: 2, type: 'Card', number: '**** **** **** 1234', isDefault: false },
  ]);

  const stats = [
    { label: 'Orders', value: '24', icon: FaHistory },
    { label: 'Total Spent', value: 'GHS 847', icon: FaCreditCard },
    { label: 'Saved', value: 'GHS 45', icon: FaCreditCard },
  ];

  if (!user) return null;

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.avatarWrapper}>
            <img
              src={`https://ui-avatars.com/api/?background=2563eb&color=fff&name=${encodeURIComponent(user.name)}`}
              alt={user.name}
              className={styles.avatar}
            />
            <button className={styles.editAvatarBtn}>
              <FaEdit />
            </button>
          </div>
          <div className={styles.userInfo}>
            <h1>{user.name}</h1>
            <p className={styles.userEmail}>{user.email}</p>
            <span className={styles.userRole}>{user.role}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <div key={idx} className={styles.statCard}>
            <stat.icon className={styles.statIcon} />
            <div>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'profile' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'addresses' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('addresses')}
        >
          Addresses
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'payment' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('payment')}
        >
          Payment
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'settings' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className={styles.tabContent}>
          <div className={styles.infoSection}>
            <h3>Personal Information</h3>
            <div className={styles.infoRow}>
              <FaUser className={styles.infoIcon} />
              <div>
                <label>Full Name</label>
                <p>{user.name}</p>
              </div>
            </div>
            <div className={styles.infoRow}>
              <FaEnvelope className={styles.infoIcon} />
              <div>
                <label>Email Address</label>
                <p>{user.email}</p>
              </div>
            </div>
            <div className={styles.infoRow}>
              <FaPhone className={styles.infoIcon} />
              <div>
                <label>Phone Number</label>
                <p>{user.phone || 'Not provided'}</p>
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.editProfileBtn}>
              <FaEdit /> Edit Profile
            </button>
            <button className={styles.logoutBtn} onClick={logout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      )}

      {/* Addresses Tab */}
      {activeTab === 'addresses' && (
        <div className={styles.tabContent}>
          <div className={styles.addressesHeader}>
            <h3>Saved Addresses</h3>
            <button className={styles.addButton}>
              <FaPlus /> Add New
            </button>
          </div>
          {addresses.map((addr) => (
            <div key={addr.id} className={styles.addressCard}>
              <div>
                <div className={styles.addressLabel}>{addr.label}</div>
                <div className={styles.addressText}>{addr.address}</div>
                {addr.isDefault && <span className={styles.defaultBadge}>Default</span>}
              </div>
              <div className={styles.addressActions}>
                <FaEdit />
                <FaTrash />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'payment' && (
        <div className={styles.tabContent}>
          <div className={styles.addressesHeader}>
            <h3>Payment Methods</h3>
            <button className={styles.addButton}>
              <FaPlus /> Add Payment
            </button>
          </div>
          {paymentMethods.map((method) => (
            <div key={method.id} className={styles.addressCard}>
              <div>
                <div className={styles.addressLabel}>{method.type}</div>
                <div className={styles.addressText}>{method.number}</div>
                {method.isDefault && <span className={styles.defaultBadge}>Default</span>}
              </div>
              <div className={styles.addressActions}>
                <FaEdit />
                <FaTrash />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className={styles.tabContent}>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <FaCog className={styles.settingIcon} />
              <div>
                <label>Dark Mode</label>
                <p>Switch between light and dark theme</p>
              </div>
            </div>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <FaCog className={styles.settingIcon} />
              <div>
                <label>Email Notifications</label>
                <p>Receive order updates and offers</p>
              </div>
            </div>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <FaCog className={styles.settingIcon} />
              <div>
                <label>Language</label>
                <p>English (UK)</p>
              </div>
            </div>
            <button className={styles.changeButton}>Change</button>
          </div>
        </div>
      )}
    </div>
  );
}