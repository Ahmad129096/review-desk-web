import { AlertTriangle, CreditCard, Home, LogOut, MessageSquareText, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plan } from "../components/SharedComponents";
import { useCheckout } from "../api-query";

interface BillingPageProps {
  user: any;
  onLogout: () => void;
}

export function BillingPage({ user, onLogout }: BillingPageProps) {
  const navigate = useNavigate();
  const checkoutMutation = useCheckout();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  const checkout = (plan: "STARTER" | "PRO") => {
    checkoutMutation.mutate(plan, {
      onSuccess: (response) => {
        window.location.href = response.data.data.url;
      }
    });
  };

  return (
    <>
      <header className="topbar" style={{
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        color: 'white',
        padding: '24px 32px',
        borderRadius: '16px',
        marginBottom: '32px',
        border: 'none',
        boxShadow: '0 10px 30px rgba(79, 172, 254, 0.2)'
      }}>
        <div>
          <h1 style={{ color: 'white', marginBottom: '4px' }}>Billing & Plans 💳</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>
            {user.name} · {user.email}
          </p>
        </div>
      </header>

      <section className="pricing" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        <Plan name="Free" price="$0" limit="20 replies/month" />
        <Plan name="Starter" price="$9" limit="200 replies/month" action={() => checkout("STARTER")} />
        <Plan name="Pro" price="$29" limit="1,000 replies/month" action={() => checkout("PRO")} />
      </section>
    </>
  );
}
