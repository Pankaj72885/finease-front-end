import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Log error to monitoring service (e.g., Sentry)
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/";
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-mesh relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-destructive/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />

          <div className="container-wide relative z-10 py-20">
            <div className="max-w-lg mx-auto text-center">
              {/* Error Icon */}
              <div className="w-20 h-20 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={40} className="text-destructive" />
              </div>

              {/* Message */}
              <h1 className="text-3xl font-bold font-outfit mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-muted-foreground mb-8">
                We encountered an unexpected error. Don't worry, your data is
                safe. Try refreshing the page or go back to the home page.
              </p>

              {/* Error Details (Development Only) */}
              {import.meta.env.DEV && this.state.error && (
                <div className="mb-8 p-4 rounded-xl bg-muted/50 text-left overflow-auto max-h-40">
                  <p className="text-sm font-mono text-destructive">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={this.handleReload}
                  variant="outline"
                  className="rounded-xl px-6"
                >
                  <RefreshCw size={18} />
                  Refresh Page
                </Button>
                <Button
                  onClick={this.handleReset}
                  className="rounded-xl bg-gradient-primary hover:opacity-90 px-6"
                >
                  <Home size={18} />
                  Go to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
