import { Button } from "@/components/ui/button";
import { Check, Crown, Sparkles, X, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function Component() {
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
        { text: "Budget alerts", included: false },
        { text: "Priority support", included: false },
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
        { text: "Budget alerts", included: true },
        { text: "Priority support", included: false },
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
        { text: "Export data (CSV, PDF)", included: true },
        { text: "SLA guarantee", included: true },
        { text: "Priority support", included: true },
      ],
      cta: "Contact Sales",
      color: "from-amber-500 to-orange-500",
    },
  ];

  const faqs = [
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
    },
    {
      question: "Is there a free trial for paid plans?",
      answer:
        "Yes! All paid plans come with a 14-day free trial. No credit card required to start.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Yes, we offer a 14-day money-back guarantee. If you're not satisfied, contact support for a full refund.",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-mesh relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles size={16} />
              <span>Simple Pricing</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit mb-6">
              Choose the Perfect{" "}
              <span className="text-gradient">Plan for You</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Start free and upgrade as you grow. All plans include our core
              features with no hidden fees.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-1.5 bg-muted rounded-xl">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  !isAnnual
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
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
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

              return (
                <div
                  key={index}
                  className={`relative card-base p-8 ${
                    plan.popular
                      ? "border-primary shadow-xl lg:scale-105 z-10"
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
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold font-outfit mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
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

      {/* Comparison Table */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">
              Compare <span className="text-gradient">Plans</span>
            </h2>
            <p className="text-muted-foreground">
              Find the perfect plan for your needs
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4">Feature</th>
                  <th className="text-center py-4 px-4">Free</th>
                  <th className="text-center py-4 px-4 bg-primary/5">Pro</th>
                  <th className="text-center py-4 px-4">Business</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Transactions",
                    free: "50/mo",
                    pro: "Unlimited",
                    business: "Unlimited",
                  },
                  {
                    feature: "Accounts",
                    free: "1",
                    pro: "5",
                    business: "Unlimited",
                  },
                  {
                    feature: "Reports",
                    free: "Basic",
                    pro: "Advanced",
                    business: "Advanced + Custom",
                  },
                  { feature: "Export", free: "❌", pro: "✓", business: "✓" },
                  {
                    feature: "Goal Tracking",
                    free: "❌",
                    pro: "✓",
                    business: "✓",
                  },
                  {
                    feature: "Team Members",
                    free: "1",
                    pro: "1",
                    business: "Unlimited",
                  },
                  {
                    feature: "API Access",
                    free: "❌",
                    pro: "❌",
                    business: "✓",
                  },
                  {
                    feature: "Support",
                    free: "Email",
                    pro: "Priority",
                    business: "Dedicated",
                  },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    <td className="text-center py-4 px-4 text-muted-foreground">
                      {row.free}
                    </td>
                    <td className="text-center py-4 px-4 bg-primary/5">
                      {row.pro}
                    </td>
                    <td className="text-center py-4 px-4 text-muted-foreground">
                      {row.business}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">
              Pricing <span className="text-gradient">FAQ</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card-base p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

Component.displayName = "PricingPage";
