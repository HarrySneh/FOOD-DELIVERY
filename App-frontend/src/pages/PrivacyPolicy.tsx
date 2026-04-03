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
            create an account, place an order, or contact us. This may include:
          </p>
          <ul>
            <li>Name and contact information (email, phone number, address)</li>
            <li>Payment information (processed securely through Paystack)</li>
            <li>Order history and preferences</li>
            <li>Location data for delivery purposes</li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Process and deliver your orders</li>
            <li>Communicate with you about your orders</li>
            <li>Improve our services and user experience</li>
            <li>Send promotional offers (with your consent)</li>
            <li>Prevent fraud and ensure security</li>
          </ul>
        </section>

        <section>
          <h2>3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your
            information with:
          </p>
          <ul>
            <li>Restaurants and delivery partners to fulfill your orders</li>
            <li>Payment processors to handle transactions</li>
            <li>Law enforcement when required by law</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            personal information. All payment transactions are encrypted using
            SSL technology.
          </p>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2>6. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at:
          </p>
          <p>
            Email: privacy@TamaEat.com
            <br />
            Phone: +233 123 456 789
            <br />
            Address: 123 Main Street, Accra, Ghana
          </p>
        </section>
      </div>
    </div>
  );
}
