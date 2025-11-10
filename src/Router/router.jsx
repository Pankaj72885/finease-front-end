import ErrorPage from "@/components/Common/ErrorPage";
import Loader from "@/components/Common/Loader";
import { createBrowserRouter } from "react-router";
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    hydrateFallbackElement: <Loader />,
    loader: () => fetch("/data.json"),
    children: [
      {
        path: "/",
        lazy: () => import("@/Pages/Home"),
      },
      {
        path: "/register",
        lazy: () => import("@/Pages/Register"),
      },
      {
        path: "/login",
        lazy: () => import("@/Pages/Login"),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
