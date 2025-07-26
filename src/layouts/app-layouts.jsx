import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Content with Flex Grow */}
      <main className="flex-1 container mx-auto w-full px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;

