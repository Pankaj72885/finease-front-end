import {
  BarChart3,
  Bell,
  CreditCard,
  Globe,
  Lock,
  PieChart,
  Smartphone,
  Wallet,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Wallet,
      title: "Smart Transaction Tracking",
      description:
        "Automatically categorize and track all your income and expenses in one place with intelligent categorization.",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: PieChart,
      title: "Visual Analytics",
      description:
        "Beautiful charts and graphs that help you understand your spending patterns and financial health at a glance.",
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      icon: BarChart3,
      title: "Budget Management",
      description:
        "Set monthly budgets for different categories and receive alerts when you're approaching your limits.",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500/10",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Get timely reminders for bill payments, unusual spending, and weekly financial summaries.",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Lock,
      title: "Bank-Grade Security",
      description:
        "Your financial data is encrypted with 256-bit AES encryption and stored securely on our servers.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Smartphone,
      title: "Access Anywhere",
      description:
        "Manage your finances on the go with our fully responsive web app that works on any device.",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-500/10",
    },
    {
      icon: Globe,
      title: "Multi-Currency Support",
      description:
        "Track expenses in multiple currencies with automatic conversion rates updated daily.",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-500/10",
    },
    {
      icon: CreditCard,
      title: "Account Linking",
      description:
        "Connect multiple bank accounts and credit cards for a complete view of your financial life.",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500/10",
    },
  ];

  return (
    <section
      id="features"
      className="section-padding bg-muted/30 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-outfit mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Master Your Money</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our comprehensive suite of tools helps you take control of your
            finances with features designed for real-world money management.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group card-interactive p-6 hover:shadow-xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon
                    size={28}
                    className={`bg-gradient-to-r ${feature.color} bg-clip-text`}
                    style={{
                      color: feature.color.split(" ")[0].replace("from-", ""),
                    }}
                  />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
