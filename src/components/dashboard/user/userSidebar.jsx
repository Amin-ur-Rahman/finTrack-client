"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaExchangeAlt,
  FaChartPie,
  FaCog,
  FaPlusCircle,
  FaTimes,
  FaBullseye,
  FaChartLine,
  FaBell,
} from "react-icons/fa";
import { BsLayoutTextSidebar } from "react-icons/bs";
import { useState } from "react";
import AddRecordModal from "@/components/userDashboard/addRecordModal";

const UserSidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // User Menu Items
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <BsLayoutTextSidebar />,
    },
    {
      name: "Transactions",
      path: "/dashboard/transactions",
      icon: <FaExchangeAlt />,
    },
    {
      name: "Savings Goals",
      path: "/dashboard/goals",
      icon: <FaBullseye />,
    },
    {
      name: "Budget Planning",
      path: "/dashboard/budgets",
      icon: <FaChartPie />,
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: <FaChartLine />,
    },
    {
      name: "Bill Reminders",
      path: "/dashboard/bills",
      icon: <FaBell />,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <FaCog />,
    },
  ];

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop for mobile/tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-64 bg-card border-r border-border
          transform transition-transform duration-300 ease-in-out
          z-50 lg:z-0
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full p-4">
          {/* Close button mobile/ tablet  */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden self-end mb-4 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            aria-label="Close sidebar"
          >
            <FaTimes size={20} />
          </button>

          {/* Role Badge */}
          <div className="mb-4 px-4 py-2 bg-primary/10 rounded-md text-center">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              User Dashboard
            </span>
          </div>

          {/* quick action button */}
          <button
            onClick={() => setIsRecordModalOpen(true)}
            className="flex items-center justify-center gap-2 mb-6 w-full py-3 bg-primary text-primary-foreground rounded-md font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-sm"
          >
            <FaPlusCircle /> Add Record
          </button>

          {/* Navigation Menu */}
          <nav className="space-y-1 flex-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Help & Support Section */}
          <div className="mt-auto pt-4 border-t border-border">
            <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase mb-2">
              Help & Support
            </p>
            <Link
              href="/support"
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs & API
            </Link>
          </div>
        </div>
      </aside>
      {isRecordModalOpen && (
        <AddRecordModal
          setIsRecordModalOpen={setIsRecordModalOpen}
        ></AddRecordModal>
      )}
    </>
  );
};

export default UserSidebar;
