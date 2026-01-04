import { Shield } from "lucide-react";

export function Component() {
  const lastUpdated = "January 1, 2026";

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding-sm bg-gradient-mesh relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Shield size={16} />
              <span>Legal</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-4">
              Privacy <span className="text-gradient">Policy</span>
            </h1>

            <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="card-base p-8 md:p-12 space-y-8">
              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  1. Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to FinEase ("we," "our," or "us"). We are committed to
                  protecting your personal information and your right to
                  privacy. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you use our
                  personal finance management application and website.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Please read this privacy policy carefully. If you do not agree
                  with the terms of this privacy policy, please do not access
                  the application.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  2. Information We Collect
                </h2>
                <h3 className="text-lg font-semibold mt-4 mb-2">
                  Personal Information
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We may collect personal information that you voluntarily
                  provide when you register, including:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>Name and email address</li>
                  <li>Profile picture (optional)</li>
                  <li>Account credentials</li>
                </ul>

                <h3 className="text-lg font-semibold mt-4 mb-2">
                  Financial Information
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide our services, we collect financial transaction data
                  that you input, including:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>Transaction amounts and dates</li>
                  <li>Transaction categories and descriptions</li>
                  <li>Budget settings and financial goals</li>
                </ul>

                <h3 className="text-lg font-semibold mt-4 mb-2">
                  Automatically Collected Information
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  When you access our application, we may automatically collect:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Usage patterns and preferences</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>Provide, operate, and maintain our services</li>
                  <li>Generate financial reports and insights</li>
                  <li>Improve and personalize your experience</li>
                  <li>Send you updates and security alerts</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Detect and prevent fraud or abuse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  4. Data Security
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement robust security measures to protect your data:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>256-bit AES encryption for data at rest</li>
                  <li>TLS/SSL encryption for data in transit</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Secure authentication via Firebase</li>
                  <li>Access controls and monitoring</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  5. Data Sharing
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share information only in the following
                  circumstances:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who assist our operations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  6. Your Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>Access and download your data</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request data portability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  7. Cookies and Tracking
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use essential cookies to maintain your session and
                  preferences. We do not use third-party tracking cookies for
                  advertising purposes. You can manage cookie preferences
                  through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  8. Children's Privacy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not intended for users under 13 years of age.
                  We do not knowingly collect information from children under
                  13. If you believe a child has provided us with personal
                  information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  9. Changes to This Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  10. Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy, please
                  contact us at:
                </p>
                <ul className="list-none mt-2 space-y-1 text-muted-foreground">
                  <li>Email: privacy@finease.com</li>
                  <li>Address: Dashar, Madaripur, Bangladesh</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Component.displayName = "PrivacyPolicyPage";
