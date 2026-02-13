"use client";
import React, { useState, useRef, useEffect } from "react";
import Logo from "../Logo";
import { FcMenu } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { FaUser, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useLogout";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Skeleton from "../../components/loading/skeleton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, isLoading } = useUser();
  const { mutate: logout } = useLogout();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // console.log(user);

  return (
    <nav className="w-full border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-[95dvw] mx-auto px-4 flex items-center h-20">
        <div className="flex items-center gap-12">
          <Logo height={60} width={200} />
          <div className="hidden md:flex gap-8 items-center font-semibold text-muted-foreground">
            {["Home", "About", "Blog", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-foreground transition-all duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          {isLoading ? (
            <Skeleton className="h-10 w-10 md:w-32 rounded-lg" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 hover:bg-muted rounded-full transition-all border border-transparent hover:border-border"
              >
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-primary/20">
                  <Image
                    src={user?.photoUrl || "/profile-generic.jpeg"}
                    fill
                    sizes="40px"
                    className="object-cover"
                    alt={user?.username || "profile"}
                  />
                </div>
                <FaChevronDown
                  className={`text-xs text-muted-foreground transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl py-2 z-[60]"
                  >
                    <div className="px-4 py-2 border-b border-border mb-1">
                      <p className="text-sm font-bold truncate">
                        {user?.username}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        router.push("dashboard/profile");
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted transition-colors"
                    >
                      <FaUser className="text-primary" /> My Profile
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-bold hover:opacity-90 transition-all active:scale-95 shadow-sm"
            >
              Get Started
            </button>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-3xl text-foreground focus:outline-none"
          >
            {isMenuOpen ? <IoClose /> : <FcMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Logic */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4 font-semibold text-muted-foreground">
              {["Home", "About", "Blog", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-foreground py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              {!user && (
                <button
                  onClick={() => {
                    router.push("/login");
                    setIsMenuOpen(false);
                  }}
                  className="bg-primary text-primary-foreground p-3 rounded-lg w-full font-bold mt-2"
                >
                  Get Started
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
