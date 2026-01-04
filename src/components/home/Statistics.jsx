import { BarChart3, DollarSign, TrendingUp, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    {
      icon: Users,
      value: 50000,
      suffix: "+",
      label: "Active Users",
      description: "Trust FinEase for their finances",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: DollarSign,
      value: 2.5,
      suffix: "M+",
      label: "Transactions Tracked",
      description: "Total volume processed",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      icon: TrendingUp,
      value: 35,
      suffix: "%",
      label: "Average Savings",
      description: "Users save more with insights",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: BarChart3,
      value: 99.9,
      suffix: "%",
      label: "Uptime",
      description: "Reliable service guarantee",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
  ];

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animated counter hook
  const AnimatedCounter = ({ end, suffix, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(easeOutQuart * end);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }, [isVisible, end, duration]);

    const displayValue =
      end >= 100 ? Math.floor(count).toLocaleString() : count.toFixed(1);

    return (
      <span>
        {displayValue}
        {suffix}
      </span>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
            <span>Our Impact</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-outfit mb-4">
            Numbers That{" "}
            <span className="text-gradient">Speak for Themselves</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of users who have transformed their financial lives
            with FinEase.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`card-base p-8 text-center transform transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl ${stat.bgColor} flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon size={32} className={stat.color} />
                </div>

                {/* Value */}
                <div
                  className={`text-4xl md:text-5xl font-bold font-outfit mb-2 ${stat.color}`}
                >
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2000 + index * 200}
                  />
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold mb-1">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
