import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function Component() {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "getting-started", label: "Getting Started" },
    { id: "account", label: "Account & Billing" },
    { id: "features", label: "Features" },
    { id: "security", label: "Security" },
    { id: "support", label: "Support" },
  ];

  const faqs = [
    {
      category: "getting-started",
      question: "What is FinEase?",
      answer:
        "FinEase is a personal finance management web application that helps you track expenses, manage budgets, and achieve your financial goals. It provides visual reports and insights to help you understand your spending patterns and make smarter financial decisions.",
    },
    {
      category: "getting-started",
      question: "Is FinEase really free to use?",
      answer:
        "Yes! Our Free plan is completely free forever with no hidden costs. You can track up to 50 transactions per month, access basic reports, and use all core features. Upgrade to Pro or Business anytime for advanced features.",
    },
    {
      category: "getting-started",
      question: "How do I get started?",
      answer:
        "Getting started is easy! Simply sign up with your email or Google account, and you're ready to go. Start by adding your first transaction, and our intuitive interface will guide you through the rest. No credit card required for the free plan.",
    },
    {
      category: "account",
      question: "Can I change my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle. When upgrading, you'll get immediate access to new features.",
    },
    {
      category: "account",
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your Pro or Business subscription at any time with no questions asked. Your data remains accessible, and you'll be downgraded to the Free plan at the end of your billing period. No lock-in contracts.",
    },
    {
      category: "account",
      question: "Do you offer refunds?",
      answer:
        "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with FinEase for any reason within the first 14 days, contact our support team for a full refund.",
    },
    {
      category: "features",
      question: "Is there a limit on transactions I can track?",
      answer:
        "Free users can track up to 50 transactions per month. Pro and Business plans offer unlimited transactions, so you can track every coffee purchase and paycheck without worrying about hitting limits.",
    },
    {
      category: "features",
      question: "Can I export my data?",
      answer:
        "Pro and Business users can export their transaction data in CSV and PDF formats anytime. This makes it easy to share with accountants, use for tax purposes, or maintain personal records. Data portability is important to us.",
    },
    {
      category: "features",
      question: "Does FinEase work on mobile devices?",
      answer:
        "Absolutely! FinEase is fully responsive and works beautifully on all devices - smartphones, tablets, and desktops. Access your finances from anywhere, anytime. We're also working on native mobile apps coming soon!",
    },
    {
      category: "features",
      question: "Can I create custom categories?",
      answer:
        "Pro and Business users can create unlimited custom categories. Free users have access to our comprehensive default categories that cover most common expense types.",
    },
    {
      category: "security",
      question: "How secure is my financial data?",
      answer:
        "We take security seriously. All data is encrypted using 256-bit AES encryption, both in transit and at rest. We use bank-grade security protocols, regular security audits, and never share your data with third parties. Your privacy is our top priority.",
    },
    {
      category: "security",
      question: "Do you sell my data to third parties?",
      answer:
        "Absolutely not. We never sell, share, or monetize your personal or financial data. Your information is used solely to provide you with our service. Read our Privacy Policy for complete details.",
    },
    {
      category: "security",
      question: "What happens to my data if I delete my account?",
      answer:
        "When you delete your account, all your personal data is permanently removed from our servers within 30 days. Before deletion, you can export your data to keep a personal copy.",
    },
    {
      category: "support",
      question: "How can I contact support?",
      answer:
        "You can reach our support team via email at support@finease.com. Pro users get priority support with faster response times. Business users have access to dedicated support representatives.",
    },
    {
      category: "support",
      question: "What are your support hours?",
      answer:
        "Our support team is available Monday through Friday, 9 AM to 6 PM (BST). We typically respond to emails within 24 hours for Free users and within 4 hours for Pro users.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-mesh relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to common questions about FinEase. Can't find what
              you're looking for? Contact our support team.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-base pl-12 h-14 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="font-semibold mb-4">Categories</h3>
                <nav className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setOpenIndex(0);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        activeCategory === category.id
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No questions found matching your search.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div key={index} className="card-base overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className={`w-full flex items-center justify-between gap-4 p-5 text-left transition-colors ${
                          openIndex === index
                            ? "bg-primary/5"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <span className="font-semibold">{faq.question}</span>
                        <ChevronDown
                          size={20}
                          className={`shrink-0 text-primary transition-transform duration-300 ${
                            openIndex === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openIndex === index
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="p-5 pt-0 border-t border-border/50">
                          <p className="text-muted-foreground leading-relaxed pt-4">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-tight text-center">
          <h2 className="text-2xl font-bold font-outfit mb-4">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button className="rounded-xl bg-gradient-primary hover:opacity-90">
                Contact Support
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" className="rounded-xl">
                View Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

Component.displayName = "FAQPage";
