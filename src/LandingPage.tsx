import { Check, MessageSquareText, Wand2, Users, Shield, ArrowRight, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User } from "./types";

interface LandingPageProps {
  onAuthed?: (user: User, token: string) => void;
}

export function LandingPage({ onAuthed }: LandingPageProps) {
  const navigate = useNavigate();

  return (
    <div className="landingPage">
      <HeroSection onRequestAccess={() => navigate("/register")} />
      <FeaturesSection />
      <HowItWorksSection />
      <TrustSection />
      <Footer />
    </div>
  );
}

function HeroSection({ onRequestAccess }: { onRequestAccess: () => void }) {
  return (
    <section className="hero">
      <div className="heroContent">
        <div className="brandMark large">R</div>
        <h1>AI-powered Google review management for modern businesses</h1>
        <p>
          Connect your Google Business Profile, monitor new reviews, generate smart replies, and respond faster with AI-assisted automation.
        </p>
        <div className="heroActions">
          <button className="primaryButton large" onClick={onRequestAccess}>
            Request Access <ArrowRight size={18} />
          </button>
          <button className="secondaryButton">
            <Mail size={18} /> Contact
          </button>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: MessageSquareText,
      title: "Review Monitoring",
      description: "Track incoming customer reviews across connected business locations."
    },
    {
      icon: Wand2,
      title: "AI Reply Drafts",
      description: "Generate natural, context-aware review responses."
    },
    {
      icon: Check,
      title: "Fast Approval Workflow",
      description: "Review, edit, and publish replies in seconds."
    },
    {
      icon: Users,
      title: "Multi-location Ready",
      description: "Manage reviews across multiple business locations from one place."
    }
  ];

  return (
    <section className="features">
      <div className="sectionHeader">
        <h2>Everything you need to manage reviews efficiently</h2>
        <p>Powerful features designed to save you time and protect your reputation</p>
      </div>
      <div className="featuresGrid">
        {features.map((feature, index) => (
          <div className="featureCard" key={index}>
            <div className="featureIcon">
              <feature.icon size={24} />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      title: "Connect Google Business Profile",
      description: "Authorize access to your Google Business Profile through secure OAuth."
    },
    {
      step: 2,
      title: "Fetch new reviews automatically",
      description: "Our system monitors your profile and imports new reviews as they arrive."
    },
    {
      step: 3,
      title: "Generate and publish AI-assisted replies",
      description: "Review AI-generated responses and publish them with one click."
    }
  ];

  return (
    <section className="howItWorks">
      <div className="sectionHeader">
        <h2>How it works</h2>
        <p>Get started in minutes with our simple setup process</p>
      </div>
      <div className="stepsGrid">
        {steps.map((step) => (
          <div className="stepCard" key={step.step}>
            <div className="stepNumber">{step.step}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="trust">
      <div className="trustContent">
        <div className="trustIcon">
          <Shield size={32} />
        </div>
        <h2>Secure and compliant</h2>
        <div className="trustPoints">
          <div className="trustPoint">
            <Check size={18} />
            <span>Users explicitly authorize access via Google OAuth</span>
          </div>
          <div className="trustPoint">
            <Check size={18} />
            <span>The app only accesses authorized Google Business Profile data</span>
          </div>
          <div className="trustPoint">
            <Check size={18} />
            <span>No public scraping is performed</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="landingFooter">
      <div className="footerContent">
        <div className="footerBrand">
          <div className="brandMark">R</div>
          <div>
            <strong>review-desk</strong>
            <span>AI-powered review management</span>
          </div>
        </div>
        <div className="footerLinks">
          <div>
            <strong>Product</strong>
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
          </div>
          <div>
            <strong>Support</strong>
            <a href="mailto:support@review-desk.com">support@review-desk.com</a>
          </div>
        </div>
      </div>
      <div className="footerBottom">
        <p>&copy; 2026 review-desk. All rights reserved.</p>
      </div>
    </footer>
  );
}
