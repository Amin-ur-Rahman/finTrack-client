"use client";
import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "@/api/axiosPublic";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  FaUsers,
  FaExchangeAlt,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
} from "react-icons/fa";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

export default function AdminDashboard() {
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["adminTransactions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/transactions/admin");
      return res.data;
    },
  });

  const stats = useMemo(() => {
    const totalVolume = transactions.reduce(
      (acc, curr) => acc + curr.amount,
      0,
    );
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);
    const uniqueUsers = new Set(transactions.map((t) => t.userEmail)).size;

    // Category Distribution for Pie Chart
    const catMap = {};
    transactions.forEach((t) => {
      catMap[t.category] = (catMap[t.category] || 0) + t.amount;
    });
    const categoryData = Object.keys(catMap).map((name) => ({
      name,
      value: catMap[name],
    }));

    return {
      totalVolume,
      totalIncome,
      totalExpense,
      uniqueUsers,
      categoryData,
    };
  }, [transactions]);

  if (isLoading)
    return (
      <div className="p-10 text-center text-2xl font-semibold animate-pulse">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="space-y-8 p-6">
      {/* HEADER */}
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
        <p className="text-muted-foreground text-sm font-medium mt-1">
          Global Platform Analytics
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Platform Volume"
          value={`৳${stats.totalVolume.toLocaleString()}`}
          icon={<FaExchangeAlt />}
          color="text-blue-500"
        />
        <StatCard
          title="Active Users"
          value={stats.uniqueUsers}
          icon={<FaUsers />}
          color="text-purple-500"
        />
        <StatCard
          title="Global Inflow"
          value={`৳${stats.totalIncome.toLocaleString()}`}
          icon={<FaArrowUp />}
          color="text-success"
        />
        <StatCard
          title="Global Outflow"
          value={`৳${stats.totalExpense.toLocaleString()}`}
          icon={<FaArrowDown />}
          color="text-danger"
        />
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BAR CHAR  */}
        <div className="bg-card border border-border p-6 rounded-md">
          <h3 className="text-sm font-semibold mb-6 flex items-center gap-2">
            <FaChartLine className="text-primary" /> Cashflow Comparison
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "Income", amount: stats.totalIncome },
                  { name: "Expense", amount: stats.totalExpense },
                ]}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#888"
                  fontSize={10}
                  fontWeight="bold"
                />
                <YAxis stroke="#888" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    background: "#000",
                    border: "1px solid #333",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {[0, 1].map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#10b981" : "#ef4444"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART  */}
        <div className="bg-card border border-border p-6 rounded-md">
          <h3 className="text-sm font-semibold mb-6">Global Category Usage</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.categoryData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#000",
                    border: "1px solid #333",
                    fontSize: "10px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY TABLE */}
      <div className="bg-card border border-border rounded-md overflow-hidden">
        <div className="p-4 bg-muted/50 border-b border-border">
          <h3 className="text-sm font-semibold">Recent Global Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/20 text-muted-foreground font-black uppercase">
                <th className="p-4">User</th>
                <th className="p-4">Category</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map((t, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border hover:bg-muted/10 transition-colors"
                >
                  <td className="p-4 font-bold">{t.userEmail}</td>
                  <td className="p-4 uppercase tracking-tighter">
                    {t.category}
                  </td>
                  <td className="p-4 font-black">
                    ৳{t.amount.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-[2px] text-[9px] font-black uppercase ${
                        t.type === "income"
                          ? "bg-success/20 text-success"
                          : "bg-danger/20 text-danger"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-card border border-border p-5 rounded-md flex items-center gap-4 shadow-sm">
      <div className={`p-3 rounded-full bg-muted/50 ${color}`}>{icon}</div>
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-1">
          {title}
        </p>
        <p className="text-xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  );
}
