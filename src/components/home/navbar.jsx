"use client";
import React, { useState } from "react";
import Logo from "../Logo";
import { FcMenu, FcPhotoReel } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useLogout";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoading } = useUser();
  const { mutate: logout } = useLogout();

  console.log(user);

  return (
    <nav className="w-full border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-[95dvw] md:max-w-[95dvw]  mx-auto px-4 flex items-center h-20">
        {/* logo + nav items */}
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

        {/* action button */}
        <div className="ml-auto flex items-center gap-4">
          {!user && (
            <button className="hidden md:block bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-bold hover:opacity-90 transition-all active:scale-95 shadow-sm">
              Get Started
            </button>
          )}

          {/* mobile menu icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-3xl text-foreground focus:outline-none"
          >
            {isMenuOpen ? <IoClose /> : <FcMenu />}
          </button>
          {user ? (
            <button
              onClick={() => logout()}
              className="bg-danger text-white px-4 py-2 rounded-md hover:bg-opacity-90"
            >
              Logout
            </button>
          ) : (
            <a href="/login">Login</a>
          )}
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-card border-b border-border p-6 flex flex-col gap-4 font-semibold text-muted-foreground"
          >
            <a
              href="#"
              className="hover:text-foreground py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#"
              className="hover:text-foreground py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#"
              className="hover:text-foreground py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </a>
            <a
              href="#"
              className="hover:text-foreground py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>

            <button className="bg-primary text-primary-foreground p-3 rounded-lg w-full font-bold mt-2">
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
