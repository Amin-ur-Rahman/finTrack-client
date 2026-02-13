"use client";
import Navbar from "@/components/home/navbar";
import Logo from "@/components/Logo";
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
      <Navbar></Navbar>;{" "}
    </div>
  );
};

export default Page;

