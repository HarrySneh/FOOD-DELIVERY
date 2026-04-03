import {
  FaUtensils,
  FaMotorcycle,
  FaHeart,
  FaShieldAlt,
  FaStar,
  FaUsers,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./About.module.css";

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export default function About() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Akua Mensah",
      location: "Accra",
      rating: 5,
      comment:
        "Best food delivery service in Ghana! The food arrived hot and on time. Highly recommend!",
      date: "2024-03-15",
      avatar: "A",
    },
    {
      id: 2,
      name: "Kwame Asante",
      location: "Kumasi",
      rating: 5,
      comment:
        "Love the variety of restaurants. Jollof from Tasty Jollof is amazing!",
      date: "2024-03-10",
      avatar: "K",
    },
    {
      id: 3,
      name: "Esi Boateng",
      location: "Tema",
      rating: 4,
      comment:
        "Great service, quick delivery. Would love to see more restaurant options.",
      date: "2024-03-05",
      avatar: "E",
    },
    {
      id: 4,
      name: "Kofi Annan",
      location: "Accra",
      rating: 5,
      comment:
        "The tracking feature is excellent. I could see exactly where my driver was!",
      date: "2024-03-01",
      avatar: "K",
    },
  ]);

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    name: "",
    location: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment || !newReview.name || !newReview.location) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newReviewObj: Review = {
        id: reviews.length + 1,
        name: newReview.name,
        location: newReview.location,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split("T")[0],
        avatar: newReview.name.charAt(0),
      };
      setReviews([newReviewObj, ...reviews]);
      setNewReview({ rating: 5, comment: "", name: "", location: "" });
      toast.success("Thank you for your review!");
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar
          key={i}
          className={i < rating ? styles.starFilled : styles.starEmpty}
        />
      ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>About TamaEat</h1>
        <p>Delivering happiness across Ghana since 2024</p>
      </div>

      <div className={styles.mission}>
        <div className={styles.missionContent}>
          <h2>Our Mission</h2>
          <p>
            To connect Ghanaians with the best local cuisine through fast,
            reliable, and affordable food delivery service.
          </p>
          <p>
            We believe that great food should be accessible to everyone,
            anywhere in Ghana. That's why we partner with the best local
            restaurants to bring you authentic Ghanaian flavors right to your
            doorstep.
          </p>
        </div>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <FaUtensils className={styles.statIcon} />
            <h3>200+</h3>
            <p>Restaurants</p>
          </div>
          <div className={styles.statCard}>
            <FaMotorcycle className={styles.statIcon} />
            <h3>500+</h3>
            <p>Delivery Riders</p>
          </div>
          <div className={styles.statCard}>
            <FaUsers className={styles.statIcon} />
            <h3>50,000+</h3>
            <p>Happy Customers</p>
          </div>
          <div className={styles.statCard}>
            <FaClock className={styles.statIcon} />
            <h3>30 min</h3>
            <p>Average Delivery</p>
          </div>
        </div>
      </div>

      <div className={styles.values}>
        <h2>Our Values</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <FaHeart className={styles.valueIcon} />
            <h3>Customer First</h3>
            <p>
              Your satisfaction is our top priority. We go above and beyond to
              ensure you have the best experience.
            </p>
          </div>
          <div className={styles.valueCard}>
            <FaShieldAlt className={styles.valueIcon} />
            <h3>Quality & Safety</h3>
            <p>
              We partner only with verified restaurants and ensure all food is
              handled with care.
            </p>
          </div>
          <div className={styles.valueCard}>
            <FaMotorcycle className={styles.valueIcon} />
            <h3>Fast Delivery</h3>
            <p>
              Our efficient delivery network ensures your food arrives hot and
              fresh.
            </p>
          </div>
          <div className={styles.valueCard}>
            <FaMapMarkerAlt className={styles.valueIcon} />
            <h3>Local Focus</h3>
            <p>
              We celebrate Ghanaian cuisine and support local restaurants and
              businesses.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.reviewsSection}>
        <div className={styles.reviewsHeader}>
          <h2>Customer Reviews</h2>
          <div className={styles.ratingSummary}>
            <div className={styles.averageRating}>
              <span className={styles.ratingNumber}>
                {averageRating.toFixed(1)}
              </span>
              <div className={styles.stars}>
                {renderStars(Math.round(averageRating))}
              </div>
              <span className={styles.reviewCount}>
                Based on {reviews.length} reviews
              </span>
            </div>
          </div>
        </div>

        <div className={styles.reviewsGrid}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.avatar}>{review.avatar}</div>
                <div>
                  <h4>{review.name}</h4>
                  <p className={styles.reviewLocation}>{review.location}</p>
                </div>
              </div>
              <div className={styles.reviewStars}>
                {renderStars(review.rating)}
              </div>
              <p className={styles.reviewComment}>"{review.comment}"</p>
              <p className={styles.reviewDate}>
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.writeReview}>
          <h3>Write a Review</h3>
          <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Your Name</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Location</label>
                <input
                  type="text"
                  value={newReview.location}
                  onChange={(e) =>
                    setNewReview({ ...newReview, location: e.target.value })
                  }
                  placeholder="e.g., Accra, Kumasi"
                  required
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Rating</label>
              <div className={styles.ratingInput}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={
                      star <= newReview.rating
                        ? styles.starFilled
                        : styles.starEmpty
                    }
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Your Review</label>
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                placeholder="Share your experience with TamaEat..."
                rows={4}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={styles.submitButton}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
