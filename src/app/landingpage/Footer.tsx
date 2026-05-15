export function Footer() {
  const footerLinks = {
    product: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Integrations", href: "#" },
      { name: "API", href: "#" },
    ],
    company: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "/contact" },
    ],
    resources: [
      { name: "Documentation", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Community", href: "#" },
      { name: "Status", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "#" },
      { name: "Security", href: "#" },
    ],
  };

  return (
    <footer className="landingFooter">
      <div className="footerContent">
        <div className="footerBrand">
          <div className="logo">📊</div>
          <div>
            <strong>ReviewDesk AI</strong>
            <span>Transform customer feedback into business intelligence</span>
          </div>
        </div>
        <div className="footerLinks">
          <div>
            <strong>Product</strong>
            {footerLinks.product.map((link, index) => (
              <a key={index} href={link.href}>
                {link.name}
              </a>
            ))}
          </div>
          <div>
            <strong>Company</strong>
            {footerLinks.company.map((link, index) => (
              <a key={index} href={link.href}>
                {link.name}
              </a>
            ))}
          </div>
          <div>
            <strong>Resources</strong>
            {footerLinks.resources.map((link, index) => (
              <a key={index} href={link.href}>
                {link.name}
              </a>
            ))}
          </div>
          <div>
            <strong>Legal</strong>
            {footerLinks.legal.map((link, index) => (
              <a key={index} href={link.href}>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footerBottom">
        <p>&copy; 2024 ReviewDesk AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
