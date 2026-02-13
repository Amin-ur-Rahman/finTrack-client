import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <Link href={"/"}>
        <Logo></Logo>
      </Link>
      {children}
    </div>
  );
};

export default AuthLayout;
