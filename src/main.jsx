import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import { AuthProvider } from "./Contexts/AuthContext";
import { ThemeProvider } from "./Contexts/ThemeContext";
import "./index.css";
import router from "./Router/router";

// Configure React Query with optimized defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Toast configuration
const toasterConfig = {
  position: "bottom-right",
  toastOptions: {
    duration: 4000,
    style: {
      background: "var(--color-card)",
      color: "var(--color-foreground)",
      border: "1px solid var(--color-border)",
      borderRadius: "0.75rem",
      padding: "0.75rem 1rem",
    },
    success: {
      iconTheme: {
        primary: "#10b981",
        secondary: "white",
      },
    },
    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "white",
      },
    },
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
            <Toaster {...toasterConfig} />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
