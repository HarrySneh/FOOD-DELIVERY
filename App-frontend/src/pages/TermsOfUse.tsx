import styles from "./LegalPages.module.css";

export default function TermsOfUse() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Terms of Use</h1>
        <p>Last updated: January 1, 2024</p>
      </div>
      <div className={styles.content}>
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By using TamaEat, you agree to these Terms of Use.</p>
        </section>
        <section>
          <h2>2. User Accounts</h2>
          <p>
            You must be at least 18 years old to create an account. You are
            responsible for maintaining account security.
          </p>
        </section>
        <section>
          <h2>3. Orders and Payments</h2>
          <p>
            By placing an order, you agree to pay the stated price including
            delivery fees.
          </p>
        </section>
        <section>
          <h2>4. Delivery Terms</h2>
          <p>
            Delivery times are estimates. We are not responsible for delays
            beyond our control.
          </p>
        </section>
        <section>
          <h2>5. Contact</h2>
          <p>Email: legal@tamaeat.com</p>
        </section>
      </div>
    </div>
  );
}
