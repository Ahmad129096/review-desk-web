import { ArrowRight, Check, Zap, Shield } from "lucide-react";

interface CTASectionProps {
  onRequestAccess: () => void;
}

export function CTASection({ onRequestAccess }: CTASectionProps) {
  const features = [
    "14-day free trial",
    "No credit card required",
    "Cancel anytime",
    "Full feature access"
  ];

  return (
    <section className="cta">
      <div className="ctaContent">
        <div className="ctaBadge">
          <Zap size={16} />
          <span>Start Today</span>
        </div>
        <h2>Ready to Transform Your Customer Feedback?</h2>
        <p>
          Join thousands of businesses using AI to understand their customers better 
          and make data-driven decisions.
        </p>
        <div className="ctaActions">
          <button className="primaryButton large" onClick={onRequestAccess}>
            Start Free Trial
            <ArrowRight size={20} />
          </button>
          <button className="secondaryButton">
            Schedule Demo
          </button>
        </div>
        <div className="ctaFeatures">
          {features.map((feature, index) => (
            <div key={index} className="ctaFeature">
              <Check size={16} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
