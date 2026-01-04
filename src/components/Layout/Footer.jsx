import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", to: "/features" },
      { label: "Pricing", to: "/pricing" },
      { label: "Blog", to: "/blog" },
      { label: "Changelog", to: "#" },
    ],
    company: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Careers", to: "#" },
      { label: "Press Kit", to: "#" },
    ],
    resources: [
      { label: "Help Center", to: "#" },
      { label: "FAQ", to: "/faq" },
      { label: "API Docs", to: "#" },
      { label: "Community", to: "#" },
    ],
    legal: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Cookie Policy", to: "#" },
      { label: "License", to: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <span className="text-white text-xl font-bold font-outfit">
                  F
                </span>
              </div>
              <span className="text-xl font-bold font-outfit text-gradient-primary">
                FinEase
              </span>
            </Link>

            <p className="text-muted-foreground mb-6 max-w-sm">
              Your personal finance management solution for tracking expenses,
              managing budgets, and achieving your financial goals.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:support@finease.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail size={18} />
                <span>support@finease.com</span>
              </a>
              <a
                href="tel:+8801780079749"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone size={18} />
                <span>+880 1780-079749</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin size={18} />
                <span>Dashar, Madaripur, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} FinEase. All rights reserved. Built with ❤️ by{" "}
              <a
                href="https://github.com/Pankaj72885"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Pankaj Bepari
              </a>
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
