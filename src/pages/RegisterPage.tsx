import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { registerSchema, RegisterFormData } from "../schemas/auth";
import { setToken, useAuth } from "../api-query";

interface RegisterPageProps {
  onAuthed: (user: any, token: string) => void;
}

function getPasswordStrength(password: string): number {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  return Math.min(strength, 4);
}

export function RegisterPage({ onAuthed }: RegisterPageProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { registerMutation } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    clearErrors,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const password = watch("password");
  const passwordStrength = password ? getPasswordStrength(password) : 0;

  const onSubmit = async (data: RegisterFormData) => {
    clearErrors();

    registerMutation.mutate(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          console.log("Registration successful:", response);
          navigate("/verify-email", {
            replace: true,
            state: { email: data.email },
          });
        },
        onError: () => {
          // Error handling is managed by the mutation
        },
      },
    );
  };

  return (
    <div className="authPage">
      <div className="authContainer">
        <div className="authLeft">
          <div className="authBrand">
            <div className="brandMark large">R</div>
            <h1>Join ReviewDesk</h1>
            <p>
              Start managing your Google Business Profile reviews with
              AI-powered automation
            </p>
          </div>

          <div className="authFeatures">
            <div className="authFeature">
              <CheckCircle size={20} />
              <span>AI-powered review responses</span>
            </div>
            <div className="authFeature">
              <CheckCircle size={20} />
              <span>Multi-location management</span>
            </div>
            <div className="authFeature">
              <CheckCircle size={20} />
              <span>Real-time review monitoring</span>
            </div>
            <div className="authFeature">
              <CheckCircle size={20} />
              <span>Sentiment analysis</span>
            </div>
          </div>

          <div className="authSwitch">
            <p>Already have an account?</p>
            <button
              type="button"
              className="linkButton"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </div>
        </div>

        <div className="authRight">
          <div className="authForm">
            <h2>Create your account</h2>
            <p>Get started with your free trial</p>

            <form onSubmit={handleSubmit(onSubmit)} className="authFormFields">
              <div className="formGroup">
                <label htmlFor="name">Full Name</label>
                <div className="inputWrapper">
                  <User size={18} className="inputIcon" />
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className={errors.name ? "error" : ""}
                    disabled={isSubmitting}
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <span className="fieldError">{errors.name.message}</span>
                )}
              </div>

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
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <span className="fieldError">{errors.email.message}</span>
                )}
              </div>

              <div className="formGroup">
                <label htmlFor="password">Password</label>
                <div className="inputWrapper">
                  <Lock size={18} className="inputIcon" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={errors.password ? "error" : ""}
                    disabled={isSubmitting}
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
                {errors.password && (
                  <span className="fieldError">{errors.password.message}</span>
                )}

                {password && (
                  <div className="passwordStrength">
                    <div className="strengthBar">
                      <div
                        className={`strengthFill strength-${passwordStrength}`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      />
                    </div>
                    <span className="strengthText">
                      {passwordStrength === 0 && "Very weak"}
                      {passwordStrength === 1 && "Weak"}
                      {passwordStrength === 2 && "Fair"}
                      {passwordStrength === 3 && "Good"}
                      {passwordStrength === 4 && "Strong"}
                    </span>
                  </div>
                )}
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
                    disabled={isSubmitting}
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    className="passwordToggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isSubmitting}
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

              <div className="formGroup checkboxGroup">
                <label className="checkboxLabel">
                  <input
                    type="checkbox"
                    disabled={isSubmitting}
                    {...register("agreeToTerms")}
                  />
                  <span>
                    I agree to the{" "}
                    <a href="/terms" className="link">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="link">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <span className="fieldError">
                    {errors.agreeToTerms.message}
                  </span>
                )}
              </div>

              {registerMutation.isError && (
                <div className="formError">
                  Registration failed. Please try again.
                </div>
              )}

              <button
                type="submit"
                className="authSubmitButton"
                disabled={isSubmitting || registerMutation.isPending}
              >
                {isSubmitting || registerMutation.isPending ? (
                  <>
                    <div className="spinner" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="authDivider">
              <span>or</span>
            </div>

            <div className="socialAuth">
              <button
                type="button"
                className="socialButton google"
                disabled={isSubmitting}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
