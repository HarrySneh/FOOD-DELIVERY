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
            If you experience any issues with your order, please contact us
            within 1 hour of delivery.
          </p>
        </section>
        <section>
          <h2>2. Eligible Issues</h2>
          <p>
            We provide refunds for missing items, incorrect items, or food
            quality issues.
          </p>
        </section>
        <section>
          <h2>3. Non-Eligible Issues</h2>
          <p>
            We cannot refund for change of mind, taste preferences, or issues
            reported after 1 hour.
          </p>
        </section>
        <section>
          <h2>4. Refund Process</h2>
          <p>
            Contact customer support with your order number and photos of the
            issue. Approved refunds are processed within 5-7 business days.
          </p>
        </section>
      </div>
    </div>
  );
}
