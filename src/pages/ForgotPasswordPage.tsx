import { Mail, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { forgotPasswordSchema, ForgotPasswordFormData } from "../schemas/auth";
import { api } from "../api-query";
import { useMutation } from "@tanstack/react-query";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: ForgotPasswordFormData) => {
      const response = await api.forgotPassword({ email: data.email });
      return response.data;
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    clearErrors();

    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        setSentEmail(data.email);
        setEmailSent(true);
      },
    });
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  if (emailSent) {
    return (
      <div className="authPage">
        <div className="authContainer">
          <div className="authRight">
            <div className="authSuccess">
              <div className="successIcon">
                <CheckCircle size={48} />
              </div>
              <h2>Check your email</h2>
              <p>
                We've sent a password reset link to <strong>{sentEmail}</strong>
              </p>
              <p className="successSubtext">
                Follow the link in your email to reset your password. The link
                will expire in 1 hour.
              </p>
              <div className="successActions">
                <button
                  type="button"
                  className="authSubmitButton"
                  onClick={handleBackToLogin}
                >
                  Back to Login
                </button>
                <button
                  type="button"
                  className="linkButton"
                  onClick={() => {
                    setEmailSent(false);
                    setSentEmail("");
                  }}
                >
                  Try another email
                </button>
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
        <div className="authLeft">
          <div className="authBrand">
            <div className="brandMark large">R</div>
            <h1>Recover Your Account</h1>
            <p>
              Enter your email address and we'll send you a link to reset your
              password
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
              onClick={handleBackToLogin}
            >
              <ArrowLeft size={18} />
              Back to login
            </button>
          </div>
        </div>

        <div className="authRight">
          <div className="authForm">
            <h2>Forgot your password?</h2>
            <p>
              No problem. Just enter your email and we'll help you recover
              access
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="authFormFields">
              <div className="formGroup">
                <label htmlFor="email">Email Address</label>
                <div className="inputWrapper">
                  <Mail size={18} className="inputIcon" />
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className={errors.email ? "error" : ""}
                    disabled={isSubmitting || forgotPasswordMutation.isPending}
                    autoComplete="email"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <span className="fieldError">{errors.email.message}</span>
                )}
              </div>

              {forgotPasswordMutation.isError && (
                <div className="formError">
                  <AlertCircle size={16} />
                  {forgotPasswordMutation.error instanceof Error
                    ? forgotPasswordMutation.error.message
                    : "Failed to send reset email. Please try again."}
                </div>
              )}

              <button
                type="submit"
                className="authSubmitButton"
                disabled={isSubmitting || forgotPasswordMutation.isPending}
              >
                {isSubmitting || forgotPasswordMutation.isPending ? (
                  <>
                    <div className="spinner" />
                    Sending link...
                  </>
                ) : (
                  <>
                    <Mail size={18} />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>

            <div className="authFooter">
              <p>Remember your password?</p>
              <button
                type="button"
                className="linkButton"
                onClick={handleBackToLogin}
              >
                Sign in here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
