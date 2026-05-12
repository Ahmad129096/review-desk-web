import { BarChart3, Users, Globe, Bot } from "lucide-react";

export function StatsSection() {
  return (
    <section className="stats">
      <div className="statsContainer">
        <div className="statCard">
          <div className="statIcon">
            <BarChart3 size={24} />
          </div>
          <div className="statValue">2.5M+</div>
          <div className="statLabel">Reviews Processed</div>
        </div>
        <div className="statCard">
          <div className="statIcon">
            <Users size={24} />
          </div>
          <div className="statValue">10K+</div>
          <div className="statLabel">Active Businesses</div>
        </div>
        <div className="statCard">
          <div className="statIcon">
            <Globe size={24} />
          </div>
          <div className="statValue">50+</div>
          <div className="statLabel">Platforms Integrated</div>
        </div>
        <div className="statCard">
          <div className="statIcon">
            <Bot size={24} />
          </div>
          <div className="statValue">99.9%</div>
          <div className="statLabel">AI Accuracy</div>
        </div>
      </div>
    </section>
  );
}
