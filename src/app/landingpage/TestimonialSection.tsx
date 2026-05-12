import { Star } from "lucide-react";

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager at TechCorp",
      content: "ReviewDesk AI transformed how we handle customer feedback. We've reduced response time by 80% and improved our product based on real insights.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Michael Rodriguez",
      role: "CEO of RetailPlus",
      content: "The AI insights are incredibly accurate. We've identified issues we never knew existed and our customer satisfaction has increased by 45%.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emily Johnson",
      role: "Marketing Director at SaaS Co",
      content: "Best investment we made this year. The automated analysis saves us countless hours and the reports are presentation-ready.",
      rating: 5,
      avatar: "EJ"
    }
  ];

  return (
    <section className="testimonials">
      <div className="sectionHeader">
        <div className="sectionBadge">
          <Star size={16} />
          <span>Customer Success</span>
        </div>
        <h2>Trusted by Leading Companies</h2>
        <p>
          See how businesses like yours are using ReviewDesk AI to transform customer feedback into growth.
        </p>
      </div>
      <div className="testimonialsGrid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonialCard">
            <div className="testimonialRating">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <div className="testimonialContent">
              "{testimonial.content}"
            </div>
            <div className="testimonialAuthor">
              <div className="authorAvatar">{testimonial.avatar}</div>
              <div className="authorInfo">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
