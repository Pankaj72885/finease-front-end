import { Button } from "@/components/ui/button";
import {
  Award,
  ChevronRight,
  Globe,
  Heart,
  Lightbulb,
  Rocket,
  Shield,
  Target,
  Users,
} from "lucide-react";
import { Link } from "react-router";

export function Component() {
  const team = [
    {
      name: "Pankaj Bepari",
      role: "Founder & Lead Developer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Full-stack developer passionate about building products that help people manage their finances better.",
    },
    {
      name: "Sarah Chen",
      role: "Product Designer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "UX/UI expert focused on creating intuitive and beautiful financial tools.",
    },
    {
      name: "Michael Johnson",
      role: "Backend Engineer",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      bio: "Security-focused engineer ensuring your financial data stays safe.",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Lead",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Helping spread the word about smarter personal finance management.",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description:
        "Your financial data is protected with bank-grade encryption and security measures.",
    },
    {
      icon: Heart,
      title: "User-Centric",
      description:
        "Every feature is designed with our users' needs and feedback in mind.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously improve and add new features to help you succeed.",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description:
        "Financial tools should be available to everyone, everywhere.",
    },
  ];

  const milestones = [
    { year: "2023", event: "FinEase idea conceived" },
    { year: "2024", event: "Beta launch with 1,000 users" },
    { year: "2025", event: "Reached 25,000 active users" },
    { year: "2026", event: "50,000+ users and growing" },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-mesh relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Users size={16} />
              <span>Our Story</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit mb-6">
              Empowering People to{" "}
              <span className="text-gradient">Master Their Money</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              FinEase was born from a simple idea: everyone deserves access to
              powerful, easy-to-use financial tools. We're on a mission to help
              millions achieve financial freedom.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-4">
                <Target size={16} />
                <span>Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">
                Making Financial Wellness Accessible to Everyone
              </h2>
              <p className="text-muted-foreground mb-6">
                We believe that understanding and managing your finances
                shouldn't be complicated. FinEase simplifies personal finance
                tracking so you can focus on what matters most – achieving your
                goals and living your best life.
              </p>
              <p className="text-muted-foreground">
                Whether you're a student managing your first budget, a
                professional tracking expenses, or a family planning for the
                future, FinEase provides the tools you need to succeed.
              </p>
            </div>

            <div className="card-base p-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
                <Rocket size={16} />
                <span>Our Vision</span>
              </div>
              <h3 className="text-2xl font-bold font-outfit mb-4">
                A World Where Everyone is Financially Confident
              </h3>
              <p className="text-muted-foreground mb-4">
                We envision a future where financial stress is a thing of the
                past. Where every person has the knowledge and tools to build
                wealth, protect their family, and achieve their dreams.
              </p>
              <ul className="space-y-2">
                {[
                  "Democratize financial tools",
                  "Educate through insights",
                  "Build lasting habits",
                  "Create financial freedom",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <ChevronRight size={16} className="text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <Award size={16} />
              <span>Our Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">
              What <span className="text-gradient">Drives Us</span>
            </h2>
            <p className="text-muted-foreground">
              Our core values shape everything we do, from product development
              to customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="card-base p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">
              Our <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-muted-foreground">
              From a simple idea to helping thousands manage their finances.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent -translate-x-1/2 hidden md:block" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <div className="card-base p-6 inline-block">
                      <span className="text-sm text-primary font-medium">
                        {milestone.year}
                      </span>
                      <p className="text-lg font-semibold">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-gradient-primary shadow-glow-sm shrink-0 hidden md:block" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-4">
              <Users size={16} />
              <span>Meet the Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">
              The People Behind <span className="text-gradient">FinEase</span>
            </h2>
            <p className="text-muted-foreground">
              A passionate team dedicated to helping you achieve financial
              success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card-base p-6 text-center group">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-colors"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-tight text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Start your journey to financial freedom today. Join thousands of
            users who trust FinEase.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button
                size="lg"
                className="rounded-xl bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:shadow-glow px-8"
              >
                Get Started Free
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-xl px-8">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

Component.displayName = "AboutPage";
