import { AlertTriangle, CreditCard, Home, LogOut, MessageSquareText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  user: any;
  businessName?: string;
  activeRoute: string;
  onLogout: () => void;
}

export function Sidebar({ user, businessName, activeRoute, onLogout }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brandMark">R</div>
        <div>
          <strong>ReviewDesk AI</strong>
          <span>{businessName ?? "MVP workspace"}</span>
        </div>
      </div>
      <nav>
        <button 
          className={activeRoute === "dashboard" ? "active" : ""} 
          onClick={() => navigate("/dashboard")}
        >
          <Home size={18} /> Dashboard
        </button>
        <button 
          className={activeRoute === "reviews" ? "active" : ""} 
          onClick={() => navigate("/reviews")}
        >
          <MessageSquareText size={18} /> Reviews
        </button>
        <button 
          className={activeRoute === "tasks" ? "active" : ""} 
          onClick={() => navigate("/tasks")}
        >
          <AlertTriangle size={18} /> Tasks
        </button>
        <button 
          className={activeRoute === "billing" ? "active" : ""} 
          onClick={() => navigate("/billing")}
        >
          <CreditCard size={18} /> Billing
        </button>
      </nav>
      <button className="ghostButton" onClick={handleLogoutClick}>
        <LogOut size={18} /> Sign out
      </button>
    </aside>
  );
}
