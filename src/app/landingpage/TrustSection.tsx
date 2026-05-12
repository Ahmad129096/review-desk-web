import { Shield, Check, Lock, Award } from "lucide-react";

export function TrustSection() {
  const trustPoints = [
    {
      icon: <Shield size={20} />,
      text: "Bank-level 256-bit encryption for all your data"
    },
    {
      icon: <Check size={20} />,
      text: "GDPR and CCPA compliant data handling"
    },
    {
      icon: <Lock size={20} />,
      text: "Secure API connections with all major platforms"
    },
    {
      icon: <Award size={20} />,
      text: "SOC 2 Type II certified infrastructure"
    }
  ];

  return (
    <section className="trust">
      <div className="trustContent">
        <div className="trustIcon">
          <Shield size={40} />
        </div>
        <h2>Your Data is Secure with Us</h2>
        <div className="trustPoints">
          {trustPoints.map((point, index) => (
            <div key={index} className="trustPoint">
              {point.icon}
              <span>{point.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
