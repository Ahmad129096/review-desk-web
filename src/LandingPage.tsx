import { Check, MessageSquareText, Wand2, Users, Shield, ArrowRight, Mail, Sparkles, Zap, BarChart3, Globe, Bot, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User } from "./types";
import { useState, useEffect } from "react";
import "./styles/LandingPage.css";

interface LandingPageProps {
  onAuthed?: (user: User, token: string) => void;
}

export function LandingPage({ onAuthed }: LandingPageProps) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="landingPage">
      <AnimatedBackground mousePosition={mousePosition} />
      <Navigation scrolled={scrolled} onRequestAccess={() => navigate("/register")} />
      <HeroSection onRequestAccess={() => navigate("/register")} />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialSection />
      <TrustSection />
      <CTASection onRequestAccess={() => navigate("/register")} />
      <Footer />
    </div>
  );
}

function AnimatedBackground({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <div className="animatedBackground">
      <div
        className="floatingOrb orb1"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }}
      />
      <div
        className="floatingOrb orb2"
        style={{
          transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`
        }}
      />
      <div
        className="floatingOrb orb3"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
        }}
      />
      <div className="gradientMesh" />
    </div>
  );
}

function Navigation({ scrolled, onRequestAccess }: { scrolled: boolean; onRequestAccess: () => void }) {
  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="navContent">
        <div className="navBrand">
          <div className="brandMark">R</div>
          <span>ReviewDesk AI</span>
        </div>
        <div className="navActions">
          <button className="ghostButton" onClick={() => window.location.href = '#features'}>
            Features
          </button>
          <button className="primaryButton" onClick={onRequestAccess}>
            Get Started <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ onRequestAccess }: { onRequestAccess: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero">
      <div className={`heroContent ${isVisible ? 'visible' : ''}`}>
        <div className="heroBadge">
          <Sparkles size={16} />
          <span>Powered by Advanced AI</span>
        </div>
        <div className="brandMark large">R</div>
        <h1>
          AI-powered Google review
          <span className="gradientText"> management</span>
          <br />for modern businesses
        </h1>
        <p>
          Connect your Google Business Profile, monitor new reviews, generate smart replies, and respond faster with AI-assisted automation.
        </p>
        <div className="heroActions">
          <button className="primaryButton large" onClick={onRequestAccess}>
            <Zap size={18} />
            Start Free Trial <ArrowRight size={18} />
          </button>
          <button className="secondaryButton">
            <Mail size={18} /> Schedule Demo
          </button>
        </div>
        <div className="heroStats">
          <div className="heroStat">
            <strong>10K+</strong>
            <span>Reviews Managed</span>
          </div>
          <div className="heroStat">
            <strong>95%</strong>
            <span>Response Rate</span>
          </div>
          <div className="heroStat">
            <strong>4.8★</strong>
            <span>Avg Rating</span>
          </div>
        </div>
      </div>
      <div className="heroVisual">
        <div className="floatingCard card1">
          <MessageSquareText size={20} />
          <div className="cardContent">
            <strong>New Review</strong>
            <p>"Amazing service! Highly recommend..."</p>
          </div>
        </div>
        <div className="floatingCard card2">
          <Bot size={20} />
          <div className="cardContent">
            <strong>AI Suggestion</strong>
            <p>"Thank you for your feedback! We're..."</p>
          </div>
        </div>
        <div className="floatingCard card3">
          <TrendingUp size={20} />
          <div className="cardContent">
            <strong>Performance</strong>
            <p>Response time improved by 80%</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "10K+", label: "Reviews Managed", icon: BarChart3 },
    { value: "95%", label: "Response Rate", icon: TrendingUp },
    { value: "4.8★", label: "Average Rating", icon: Users },
    { value: "80%", label: "Time Saved", icon: Zap }
  ];

  return (
    <section className="stats">
      <div className="statsContainer">
        {stats.map((stat, index) => (
          <div className="statCard" key={index}>
            <div className="statIcon">
              <stat.icon size={24} />
            </div>
            <div className="statValue">{stat.value}</div>
            <div className="statLabel">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: MessageSquareText,
      title: "Review Monitoring",
      description: "Track incoming customer reviews across connected business locations in real-time.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Bot,
      title: "AI Reply Drafts",
      description: "Generate natural, context-aware review responses with advanced AI technology.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Review, edit, and publish replies in seconds with our streamlined workflow.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Globe,
      title: "Multi-location Ready",
      description: "Manage reviews across multiple business locations from one centralized dashboard.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with Google OAuth integration and data protection.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Track performance metrics and gain valuable insights from customer feedback.",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="features" id="features">
      <div className="sectionHeader">
        <div className="sectionBadge">
          <Sparkles size={16} />
          <span>Features</span>
        </div>
        <h2>Everything you need to manage reviews efficiently</h2>
        <p>Powerful features designed to save you time and protect your reputation</p>
      </div>
      <div className="featuresGrid">
        {features.map((feature, index) => (
          <div className="featureCard" key={index}>
            <div className={`featureIcon ${feature.gradient}`}>
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
      description: "Authorize access to your Google Business Profile through secure OAuth.",
      icon: Globe
    },
    {
      step: 2,
      title: "Fetch reviews automatically",
      description: "Our AI monitors your profile and imports new reviews as they arrive.",
      icon: MessageSquareText
    },
    {
      step: 3,
      title: "Generate AI-powered replies",
      description: "Review AI-generated responses and publish them with one click.",
      icon: Bot
    }
  ];

  return (
    <section className="howItWorks">
      <div className="sectionHeader">
        <div className="sectionBadge">
          <Zap size={16} />
          <span>How it works</span>
        </div>
        <h2>Get started in minutes</h2>
        <p>Simple setup process with powerful AI automation</p>
      </div>
      <div className="stepsGrid">
        {steps.map((step, index) => (
          <div className="stepCard" key={step.step}>
            <div className="stepNumber">
              <step.icon size={24} />
            </div>
            <div className="stepContent">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            {index < steps.length - 1 && <div className="stepConnector" />}
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Business Owner",
      company: "Cafe Milano",
      content: "ReviewDesk AI has transformed how we handle customer feedback. Response time improved by 80%!",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Marketing Manager",
      company: "TechStart Solutions",
      content: "The AI-generated replies are remarkably natural. Our customers love the quick responses.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Operations Director",
      company: "Wellness Center",
      content: "Managing multiple locations is now effortless. The centralized dashboard is a game-changer.",
      rating: 5
    }
  ];

  return (
    <section className="testimonials">
      <div className="sectionHeader">
        <div className="sectionBadge">
          <Users size={16} />
          <span>Testimonials</span>
        </div>
        <h2>Loved by businesses worldwide</h2>
        <p>See what our customers have to say about ReviewDesk AI</p>
      </div>
      <div className="testimonialsGrid">
        {testimonials.map((testimonial, index) => (
          <div className="testimonialCard" key={index}>
            <div className="testimonialRating">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="testimonialContent">"{testimonial.content}"</p>
            <div className="testimonialAuthor">
              <div className="authorAvatar">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="authorInfo">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role} at {testimonial.company}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection({ onRequestAccess }: { onRequestAccess: () => void }) {
  return (
    <section className="cta">
      <div className="ctaContent">
        <div className="ctaBadge">
          <Sparkles size={16} />
          <span>Ready to get started?</span>
        </div>
        <h2>Transform your review management today</h2>
        <p>Join thousands of businesses using AI to respond faster and build better customer relationships.</p>
        <div className="ctaActions">
          <button className="primaryButton large" onClick={onRequestAccess}>
            <Zap size={18} />
            Start Free Trial <ArrowRight size={18} />
          </button>
          <button className="secondaryButton">
            <Mail size={18} /> Schedule Demo
          </button>
        </div>
        <div className="ctaFeatures">
          <div className="ctaFeature">
            <Check size={16} />
            <span>No credit card required</span>
          </div>
          <div className="ctaFeature">
            <Check size={16} />
            <span>14-day free trial</span>
          </div>
          <div className="ctaFeature">
            <Check size={16} />
            <span>Cancel anytime</span>
          </div>
        </div>
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
