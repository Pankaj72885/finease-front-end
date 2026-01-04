import AddTransaction from "@/Pages/AddTransaction";
import BlogDetails from "@/Pages/Blog/BlogDetails";
import BlogList from "@/Pages/Blog/BlogList";
import DashboardOverview from "@/Pages/Dashboard/DashboardOverview";
import MyBlogs from "@/Pages/Dashboard/MyBlogs";
import MyTransactions from "@/Pages/MyTransactions";
import Profile from "@/Pages/Profile";
import Reports from "@/Pages/Reports";
import TransactionDetails from "@/Pages/TransactionDetails";
import UpdateTransaction from "@/Pages/UpdateTransaction";
import Loader from "@/components/Common/Loader";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import PrivateRoute from "@/components/Layout/PrivateRoute";
import { createBrowserRouter } from "react-router";
import Root from "./Root";

const router = createBrowserRouter([
  // ============ PUBLIC LAYOUT (Root) ============
  {
    path: "/",
    Component: Root,
    hydrateFallbackElement: <Loader />,
    children: [
      // ============ PUBLIC ROUTES ============
      {
        path: "/",
        lazy: () => import("@/Pages/Home"),
      },
      {
        path: "/about",
        lazy: () => import("@/Pages/About"),
      },
      {
        path: "/features",
        lazy: () => import("@/Pages/Features"),
      },
      {
        path: "/pricing",
        lazy: () => import("@/Pages/Pricing"),
      },
      {
        path: "/contact",
        lazy: () => import("@/Pages/Contact"),
      },
      {
        path: "/faq",
        lazy: () => import("@/Pages/FAQPage"),
      },
      {
        path: "/blog",
        element: <BlogList />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "/privacy-policy",
        lazy: () => import("@/Pages/PrivacyPolicy"),
      },
      {
        path: "/terms",
        lazy: () => import("@/Pages/Terms"),
      },

      // ============ AUTH ROUTES ============
      {
        path: "/register",
        lazy: () => import("@/Pages/Register"),
      },
      {
        path: "/login",
        lazy: () => import("@/Pages/Login"),
      },
      {
        path: "/forgot-password",
        lazy: () => import("@/Pages/ForgotPassword"),
      },

      // ============ LEGACY PRIVATE ROUTES (with Root layout) ============
      // Keep these for backwards compatibility / direct links
      {
        path: "/my-transactions",
        element: (
          <PrivateRoute>
            <div className="pt-20">
              <MyTransactions />
            </div>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-transaction",
        element: (
          <PrivateRoute>
            <div className="pt-20">
              <AddTransaction />
            </div>
          </PrivateRoute>
        ),
      },
      {
        path: "/transaction/:id",
        element: (
          <PrivateRoute>
            <div className="pt-20">
              <TransactionDetails />
            </div>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-transaction/:id",
        element: (
          <PrivateRoute>
            <div className="pt-20">
              <UpdateTransaction />
            </div>
          </PrivateRoute>
        ),
      },
      {
        path: "/reports",
        element: (
          <PrivateRoute>
            <div className="pt-20">
              <Reports />
            </div>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <div className="pt-20">
              <Profile />
            </div>
          </PrivateRoute>
        ),
      },
    ],
  },

  // ============ DASHBOARD LAYOUT ============
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    hydrateFallbackElement: <Loader />,
    children: [
      {
        index: true,
        element: <DashboardOverview />,
      },
      {
        path: "transactions",
        element: <MyTransactions />,
      },
      {
        path: "add-transaction",
        element: <AddTransaction />,
      },
      {
        path: "transaction/:id",
        element: <TransactionDetails />,
      },
      {
        path: "update-transaction/:id",
        element: <UpdateTransaction />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-blogs",
        element: <MyBlogs />,
      },
    ],
  },

  // ============ 404 ============
  {
    path: "*",
    lazy: () => import("@/Pages/NotFound"),
  },
]);

export default router;
