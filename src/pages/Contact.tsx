// pages/contact.tsx  OR  app/contact/page.tsx

import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Link to="/" style={styles.backLink}>
          ← Review Desk
        </Link>

        <div style={styles.card}>
          <h1 style={styles.title}>Contact Us</h1>
          <p style={styles.subtitle}>
            Have a question, need support, or want to request data deletion?
            We'll get back to you as soon as possible.
          </p>

          <div style={styles.divider} />

          <div style={styles.contactRow}>
            <div style={styles.icon}>✉</div>
            <div>
              <p style={styles.label}>Email</p>
              <Link
                to="mailto:hassanqaisar129096@gmail.com"
                style={styles.value}
              >
                hassanqaisar129096@gmail.com
              </Link>
            </div>
          </div>

          <div style={styles.contactRow}>
            <div style={styles.icon}>🏢</div>
            <div>
              <p style={styles.label}>Company</p>
              <p style={styles.value}>Review Desk</p>
            </div>
          </div>

          <div style={styles.contactRow}>
            <div style={styles.icon}>👤</div>
            <div>
              <p style={styles.label}>Operated by</p>
              <p style={styles.value}>Ahmad Hassan</p>
            </div>
          </div>

          <div style={styles.divider} />

          <div style={styles.topics}>
            <p style={styles.topicsTitle}>Common reasons to reach out:</p>
            <ul style={styles.list}>
              <li>Request deletion of your account and data</li>
              <li>Revoke Google Business Profile access</li>
              <li>Report a bug or technical issue</li>
              <li>Ask about privacy or data handling</li>
              <li>General questions about Review Desk</li>
            </ul>
          </div>

          <div style={styles.footer}>
            <Link to="/privacy-policy" style={styles.footerLink}>
              Privacy Policy
            </Link>
            <span style={styles.dot}>·</span>
            <Link to="/terms-of-service" style={styles.footerLink}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#fafaf9",
    padding: "48px 24px",
    fontFamily: "'Georgia', serif",
    color: "#1c1c1a",
  },
  container: {
    maxWidth: 560,
    margin: "0 auto",
  },
  backLink: {
    fontSize: 14,
    color: "#6b6b63",
    textDecoration: "none",
    display: "inline-block",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e5e0",
    borderRadius: 12,
    padding: "40px 40px",
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    margin: "0 0 12px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b6b63",
    lineHeight: 1.6,
    margin: "0 0 24px",
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e5e0",
    margin: "24px 0",
  },
  contactRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 20,
  },
  icon: {
    fontSize: 20,
    width: 28,
    flexShrink: 0,
    marginTop: 2,
  },
  label: {
    fontSize: 12,
    color: "#6b6b63",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    margin: "0 0 2px",
    fontFamily: "sans-serif",
  },
  value: {
    fontSize: 16,
    color: "#1c1c1a",
    textDecoration: "none",
    margin: 0,
    display: "block",
  },
  topics: {
    backgroundColor: "#f7f7f5",
    borderRadius: 8,
    padding: "16px 20px",
  },
  topicsTitle: {
    fontSize: 14,
    fontWeight: 700,
    margin: "0 0 8px",
    fontFamily: "sans-serif",
  },
  list: {
    margin: 0,
    paddingLeft: 20,
    fontSize: 14,
    lineHeight: 1.8,
    color: "#3d3d3a",
    fontFamily: "sans-serif",
  },
  footer: {
    marginTop: 32,
    textAlign: "center" as const,
    fontSize: 13,
    color: "#6b6b63",
    fontFamily: "sans-serif",
  },
  footerLink: {
    color: "#6b6b63",
    textDecoration: "underline",
  },
  dot: {
    margin: "0 8px",
  },
};
