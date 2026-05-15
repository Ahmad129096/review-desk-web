import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Link to="/" style={styles.backLink}>
          ← Review Desk
        </Link>

        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.iconBadge}>✉</div>
            <h1 style={styles.title}>Contact Us</h1>
            <p style={styles.subtitle}>
              Have a question, need support, or want to request data deletion?
              We'll get back to you as soon as possible.
            </p>
            <a href="mailto:hassanqaisar129096@gmail.com" style={styles.emailBtn}>
              Send Us an Email
            </a>
          </div>

          <div style={styles.divider} />

          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <span style={styles.infoIcon}>✉</span>
              <p style={styles.infoLabel}>Email</p>
              <a href="mailto:hassanqaisar129096@gmail.com" style={styles.infoValue}>
                hassanqaisar129096@gmail.com
              </a>
            </div>

            <div style={styles.infoCard}>
              <span style={styles.infoIcon}>🏢</span>
              <p style={styles.infoLabel}>Company</p>
              <p style={styles.infoValueText}>Review Desk</p>
            </div>

            <div style={styles.infoCard}>
              <span style={styles.infoIcon}>👤</span>
              <p style={styles.infoLabel}>Operated by</p>
              <p style={styles.infoValueText}>Ahmad Hassan</p>
            </div>
          </div>

          <div style={styles.divider} />

          <div style={styles.topics}>
            <p style={styles.topicsTitle}>Common reasons to reach out</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <span style={styles.bullet} />
                Request deletion of your account and data
              </li>
              <li style={styles.listItem}>
                <span style={styles.bullet} />
                Revoke Google Business Profile access
              </li>
              <li style={styles.listItem}>
                <span style={styles.bullet} />
                Report a bug or technical issue
              </li>
              <li style={styles.listItem}>
                <span style={styles.bullet} />
                Ask about privacy or data handling
              </li>
              <li style={styles.listItem}>
                <span style={styles.bullet} />
                General questions about Review Desk
              </li>
            </ul>
          </div>

          <div style={styles.footer}>
            <Link to="/privacy" style={styles.footerLink}>
              Privacy Policy
            </Link>
            <span style={styles.dot}>·</span>
            <Link to="/terms" style={styles.footerLink}>
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
    padding: "48px 24px 80px",
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
    fontFamily: "sans-serif",
    transition: "color 0.15s",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e5e0",
    borderRadius: 16,
    overflow: "hidden",
  },

  // Header section
  header: {
    padding: "40px 40px 36px",
    textAlign: "center" as const,
    borderBottom: "1px solid #f0f0eb",
  },
  iconBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 52,
    height: 52,
    backgroundColor: "#f0f0eb",
    borderRadius: "50%",
    fontSize: 22,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
    margin: "0 0 10px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: 15,
    color: "#6b6b63",
    lineHeight: 1.65,
    margin: "0 auto 24px",
    maxWidth: 400,
    fontFamily: "sans-serif",
  },
  emailBtn: {
    display: "inline-block",
    backgroundColor: "#1c1c1a",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "sans-serif",
    padding: "11px 24px",
    borderRadius: 8,
    letterSpacing: "0.01em",
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: "#f0f0eb",
    margin: "0",
  },

  // Info grid
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 0,
    padding: "28px 32px",
  },
  infoCard: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textAlign: "center" as const,
    padding: "12px 8px",
    gap: 4,
  },
  infoIcon: {
    fontSize: 20,
    marginBottom: 6,
    display: "block",
  },
  infoLabel: {
    fontSize: 11,
    color: "#6b6b63",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    margin: "0 0 4px",
    fontFamily: "sans-serif",
    fontWeight: 600,
  },
  infoValue: {
    fontSize: 13,
    color: "#2563eb",
    textDecoration: "none",
    margin: 0,
    fontFamily: "sans-serif",
    wordBreak: "break-all" as const,
  },
  infoValueText: {
    fontSize: 14,
    color: "#1c1c1a",
    margin: 0,
    fontFamily: "sans-serif",
    fontWeight: 500,
  },

  // Topics
  topics: {
    padding: "28px 40px 32px",
  },
  topicsTitle: {
    fontSize: 13,
    fontWeight: 700,
    margin: "0 0 14px",
    fontFamily: "sans-serif",
    color: "#1c1c1a",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  listItem: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "#3d3d3a",
    fontFamily: "sans-serif",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "5px 0",
    borderBottom: "1px solid #f5f5f2",
  },
  bullet: {
    display: "inline-block",
    width: 5,
    height: 5,
    borderRadius: "50%",
    backgroundColor: "#c0c0ba",
    flexShrink: 0,
  },

  // Footer
  footer: {
    borderTop: "1px solid #f0f0eb",
    padding: "20px 40px",
    textAlign: "center" as const,
    fontSize: 13,
    color: "#6b6b63",
    fontFamily: "sans-serif",
  },
  footerLink: {
    color: "#6b6b63",
    textDecoration: "underline",
    textUnderlineOffset: 2,
  },
  dot: {
    margin: "0 10px",
    color: "#c0c0ba",
  },
};
