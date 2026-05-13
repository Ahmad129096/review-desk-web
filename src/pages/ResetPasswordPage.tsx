import {
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordSchema, ResetPasswordFormData } from "../schemas/auth";
import { api } from "../api-query";
import { useMutation, useQuery } from "@tanstack/react-query";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  // Verify the reset token is valid
  const {
    data: tokenData,
    isLoading: tokenLoading,
    isError: tokenError,
  } = useQuery({
    queryKey: ["verify-reset-token", token],
    queryFn: async () => {
      if (!token) throw new Error("No token provided");
      const response = await api.verifyResetToken(token);
      return response.data;
    },
    enabled: !!token,
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: ResetPasswordFormData) => {
      if (!token) throw new Error("No reset token found");
      const response = await api.resetPassword({
        token,
        password: data.password,
      });
      return response.data;
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    clearErrors();

    resetPasswordMutation.mutate(data, {
      onSuccess: () => {
        setResetSuccess(true);
      },
    });
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  if (tokenLoading) {
    return (
      <div className="authPage">
        <div className="authContainer">
          <div className="authRight">
            <div className="authSuccess">
              <div className="successSpinner">
                <div className="spinner" />
              </div>
              <p>Verifying reset link...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tokenError || !token || !tokenData) {
    return (
      <div className="authPage">
        <div className="authContainer">
          <div className="authRight">
            <div className="authSuccess">
              <div className="successIcon" style={{ color: "#dc2626" }}>
                <AlertCircle size={48} />
              </div>
              <h2>Invalid or Expired Link</h2>
              <p>This password reset link is invalid or has expired.</p>
              <p className="successSubtext">
                Please request a new password reset link to continue.
              </p>
              <div className="successActions">
                <button
                  type="button"
                  className="authSubmitButton"
                  onClick={() => navigate("/forgot-password")}
                >
                  Request New Link
                </button>
                <button
                  type="button"
                  className="linkButton"
                  onClick={handleBackToLogin}
                >
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (resetSuccess) {
    return (
      <div className="authPage">
        <div className="authContainer">
          <div className="authRight">
            <div className="authSuccess">
              <div className="successIcon">
                <CheckCircle size={48} />
              </div>
              <h2>Password Reset Successful!</h2>
              <p>Your password has been successfully reset.</p>
              <p className="successSubtext">
                You can now log in with your new password.
              </p>
              <div className="successActions">
                <button
                  type="button"
                  className="authSubmitButton"
                  onClick={handleBackToLogin}
                >
                  <ArrowRight size={18} />
                  Go to Login
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
            <h1>Set New Password</h1>
            <p>
              Create a new password for your ReviewDesk account. Make sure it's
              strong and unique.
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

        <div className="authRight">
          <div className="authForm">
            <h2>Reset your password</h2>
            <p>Enter a new password for your account</p>

            <form onSubmit={handleSubmit(onSubmit)} className="authFormFields">
              <div className="formGroup">
                <label htmlFor="password">New Password</label>
                <div className="inputWrapper">
                  <Lock size={18} className="inputIcon" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={errors.password ? "error" : ""}
                    disabled={isSubmitting || resetPasswordMutation.isPending}
                    autoComplete="new-password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="passwordToggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting || resetPasswordMutation.isPending}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="fieldError">{errors.password.message}</span>
                )}
                <div className="passwordHint">
                  <small>Must contain uppercase, lowercase, and number</small>
                </div>
              </div>

              <div className="formGroup">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="inputWrapper">
                  <Lock size={18} className="inputIcon" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className={errors.confirmPassword ? "error" : ""}
                    disabled={isSubmitting || resetPasswordMutation.isPending}
                    autoComplete="new-password"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    className="passwordToggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isSubmitting || resetPasswordMutation.isPending}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="fieldError">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {resetPasswordMutation.isError && (
                <div className="formError">
                  <AlertCircle size={16} />
                  {resetPasswordMutation.error instanceof Error
                    ? resetPasswordMutation.error.message
                    : "Failed to reset password. Please try again."}
                </div>
              )}

              <button
                type="submit"
                className="authSubmitButton"
                disabled={isSubmitting || resetPasswordMutation.isPending}
              >
                {isSubmitting || resetPasswordMutation.isPending ? (
                  <>
                    <div className="spinner" />
                    Resetting password...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Reset Password
                  </>
                )}
              </button>
            </form>

            <div className="authFooter">
              <p>Need help?</p>
              <button
                type="button"
                className="linkButton"
                onClick={() => navigate("/forgot-password")}
              >
                Request another link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
