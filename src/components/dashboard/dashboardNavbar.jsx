"use client";
import React, { useState, useRef, useEffect } from "react"; // Added useRef and useEffect
import Link from "next/link";
import Image from "next/image";
import {
  FaMoon,
  FaSun,
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import Logo from "../Logo";
import { useLogout } from "@/hooks/useLogout";
import { useUser } from "@/hooks/useUser";

const DashboardNavbar = () => {
  const { logout } = useLogout();
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const dropdownRef = useRef(null);

  //     click outside the profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="sticky top-0 py-2 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo />
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground cursor-pointer"
          >
            {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>

          {/* Profile Dropdown Container with Ref */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 p-1 rounded-md hover:bg-muted transition-all cursor-pointer border border-transparent hover:border-border"
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-md border border-border">
                <Image
                  src={user?.photoUrl || "/profile-generic.jpeg"}
                  alt="User"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium hidden md:block">
                {user?.username}
              </span>
              <FaChevronDown
                size={12}
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg py-1 z-50"
                >
                  <div className="px-4 py-2 border-b border-border mb-1">
                    <p className="text-xs text-muted-foreground font-bold uppercase">
                      Account
                    </p>
                  </div>

                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUser className="text-muted-foreground" /> Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors text-left cursor-pointer"
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
