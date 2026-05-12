import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  user: any;
  businessName?: string;
  onLogout: () => void;
  children: ReactNode;
}

export function AppLayout({ user, businessName, onLogout, children }: AppLayoutProps) {
  const location = useLocation();
  
  // Determine active route from pathname
  const getActiveRoute = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "dashboard";
    if (path === "/reviews") return "reviews";
    if (path === "/tasks") return "tasks";
    if (path === "/billing") return "billing";
    return "dashboard"; // default
  };

  const activeRoute = getActiveRoute();

  return (
    <div className="shell">
      <Sidebar 
        user={user} 
        businessName={businessName}
        activeRoute={activeRoute}
        onLogout={onLogout} 
      />
      <main className="main">
        {children}
      </main>
    </div>
  );
}
