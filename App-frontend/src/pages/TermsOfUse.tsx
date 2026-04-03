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
          <p>
            By using FoodieGH, you agree to these Terms of Use. If you do not
            agree, please do not use our services.
          </p>
        </section>

        <section>
          <h2>2. User Accounts</h2>
          <p>
            You must be at least 18 years old to create an account. You are
            responsible for:
          </p>
          <ul>
            <li>Maintaining the confidentiality of your account</li>
            <li>All activities that occur under your account</li>
            <li>Providing accurate and complete information</li>
          </ul>
        </section>

        <section>
          <h2>3. Ordering and Payments</h2>
          <p>
            By placing an order, you agree to pay the stated price including
            delivery fees. Payments are processed securely through Paystack.
          </p>
        </section>

        <section>
          <h2>4. Delivery Terms</h2>
          <p>
            Delivery times are estimates and not guaranteed. We are not
            responsible for delays caused by weather, traffic, or other factors
            beyond our control.
          </p>
        </section>

        <section>
          <h2>5. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the service for any illegal purpose</li>
            <li>Harass or abuse delivery personnel or restaurant staff</li>
            <li>Create false or misleading reviews</li>
            <li>Attempt to hack or disrupt our services</li>
          </ul>
        </section>

        <section>
          <h2>6. Limitation of Liability</h2>
          <p>
            FoodieGH is not liable for any indirect, incidental, or
            consequential damages arising from your use of our service. Our
            maximum liability is limited to the amount you paid for your order.
          </p>
        </section>

        <section>
          <h2>7. Changes to Terms</h2>
          <p>
            We may update these terms at any time. Continued use of our service
            constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>Questions about these terms? Contact us at legal@TamaEat.com</p>
        </section>
      </div>
    </div>
  );
}
