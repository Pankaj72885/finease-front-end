import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Link, useNavigate } from "react-router";

export function Component() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-mesh relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" />

      <div className="container-wide relative z-10 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="relative">
            <span className="text-[150px] md:text-[200px] font-bold font-outfit text-gradient opacity-20">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search size={80} className="text-primary animate-bounce" />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-bold font-outfit mb-4 -mt-8">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              size="lg"
              className="rounded-xl px-6"
            >
              <ArrowLeft size={18} />
              Go Back
            </Button>
            <Link to="/">
              <Button
                size="lg"
                className="rounded-xl bg-gradient-primary hover:opacity-90 px-6"
              >
                <Home size={18} />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/features"
                className="text-sm text-primary hover:underline"
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="text-sm text-primary hover:underline"
              >
                Pricing
              </Link>
              <Link to="/faq" className="text-sm text-primary hover:underline">
                FAQ
              </Link>
              <Link
                to="/contact"
                className="text-sm text-primary hover:underline"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Component.displayName = "NotFoundPage";
