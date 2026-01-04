import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <div className="font-inter flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
