import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import clowdLogo from "@/assets/clowd-logo.png";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const { signIn, signUp, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = fullName.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!isLogin && !trimmedName) {
      setError("Please enter your full name.");
      return;
    }
    if (!isLogin && trimmedName.length > 100) {
      setError("Name must be under 100 characters.");
      return;
    }

    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(trimmedEmail, password);
      if (error) {
        if (error.message?.toLowerCase().includes("invalid login")) {
          setError("Incorrect email or password. Please try again.");
        } else if (error.message?.toLowerCase().includes("email not confirmed")) {
          setError("Please verify your email before signing in.");
        } else {
          setError(error.message || "Sign in failed. Please try again.");
        }
      } else {
        navigate("/dashboard");
      }
    } else {
      const { error } = await signUp(trimmedEmail, password, trimmedName);
      if (error) {
        if (error.message?.toLowerCase().includes("already registered")) {
          setError("An account with this email already exists. Please sign in.");
        } else {
          setError(error.message || "Account creation failed. Please try again.");
        }
      } else {
        setOtpStep(true);
      }
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (otpCode.length < 6) return;
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: otpCode,
      type: "signup",
    });
    if (error) {
      if (error.message?.toLowerCase().includes("expired")) {
        setError("Verification code expired. Please request a new one.");
      } else {
        setError(error.message || "Verification failed. Please check the code and try again.");
      }
    } else {
      navigate("/dashboard");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/auth",
    });
    if (result.error) {
      setError(result.error.message || "Google sign-in failed. Please try again.");
      setLoading(false);
    }
    // Note: on success, the page will redirect to Google — no need to setLoading(false)
  };

  const handleResendOtp = async () => {
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email.trim().toLowerCase(),
    });
    if (error) {
      setError(error.message || "Failed to resend code. Please try again.");
    } else {
      setError("");
      setOtpCode("");
    }
    setLoading(false);
  };

  if (otpStep) {
    return (
      <div className="gradient-hero min-h-screen flex items-center justify-center px-4">
        <Helmet>
          <title>Verify Email — Clowd Marketing</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-10 max-w-md w-full text-center"
        >
          <img src={clowdLogo} alt="Clowd Marketing" className="h-12 w-12 mx-auto mb-4" width={48} height={48} />
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">Check Your Email</h1>
          <p className="text-muted-foreground text-sm mb-6">
            We sent a 6-digit verification code to{" "}
            <strong className="text-foreground">{email}</strong>.
            Enter it below to activate your account.
          </p>
          <div className="flex justify-center mb-6">
            <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-2 mb-4" role="alert">{error}</p>
          )}
          <Button variant="cta" size="lg" className="w-full mb-3" onClick={handleVerifyOtp} disabled={loading || otpCode.length < 6}>
            {loading ? "Verifying..." : "Verify & Access Dashboard"}
            <ArrowRight className="ml-1" />
          </Button>
          <button
            onClick={handleResendOtp}
            disabled={loading}
            className="text-sm text-accent hover:underline disabled:opacity-50"
            type="button"
          >
            Resend verification code
          </button>
          <div className="mt-3">
            <button
              onClick={() => { setOtpStep(false); setIsLogin(true); setError(""); setOtpCode(""); }}
              className="text-sm text-muted-foreground hover:text-foreground"
              type="button"
            >
              Back to Sign In
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="gradient-hero min-h-screen flex items-center justify-center px-4">
      <Helmet>
        <title>{isLogin ? "Sign In" : "Create Account"} — Clowd Marketing</title>
        <meta name="description" content={isLogin ? "Sign in to your Clowd Marketing client portal." : "Create your Clowd Marketing account and start growing your business today."} />
        <meta name="robots" content="noindex" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <Link to="/">
            <img src={clowdLogo} alt="Clowd Marketing" className="h-12 w-12 mx-auto mb-4" width={48} height={48} />
          </Link>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {isLogin ? "Welcome Back" : "Start Growing Today"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isLogin ? "Sign in to your client portal" : "Create your Clowd Marketing account"}
          </p>
        </div>

        {/* Google Sign In */}
        <Button
          variant="hero-secondary"
          size="lg"
          className="w-full mb-4"
          onClick={handleGoogleSignIn}
          disabled={loading}
          type="button"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </Button>

        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or continue with email</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {!isLogin && (
            <div>
              <label htmlFor="fullName" className="text-sm font-semibold text-foreground mb-1.5 block">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                maxLength={100}
                placeholder="Jane Smith"
                autoComplete="name"
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors text-sm"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-foreground mb-1.5 block">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
              placeholder="you@company.com"
              autoComplete="email"
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                minLength={6}
                maxLength={128}
                autoComplete={isLogin ? "current-password" : "new-password"}
                className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {!isLogin && (
              <p className="text-xs text-muted-foreground mt-1">Minimum 6 characters</p>
            )}
          </div>

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-2" role="alert">{error}</p>
          )}

          <Button variant="cta" size="lg" className="w-full" type="submit" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            <ArrowRight className="ml-1" />
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(""); setPassword(""); }}
            className="text-accent font-semibold hover:underline"
            type="button"
          >
            {isLogin ? "Sign Up Free" : "Sign In"}
          </button>
        </div>

        {!isLogin && (
          <p className="text-xs text-muted-foreground text-center mt-4">
            By creating an account, you agree to our terms of service and privacy policy.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default AuthPage;
