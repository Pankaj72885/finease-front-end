import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Is FinEase really free to use?",
      answer:
        "Yes! Our Free plan is completely free forever with no hidden costs. You can track up to 50 transactions per month, access basic reports, and use all core features. Upgrade to Pro or Business anytime for advanced features.",
    },
    {
      question: "How secure is my financial data?",
      answer:
        "We take security seriously. All data is encrypted using 256-bit AES encryption, both in transit and at rest. We use bank-grade security protocols, regular security audits, and never share your data with third parties. Your privacy is our top priority.",
    },
    {
      question: "Can I export my data?",
      answer:
        "Pro and Business users can export their transaction data in CSV and PDF formats anytime. This makes it easy to share with accountants, use for tax purposes, or maintain personal records. Data portability is important to us.",
    },
    {
      question: "Does FinEase work on mobile devices?",
      answer:
        "Absolutely! FinEase is fully responsive and works beautifully on all devices - smartphones, tablets, and desktops. Access your finances from anywhere, anytime. We're also working on native mobile apps coming soon!",
    },
    {
      question: "How do I get started?",
      answer:
        "Getting started is easy! Simply sign up with your email or Google account, and you're ready to go. Start by adding your first transaction, and our intuitive interface will guide you through the rest. No credit card required for the free plan.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your Pro or Business subscription at any time with no questions asked. Your data remains accessible, and you'll be downgraded to the Free plan at the end of your billing period. No lock-in contracts.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with FinEase for any reason within the first 14 days, contact our support team for a full refund.",
    },
    {
      question: "Is there a limit on transactions I can track?",
      answer:
        "Free users can track up to 50 transactions per month. Pro and Business plans offer unlimited transactions, so you can track every coffee purchase and paycheck without worrying about hitting limits.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq"
      className="section-padding bg-muted/30 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-outfit mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about FinEase. Can't find the answer
            you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex items-center justify-between gap-4 p-5 rounded-2xl text-left transition-all duration-300 ${
                  openIndex === index
                    ? "bg-card shadow-lg border border-primary/20"
                    : "bg-card border border-border hover:border-primary/20 hover:shadow-md"
                }`}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-primary transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-5 pt-0">
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
