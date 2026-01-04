import { FileText } from "lucide-react";

export function Component() {
  const lastUpdated = "January 1, 2026";

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding-sm bg-gradient-mesh relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <FileText size={16} />
              <span>Legal</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-4">
              Terms & <span className="text-gradient">Conditions</span>
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
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using FinEase ("the Service"), you agree to be
                  bound by these Terms and Conditions ("Terms"). If you disagree
                  with any part of these terms, you may not access the Service.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  These Terms apply to all visitors, users, and others who
                  access or use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  2. Description of Service
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  FinEase is a personal finance management application that
                  allows users to track expenses, manage budgets, and view
                  financial reports. The Service is provided "as is" and "as
                  available."
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  3. User Accounts
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  When you create an account with us, you must provide accurate,
                  complete, and current information. Failure to do so
                  constitutes a breach of the Terms.
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>You are responsible for safeguarding your password</li>
                  <li>You must notify us of any unauthorized access</li>
                  <li>You may not use another user's account</li>
                  <li>You must be at least 13 years old to use the Service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  4. User Responsibilities
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>Use the Service for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to any systems</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Transmit any malicious code or viruses</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Impersonate any person or entity</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  5. Intellectual Property
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Service and its original content, features, and
                  functionality are owned by FinEase and are protected by
                  international copyright, trademark, patent, trade secret, and
                  other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  6. User Content
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You retain ownership of any data you input into the Service.
                  By using the Service, you grant us a license to process your
                  data as necessary to provide the Service to you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  7. Subscription and Billing
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Certain features of the Service require a paid subscription.
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>
                    Subscriptions are billed in advance on a monthly or annual
                    basis
                  </li>
                  <li>You may cancel your subscription at any time</li>
                  <li>Refunds are available within 14 days of purchase</li>
                  <li>Prices may change with 30 days notice</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  8. Disclaimer of Warranties
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND,
                  EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE
                  UNINTERRUPTED, SECURE, OR ERROR-FREE.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  FinEase is not a financial advisor. The information provided
                  through the Service is for informational purposes only and
                  should not be considered financial advice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  9. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  IN NO EVENT SHALL FINEASE BE LIABLE FOR ANY INDIRECT,
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                  INCLUDING LOSS OF PROFITS, DATA, OR OTHER INTANGIBLE LOSSES.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  10. Termination
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your account immediately, without
                  prior notice, for any reason, including breach of these Terms.
                  Upon termination, your right to use the Service will cease
                  immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  11. Governing Law
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance
                  with the laws of Bangladesh, without regard to its conflict of
                  law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  12. Changes to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time. We
                  will provide notice of any changes by posting the new Terms on
                  this page. Continued use of the Service after changes
                  constitutes acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-outfit mb-4">
                  13. Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about these Terms, please contact us at:
                </p>
                <ul className="list-none mt-2 space-y-1 text-muted-foreground">
                  <li>Email: legal@finease.com</li>
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

Component.displayName = "TermsPage";
