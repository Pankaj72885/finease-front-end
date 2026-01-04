import BlogPreview from "@/components/home/BlogPreview";
import Categories from "@/components/home/Categories";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Newsletter from "@/components/home/Newsletter";
import Pricing from "@/components/home/Pricing";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";

export function Component() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* How It Works */}
      <HowItWorks />

      {/* Statistics */}
      <Statistics />

      {/* Categories */}
      <Categories />

      {/* Testimonials */}
      <Testimonials />

      {/* Pricing */}
      <Pricing />

      {/* FAQ */}
      <FAQ />

      {/* Blog Preview */}
      <BlogPreview />

      {/* Newsletter */}
      <Newsletter />

      {/* Final CTA */}
      <CTA />
    </div>
  );
}

Component.displayName = "HomePage";
