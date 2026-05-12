import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPageContent } from "./pages/DashboardPageContent";
import { ReviewsPageContent } from "./pages/ReviewsPageContent";
import { TasksPage } from "./pages/TasksPage";
import { BillingPage } from "./pages/BillingPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { AppLayout } from "./components/AppLayout";
import { ApiProvider, useAuth, api } from "./api-query";
import { User } from "./types";
import { LandingPage } from "./app/landingpage";

function AppContent() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    // Check for existing token and validate user
    api.me()
      .then((response: any) => {
        console.log({ response }, "in app")
        setUser(response.data.user);
        setLoading(false);
      })
      .catch(() => {
        logout();
        setLoading(false);
      });
  }, []);

  const handleAuth = (user: User, token: string) => {
    setUser(user);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner" style={{ width: '40px', height: '40px' }}></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes - accessible only when NOT authenticated */}
      <Route path="/" element={
        <PublicRoute>
          <LandingPage onAuthed={handleAuth} />
        </PublicRoute>
      } />

      <Route path="/register" element={
        <PublicRoute>
          <RegisterPage onAuthed={handleAuth} />
        </PublicRoute>
      } />

      <Route path="/login" element={
        <PublicRoute>
          <LoginPage onAuthed={handleAuth} />
        </PublicRoute>
      } />

      {/* Protected routes - accessible only when authenticated */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          {user && (
            <AppLayout user={user} onLogout={handleLogout}>
              <DashboardPageContent user={user} />
            </AppLayout>
          )}
        </ProtectedRoute>
      } />

      <Route path="/reviews" element={
        <ProtectedRoute>
          {user && (
            <AppLayout user={user} onLogout={handleLogout}>
              <ReviewsPageContent user={user} />
            </AppLayout>
          )}
        </ProtectedRoute>
      } />

      <Route path="/tasks" element={
        <ProtectedRoute>
          {user && (
            <AppLayout user={user} onLogout={handleLogout}>
              <TasksPage user={user} onLogout={handleLogout} />
            </AppLayout>
          )}
        </ProtectedRoute>
      } />

      <Route path="/billing" element={
        <ProtectedRoute>
          {user && (
            <AppLayout user={user} onLogout={handleLogout}>
              <BillingPage user={user} onLogout={handleLogout} />
            </AppLayout>
          )}
        </ProtectedRoute>
      } />

      {/* Redirect any unknown routes to landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function App() {
  return (
    <ApiProvider>
      <AppContent />
    </ApiProvider>
  );
}
