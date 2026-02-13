import DashboardNavbar from "@/components/dashboard/dashboardNavbar";
import Navbar from "@/components/home/navbar";
import React from "react";

const dashboardLayout = ({ children }) => {
  return (
    <div>
      <header>
        <DashboardNavbar></DashboardNavbar>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default dashboardLayout;
