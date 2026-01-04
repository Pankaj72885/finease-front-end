import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/Contexts/AuthContext";
import {
  Camera,
  CheckCircle,
  Chrome,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";

export function Component() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Password validation rules
  const passwordRules = [
    { test: (pw) => pw.length >= 8, label: "At least 8 characters" },
    { test: (pw) => /[A-Z]/.test(pw), label: "One uppercase letter" },
    { test: (pw) => /[a-z]/.test(pw), label: "One lowercase letter" },
    {
      test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
      label: "One special character",
    },
  ];

  const validatePassword = () => {
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    for (const rule of passwordRules) {
      if (!rule.test(password)) {
        toast.error(`Password must contain: ${rule.label}`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!validatePassword()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.photoURL
      );
      toast.success("Registration successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Failed to register");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsSubmitting(true);

    try {
      await loginWithGoogle();
      toast.success("Registration successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Failed to register with Google");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-mesh relative overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" />

      <div className="container-wide relative z-10 py-12">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-sm">
                <span className="text-white text-2xl font-bold font-outfit">
                  F
                </span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold font-outfit mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground">
              Start your journey to financial freedom
            </p>
          </div>

          {/* Form Card */}
          <div className="card-base p-8 shadow-xl">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Full Name *
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="pl-11 h-12 rounded-xl"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email Address *
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-11 h-12 rounded-xl"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label
                  htmlFor="photoURL"
                  className="block text-sm font-medium mb-2"
                >
                  Profile Photo URL{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </label>
                <div className="relative">
                  <Camera
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="photoURL"
                    name="photoURL"
                    type="url"
                    className="pl-11 h-12 rounded-xl"
                    placeholder="https://example.com/photo.jpg"
                    value={formData.photoURL}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  Password *
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="pl-11 pr-11 h-12 rounded-xl"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Password Rules */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {passwordRules.map((rule, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-1.5 text-xs ${
                        rule.test(formData.password)
                          ? "text-green-600 dark:text-green-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      <CheckCircle size={12} />
                      <span>{rule.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-2"
                >
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="pl-11 pr-11 h-12 rounded-xl"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-primary hover:opacity-90 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 rounded-xl"
              onClick={handleGoogleRegister}
              disabled={isSubmitting}
            >
              <Chrome size={18} />
              {isSubmitting ? "Creating account..." : "Continue with Google"}
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
            <Sparkles size={16} className="text-primary" />
            <span>Free forever. No credit card required.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Component.displayName = "RegisterPage";
