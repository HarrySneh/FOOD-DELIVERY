import {
  FaStore,
  FaMotorcycle,
  FaUsers,
  FaStar,
  FaHeart,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";
import styles from "./About.module.css";

export default function About() {
  const stats = [
    { number: "300+", label: "Restaurants", icon: FaStore },
    { number: "500+", label: "Drivers", icon: FaMotorcycle },
    { number: "50K+", label: "Customers", icon: FaUsers },
    { number: "98%", label: "Satisfaction", icon: FaStar },
  ];

  const values = [
    {
      icon: FaHeart,
      title: "Customer First",
      description: "Your satisfaction is our top priority",
    },
    {
      icon: FaShieldAlt,
      title: "Quality & Safety",
      description: "Partnering only with verified restaurants",
    },
    {
      icon: FaMotorcycle,
      title: "Fast Delivery",
      description: "Efficient delivery network",
    },
    {
      icon: FaClock,
      title: "24/7 Support",
      description: "Always here to help you",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>About TamaEat</h1>
        <p>Delivering happiness across Ghana since 2024</p>
      </div>

      <div className={styles.mission}>
        <h2>Our Mission</h2>
        <p>
          To connect Ghanaians with the best local cuisine and fresh groceries
          through fast, reliable, and affordable delivery service. We believe
          that great food should be accessible to everyone, anywhere in Ghana.
        </p>
      </div>

      <div className={styles.stats}>
        {stats.map((stat, idx) => (
          <div key={idx} className={styles.statCard}>
            <stat.icon className={styles.statIcon} />
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className={styles.values}>
        <h2>Our Values</h2>
        <div className={styles.valuesGrid}>
          {values.map((value, idx) => (
            <div key={idx} className={styles.valueCard}>
              <value.icon className={styles.valueIcon} />
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
