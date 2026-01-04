import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubscribed(true);
    toast.success("Successfully subscribed to our newsletter!");
    setEmail("");

    // Reset after 5 seconds
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  const benefits = [
    "Weekly financial tips & insights",
    "Exclusive money-saving strategies",
    "Early access to new features",
    "No spam, unsubscribe anytime",
  ];

  return (
    <section className="section-padding-sm relative overflow-hidden">
      <div className="container-wide relative z-10">
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />

          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
                <Sparkles size={16} />
                <span>Join 25,000+ subscribers</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-outfit mb-4">
                Stay Ahead with Smart Money Tips
              </h2>

              <p className="text-white/80 text-lg mb-6">
                Get weekly insights, budgeting tips, and exclusive content
                delivered straight to your inbox.
              </p>

              {/* Benefits */}
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-white/90"
                  >
                    <CheckCircle size={18} className="text-white" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Form */}
            <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-2xl">
              {isSubscribed ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle
                      size={32}
                      className="text-green-600 dark:text-green-400"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground">
                    You're In! 🎉
                  </h3>
                  <p className="text-muted-foreground">
                    Check your inbox for a welcome email with your first tips.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-2 text-foreground">
                    Subscribe to Newsletter
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Enter your email to receive financial tips every week.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail size={18} className="text-muted-foreground" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="input-base pl-12"
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 rounded-xl bg-gradient-primary hover:opacity-90 transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Subscribing...
                        </span>
                      ) : (
                        "Subscribe Now"
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By subscribing, you agree to our Privacy Policy. No spam,
                      ever.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
