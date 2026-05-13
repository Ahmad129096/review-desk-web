import { useEffect, useRef } from "react";
import {
  Mail,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  LogIn,
  RefreshCw,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api, useAuth } from "../api-query";
import { getHttpErrorMessage } from "../utils/httpErrorMessage";

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

  const goToLoginAfterVerify = (verifiedEmail?: string) => {
    logout();
    navigate("/login", {
      replace: true,
      state: { verified: true, email: verifiedEmail },
    });
  };

  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!verifyQuery.isSuccess) return;
    const verifiedEmail = pickEmailFromVerifyBody(verifyQuery.data) ?? email;
    logout();
    redirectTimerRef.current = setTimeout(() => {
      navigate("/login", {
        replace: true,
        state: { verified: true, email: verifiedEmail },
      });
    }, 1600);
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
        redirectTimerRef.current = null;
      }
    };
  }, [verifyQuery.isSuccess, verifyQuery.data, email, logout, navigate]);

  const handleRetry = () => {
    verifyQuery.refetch();
  };

  const verifyFallbackMessage =
    "This link may be invalid or expired. You can register again or sign in if you already verified your email.";

  if (tokenFromUrl) {
    if (verifyQuery.isSuccess) {
      const verifiedEmail = pickEmailFromVerifyBody(verifyQuery.data) ?? email;
      return (
        <div className="authPage verifyEmailStandalone">
          <div className="verifyEmailCard">
            <div className="authSuccess authSuccess--wide">
              <div className="successIcon">
                <CheckCircle size={48} />
              </div>
              <h2 className="verifyEmailCardTitle">You are all set</h2>
              <p className="verifyEmailCardText">
                Your email has been verified
                {verifiedEmail ? (
                  <>
                    {" "}
                    for <strong>{verifiedEmail}</strong>
                  </>
                ) : null}
                . Use your password to sign in and continue to ReviewDesk.
              </p>
              <div className="verifyEmailActions">
                <button
                  type="button"
                  className="authSubmitButton"
                  onClick={() => goToLoginAfterVerify(verifiedEmail)}
                >
                  <LogIn size={18} />
                  Go to login
                </button>
                <p className="verifyEmailCardText" style={{ marginBottom: 0 }}>
                  We will redirect you automatically in a moment.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (verifyQuery.isError) {
      const errText = getHttpErrorMessage(verifyQuery.error, verifyFallbackMessage);
      return (
        <div className="authPage verifyEmailStandalone">
          <div className="verifyEmailCard">
            <div className="authSuccess authSuccess--wide">
              <div
                className="successIcon"
                style={{
                  background: "#fef2f2",
                  color: "#dc2626",
                }}
              >
                <AlertCircle size={48} />
              </div>
              <h2 className="verifyEmailCardTitle">We could not verify this link</h2>
              <p className="verifyEmailCardText" style={{ marginBottom: 12 }}>
                Something went wrong when confirming your email.
              </p>
              <div className="verifyEmailErrorBox" role="alert">
                {errText}
              </div>
              <div className="verifyEmailActions">
                <button
                  type="button"
                  className="authSubmitButton"
                  onClick={handleRetry}
                  disabled={verifyQuery.isFetching}
                >
                  {verifyQuery.isFetching ? (
                    <>
                      <div className="spinner" />
                      Retrying…
                    </>
                  ) : (
                    <>
                      <RefreshCw size={18} />
                      Try again
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="authOutlineButton"
                  onClick={() =>
                    navigate("/login", {
                      replace: true,
                      state: email ? { email } : undefined,
                    })
                  }
                >
                  <LogIn size={18} />
                  Go to login
                </button>
                <button
                  type="button"
                  className="authOutlineButton"
                  onClick={() => navigate("/register", { replace: true })}
                >
                  Create a new account
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="authPage verifyEmailStandalone">
        <div className="verifyEmailCard">
          <div className="authSuccess authSuccess--wide">
            <div className="successSpinner" style={{ marginBottom: "1rem" }}>
              <div className="spinner" />
            </div>
            <h2 className="verifyEmailCardTitle">Verifying your email</h2>
            <p className="verifyEmailCardText">
              Hang tight—this only takes a second.
            </p>
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
              confirm your address, then sign in here.
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
            <div
              className="authSuccess authSuccess--wide"
              style={{ textAlign: "left" }}
            >
              <div className="successIcon" style={{ marginBottom: "1rem" }}>
                <Mail size={48} />
              </div>
              <h2 style={{ marginBottom: "0.75rem" }}>Check your inbox</h2>
              {email ? (
                <p style={{ marginBottom: "1rem" }}>
                  We sent a verification link to <strong>{email}</strong>. Use
                  the button in that email to confirm your account, then sign in
                  below.
                </p>
              ) : (
                <p style={{ marginBottom: "1rem" }}>
                  We sent a verification link to the address you used when you
                  signed up. Use the button in that email to confirm your
                  account, then sign in.
                </p>
              )}
              <p
                className="verificationHint"
                style={{ marginBottom: "1.25rem" }}
              >
                If you do not see the message within a few minutes, check your
                spam or junk folder.
              </p>
              <div className="verifyEmailActions">
                <button
                  type="button"
                  className="authSubmitButton"
                  onClick={goToLogin}
                >
                  <LogIn size={18} />
                  Go to login
                </button>
                <button
                  type="button"
                  className="authOutlineButton"
                  onClick={() => navigate("/register")}
                >
                  <ArrowLeft size={18} />
                  Back to register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
