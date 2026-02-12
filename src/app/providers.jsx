"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

const Providers = ({ children }) => {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60,
          refetchOnWindowFocus: false,
        },
      },
    });
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
