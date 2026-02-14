"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import { FaArrowUp, FaArrowDown, FaWallet, FaChartLine } from "react-icons/fa";
import axiosPublic from "@/api/axiosPublic";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

  const { data: recentTransactions = [], isLoading: txLoading } = useQuery({
    queryKey: ["recentTransactions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/transactions/my?limit=5`);
      console.log("recent transaction", res.data);

      return res.data;
    },
  });

  const { data: savingsHistory = [], isLoading: savingsLoading } = useQuery({
    queryKey: ["savingsStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get("transactions/savings-stats");

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const lastSixMonths = [5, 4, 3, 2, 1, 0].map((offset) => {
        const d = new Date();
        d.setMonth(d.getMonth() - offset);
        return {
          monthNum: d.getMonth() + 1,
          yearNum: d.getFullYear(),
          name: monthNames[d.getMonth()],
        };
      });

      const finalData = lastSixMonths.map((slot) => {
        const dbMatch = res.data?.find(
          (d) => d._id.month === slot.monthNum && d._id.year === slot.yearNum,
        );

        return {
          name: slot.name,
          amount: dbMatch ? dbMatch.totalSaved : 0,
        };
      });

      return finalData;
    },
  });

  const isLoading = statsLoading || txLoading || savingsLoading;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 text-sm italic">
            Welcome back, {user?.displayName || "User"}!
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Income"
          amount={stats?.income}
          color="text-success"
          icon={<FaArrowUp size={12} />}
          loading={isLoading}
        />
        <StatCard
          title="Total Expenses"
          amount={stats?.expense}
          color="text-danger"
          icon={<FaArrowDown size={12} />}
          loading={isLoading}
        />
        <StatCard
          title="Current Balance"
          amount={stats?.balance}
          color="text-primary"
          icon={<FaWallet size={12} />}
          loading={isLoading}
          highlight
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <FaChartLine className="text-primary" />
            <h3 className="text-sm font-black uppercase tracking-widest">
              Monthly Savings Trend
            </h3>
          </div>

          <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={
                  savingsHistory.length > 0
                    ? savingsHistory
                    : [{ name: "No Data", amount: 0 }]
                }
              >
                <defs>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#333"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#888" }}
                  dy={10}
                />
                <YAxis hide domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid #333",
                    borderRadius: "4px",
                  }}
                  itemStyle={{
                    color: "#3b82f6",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSavings)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mini Activity Feed */}
        <div className="bg-card border border-border rounded-md flex flex-col">
          <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
            <h3 className="text-[10px] font-black uppercase tracking-widest">
              Recent Activity
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {recentTransactions.map((tx) => (
              <div
                key={tx._id}
                className="p-4 border-b border-border/50 flex justify-between items-center hover:bg-muted/5 transition-colors"
              >
                <div>
                  <p className="text-sm font-bold">{tx.title}</p>
                  <p className="text-[10px] uppercase text-muted-foreground">
                    {tx.category}
                  </p>
                </div>
                <p
                  className={`text-sm font-black ${tx.type === "income" ? "text-success" : "text-danger"}`}
                >
                  {tx.type === "income" ? "+" : "-"}৳
                  {tx.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

//   support component for Stat Cards
function StatCard({ title, amount, color, icon, loading, highlight }) {
  return (
    <div
      className={`bg-card border border-border rounded-md p-6 ${highlight ? "bg-primary/5 border-primary/20" : ""}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3
            className={`text-[10px] font-black uppercase tracking-widest ${highlight ? "text-primary" : "text-muted-foreground"}`}
          >
            {title}
          </h3>
          <p className={`text-2xl font-bold mt-2 ${color}`}>
            {loading ? "..." : `৳${amount?.toLocaleString() || 0}`}
          </p>
        </div>
        <div
          className={`p-2 rounded-full ${highlight ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
