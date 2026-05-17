import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import {
  FaMotorcycle,
  FaUtensils,
  FaShieldAlt,
  FaStar,
  FaArrowRight,
  FaChevronRight,
  FaGift,
  FaWhatsapp,
  FaStore,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import {
  HERO_IMAGES,
  DISH_IMAGES,
  ICON_IMAGES,
} from "../constants/imageConstants";
import styles from "./Home.module.css";

export default function Home() {
  const { user } = useAuth();
  const { itemCount } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Food & Grocery Delivered to Tamale",
      subtitle:
        "Order from the best restaurants and grocery stores in Northern Ghana",
      image: HERO_IMAGES[0],
      cta: "/restaurants",
    },
    {
      title: "Fresh Groceries, Same Day Delivery",
      subtitle: "Get your daily essentials delivered to your doorstep",
      image: HERO_IMAGES[1],
      cta: "/groceries",
    },
    {
      title: "Support Local Businesses",
      subtitle: "Discover authentic Tamale cuisine and fresh produce",
      image: HERO_IMAGES[2],
      cta: "/restaurants",
    },
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000,
    );
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <FaMotorcycle />,
      title: "Fast Delivery",
      description: "Get your order in 30-45 minutes",
      color: "#2563eb",
    },
    {
      icon: <FaUtensils />,
      title: "Local Restaurants",
      description: "200+ local restaurants partnered",
      color: "#ea580c",
    },
    {
      icon: <FaStore />,
      title: "Grocery Stores",
      description: "Fresh produce & everyday essentials",
      color: "#10b981",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      description: "Pay with card or mobile money",
      color: "#6366f1",
    },
  ];

  const popularFoods = [
    {
      name: "Jollof Rice",
      price: "GHS 25",
      image: DISH_IMAGES.jollofRice,
      orders: 1234,
      rating: 4.8,
      link: "/restaurants",
    },
    {
      name: "Banku & Tilapia",
      price: "GHS 35",
      image: DISH_IMAGES.bankuTilapia,
      orders: 892,
      rating: 4.9,
      link: "/restaurants",
    },
    {
      name: "Waakye",
      price: "GHS 20",
      image: DISH_IMAGES.waakye,
      orders: 756,
      rating: 4.7,
      link: "/restaurants",
    },
    {
      name: "Tuo Zaafi",
      price: "GHS 25",
      image: DISH_IMAGES.tuoZaafi,
      orders: 654,
      rating: 4.8,
      link: "/restaurants",
    },
  ];

  const popularGroceries = [
    {
      name: "Fresh Vegetables",
      price: "GHS 15",
      image: DISH_IMAGES.freshVegetables,
      orders: 543,
      rating: 4.8,
      link: "/groceries",
    },
    {
      name: "Rice (5kg)",
      price: "GHS 30",
      image: DISH_IMAGES.riceBag,
      orders: 432,
      rating: 4.6,
      link: "/groceries",
    },
  ];

  const testimonials = [
    {
      name: "Akua Mensah",
      location: "Tamale",
      rating: 5,
      text: "Best delivery service in Tamale! Food arrived hot and groceries were fresh.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      date: "2 days ago",
    },
    {
      name: "Kwame Asante",
      location: "Tamale",
      rating: 5,
      text: "Love ordering both food and groceries from one app. So convenient!",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      date: "5 days ago",
    },
    {
      name: "Esi Boateng",
      location: "Tamale",
      rating: 4,
      text: "Great service and quick delivery. Highly recommend the grocery section.",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      date: "1 week ago",
    },
  ];

  const stats = [
    { number: "100+", label: "Local Partners", icon: <FaStore /> },
    { number: "200+", label: "Delivery Riders", icon: <FaMotorcycle /> },
    { number: "10K+", label: "Happy Customers", icon: <FaStar /> },
    { number: "98%", label: "Satisfaction", icon: <FaShieldAlt /> },
  ];

  const openWhatsApp = () =>
    window.open(
      "https://wa.me/233123456789?text=Hello%20TamaEat%2C%20I%20need%20help",
      "_blank",
    );

  return (
    <div className={styles.container}>
      {/* Hero Carousel */}
      <div className={styles.heroCarousel}>
        <div className={styles.slide}>
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className={styles.slideImage}
          />
          <div className={styles.slideOverlay}>
            <div className={styles.slideContent}>
              <h1>{slides[currentSlide].title}</h1>
              <p>{slides[currentSlide].subtitle}</p>
              {user && (
                <p className={styles.welcomeBack}>
                  Welcome back, {user.name}! 🎉
                </p>
              )}
              {itemCount > 0 && (
                <p className={styles.cartCount}>
                  You have {itemCount} item(s) in your cart
                </p>
              )}
              <div className={styles.ctaButtons}>
                <Link to="/restaurants" className={styles.ctaButton}>
                  <FaUtensils /> Order Food <FaArrowRight />
                </Link>
                <Link to="/groceries" className={styles.ctaButtonSecondary}>
                  <FaStore /> Shop Groceries <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.slideDots}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* WhatsApp Float */}
      <button onClick={openWhatsApp} className={styles.whatsappFloat}>
        <FaWhatsapp />
        <span>Chat with us</span>
      </button>

      {/* Stats */}
      <div className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className={styles.featuresSection}>
        <h2>Why Choose TamaEat?</h2>
        <p className={styles.sectionSubtitle}>
          We make food and grocery delivery easy, fast, and reliable
        </p>
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div
                className={styles.featureIcon}
                style={{ backgroundColor: feature.color }}
              >
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Food Items */}
      <div className={styles.popularSection}>
        <div className={styles.sectionHeader}>
          <h2>Popular Food in Tamale</h2>
          <Link to="/restaurants" className={styles.viewAll}>
            View all <FaChevronRight />
          </Link>
        </div>
        <div className={styles.itemsGrid}>
          {popularFoods.map((item, idx) => (
            <Link key={idx} to={item.link} className={styles.itemCard}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.itemImage}
              />
              <div className={styles.itemInfo}>
                <h3>{item.name}</h3>
                <div className={styles.itemRating}>
                  <FaStar className={styles.starIcon} /> {item.rating} (
                  {item.orders}+)
                </div>
                <p className={styles.itemPrice}>{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Grocery Items */}
      <div className={styles.popularSection}>
        <div className={styles.sectionHeader}>
          <h2>Popular Groceries</h2>
          <Link to="/groceries" className={styles.viewAll}>
            View all <FaChevronRight />
          </Link>
        </div>
        <div className={styles.itemsGrid}>
          {popularGroceries.map((item, idx) => (
            <Link key={idx} to={item.link} className={styles.itemCard}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.itemImage}
              />
              <div className={styles.itemInfo}>
                <h3>{item.name}</h3>
                <div className={styles.itemRating}>
                  <FaStar className={styles.starIcon} /> {item.rating} (
                  {item.orders}+)
                </div>
                <p className={styles.itemPrice}>{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className={styles.howItWorks}>
        <h2>How TamaEat Works</h2>
        <p className={styles.sectionSubtitle}>
          Get your items in 3 simple steps
        </p>
        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <img
              src={ICON_IMAGES.step1}
              alt="Choose"
              className={styles.stepIcon}
            />
            <h3>Choose</h3>
            <p>Browse restaurants or grocery stores</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <img
              src={ICON_IMAGES.step2}
              alt="Order"
              className={styles.stepIcon}
            />
            <h3>Order</h3>
            <p>Add items to cart and checkout</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <img
              src={ICON_IMAGES.step3}
              alt="Enjoy"
              className={styles.stepIcon}
            />
            <h3>Enjoy</h3>
            <p>Get your delivery in minutes</p>
          </div>
        </div>
      </div>

      {/* Offer Banner */}
      <div className={styles.offerBanner}>
        <div className={styles.offerContent}>
          <FaGift className={styles.offerIcon} />
          <div>
            <h3>First Order Special!</h3>
            <p>
              Get 20% off on your first food order. Use code:{" "}
              <strong>TAMAEAT20</strong>
            </p>
          </div>
          <Link to="/restaurants" className={styles.offerButton}>
            Order Now
          </Link>
        </div>
      </div>

      {/* Testimonials */}
      <div className={styles.testimonialsSection}>
        <h2>What Our Customers Say</h2>
        <p className={styles.sectionSubtitle}>
          Join thousands of happy customers in Tamale
        </p>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((t, idx) => (
            <div key={idx} className={styles.testimonialCard}>
              <div className={styles.testimonialHeader}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  className={styles.testimonialAvatar}
                />
                <div>
                  <h4>{t.name}</h4>
                  <p className={styles.testimonialLocation}>{t.location}</p>
                </div>
              </div>
              <div className={styles.testimonialStars}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < t.rating ? styles.starFilled : styles.starEmpty
                    }
                  />
                ))}
              </div>
              <p className={styles.testimonialText}>"{t.text}"</p>
              <p className={styles.testimonialDate}>{t.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Download App */}
      <div className={styles.downloadSection}>
        <div className={styles.downloadContent}>
          <div className={styles.downloadText}>
            <h2>Download TamaEat App</h2>
            <p>Get the best delivery experience with our mobile app</p>
            <div className={styles.appButtons}>
              <button className={styles.appStoreButton}>
                <img src={ICON_IMAGES.appStore} alt="App Store" /> App Store
              </button>
              <button className={styles.playStoreButton}>
                <img src={ICON_IMAGES.playStore} alt="Google Play" /> Google
                Play
              </button>
            </div>
          </div>
          <div className={styles.downloadImage}>
            <img
              src={ICON_IMAGES.phoneMockup}
              alt="Mobile App"
              className={styles.appImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
