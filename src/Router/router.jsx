import ErrorPage from "@/components/Common/ErrorPage";
import Loader from "@/components/Common/Loader";
import Home from "@/Pages/Home";
import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    hydrateFallbackElement: <Loader />,
    loader: () => fetch("/data.json"),
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
