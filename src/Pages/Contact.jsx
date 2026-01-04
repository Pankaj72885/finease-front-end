import { Button } from "@/components/ui/button";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function Component() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "support@finease.com",
      link: "mailto:support@finease.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+880 1780-079749",
      link: "tel:+8801780079749",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Dashar, Madaripur, Bangladesh",
      link: null,
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon-Fri: 9AM-6PM (BST)",
      link: null,
    },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-mesh relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <MessageCircle size={16} />
              <span>Get in Touch</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit mb-6">
              We'd Love to <span className="text-gradient">Hear From You</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or need support? Our team is here to
              help. Reach out and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold font-outfit mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 rounded-2xl overflow-hidden border border-border">
                <iframe
                  title="Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29340.263099044366!2d90.14507!3d23.17268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755412f9c0d8d81%3A0x7a2e9d5e8ae5f5b2!2sMadaripur!5e0!3m2!1sen!2sbd!4v1704364000000!5m2!1sen!2sbd"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card-base p-8">
                <h2 className="text-2xl font-bold font-outfit mb-2">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`input-base ${
                          errors.name ? "border-destructive" : ""
                        }`}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`input-base ${
                          errors.email ? "border-destructive" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className={`input-base ${
                        errors.subject ? "border-destructive" : ""
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      className={`input-base resize-none ${
                        errors.message ? "border-destructive" : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-xl bg-gradient-primary hover:opacity-90 transition-all duration-300 w-full md:w-auto px-8"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-tight text-center">
          <h2 className="text-2xl font-bold font-outfit mb-4">
            Looking for Quick Answers?
          </h2>
          <p className="text-muted-foreground mb-6">
            Check out our FAQ section for answers to common questions.
          </p>
          <Button asChild variant="outline" className="rounded-xl">
            <a href="/faq">View FAQ</a>
          </Button>
        </div>
      </section>
    </div>
  );
}

Component.displayName = "ContactPage";
