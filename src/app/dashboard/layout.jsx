import Navbar from "@/components/home/navbar";
import React from "react";

const dashboardLayout = ({ children }) => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default dashboardLayout;
