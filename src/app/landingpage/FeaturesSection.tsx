import { Wand2, Shield, MessageSquareText, Zap, BarChart3, Globe } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Wand2 size={32} />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze sentiment, emotions, and key themes from customer reviews.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield size={32} />,
      title: "Real-time Monitoring",
      description: "Get instant notifications when important trends or issues are detected across all review platforms.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MessageSquareText size={32} />,
      title: "Multi-Platform Integration",
      description: "Connect all your review sources - Google, Yelp, App Store, Amazon, and more in one dashboard.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap size={32} />,
      title: "Smart Categorization",
      description: "Automatically organize reviews by categories like product features, customer service, pricing, and more.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Actionable Insights",
      description: "Get detailed reports and recommendations to improve customer satisfaction and business performance.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Globe size={32} />,
      title: "Multi-Language Support",
      description: "Analyze reviews in over 50 languages with native-level accuracy and cultural understanding.",
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  return (
    <section className="features">
      <div className="sectionHeader">
        <div className="sectionBadge">
          <Wand2 size={16} />
          <span>Powerful Features</span>
        </div>
        <h2>Everything You Need to Understand Your Customers</h2>
        <p>
          Our AI-powered platform provides comprehensive tools to analyze, 
          understand, and act on customer feedback from all sources.
        </p>
      </div>
      <div className="featuresGrid">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="featureCard"
            style={{ '--gradient-from': `var(--tw-gradient-stops, ${feature.gradient.split(' ')[0]})`, '--gradient-to': `var(--tw-gradient-stops, ${feature.gradient.split(' ')[2]})` } as React.CSSProperties}
          >
            <div className="featureIcon">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
