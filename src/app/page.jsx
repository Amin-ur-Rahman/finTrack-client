"use client";
import CategoryCards from "@/components/home/categoryCards";
import Footer from "@/components/home/footer";
import HeroSection from "@/components/home/Hero";

import Navbar from "@/components/home/navbar";
import ServicesSection from "@/components/home/services";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && user) {
      router.replace(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
    }
  }, [user, isLoading, router]);
  return (
    <div>
      <header>
        <Navbar></Navbar>;
      </header>
      <main>
        <HeroSection></HeroSection>
        <ServicesSection></ServicesSection>
        <CategoryCards></CategoryCards>
        <footer>
          <Footer></Footer>
        </footer>
      </main>
    </div>
  );
};

export default Page;

