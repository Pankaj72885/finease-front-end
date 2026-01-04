import { useAuth } from "@/Contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronDown,
  LineChart,
  PiggyBank,
  Shield,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
  const { currentUser } = useAuth();

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container-wide relative z-10 pt-20 lg:pt-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Sparkles size={16} />
              <span>Trusted by 50,000+ users worldwide</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit leading-tight mb-6 animate-slide-up">
              Take Control of Your{" "}
              <span className="text-gradient">Financial Future</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-slide-up stagger-1">
              Track expenses, manage budgets, and achieve your financial goals
              with our powerful yet simple personal finance management platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-slide-up stagger-2">
              {currentUser ? (
                <>
                  <Link to="/add-transaction">
                    <Button
                      size="lg"
                      className="rounded-xl bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:shadow-glow px-8 h-14 text-base"
                    >
                      Add Transaction
                      <ArrowRight size={20} />
                    </Button>
                  </Link>
                  <Link to="/reports">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-xl border-2 px-8 h-14 text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      View Reports
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register">
                    <Button
                      size="lg"
                      className="rounded-xl bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:shadow-glow px-8 h-14 text-base"
                    >
                      Start Free Today
                      <ArrowRight size={20} />
                    </Button>
                  </Link>
                  <Link to="/features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-xl border-2 px-8 h-14 text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      Explore Features
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10 pt-10 border-t border-border/50 animate-fade-in stagger-3">
              <div className="flex items-center gap-2">
                <Shield className="text-primary" size={20} />
                <span className="text-sm text-muted-foreground">
                  Bank-grade security
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PiggyBank className="text-primary" size={20} />
                <span className="text-sm text-muted-foreground">
                  Free forever plan
                </span>
              </div>
              <div className="flex items-center gap-2">
                <LineChart className="text-primary" size={20} />
                <span className="text-sm text-muted-foreground">
                  Real-time insights
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Illustration */}
          <div className="relative hidden lg:block animate-fade-in stagger-2">
            {/* Floating Cards */}
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="glass-card rounded-3xl p-6 shadow-2xl animate-float">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Current Balance
                    </p>
                    <p className="text-3xl font-bold text-gradient">
                      $24,567.89
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <PiggyBank className="text-white" size={24} />
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="h-32 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map(
                    (height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all duration-500 hover:opacity-80"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>

                <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </div>

              {/* Floating Small Cards */}
              <div
                className="absolute -top-4 -left-8 glass-card rounded-2xl p-4 shadow-xl animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <ArrowRight
                      className="text-green-500 rotate-[-45deg]"
                      size={20}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Income</p>
                    <p className="text-lg font-bold text-green-500">+$5,240</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -right-8 glass-card rounded-2xl p-4 shadow-xl animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <ArrowRight
                      className="text-red-500 rotate-[135deg]"
                      size={20}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Expenses</p>
                    <p className="text-lg font-bold text-red-500">-$2,140</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-1/2 -right-16 glass-card rounded-2xl p-4 shadow-xl animate-float"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <LineChart className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Savings Rate
                    </p>
                    <p className="text-lg font-bold text-primary">45%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToFeatures}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
        aria-label="Scroll to features"
      >
        <span className="text-sm font-medium">Discover More</span>
        <ChevronDown size={24} />
      </button>
    </section>
  );
};

export default Hero;
