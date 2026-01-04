import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle,
  CreditCard,
  Globe,
  Lock,
  PieChart,
  Smartphone,
  Wallet,
  Zap,
} from "lucide-react";
import { Link } from "react-router";

export function Component() {
  const mainFeatures = [
    {
      icon: Wallet,
      title: "Smart Transaction Tracking",
      description:
        "Effortlessly log and categorize all your income and expenses. Our intelligent system learns your spending patterns and automatically suggests categories for faster entry.",
      highlights: [
        "Automatic categorization",
        "Quick entry shortcuts",
        "Recurring transaction support",
        "Multi-currency tracking",
      ],
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: PieChart,
      title: "Visual Analytics & Reports",
      description:
        "Transform your financial data into beautiful, actionable insights. Interactive charts show exactly where your money goes and help you make informed decisions.",
      highlights: [
        "Interactive pie & bar charts",
        "Monthly trend analysis",
        "Category breakdowns",
        "Export to PDF/CSV",
      ],
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: BarChart3,
      title: "Budget Management",
      description:
        "Set smart budgets for each spending category and track your progress in real-time. Get notified before you overspend and stay on track with your financial goals.",
      highlights: [
        "Custom budget limits",
        "Progress tracking",
        "Overspend alerts",
        "Monthly rollover options",
      ],
      color: "from-pink-500 to-rose-500",
    },
  ];

  const additionalFeatures = [
    {
      icon: Lock,
      title: "Bank-Grade Security",
      description: "256-bit AES encryption protects your data at all times.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Timely alerts for bills, budgets, and unusual activity.",
    },
    {
      icon: Smartphone,
      title: "Works Everywhere",
      description: "Responsive design works on desktop, tablet, and mobile.",
    },
    {
      icon: Globe,
      title: "Multi-Currency",
      description: "Track expenses in any currency with real-time conversion.",
    },
    {
      icon: CreditCard,
      title: "Account Overview",
      description: "See all your accounts and balances in one dashboard.",
    },
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "Lightning-fast performance with 99.9% uptime guarantee.",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-mesh relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Zap size={16} />
              <span>Powerful Features</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit mb-6">
              Everything You Need to{" "}
              <span className="text-gradient">Master Your Finances</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover the complete suite of tools designed to help you track,
              analyze, and optimize your personal finances.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button
                  size="lg"
                  className="rounded-xl bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:shadow-glow px-8"
                >
                  Start Free Trial
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="rounded-xl px-8">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features - Detailed */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="space-y-24">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isReversed = index % 2 === 1;

              return (
                <div
                  key={index}
                  className={`flex flex-col ${
                    isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                  } gap-12 items-center`}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
                    >
                      <Icon size={28} className="text-white" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">
                      {feature.title}
                    </h2>

                    <p className="text-lg text-muted-foreground mb-6">
                      {feature.description}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {feature.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-center gap-2">
                          <CheckCircle
                            size={18}
                            className="text-green-500 shrink-0"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual */}
                  <div className="flex-1">
                    <div className="card-base p-8 bg-gradient-to-br from-muted/50 to-muted">
                      <div
                        className={`w-full aspect-video rounded-xl bg-gradient-to-br ${feature.color} opacity-20`}
                      />
                      <div className="mt-4 flex items-center justify-center">
                        <Icon size={64} className="text-muted-foreground/50" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">
              And So Much <span className="text-gradient">More</span>
            </h2>
            <p className="text-muted-foreground">
              Packed with features to make managing your money a breeze.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="card-base p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">
                Ready to Experience All These Features?
              </h2>
              <p className="text-white/80 mb-8">
                Start your free trial today and discover how FinEase can
                transform your financial life.
              </p>
              <Link to="/register">
                <Button
                  size="lg"
                  className="rounded-xl bg-white text-primary hover:bg-white/90 transition-all duration-300 px-8"
                >
                  Get Started Free
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Component.displayName = "FeaturesPage";
