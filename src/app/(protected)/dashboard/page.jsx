"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useUser } from "@/hooks/useUser";
import { FaArrowUp, FaArrowDown, FaWallet } from "react-icons/fa";
import axiosPublic from "@/api/axiosPublic";

export default function DashboardPage() {
  const { user } = useUser();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["userStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `transactions/user-stats/${user?.email}`,
      );
      return res.data;
    },
  });

  console.log(stats);

  const { data: recentTransactions = [], isLoading: txLoading } = useQuery({
    queryKey: ["recentTransactions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/transactions/my?limit=5`);
      return res.data;
    },
  });

  const isLoading = statsLoading || txLoading;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1 text-sm italic">
          Welcome back, {user?.displayName || "User"}! Here&apos;s your
          financial overview.
        </p>
      </div>

      {/* Dashboard Content - Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-md p-6 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Total Income
              </h3>
              <p className="text-2xl font-bold text-success mt-2">
                {isLoading ? "..." : `৳${stats?.income?.toLocaleString()}`}
              </p>
            </div>
            <div className="p-2 bg-success/10 text-success rounded-full">
              <FaArrowUp size={12} />
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-card border border-border rounded-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Total Expenses
              </h3>
              <p className="text-2xl font-bold text-danger mt-2">
                {isLoading ? "..." : `৳${stats?.expense?.toLocaleString()}`}
              </p>
            </div>
            <div className="p-2 bg-danger/10 text-danger rounded-full">
              <FaArrowDown size={12} />
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-card border border-primary/20 bg-primary/5 rounded-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">
                Current Balance
              </h3>
              <p className="text-2xl font-bold text-foreground mt-2">
                {isLoading ? "..." : `৳${stats?.balance?.toLocaleString()}`}
              </p>
            </div>
            <div className="p-2 bg-primary/10 text-primary rounded-full">
              <FaWallet size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-card border border-border rounded-md overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
          <h3 className="text-sm font-black uppercase tracking-widest">
            Recent Activity
          </h3>
          <button className="text-[10px] font-bold text-primary hover:underline uppercase">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody className="divide-y divide-border">
              {recentTransactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="hover:bg-muted/10 transition-colors"
                >
                  <td className="p-4 text-xs text-muted-foreground">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-bold text-sm">{tx.title}</td>
                  <td className="p-4 text-[10px] uppercase font-bold text-muted-foreground">
                    {tx.category}
                  </td>
                  <td
                    className={`p-4 text-right font-black text-sm ${tx.type === "income" ? "text-success" : "text-danger"}`}
                  >
                    {tx.type === "income" ? "+" : "-"} ৳
                    {tx.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
              {recentTransactions.length === 0 && !isLoading && (
                <tr>
                  <td className="p-10 text-center text-muted-foreground text-sm">
                    No recent transactions.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
