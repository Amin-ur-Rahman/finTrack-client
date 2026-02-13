"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import DashboardNavbar from "@/components/dashboard/dashboardNavbar";
import Sidebar from "@/components/dashboard/sidebar";
import { useUser } from "@/hooks/useUser";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!loading && user) {
      //    incase if admin try to access user dashboard
      if (
        isAdmin &&
        pathname.startsWith("/dashboard") &&
        !pathname.startsWith("/admin")
      ) {
        router.replace("/admin/dashboard");
      }

      // incase if user try to access admin dashboard
      if (!isAdmin && pathname.startsWith("/admin")) {
        router.replace("/dashboard");
      }
    }
  }, [user, loading, isAdmin, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar with menu toggle button */}
      <DashboardNavbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 relative">
        {/* Role-based Responsive Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/10 min-h-[calc(100vh-64px)] w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
