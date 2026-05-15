// pages/privacy.tsx  OR  app/privacy/page.tsx
// Drop this file into your Next.js / React Router project

import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Link to="/" style={styles.backLink}>
            ← Review Desk
          </Link>
          <h1 style={styles.title}>Privacy Policy</h1>
          <p style={styles.meta}>Last updated: May 15, 2025 · Ahmad Hassan</p>
        </div>

        <div style={styles.content}>
          <Section title="1. Introduction">
            <p>
              Review Desk ("we", "our", or "us") operates a SaaS platform that
              enables businesses to monitor and respond to their Google Business
              Profile reviews using AI-assisted automation. This Privacy Policy
              explains how we collect, use, store, and protect your information
              when you use our service at{" "}
              <a href="https://review-desk-web.vercel.app" style={styles.link}>
                review-desk-web.vercel.app
              </a>
              .
            </p>
            <p>
              By using Review Desk, you agree to the collection and use of
              information as described in this policy.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <SubHeading>2.1 Account Information</SubHeading>
            <p>When you create an account, we collect:</p>
            <ul style={styles.list}>
              <li>Email address</li>
              <li>Password (stored as a secure hash — never in plain text)</li>
              <li>Business name</li>
            </ul>

            <SubHeading>2.2 Google Business Profile Data</SubHeading>
            <p>
              When you connect your Google Business Profile via OAuth 2.0, we
              access and store the following data on your behalf:
            </p>
            <ul style={styles.list}>
              <li>Google account name and email address</li>
              <li>Business Profile name and location information</li>
              <li>Google Place ID associated with your business</li>
              <li>Customer reviews posted on your Google Business Profile</li>
              <li>
                Review replies you have posted or that were posted via Review
                Desk
              </li>
              <li>
                OAuth access tokens and refresh tokens (used solely to make API
                calls on your behalf)
              </li>
            </ul>

            <SubHeading>2.3 Usage Data</SubHeading>
            <p>
              We may collect standard server logs including IP address, browser
              type, pages visited, and timestamps for security and debugging
              purposes.
            </p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the data we collect exclusively to:</p>
            <ul style={styles.list}>
              <li>Authenticate your account and maintain your session</li>
              <li>
                Fetch your Google Business Profile reviews via the Google
                Business Profile API
              </li>
              <li>Generate AI-assisted reply suggestions for your reviews</li>
              <li>
                Post review replies to Google on your behalf when you approve or
                enable auto-reply
              </li>
              <li>Send you notifications about new reviews (if enabled)</li>
              <li>Improve the reliability and performance of our service</li>
            </ul>
            <p>
              <strong>
                We do not use your Google data for advertising, profiling, or
                any purpose beyond providing the Review Desk service.
              </strong>
            </p>
          </Section>

          <Section title="4. Google API Data — Limited Use Disclosure">
            <p>
              Review Desk's use of information received from Google APIs adheres
              to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                style={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
            <p>Specifically:</p>
            <ul style={styles.list}>
              <li>
                We only request the OAuth scope{" "}
                <code style={styles.code}>
                  https://www.googleapis.com/auth/business.manage
                </code>{" "}
                which is the minimum scope required to read reviews and post
                replies.
              </li>
              <li>
                Google data is used only to provide and improve the Review Desk
                service directly to the user who authorized access.
              </li>
              <li>We do not transfer Google user data to third parties.</li>
              <li>We do not use Google data for serving advertisements.</li>
              <li>
                We do not allow humans to read your Google data unless you
                explicitly request support and provide consent, or we are
                required to do so by law.
              </li>
            </ul>
          </Section>

          <Section title="5. Data Storage and Security">
            <p>
              Your data is stored in secure cloud databases. OAuth tokens are
              encrypted at rest. We implement industry-standard security
              practices including:
            </p>
            <ul style={styles.list}>
              <li>HTTPS encryption for all data in transit</li>
              <li>Encrypted storage of OAuth access and refresh tokens</li>
              <li>Hashed storage of passwords using bcrypt</li>
              <li>Access controls limiting which systems can read your data</li>
            </ul>
            <p>
              No method of transmission or storage is 100% secure. We cannot
              guarantee absolute security but we take reasonable steps to
              protect your data.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <ul style={styles.list}>
              <li>
                Account data is retained for as long as your account is active
                or as needed to provide the service.
              </li>
              <li>
                Review data fetched from Google is cached temporarily and
                refreshed periodically.
              </li>
              <li>
                OAuth tokens are deleted immediately when you disconnect your
                Google Business Profile or delete your account.
              </li>
              <li>
                You may request deletion of all your data at any time by
                emailing{" "}
                <a
                  href="mailto:hassanqaisar129096@gmail.com"
                  style={styles.link}
                >
                  hassanqaisar129096@gmail.com
                </a>
                .
              </li>
            </ul>
          </Section>

          <Section title="7. Revoking Google Access">
            <p>
              You can revoke Review Desk's access to your Google account at any
              time by:
            </p>
            <ul style={styles.list}>
              <li>
                Visiting{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  style={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Account Permissions
                </a>{" "}
                and removing Review Desk
              </li>
              <li>
                Using the "Disconnect" option in your Review Desk account
                settings
              </li>
            </ul>
            <p>
              Upon revocation, we will delete all stored OAuth tokens associated
              with your Google account.
            </p>
          </Section>

          <Section title="8. Third-Party Services">
            <p>Review Desk uses the following third-party services:</p>
            <ul style={styles.list}>
              <li>
                <strong>Google Business Profile API</strong> — to read reviews
                and post replies
              </li>
              <li>
                <strong>Google OAuth 2.0</strong> — for secure authentication
              </li>
              <li>
                <strong>Anthropic Claude API</strong> — to generate AI reply
                suggestions (review text is sent to this service; no personally
                identifiable information is included beyond review content)
              </li>
              <li>
                <strong>Vercel</strong> — for hosting the web application
              </li>
            </ul>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              Review Desk is intended for business owners and is not directed at
              children under 13. We do not knowingly collect personal
              information from children.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of significant changes by posting the new policy on
              this page with an updated date. Continued use of the service after
              changes constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>
              If you have any questions about this Privacy Policy or how we
              handle your data, contact us at:
            </p>
            <div style={styles.contactBox}>
              <p style={styles.contactName}>Ahmad Hassan — Review Desk</p>
              <a href="mailto:hassanqaisar129096@gmail.com" style={styles.link}>
                hassanqaisar129096@gmail.com
              </a>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 style={styles.subHeading}>{children}</h3>;
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
    maxWidth: 760,
    margin: "0 auto",
  },
  header: {
    marginBottom: 48,
    borderBottom: "1px solid #e5e5e0",
    paddingBottom: 32,
  },
  backLink: {
    fontSize: 14,
    color: "#6b6b63",
    textDecoration: "none",
    display: "inline-block",
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    margin: "0 0 8px",
    letterSpacing: "-0.5px",
  },
  meta: {
    fontSize: 14,
    color: "#6b6b63",
    margin: 0,
  },
  content: {
    lineHeight: 1.8,
    fontSize: 16,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 12,
    marginTop: 0,
    color: "#1c1c1a",
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 8,
    marginTop: 20,
    color: "#1c1c1a",
  },
  list: {
    paddingLeft: 24,
    marginBottom: 12,
  },
  link: {
    color: "#2563eb",
    textDecoration: "underline",
  },
  code: {
    fontFamily: "monospace",
    fontSize: 13,
    backgroundColor: "#f0f0eb",
    padding: "2px 6px",
    borderRadius: 4,
  },
  contactBox: {
    backgroundColor: "#f0f0eb",
    borderRadius: 8,
    padding: "16px 20px",
    marginTop: 8,
  },
  contactName: {
    fontWeight: 700,
    margin: "0 0 4px",
  },
};
