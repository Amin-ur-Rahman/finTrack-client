"use client";
import React, { useState } from "react";
import DashboardNavbar from "@/components/dashboard/dashboardNavbar";
import AdminSidebar from "@/components/dashboard/admin/adminSidebar";

const AdminDashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar with menu toggle button */}
      <DashboardNavbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 relative">
        {/* Admin Sidebar */}
        <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/10 min-h-[calc(100vh-64px)] w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
