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
            <a href="/contact">Contact</a>
          </div>
          <div>
            <strong>Legal</strong>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="footerBottom">
        <p>&copy; 2025 ReviewDesk AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
