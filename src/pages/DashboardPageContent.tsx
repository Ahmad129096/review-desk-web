import {
  AlertTriangle,
  CreditCard,
  Home,
  MessageSquareText,
  RefreshCw,
  TrendingUp,
  Users,
  BarChart3,
  Zap,
  ArrowUpRight,
  Activity,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Review, Task } from "../types";
import { useBusinesses, useReviews, useTasks } from "../api-query";

interface DashboardPageContentProps {
  user: any;
}

export function DashboardPageContent({ user }: DashboardPageContentProps) {
  const navigate = useNavigate();
  const {
    isLoading: businessesLoading,
    error: businessesError,
    refetch: refetchBusinesses,
  } = useBusinesses();
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    error: reviewsError,
    refetch: refetchReviews,
  } = useReviews();
  const {
    data: tasks = [],
    isLoading: tasksLoading,
    error: tasksError,
    refetch: refetchTasks,
  } = useTasks();

  const isLoading = businessesLoading || reviewsLoading || tasksLoading;
  const error = businessesError || reviewsError || tasksError;

  const loadDashboardData = () => {
    refetchBusinesses();
    refetchReviews();
    refetchTasks();
  };

  const negativeReviews = reviews.filter(
    (review: Review) => review.sentiment === "NEGATIVE" || review.needsFollowUp,
  ).length;
  const openTasks = tasks.filter((task: Task) => task.status !== "DONE").length;

  const firstName = user.name?.split(" ")?.[0] ?? "there";

  return (
    <div className="dashboardPage">
      <header className="dashboardHero topbar">
        <div className="dashboardHeroText">
          <h1>Welcome back, {firstName}! 👋</h1>
          <p>Here&apos;s what&apos;s happening with your reviews today</p>
        </div>
        <button
          type="button"
          className="iconButton dashboardHeroRefresh"
          onClick={loadDashboardData}
          aria-label="Refresh dashboard"
        >
          <RefreshCw size={18} />
        </button>
      </header>

      {error && (
        <div className="notice error dashboardNotice">
          {error instanceof Error ? error.message : "Could not load dashboard"}
        </div>
      )}
      {isLoading && (
        <div className="notice dashboardNotice">Loading latest data...</div>
      )}

      <section className="dashboardMetrics" aria-label="Key metrics">
        <div className="dashboardMetricCard dashboardMetricCard--indigo">
          <div className="dashboardMetricRow">
            <div>
              <div className="dashboardMetricLabel">Total Reviews</div>
              <div className="dashboardMetricValue">{reviews.length}</div>
            </div>
            <div className="dashboardMetricIconWrap">
              <MessageSquareText size={24} aria-hidden />
            </div>
          </div>
          <div className="dashboardMetricFoot">
            <TrendingUp size={16} aria-hidden />
            All time reviews
          </div>
        </div>

        <div className="dashboardMetricCard dashboardMetricCard--rose">
          <div className="dashboardMetricRow">
            <div>
              <div className="dashboardMetricLabel">Need Attention</div>
              <div className="dashboardMetricValue">{negativeReviews}</div>
            </div>
            <div className="dashboardMetricIconWrap">
              <AlertTriangle size={24} aria-hidden />
            </div>
          </div>
          <div className="dashboardMetricFoot">
            <Activity size={16} aria-hidden />
            {negativeReviews > 0
              ? "Requires immediate action"
              : "All caught up!"}
          </div>
        </div>

        <div className="dashboardMetricCard dashboardMetricCard--sky">
          <div className="dashboardMetricRow">
            <div>
              <div className="dashboardMetricLabel">Open Tasks</div>
              <div className="dashboardMetricValue">{openTasks}</div>
            </div>
            <div className="dashboardMetricIconWrap">
              <Clock size={24} aria-hidden />
            </div>
          </div>
          <div className="dashboardMetricFoot">
            <Zap size={16} aria-hidden />
            {openTasks > 0 ? "Tasks pending" : "No pending tasks"}
          </div>
        </div>
      </section>

      <section className="dashboardSplit" aria-label="Actions and insights">
        <div className="dashboardPanel">
          <h2 className="dashboardPanelTitle">Quick Actions</h2>
          <div className="dashboardQuickGrid">
            <button
              type="button"
              className="dashboardActionButton dashboardActionButton--indigo"
              onClick={() => navigate("/reviews")}
            >
              <MessageSquareText size={20} aria-hidden />
              <span className="dashboardActionLabel">Manage Reviews</span>
              <ArrowUpRight size={16} aria-hidden />
            </button>

            <button
              type="button"
              className="dashboardActionButton dashboardActionButton--rose"
              onClick={() => navigate("/tasks")}
            >
              <AlertTriangle size={20} aria-hidden />
              <span className="dashboardActionLabel">View Tasks</span>
              <ArrowUpRight size={16} aria-hidden />
            </button>

            <button
              type="button"
              className="dashboardActionButton dashboardActionButton--sky"
              onClick={() => navigate("/billing")}
            >
              <CreditCard size={20} aria-hidden />
              <span className="dashboardActionLabel">Upgrade Plan</span>
              <ArrowUpRight size={16} aria-hidden />
            </button>
          </div>
        </div>

        <div className="dashboardPanel">
          <h2 className="dashboardPanelTitle">AI Insights</h2>
          <div className="dashboardInsightCard">
            <div className="dashboardInsightHead">
              <BarChart3 size={24} className="dashboardInsightIcon" aria-hidden />
              <span>Performance Score</span>
            </div>
            <div className="dashboardInsightScore">
              {reviews.length > 0
                ? Math.round(
                    (reviews.filter((r: Review) => r.sentiment === "POSITIVE")
                      .length /
                      reviews.length) *
                      100,
                  )
                : 0}
              %
            </div>
            <div className="dashboardInsightSub">Positive review rate</div>
          </div>

          <p className="dashboardInsightTip">
            <Zap size={16} aria-hidden />
            <strong>AI Tip:</strong> Respond to reviews within 24 hours to
            improve customer satisfaction by 40%.
          </p>
        </div>
      </section>

      <section className="dashboardPanel dashboardActivity" aria-label="Recent activity">
        <h2 className="dashboardPanelTitle">Recent Activity</h2>
        <div className="dashboardActivityInner">
          <Users size={48} className="dashboardActivityIcon" aria-hidden />
          <h3 className="dashboardActivityTitle">All Caught Up!</h3>
          <p className="dashboardActivityText">
            You have {reviews.length} total reviews
            {negativeReviews > 0 &&
              ` with ${negativeReviews} needing attention`}
            .
            {openTasks > 0 && ` ${openTasks} tasks require your action.`}
          </p>
          {negativeReviews === 0 && openTasks === 0 && (
            <div className="dashboardActivityBadgeWrap">
              <span className="dashboardActivityBadge">
                <Activity size={16} aria-hidden />
                Everything is running smoothly
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
