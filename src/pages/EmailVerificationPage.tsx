import { useEffect } from "react";
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { isAxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { api, useAuth } from "../api-query";

interface EmailVerificationPageProps {
  fallbackEmail?: string;
}

function pickEmailFromVerifyBody(body: unknown): string | undefined {
  if (!body || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  if (typeof b.email === "string") return b.email;
  const inner = b.data;
  if (inner && typeof inner === "object") {
    const d = inner as Record<string, unknown>;
    if (typeof d.email === "string") return d.email;
    const user = d.user as Record<string, unknown> | undefined;
    if (user && typeof user.email === "string") return user.email;
  }
  return undefined;
}

function apiErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) return error.message;
  if (isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    if (typeof data?.message === "string") return data.message;
  }
  return fallback;
}

export function EmailVerificationPage({
  fallbackEmail,
}: EmailVerificationPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const searchParams = new URLSearchParams(location.search);
  const tokenFromUrl = searchParams.get("token");

  const email =
    (location.state as { email?: string } | null)?.email ||
    searchParams.get("email") ||
    fallbackEmail ||
    undefined;

  const verifyQuery = useQuery({
    queryKey: ["verifyEmail", tokenFromUrl],
    queryFn: async () => {
      const res = await api.verifyEmailToken({ token: tokenFromUrl! });
      return res.data;
    },
    enabled: !!tokenFromUrl,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!verifyQuery.isSuccess) return;
    const verifiedEmail = pickEmailFromVerifyBody(verifyQuery.data) ?? email;
    logout();
    setTimeout(() => {
      navigate("/login", {
        replace: true,
        state: { verified: true, email: verifiedEmail },
      });
    }, 1500);
  }, [verifyQuery.isSuccess]);

  const handleRetry = () => {
    verifyQuery.refetch();
  };

  if (tokenFromUrl) {
    if (verifyQuery.isSuccess) {
      return (
        <div className="authPage">
          <div className="authContainer">
            <div
              className="authRight"
              style={{ maxWidth: "480px", margin: "0 auto" }}
            >
              <div className="authForm">
                <div className="authSuccess">
                  <div className="successIcon">
                    <CheckCircle size={48} />
                  </div>
                  <h2>Email verified</h2>
                  <p>Your email has been confirmed. Taking you to sign in…</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (verifyQuery.isError) {
      return (
        <div className="authPage">
          <div className="authContainer">
            <div
              className="authRight"
              style={{ maxWidth: "480px", margin: "0 auto" }}
            >
              <div className="authForm">
                <div className="authSuccess">
                  <div className="successIcon" style={{ color: "#dc2626" }}>
                    <AlertCircle size={48} />
                  </div>
                  <h2>Verification failed</h2>
                  <p style={{ marginBottom: "1rem" }}>
                    {apiErrorMessage(
                      verifyQuery.error,
                      "This link may be invalid or expired. Request a new one from registration or contact support.",
                    )}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    <button
                      type="button"
                      className="authSubmitButton"
                      onClick={handleRetry}
                      disabled={verifyQuery.isFetching}
                    >
                      {verifyQuery.isFetching ? "Retrying…" : "Try again"}
                    </button>
                    <button
                      type="button"
                      className="linkButton"
                      onClick={() => navigate("/login", { replace: true })}
                    >
                      Go to login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="authPage">
        <div className="authContainer">
          <div
            className="authRight"
            style={{ maxWidth: "480px", margin: "0 auto" }}
          >
            <div className="authForm">
              <div className="authSuccess">
                <div
                  className="successSpinner"
                  style={{ marginBottom: "1rem" }}
                >
                  <div className="spinner" />
                </div>
                <h2>Verifying your email</h2>
                <p>Please wait while we confirm your account.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const goToLogin = () => {
    navigate("/login", { replace: true, state: email ? { email } : undefined });
  };

  return (
    <div className="authPage">
      <div className="authContainer">
        <div className="authLeft">
          <div className="authBrand">
            <div className="brandMark large">R</div>
            <h1>Verify your email</h1>
            <p>
              We have sent a verification link to your email. Open that link to
              confirm your address. You can close this tab afterward.
            </p>
          </div>

          <div className="authStats">
            <div className="statItem">
              <div className="statNumber">2,847</div>
              <div className="statLabel">Reviews Managed</div>
            </div>
            <div className="statItem">
              <div className="statNumber">94%</div>
              <div className="statLabel">Response Rate</div>
            </div>
            <div className="statItem">
              <div className="statNumber">4.8</div>
              <div className="statLabel">Avg Rating</div>
            </div>
          </div>

          <div className="authSwitch">
            <button
              type="button"
              className="backButton"
              onClick={() => navigate("/register")}
            >
              <ArrowLeft size={18} />
              Back to register
            </button>
          </div>
        </div>

        <div className="authRight">
          <div className="authForm">
            <div className="authSuccess" style={{ textAlign: "left" }}>
              <div className="successIcon" style={{ marginBottom: "1rem" }}>
                <Mail size={48} />
              </div>
              <h2 style={{ marginBottom: "0.75rem" }}>Check your inbox</h2>
              {email ? (
                <p style={{ marginBottom: "1rem" }}>
                  We sent a verification link to <strong>{email}</strong>. Click
                  the link in that email to activate your account, then return
                  here to sign in.
                </p>
              ) : (
                <p style={{ marginBottom: "1rem" }}>
                  We sent a verification link to the address you used when you
                  signed up. Click the link in that email to activate your
                  account, then sign in below.
                </p>
              )}
              <p
                className="verificationHint"
                style={{ marginBottom: "1.5rem" }}
              >
                If you do not see the message within a few minutes, check your
                spam or junk folder.
              </p>
              <button
                type="button"
                className="authSubmitButton"
                onClick={goToLogin}
              >
                Go to login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
