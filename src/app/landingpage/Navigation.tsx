import { Mail } from "lucide-react";

interface NavigationProps {
  scrolled: boolean;
  onRequestAccess: () => void;
}

export function Navigation({ scrolled, onRequestAccess }: NavigationProps) {
  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="navContent">
        <div className="navBrand">
          <div className="logo">📊</div>
          <span>ReviewDesk AI</span>
        </div>
        <div className="navActions">
          <button className="secondaryButton" onClick={onRequestAccess}>
            Get Started Free
          </button>
        </div>
      </div>
    </nav>
  );
}
