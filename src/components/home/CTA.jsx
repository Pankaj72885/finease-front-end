import { Button } from "@/components/ui/button";
import { useAuth } from "@/Contexts/AuthContext";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router";

const CTA = () => {
  const { currentUser } = useAuth();

  const benefits = [
    "Free forever plan available",
    "No credit card required",
    "Setup in under 2 minutes",
    "Cancel anytime",
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-mesh" />

      <div className="container-wide relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles size={16} />
            <span>Start Your Financial Journey Today</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold font-outfit mb-6">
            Ready to Take Control of{" "}
            <span className="text-gradient">Your Finances?</span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users who have transformed their financial lives
            with FinEase. Start tracking, saving, and achieving your goals
            today.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-10">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <CheckCircle size={18} className="text-green-500" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          {currentUser ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/add-transaction">
                <Button
                  size="lg"
                  className="rounded-xl bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:shadow-glow px-8 h-14 text-base min-w-[200px]"
                >
                  Add Transaction
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/reports">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-2 px-8 h-14 text-base min-w-[200px] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button
                  size="lg"
                  className="rounded-xl bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:shadow-glow px-8 h-14 text-base min-w-[200px]"
                >
                  Get Started Free
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-2 px-8 h-14 text-base min-w-[200px] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          )}

          {/* Trust Text */}
          <p className="text-sm text-muted-foreground mt-8">
            Trusted by{" "}
            <span className="font-semibold text-foreground">50,000+</span> users
            worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
