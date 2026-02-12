import Logo from "@/components/Logo";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <Logo></Logo>
      {children}
    </div>
  );
};

export default AuthLayout;
