import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./FAQ.module.css";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "How do I place an order?",
      answer:
        "Simply browse restaurants, add items to your cart, proceed to checkout, enter your delivery address, choose payment method, and confirm your order. You will receive confirmation via email and SMS.",
    },
    {
      id: 2,
      question: "How long does delivery take?",
      answer:
        "Delivery typically takes 30-45 minutes depending on your location and restaurant preparation time. You can track your order in real-time from our app.",
    },
    {
      id: 3,
      question: "What payment methods do you accept?",
      answer:
        "We accept card payments (Visa/Mastercard) and mobile money (MTN MoMo, Vodafone Cash, AirtelTigo Cash). All payments are processed securely through Paystack.",
    },
    {
      id: 4,
      question: "How can I track my order?",
      answer:
        'Once your order is confirmed, you can track it from the "My Orders" section. When a driver is assigned, you will see their live location on the map.',
    },
    {
      id: 5,
      question: "What if my order is wrong or missing items?",
      answer:
        "Contact our customer support within 1 hour of delivery with your order number and photos of the issue. We will investigate and provide a refund or credit.",
    },
    {
      id: 6,
      question: "Can I cancel my order?",
      answer:
        "You can cancel before the restaurant confirms your order. After confirmation, cancellation may incur fees. Check our Return Policy for details.",
    },
    {
      id: 7,
      question: "How do I become a delivery driver?",
      answer:
        'Click on "Become a Driver" in your account menu after logging in. Fill out the registration form with your vehicle details, and we will contact you.',
    },
    {
      id: 8,
      question: "How do I add my restaurant to TamaEat?",
      answer:
        "Contact our partnerships team at partners@TamaEat.com or call +233 123 456 789. We will guide you through the onboarding process.",
    },
    {
      id: 9,
      question: "Is there a minimum order amount?",
      answer:
        "Minimum order amount varies by restaurant, typically GHS 20-30. Check the restaurant page for details.",
    },
    {
      id: 10,
      question: "What areas do you deliver to?",
      answer:
        "We currently deliver to Accra, Kumasi, Tema, and surrounding areas. We are expanding to more cities soon!",
    },
    {
      id: 11,
      question: "How do I leave a review?",
      answer:
        "After receiving your order, you can leave a rating and review on the restaurant page or your orders page. Your feedback helps us improve!",
    },
    {
      id: 12,
      question: "What if I have a food allergy?",
      answer:
        "Please note any allergies in the special instructions when placing your order. Contact the restaurant directly for detailed ingredient information.",
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about TamaEat</p>
      </div>

      <div className={styles.faqGrid}>
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <div key={faq.id} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(faq.id)}
              >
                <span>{faq.question}</span>
                {openIndex === faq.id ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openIndex === faq.id && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.contactCard}>
          <h3>Still have questions?</h3>
          <p>Our support team is here to help</p>
          <div className={styles.contactButtons}>
            <a
              href="mailto:support@foodiegh.com"
              className={styles.emailButton}
            >
              Email Support
            </a>
            <a href="tel:+233123456789" className={styles.phoneButton}>
              Call Us
            </a>
          </div>
          <div className={styles.chatInfo}>
            <p>Response time: Within 24 hours</p>
            <p>Support hours: Mon-Sat, 8am - 8pm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
