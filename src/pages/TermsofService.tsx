// pages/terms.tsx  OR  app/terms/page.tsx

import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <a href="/" style={styles.backLink}>
            ← Review Desk
          </a>
          <h1 style={styles.title}>Terms of Service</h1>
          <p style={styles.meta}>Last updated: May 15, 2025 · Ahmad Hassan</p>
        </div>

        <div style={styles.content}>
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using Review Desk ("the Service"), operated by
              Ahmad Hassan ("we", "us", or "our"), you agree to be bound by
              these Terms of Service. If you do not agree to these terms, do not
              use the Service.
            </p>
            <p>
              Review Desk is a SaaS platform that allows business owners to
              connect their Google Business Profile, monitor customer reviews,
              and generate AI-assisted replies.
            </p>
          </Section>

          <Section title="2. Eligibility">
            <p>To use Review Desk you must:</p>
            <ul style={styles.list}>
              <li>Be at least 18 years old</li>
              <li>
                Be a legitimate business owner or authorized representative
              </li>
              <li>Have a valid Google Business Profile</li>
              <li>Provide accurate registration information</li>
            </ul>
          </Section>

          <Section title="3. Your Account">
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials. You are responsible for all activity that
              occurs under your account. Notify us immediately at{" "}
              <a href="mailto:hassanqaisar129096@gmail.com" style={styles.link}>
                hassanqaisar129096@gmail.com
              </a>{" "}
              if you suspect unauthorized access.
            </p>
          </Section>

          <Section title="4. Google Business Profile Integration">
            <p>
              Review Desk connects to your Google Business Profile via Google
              OAuth 2.0. By connecting your account you authorize us to:
            </p>
            <ul style={styles.list}>
              <li>Read your business locations and profile information</li>
              <li>Read customer reviews on your Google Business Profile</li>
              <li>
                Post review replies on your behalf when you approve them or
                enable auto-reply
              </li>
            </ul>
            <p>
              You remain fully responsible for all content posted to your Google
              Business Profile through Review Desk, including AI-generated
              replies. You should review AI-generated content before publishing
              where possible. We are not responsible for replies posted via
              auto-reply that you have enabled.
            </p>
            <p>
              Your use of Google services through Review Desk is also subject to{" "}
              <a
                href="https://policies.google.com/terms"
                style={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google's Terms of Service
              </a>
              .
            </p>
          </Section>

          <Section title="5. Acceptable Use">
            <p>You agree not to use Review Desk to:</p>
            <ul style={styles.list}>
              <li>Post false, misleading, or defamatory review replies</li>
              <li>Harass, threaten, or abuse reviewers</li>
              <li>Violate Google's review policies or terms of service</li>
              <li>Attempt to reverse-engineer or scrape the platform</li>
              <li>Use the service for any unlawful purpose</li>
              <li>
                Share your account credentials with unauthorized third parties
              </li>
            </ul>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these terms.
            </p>
          </Section>

          <Section title="6. AI-Generated Content">
            <p>
              Review Desk uses AI to generate reply suggestions. You acknowledge
              that:
            </p>
            <ul style={styles.list}>
              <li>
                AI-generated replies are suggestions only and may not always be
                appropriate
              </li>
              <li>
                You are solely responsible for reviewing and approving
                AI-generated content before it is posted
              </li>
              <li>
                When auto-reply is enabled, you accept responsibility for all
                automatically posted replies
              </li>
              <li>
                We make no guarantees about the quality, accuracy, or
                appropriateness of AI-generated content
              </li>
            </ul>
          </Section>

          <Section title="7. Service Availability">
            <p>
              We strive to maintain high availability but do not guarantee
              uninterrupted access. The Service may be unavailable due to
              maintenance, Google API outages, or circumstances beyond our
              control. We are not liable for any losses caused by service
              interruptions.
            </p>
          </Section>

          <Section title="8. Intellectual Property">
            <p>
              The Review Desk platform, including its design, code, and
              branding, is the intellectual property of Ahmad Hassan. You are
              granted a limited, non-exclusive, non-transferable license to use
              the Service for your business purposes.
            </p>
            <p>
              You retain ownership of your business data and review content. By
              using the Service you grant us a limited license to process that
              data solely to provide the Service.
            </p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, Review Desk and Ahmad
              Hassan shall not be liable for any indirect, incidental, special,
              or consequential damages arising from your use of the Service,
              including but not limited to:
            </p>
            <ul style={styles.list}>
              <li>Loss of business or revenue</li>
              <li>Reputational damage from posted review replies</li>
              <li>Loss of data due to Google API changes or outages</li>
              <li>Any actions taken by Google on your Business Profile</li>
            </ul>
            <p>
              Our total liability to you for any claim arising from use of the
              Service shall not exceed the amount you paid us in the 3 months
              preceding the claim.
            </p>
          </Section>

          <Section title="10. Disclaimers">
            <p>
              The Service is provided "as is" without warranties of any kind,
              express or implied. We do not warrant that the Service will be
              error-free or that AI-generated replies will be suitable for your
              specific business needs.
            </p>
            <p>
              Review Desk is an independent platform and is not affiliated with,
              endorsed by, or sponsored by Google LLC.
            </p>
          </Section>

          <Section title="11. Termination">
            <p>
              You may terminate your account at any time by contacting us. We
              may suspend or terminate your account if you violate these Terms.
              Upon termination, your data will be deleted in accordance with our{" "}
              <Link to="/privacy" style={styles.link}>
                Privacy Policy
              </Link>
              .
            </p>
          </Section>

          <Section title="12. Changes to Terms">
            <p>
              We may update these Terms from time to time. We will notify you of
              material changes by posting the updated Terms on this page.
              Continued use of the Service after changes constitutes acceptance
              of the new Terms.
            </p>
          </Section>

          <Section title="13. Governing Law">
            <p>
              These Terms are governed by the laws of Pakistan. Any disputes
              arising from these Terms or your use of the Service shall be
              subject to the jurisdiction of the courts of Pakistan.
            </p>
          </Section>

          <Section title="14. Contact">
            <p>For questions about these Terms, contact:</p>
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
  list: {
    paddingLeft: 24,
    marginBottom: 12,
  },
  link: {
    color: "#2563eb",
    textDecoration: "underline",
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
