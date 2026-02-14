"use client";
import React, { useEffect, useState } from "react";
import DashboardNavbar from "@/components/dashboard/dashboardNavbar";
import UserSidebar from "@/components/dashboard/user/userSidebar";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

const UserDashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isLoading: loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (user.role === "admin") {
        router.push("/admin/dashboard");
      }
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-black italic uppercase">
        Verifying Access...
      </div>
    );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* navbar with menu toggle button */}
      <DashboardNavbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 relative">
        {/* user sidebar */}
        <UserSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* main content area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/10 min-h-[calc(100vh-64px)] w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
