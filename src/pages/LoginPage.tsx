import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setToken } from "../api-query";
import { useNavigate } from "react-router-dom";
import { loginSchema, LoginFormData } from "../schemas/auth";
import { useAuth } from "../api-query";

interface LoginPageProps {
  onAuthed: (user: any, token: string) => void;
}

export function LoginPage({ onAuthed }: LoginPageProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { loginMutation } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    clearErrors();

    console.log({ loginsubmit: true })

    loginMutation.mutate({
      email: data.email,
      password: data.password
    }, {
      onSuccess: (response: any) => {
        console.log({ response }, "in login page")
        setLoginSuccess(true);
        onAuthed(response.user, response.token);
      },
      onError: () => {
        // Error handling is managed by the mutation
      }
    });
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
    navigate("/forgot-password");
  };

  if (loginSuccess) {
    return (
      <div className="authPage">
        <div className="authContainer">
          <div className="authRight">
            <div className="authSuccess">
              <div className="successIcon">
                <CheckCircle size={48} />
              </div>
              <h2>Login Successful!</h2>
              <p>Redirecting to your dashboard...</p>
              <div className="successSpinner">
                <div className="spinner" />
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
            <h1>Welcome Back</h1>
            <p>Sign in to your ReviewDesk account and continue managing your reviews</p>
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
            <p>Don't have an account?</p>
            <button
              type="button"
              className="linkButton"
              onClick={() => navigate("/register")}
            >
              Create account
            </button>
          </div>
        </div>

        <div className="authRight">
          <div className="authForm">
            <h2>Sign in to your account</h2>
            <p>Welcome back! Please enter your details</p>

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
                    disabled={isSubmitting}
                    autoComplete="email"
                    {...register("email")}
                  />
                </div>
                {errors.email && <span className="fieldError">{errors.email.message}</span>}
              </div>

              <div className="formGroup">
                <label htmlFor="password">Password</label>
                <div className="inputWrapper">
                  <Lock size={18} className="inputIcon" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={errors.password ? "error" : ""}
                    disabled={isSubmitting}
                    autoComplete="current-password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="passwordToggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="fieldError">{errors.password.message}</span>}
              </div>

              <div className="formGroup checkboxGroup">
                <label className="checkboxLabel">
                  <input
                    type="checkbox"
                    disabled={isSubmitting}
                    {...register("rememberMe")}
                  />
                  <span>Remember me for 30 days</span>
                </label>
                <button
                  type="button"
                  className="forgotPasswordLink"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              {loginMutation.isError && (
                <div className="formError">
                  <AlertCircle size={16} />
                  Invalid email or password. Please try again.
                </div>
              )}

              <button
                type="submit"
                className="authSubmitButton"
                disabled={isSubmitting || loginMutation.isPending}
              >
                {isSubmitting || loginMutation.isPending ? (
                  <>
                    <div className="spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="authDivider">
              <span>or</span>
            </div>

            <div className="socialAuth">
              <button type="button" className="socialButton google" disabled={isSubmitting}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
            </div>

            <div className="authSecurity">
              <div className="securityInfo">
                <Lock size={14} />
                <span>Your connection is secure and encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
