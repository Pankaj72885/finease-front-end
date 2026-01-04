import { Button } from "@/components/ui/button";
import { Check, Crown, Sparkles, X, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free",
      icon: Zap,
      description: "Perfect for getting started with personal finance tracking",
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      features: [
        { text: "Up to 50 transactions/month", included: true },
        { text: "Basic expense categories", included: true },
        { text: "Monthly summary reports", included: true },
        { text: "Single account", included: true },
        { text: "Email support", included: true },
        { text: "Advanced analytics", included: false },
        { text: "Goal tracking", included: false },
        { text: "Export data", included: false },
      ],
      cta: "Get Started Free",
      color: "from-slate-500 to-gray-500",
    },
    {
      name: "Pro",
      icon: Sparkles,
      description: "For individuals serious about managing their finances",
      monthlyPrice: 9.99,
      annualPrice: 7.99,
      popular: true,
      features: [
        { text: "Unlimited transactions", included: true },
        { text: "Custom categories", included: true },
        { text: "Advanced reports & charts", included: true },
        { text: "Multiple accounts", included: true },
        { text: "Priority email support", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Goal tracking", included: true },
        { text: "Export data (CSV, PDF)", included: true },
      ],
      cta: "Start Pro Trial",
      color: "from-primary to-accent",
    },
    {
      name: "Business",
      icon: Crown,
      description: "For teams and businesses with advanced needs",
      monthlyPrice: 29.99,
      annualPrice: 24.99,
      popular: false,
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Team collaboration", included: true },
        { text: "Role-based permissions", included: true },
        { text: "API access", included: true },
        { text: "Dedicated support", included: true },
        { text: "Custom integrations", included: true },
        { text: "Audit logs", included: true },
        { text: "SLA guarantee", included: true },
      ],
      cta: "Contact Sales",
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
            <span>Flexible Pricing</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-outfit mb-4">
            Choose the Perfect{" "}
            <span className="text-gradient">Plan for You</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start free and upgrade as you grow. All plans include core features.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 bg-muted rounded-xl">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !isAnnual
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                isAnnual
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
              <span className="px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 text-xs rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={index}
                className={`relative card-base p-8 ${
                  plan.popular
                    ? "border-primary shadow-xl scale-105 z-10"
                    : "hover:shadow-lg"
                } transition-all duration-300`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1.5 bg-gradient-primary text-white text-sm font-medium rounded-full shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold font-outfit mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-semibold">$</span>
                    <span className="text-5xl font-bold font-outfit">
                      {price === 0 ? "0" : price.toFixed(2).split(".")[0]}
                    </span>
                    {price !== 0 && (
                      <span className="text-2xl font-semibold">
                        .{price.toFixed(2).split(".")[1]}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {price === 0
                      ? "Free forever"
                      : `per month${isAnnual ? ", billed annually" : ""}`}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check
                          size={18}
                          className="text-green-500 shrink-0 mt-0.5"
                        />
                      ) : (
                        <X
                          size={18}
                          className="text-muted-foreground/50 shrink-0 mt-0.5"
                        />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground/50"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link to="/register">
                  <Button
                    className={`w-full rounded-xl h-12 ${
                      plan.popular
                        ? "bg-gradient-primary hover:opacity-90"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    } transition-all duration-300`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-sm text-muted-foreground mt-12">
          All plans include 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
