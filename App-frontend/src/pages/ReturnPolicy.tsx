import styles from "./LegalPages.module.css";

export default function ReturnPolicy() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Return & Refund Policy</h1>
        <p>Last updated: January 1, 2024</p>
      </div>

      <div className={styles.content}>
        <section>
          <h2>1. Order Issues</h2>
          <p>
            We strive to ensure every order is perfect. If you experience any
            issues with your order, please contact us within 1 hour of delivery.
          </p>
        </section>

        <section>
          <h2>2. Eligible Issues</h2>
          <p>We will provide refunds or credits for:</p>
          <ul>
            <li>Missing items from your order</li>
            <li>Incorrect items delivered</li>
            <li>Food quality issues (spoiled or improperly prepared)</li>
            <li>Order not delivered within reasonable time</li>
          </ul>
        </section>

        <section>
          <h2>3. Non-Eligible Issues</h2>
          <p>We cannot provide refunds for:</p>
          <ul>
            <li>Change of mind after order is placed</li>
            <li>Taste preferences (food quality issues excepted)</li>
            <li>
              Delivery delays due to weather or traffic (reasonable time
              considered)
            </li>
            <li>Issues reported after 1 hour of delivery</li>
          </ul>
        </section>

        <section>
          <h2>4. Refund Process</h2>
          <p>To request a refund:</p>
          <ol>
            <li>Contact customer support within 1 hour of delivery</li>
            <li>Provide your order number and photos of the issue</li>
            <li>Our team will review and respond within 24 hours</li>
            <li>Approved refunds will be processed within 5-7 business days</li>
          </ol>
        </section>

        <section>
          <h2>5. Cancellation Policy</h2>
          <p>You may cancel an order:</p>
          <ul>
            <li>Before restaurant confirmation: Full refund</li>
            <li>After confirmation but before preparation: 50% refund</li>
            <li>After preparation begins: No refund</li>
          </ul>
        </section>

        <section>
          <h2>6. Contact Support</h2>
          <p>For return requests or questions:</p>
          <p>
            Email: returns@TamaEat.com
            <br />
            Phone: +233 123 456 789
            <br />
            WhatsApp: +233 123 456 789
          </p>
        </section>
      </div>
    </div>
  );
}
