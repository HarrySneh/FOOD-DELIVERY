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
      title: "Delicious Food & Fresh Groceries",
      subtitle:
        "Now delivering to Tamale! Order from the best restaurants and shops",
      image: HERO_IMAGES[0],
    },
    {
      title: "Support Local Businesses",
      subtitle: "Discover authentic Ghanaian cuisine and fresh produce",
      image: HERO_IMAGES[1],
    },
    {
      title: "Special Discounts Every Day",
      subtitle: "Save up to 30% on your first order",
      image: HERO_IMAGES[2],
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
      title: "Top Restaurants",
      description: "200+ local restaurants partnered",
      color: "#ea580c",
    },
    {
      icon: <FaStore />,
      title: "Grocery Stores",
      description: "Fresh produce and everyday essentials",
      color: "#10b981",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      description: "Pay with card or mobile money",
      color: "#6366f1",
    },
  ];

  const popularItems = [
    {
      name: "Jollof Rice",
      price: "GHS 25",
      image: DISH_IMAGES.jollofRice,
      orders: 1234,
      rating: 4.8,
      type: "food",
    },
    {
      name: "Banku & Tilapia",
      price: "GHS 35",
      image: DISH_IMAGES.bankuTilapia,
      orders: 892,
      rating: 4.9,
      type: "food",
    },
    {
      name: "Waakye",
      price: "GHS 20",
      image: DISH_IMAGES.waakye,
      orders: 756,
      rating: 4.7,
      type: "food",
    },
    {
      name: "Tuo Zaafi",
      price: "GHS 25",
      image: DISH_IMAGES.tuoZaafi,
      orders: 654,
      rating: 4.8,
      type: "food",
    },
    {
      name: "Fresh Vegetables",
      price: "GHS 15",
      image: DISH_IMAGES.freshVegetables,
      orders: 543,
      rating: 4.8,
      type: "grocery",
    },
    {
      name: "Rice (5kg)",
      price: "GHS 30",
      image: DISH_IMAGES.riceBag,
      orders: 432,
      rating: 4.6,
      type: "grocery",
    },
  ];

  const testimonials = [
    {
      name: "Akua Mensah",
      location: "Tamale",
      rating: 5,
      text: "Best delivery service in Ghana! The food arrived hot and on time. Love TamaEat!",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      date: "2 days ago",
    },
    {
      name: "Kwame Asante",
      location: "Tamale",
      rating: 5,
      text: "Love the variety. Being able to order both food and groceries from one app is amazing!",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      date: "5 days ago",
    },
    {
      name: "Esi Boateng",
      location: "Tamale",
      rating: 4,
      text: "Great service, quick delivery. The grocery section is a game changer!",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      date: "1 week ago",
    },
  ];

  const stats = [
    { number: "300+", label: "Partners", icon: <FaUtensils /> },
    { number: "500+", label: "Drivers", icon: <FaMotorcycle /> },
    { number: "50K+", label: "Customers", icon: <FaStar /> },
    { number: "98%", label: "Satisfaction", icon: <FaShieldAlt /> },
  ];

  const openWhatsApp = () =>
    window.open(
      "https://wa.me/233123456789?text=Hello%20TamaEat%2C%20I%20need%20help",
      "_blank",
    );

  return (
    <div className={styles.container}>
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
                  <FaUtensils /> Order Food{" "}
                  <FaArrowRight className={styles.arrowIcon} />
                </Link>
                <Link to="/groceries" className={styles.ctaButtonSecondary}>
                  <FaStore /> Shop Groceries{" "}
                  <FaArrowRight className={styles.arrowIcon} />
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

      <button onClick={openWhatsApp} className={styles.whatsappFloat}>
        <FaWhatsapp />
        <span>Chat with us</span>
      </button>

      <div className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.featuresSection}>
        <h2>Why Choose TamaEat?</h2>
        <p className={styles.sectionSubtitle}>
          We make food and grocery delivery easy, fast, and reliable
        </p>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
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

      <div className={styles.tamaleSection}>
        <div className={styles.tamaleContent}>
          <h2>🇬🇭 Now Serving Tamale!</h2>
          <p>
            Discover authentic Northern Ghanaian cuisine delivered to your
            doorstep
          </p>
          <div className={styles.tamaleFeatures}>
            <span>🍲 Tuo Zaafi</span>
            <span>🍚 Wasawasa</span>
            <span>🥩 Kinkheba</span>
            <span>🌶️ Ayoyo Soup</span>
          </div>
          <Link to="/restaurants" className={styles.tamaleButton}>
            Explore Tamale Restaurants →
          </Link>
        </div>
      </div>

      <div className={styles.categorySection}>
        <h2>What would you like today?</h2>
        <p className={styles.sectionSubtitle}>Choose from food or groceries</p>
        <div className={styles.categoryGrid}>
          <Link to="/restaurants" className={styles.categoryCard}>
            <div className={styles.categoryIcon}>🍕</div>
            <h3>Food Delivery</h3>
            <p>Order from 200+ restaurants</p>
            <span className={styles.categoryLink}>Explore →</span>
          </Link>
          <Link to="/groceries" className={styles.categoryCard}>
            <div className={styles.categoryIcon}>🛒</div>
            <h3>Grocery Delivery</h3>
            <p>Fresh produce & essentials</p>
            <span className={styles.categoryLink}>Coming Soon →</span>
          </Link>
        </div>
      </div>

      <div className={styles.popularSection}>
        <h2>Popular Items in Ghana</h2>
        <p className={styles.sectionSubtitle}>
          Most loved items by our customers
        </p>
        <div className={styles.dishesGrid}>
          {popularItems.map((item, index) => (
            <div key={index} className={styles.dishCard}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.dishImage}
              />
              <div className={styles.dishInfo}>
                <h3>{item.name}</h3>
                <div className={styles.dishRating}>
                  <FaStar className={styles.starIcon} />
                  <span>{item.rating}</span>
                  <span className={styles.dishOrders}>
                    ({item.orders} orders)
                  </span>
                </div>
                <p className={styles.dishPrice}>{item.price}</p>
                <Link
                  to={item.type === "food" ? "/restaurants" : "/groceries"}
                  className={styles.orderLink}
                >
                  Order Now <FaChevronRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.howItWorks}>
        <h2>How TamaEat Works</h2>
        <p className={styles.sectionSubtitle}>
          Get your favorite items in 3 simple steps
        </p>
        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <img
              src={ICON_IMAGES.step1}
              alt="Choose"
              className={styles.stepIconImage}
            />
            <h3>Choose Item</h3>
            <p>Browse from restaurants or grocery stores</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <img
              src={ICON_IMAGES.step2}
              alt="Select"
              className={styles.stepIconImage}
            />
            <h3>Place Order</h3>
            <p>Add to cart and checkout securely</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <img
              src={ICON_IMAGES.step3}
              alt="Deliver"
              className={styles.stepIconImage}
            />
            <h3>Fast Delivery</h3>
            <p>Get it delivered to your doorstep</p>
          </div>
        </div>
      </div>

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

      <div className={styles.testimonialsSection}>
        <h2>What Our Customers Say</h2>
        <p className={styles.sectionSubtitle}>
          Join thousands of happy customers
        </p>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.testimonialHeader}>
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className={styles.testimonialAvatar}
                />
                <div>
                  <h4>{testimonial.name}</h4>
                  <p className={styles.testimonialLocation}>
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <div className={styles.testimonialStars}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < testimonial.rating
                        ? styles.starFilled
                        : styles.starEmpty
                    }
                  />
                ))}
              </div>
              <p className={styles.testimonialText}>"{testimonial.text}"</p>
              <p className={styles.testimonialDate}>{testimonial.date}</p>
            </div>
          ))}
        </div>
        <Link to="/about" className={styles.viewAllLink}>
          View All Reviews <FaChevronRight />
        </Link>
      </div>

      <div className={styles.downloadSection}>
        <div className={styles.downloadContent}>
          <div className={styles.downloadText}>
            <h2>Download TamaEat App</h2>
            <p>
              Get the best food and grocery delivery experience with our mobile
              app
            </p>
            <div className={styles.appButtons}>
              <button className={styles.appStoreButton}>
                <img
                  src={ICON_IMAGES.appStore}
                  alt="App Store"
                  className={styles.appIcon}
                />{" "}
                App Store
              </button>
              <button className={styles.playStoreButton}>
                <img
                  src={ICON_IMAGES.playStore}
                  alt="Google Play"
                  className={styles.appIcon}
                />{" "}
                Google Play
              </button>
            </div>
          </div>
          <div className={styles.downloadImage}>
            <img
              src={ICON_IMAGES.phoneMockup}
              alt="App"
              className={styles.appImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
