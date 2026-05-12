import {
  AlertTriangle,
  CreditCard,
  Home,
  LogOut,
  MessageSquareText,
  RefreshCw,
  TrendingUp,
  Users,
  BarChart3,
  Zap,
  ArrowUpRight,
  Activity,
  Clock
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Metric } from "../components/SharedComponents";
import { Business, Review, Task } from "../types";
import { api } from "../api-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface DashboardPageProps {
  user: any;
  onLogout: () => void;
}

export function DashboardPage({ user, onLogout }: DashboardPageProps) {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiReviews = useQuery({
    queryKey: ['reviews'],
    queryFn: () => api.reviews()
  });
  const apiTasks = useQuery({
    queryKey: ['tasks'],
    queryFn: () => api.tasks()
  });

  const activeBusiness = businesses[0];
  const negativeReviews = reviews.filter((review) => review.sentiment === "NEGATIVE" || review.needsFollowUp).length;
  const openTasks = tasks.filter((task) => task.status !== "DONE").length;

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark">R</div>
          <div>
            <strong>ReviewDesk AI</strong>
            <span>{activeBusiness?.name ?? "MVP workspace"}</span>
          </div>
        </div>
        <nav>
          <button className="active" onClick={() => navigate("/dashboard")}>
            <Home size={18} /> Dashboard
          </button>
          <button onClick={() => navigate("/reviews")}>
            <MessageSquareText size={18} /> Reviews
          </button>
          <button onClick={() => navigate("/tasks")}>
            <AlertTriangle size={18} /> Tasks
          </button>
          <button onClick={() => navigate("/billing")}>
            <CreditCard size={18} /> Billing
          </button>
        </nav>
        <button className="ghostButton" onClick={handleLogoutClick}>
          <LogOut size={18} /> Sign out
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
            <p>Here's what's happening with your reviews today</p>
          </div>
          <button className="iconButton" onClick={() => {
            apiReviews.refetch();
            apiTasks.refetch();
          }} aria-label="Refresh dashboard">
            <RefreshCw size={18} />
          </button>
        </header>

        {error && <div className="notice error">{error}</div>}
        {loading && <div className="notice">Loading latest data...</div>}

        {/* Modern Metrics Grid */}
        <section className="metrics" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div className="metric" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '24px',
            borderRadius: '16px',
            border: 'none',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>Total Reviews</div>
                <div style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1' }}>{reviews.length}</div>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageSquareText size={24} />
              </div>
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              <TrendingUp size={16} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} />
              All time reviews
            </div>
          </div>

          <div className="metric" style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '24px',
            borderRadius: '16px',
            border: 'none',
            boxShadow: '0 10px 30px rgba(245, 87, 108, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>Need Attention</div>
                <div style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1' }}>{negativeReviews}</div>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AlertTriangle size={24} />
              </div>
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              <Activity size={16} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} />
              {negativeReviews > 0 ? 'Requires immediate action' : 'All caught up!'}
            </div>
          </div>

          <div className="metric" style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            padding: '24px',
            borderRadius: '16px',
            border: 'none',
            boxShadow: '0 10px 30px rgba(79, 172, 254, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>Open Tasks</div>
                <div style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1' }}>{openTasks}</div>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Clock size={24} />
              </div>
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              <Zap size={16} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} />
              {openTasks > 0 ? 'Tasks pending' : 'No pending tasks'}
            </div>
          </div>
        </section>

        {/* Quick Actions & Insights */}
        <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
          <div className="panel" style={{
            padding: '32px',
            borderRadius: '16px',
            border: '1px solid #e8eaed',
            background: 'white',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: '700' }}>Quick Actions</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <button
                className="primaryButton"
                onClick={() => navigate("/reviews")}
                style={{
                  padding: '16px 24px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}
              >
                <MessageSquareText size={20} />
                Manage Reviews
                <ArrowUpRight size={16} />
              </button>

              <button
                className="primaryButton"
                onClick={() => navigate("/tasks")}
                style={{
                  padding: '16px 24px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(245, 87, 108, 0.3)'
                }}
              >
                <AlertTriangle size={20} />
                View Tasks
                <ArrowUpRight size={16} />
              </button>

              <button
                className="primaryButton"
                onClick={() => navigate("/billing")}
                style={{
                  padding: '16px 24px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)'
                }}
              >
                <CreditCard size={20} />
                Upgrade Plan
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          <div className="panel" style={{
            padding: '32px',
            borderRadius: '16px',
            border: '1px solid #e8eaed',
            background: 'white',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '700' }}>AI Insights</h2>
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e8eaed 100%)',
              borderRadius: '12px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <BarChart3 size={24} style={{ color: '#667eea' }} />
                <span style={{ fontWeight: '600', fontSize: '16px' }}>Performance Score</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#667eea', marginBottom: '8px' }}>
                {reviews.length > 0 ? Math.round((reviews.filter(r => r.sentiment === 'POSITIVE').length / reviews.length) * 100) : 0}%
              </div>
              <div style={{ fontSize: '14px', color: '#667085' }}>
                Positive review rate
              </div>
            </div>

            <div style={{ fontSize: '14px', color: '#667085', lineHeight: '1.6' }}>
              <Zap size={16} style={{ marginRight: '4px', verticalAlign: 'text-bottom', color: '#f5576c' }} />
              <strong>AI Tip:</strong> Respond to reviews within 24 hours to improve customer satisfaction by 40%.
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="panel" style={{
          padding: '32px',
          borderRadius: '16px',
          border: '1px solid #e8eaed',
          background: 'white',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: '700' }}>Recent Activity</h2>
          <div style={{
            padding: '24px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e8eaed 100%)',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <Users size={48} style={{ color: '#667eea', marginBottom: '16px' }} />
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>All Caught Up!</h3>
            <p style={{ margin: 0, color: '#667085', fontSize: '16px' }}>
              You have {reviews.length} total reviews{negativeReviews > 0 && ` with ${negativeReviews} needing attention`}.
              {openTasks > 0 && ` ${openTasks} tasks require your action.`}
            </p>
            {negativeReviews === 0 && openTasks === 0 && (
              <div style={{ marginTop: '16px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  background: '#ecfdf3',
                  color: '#067647',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  <Activity size={16} />
                  Everything is running smoothly
                </span>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
