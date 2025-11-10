import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router";

export function Component() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400">
            404
          </h1>
          <h2 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/">
              <Home size={18} className="mr-2" />
              Go to Home
            </Link>
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

Component.displayName = "NotFoundPage";
