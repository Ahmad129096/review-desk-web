import { Users, Wand2, BarChart3 } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      icon: <Users size={24} />,
      title: "Connect Your Platforms",
      description: "Easily integrate all your review sources with our secure API connections. No technical expertise required."
    },
    {
      number: 2,
      icon: <Wand2 size={24} />,
      title: "AI Analysis Begins",
      description: "Our advanced AI immediately starts analyzing your reviews, identifying patterns, sentiments, and key insights."
    },
    {
      number: 3,
      icon: <BarChart3 size={24} />,
      title: "Get Actionable Insights",
      description: "Receive real-time dashboards, reports, and alerts that help you make data-driven decisions."
    }
  ];

  return (
    <section className="howItWorks">
      <div className="sectionHeader">
        <div className="sectionBadge">
          <Wand2 size={16} />
          <span>Simple Process</span>
        </div>
        <h2>How ReviewDesk AI Works</h2>
        <p>
          Get started in minutes and start receiving valuable insights from your customer feedback.
        </p>
      </div>
      <div className="stepsGrid">
        {steps.map((step, index) => (
          <div key={index} className="stepCard">
            <div className="stepNumber">{step.number}</div>
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
