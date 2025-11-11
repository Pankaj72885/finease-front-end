import Loader from "@/components/Common/Loader";
import { createBrowserRouter } from "react-router";
import Root from "./Root";
import MyTransactions from "@/Pages/MyTransactions";
import AddTransaction from "@/Pages/AddTransaction";

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
      {
        path: "/my-transactions",
        Component: MyTransactions,
      },
      {
        path: "/add-transaction",
        Component: AddTransaction,
      },
    ],
  },
  {
    path: "*",
    lazy: () => import("@/Pages/NotFound"),
  },
]);

export default router;
