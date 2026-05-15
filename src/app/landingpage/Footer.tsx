import { Link } from "react-router-dom";

export function Footer() {
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
            <strong>Company</strong>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <strong>Legal</strong>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="footerBottom">
        <p>&copy; 2025 ReviewDesk AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
