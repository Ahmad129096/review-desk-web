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
import { Business, Review, Task } from "../types";
import { Metric } from "../components/SharedComponents";
import { useBusinesses, useReviews, useTasks } from "../api-query";

interface DashboardPageContentProps {
  user: any;
}

export function DashboardPageContent({ user }: DashboardPageContentProps) {
  const { data: businesses = [], isLoading: businessesLoading, error: businessesError, refetch: refetchBusinesses } = useBusinesses();
  const { data: reviews = [], isLoading: reviewsLoading, error: reviewsError, refetch: refetchReviews } = useReviews();
  const { data: tasks = [], isLoading: tasksLoading, error: tasksError, refetch: refetchTasks } = useTasks();

  const isLoading = businessesLoading || reviewsLoading || tasksLoading;
  const error = businessesError || reviewsError || tasksError;

  const loadDashboardData = () => {
    refetchBusinesses();
    refetchReviews();
    refetchTasks();
  };

  const activeBusiness = businesses[0];
  const negativeReviews = reviews.filter((review: Review) => review.sentiment === "NEGATIVE" || review.needsFollowUp).length;
  const openTasks = tasks.filter((task: Task) => task.status !== "DONE").length;

  return (
    <>
      <header className="topbar" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '24px 32px',
        borderRadius: '16px',
        marginBottom: '32px',
        border: 'none',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2)'
      }}>
        <div>
          <h1 style={{ color: 'white', marginBottom: '4px' }}>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>
            Here's what's happening with your reviews today
          </p>
        </div>
        <button
          className="iconButton"
          onClick={loadDashboardData}
          aria-label="Refresh dashboard"
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white'
          }}
        >
          <RefreshCw size={18} />
        </button>
      </header>

      {error && <div className="notice error" style={{
        marginBottom: '24px',
        padding: '16px 20px',
        borderRadius: '12px',
        background: '#fef2f2',
        border: '1px solid #fecaca'
      }}>{error instanceof Error ? error.message : "Could not load dashboard"}</div>}
      {isLoading && <div className="notice" style={{
        marginBottom: '24px',
        padding: '16px 20px',
        borderRadius: '12px',
        background: '#f8fafc',
        border: '1px solid #e8eaed'
      }}>Loading latest data...</div>}

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
              onClick={() => window.location.href = "/reviews"}
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
              onClick={() => window.location.href = "/tasks"}
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
              onClick={() => window.location.href = "/billing"}
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
              {reviews.length > 0 ? Math.round((reviews.filter((r: Review) => r.sentiment === 'POSITIVE').length / reviews.length) * 100) : 0}%
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
    </>
  );
}
