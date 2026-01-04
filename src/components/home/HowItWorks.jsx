import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  LineChart,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Create Your Account",
      description:
        "Sign up in seconds with your email or Google account. No credit card required to get started.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      number: "02",
      icon: ClipboardList,
      title: "Add Your Transactions",
      description:
        "Start logging your income and expenses. Categorize them to understand where your money goes.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      number: "03",
      icon: LineChart,
      title: "Track & Analyze",
      description:
        "View beautiful reports and charts that show your spending patterns and financial progress.",
      color: "from-pink-500 to-rose-500",
    },
    {
      number: "04",
      icon: CheckCircle2,
      title: "Achieve Your Goals",
      description:
        "Make informed decisions, reduce unnecessary spending, and reach your financial goals faster.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-4">
            <span>Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-outfit mb-4">
            How <span className="text-gradient">FinEase</span> Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting started is easy. Follow these simple steps to take control
            of your financial life today.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Step Number Circle */}
                  <div className="relative mb-6">
                    <div
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}
                    >
                      <Icon size={32} className="text-white" />
                    </div>
                    {/* Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center text-sm font-bold shadow-md">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow (hidden on last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-3 text-muted-foreground">
                      <ArrowRight size={24} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/register">
            <Button
              size="lg"
              className="rounded-xl bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:shadow-glow px-8 h-14 text-base"
            >
              Get Started Now
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
