import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import {
  FaMotorcycle,
  FaUtensils,
  FaClock,
  FaShieldAlt,
  FaStar,
  FaArrowRight,
  FaChevronRight,
  FaGift,
  FaWhatsapp,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Avocado_Toast from "../assets/images/Brunch/Avocado_Toast.jpg";
import Banku from "../assets/images/Banku.png";
import Fufu from "../assets/images/Fufu.png";
import Jollof from "../assets/images/Jollof.png";
import Kelewele from "../assets/images/Kelewele.png";
import Waakye from "../assets/images/Waakye.png";
import Tuoazaafi from "../assets/images/Tuozaafi.png";


// Sample image URLs - Replace with your actual images
const heroImages = [
  "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=1200&h=400&fit=crop",
  'img src="/assets/images/TamaEat.png" alt="TamaEat Logo"',
];

const dishImages = [
  <img src={Jollof} alt="Jollof Rice" />,
  <img src={Banku} alt="Banku & Tilapia" />,
  <img src={Waakye} alt="Waakye" />,
  <img src={Kelewele} alt="Kelewele" />,
  <img src={Fufu} alt="Fufu & Soup" />,
  <img src={Tuoazaafi} alt="Tuoazaafi" />,
];  


export default function Home() {
  const { user } = useAuth();
  const { itemCount } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Delicious Food, Fast Delivery",
      subtitle: "Order from the best restaurants in Ghana",
      image: heroImages[0],
    },
    {
      title: "Support Local Restaurants",
      subtitle: "Discover authentic Ghanaian cuisine",
      image: heroImages[1],
    },
    {
      title: "Special Discounts Every Day",
      subtitle: "Save up to 30% on your first order",
      image: heroImages[2],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <FaMotorcycle />,
      title: "Fast Delivery",
      description: "Get your food in 30-45 minutes",
      color: "#dc2626",
    },
    {
      icon: <FaUtensils />,
      title: "Top Restaurants",
      description: "200+ local restaurants partnered",
      color: "#ea580c",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      description: "Pay with card or mobile money",
      color: "#059669",
    },
    {
      icon: <FaClock />,
      title: "24/7 Support",
      description: "Always here to help you",
      color: "#6366f1",
    },
  ];

  const popularDishes = [
    {
      name: "Jollof Rice",
      price: "GHS 25",
      image: dishImages[0],
      orders: 1234,
      rating: 4.8,
    },
    {
      name: "Banku & Tilapia",
      price: "GHS 35",
      image: dishImages[1],
      orders: 892,
      rating: 4.9,
    },
    {
      name: "Waakye",
      price: "GHS 20",
      image: dishImages[2],
      orders: 756,
      rating: 4.7,
    },
    {
      name: "Kelewele",
      price: "GHS 15",
      image: dishImages[3],
      orders: 654,
      rating: 4.8,
    },
    {
      name: "Fufu & Soup",
      price: "GHS 30",
      image: dishImages[4],
      orders: 543,
      rating: 4.9,
    },
    {
      name: "Red Red",
      price: "GHS 22",
      image: dishImages[5],
      orders: 432,
      rating: 4.6,
    },
  ];

  const testimonials = [
    {
      name: "Akua Mensah",
      location: "Accra",
      rating: 5,
      text: "Best food delivery service in Ghana! The food arrived hot and on time.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      date: "2 days ago",
    },
    {
      name: "Kwame Asante",
      location: "Kumasi",
      rating: 5,
      text: "Love the variety of restaurants. Jollof from Tasty Jollof is amazing!",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      date: "5 days ago",
    },
    {
      name: "Esi Boateng",
      location: "Tema",
      rating: 4,
      text: "Great service, quick delivery. Would love to see more restaurant options.",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      date: "1 week ago",
    },
  ];

  const stats = [
    { number: "200+", label: "Restaurants", icon: <FaUtensils /> },
    { number: "500+", label: "Drivers", icon: <FaMotorcycle /> },
    { number: "50K+", label: "Customers", icon: <FaStar /> },
    { number: "98%", label: "Satisfaction", icon: <FaShieldAlt /> },
  ];

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/233123456789?text=Hello%20FoodieGH%2C%20I%20need%20help%20with%20my%20order",
      "_blank",
    );
  };

  return (
    <div className={styles.container}>
      {/* Hero Carousel Section */}
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
              <Link to="/restaurants" className={styles.ctaButton}>
                Order Now <FaArrowRight className={styles.arrowIcon} />
              </Link>
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

      {/* WhatsApp Floating Button */}
      <button onClick={openWhatsApp} className={styles.whatsappFloat}>
        <FaWhatsapp />
        <span>Chat with us</span>
      </button>

      {/* Stats Section */}
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

      {/* Features Section */}
      <div className={styles.featuresSection}>
        <h2>Why Choose FoodieGH?</h2>
        <p className={styles.sectionSubtitle}>
          We make food delivery easy, fast, and reliable
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

      {/* Popular Dishes Section */}
      <div className={styles.popularSection}>
        <h2>Popular Dishes in Ghana</h2>
        <p className={styles.sectionSubtitle}>
          Most loved meals by our customers
        </p>
        <div className={styles.dishesGrid}>
          {popularDishes.map((dish, index) => (
            <div key={index} className={styles.dishCard}>
              <img
                src={dish.image}
                alt={dish.name}
                className={styles.dishImage}
              />
              <div className={styles.dishInfo}>
                <h3>{dish.name}</h3>
                <div className={styles.dishRating}>
                  <FaStar className={styles.starIcon} />
                  <span>{dish.rating}</span>
                  <span className={styles.dishOrders}>
                    ({dish.orders} orders)
                  </span>
                </div>
                <p className={styles.dishPrice}>{dish.price}</p>
                <Link to="/restaurants" className={styles.orderLink}>
                  Order Now <FaChevronRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className={styles.howItWorks}>
        <h2>How It Works</h2>
        <p className={styles.sectionSubtitle}>
          Get your favorite food in 3 simple steps
        </p>
        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
              alt="Choose"
              className={styles.stepIconImage}
            />
            <h3>Choose Restaurant</h3>
            <p>Browse from 200+ local restaurants</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046856.png"
              alt="Select"
              className={styles.stepIconImage}
            />
            <h3>Select Your Meal</h3>
            <p>Pick your favorite dishes</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2975/2975171.png"
              alt="Deliver"
              className={styles.stepIconImage}
            />
            <h3>Fast Delivery</h3>
            <p>Get it delivered to your doorstep</p>
          </div>
        </div>
      </div>

      {/* Special Offer Banner */}
      <div className={styles.offerBanner}>
        <div className={styles.offerContent}>
          <FaGift className={styles.offerIcon} />
          <div>
            <h3>First Order Special!</h3>
            <p>
              Get 20% off on your first order. Use code:{" "}
              <strong>FIRST20</strong>
            </p>
          </div>
          <Link to="/restaurants" className={styles.offerButton}>
            Order Now
          </Link>
        </div>
      </div>

      {/* Testimonials Section */}
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

      {/* Download App Section */}
      <div className={styles.downloadSection}>
        <div className={styles.downloadContent}>
          <div className={styles.downloadText}>
            <h2>Download Our App</h2>
            <p>Get the best food delivery experience with our mobile app</p>
            <div className={styles.appButtons}>
              <button className={styles.appStoreButton}>
                <span>📱</span> App Store
              </button>
              <button className={styles.playStoreButton}>
                <span>▶️</span> Google Play
              </button>
            </div>
          </div>
          <div className={styles.downloadImage}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/888/888879.png"
              alt="App"
              className={styles.appImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
