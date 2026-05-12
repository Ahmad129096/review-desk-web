import { Sparkles, ArrowRight, MessageSquareText, TrendingUp } from "lucide-react";

interface HeroSectionProps {
  onRequestAccess: () => void;
}

export function HeroSection({ onRequestAccess }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="heroContent">
        <div className="heroBadge">
          <Sparkles size={16} />
          <span>Powered by Advanced AI</span>
        </div>
        <h1>
          Transform Customer Feedback into
          <span className="gradientText"> Business Intelligence</span>
        </h1>
        <p>
          ReviewDesk AI automatically analyzes customer reviews from all platforms, 
          providing actionable insights to improve your products and services.
        </p>
        <div className="heroActions">
          <button className="primaryButton large" onClick={onRequestAccess}>
            Start Free Trial
            <ArrowRight size={20} />
          </button>
          <button className="secondaryButton">
            Watch Demo
          </button>
        </div>
        <div className="heroStats">
          <div className="heroStat">
            <strong>10K+</strong>
            <span>Reviews Analyzed</span>
          </div>
          <div className="heroStat">
            <strong>95%</strong>
            <span>Accuracy Rate</span>
          </div>
          <div className="heroStat">
            <strong>24/7</strong>
            <span>Real-time Insights</span>
          </div>
        </div>
      </div>
      <div className="heroVisual">
        <div className="floatingCard card1">
          <MessageSquareText size={20} />
          <div className="cardContent">
            <strong>Sentiment Analysis</strong>
            <p>Customer satisfaction: 92%</p>
          </div>
        </div>
        <div className="floatingCard card2">
          <TrendingUp size={20} />
          <div className="cardContent">
            <strong>Trend Detection</strong>
            <p>Feature requests up 45%</p>
          </div>
        </div>
        <div className="floatingCard card3">
          <MessageSquareText size={20} />
          <div className="cardContent">
            <strong>Priority Issues</strong>
            <p>3 critical items found</p>
          </div>
        </div>
      </div>
    </section>
  );
}
