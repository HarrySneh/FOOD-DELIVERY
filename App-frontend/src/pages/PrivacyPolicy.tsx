import styles from "./LegalPages.module.css";

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Privacy Policy</h1>
        <p>Last updated: January 1, 2024</p>
      </div>
      <div className={styles.content}>
        <section>
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, place an order, or contact us. This may include
            your name, email, phone number, delivery address, and payment
            information.
          </p>
        </section>
        <section>
          <h2>2. How We Use Your Information</h2>
          <p>
            We use your information to process orders, communicate with you,
            improve our services, and prevent fraud.
          </p>
        </section>
        <section>
          <h2>3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your
            information with restaurants, delivery partners, and payment
            processors to fulfill your orders.
          </p>
        </section>
        <section>
          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            personal information. All payment transactions are encrypted.
          </p>
        </section>
        <section>
          <h2>5. Contact Us</h2>
          <p>
            Email: privacy@tamaeat.com
            <br />
            Phone: +233 123 456 789
          </p>
        </section>
      </div>
    </div>
  );
}
