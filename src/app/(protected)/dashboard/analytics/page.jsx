"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import axiosPublic from "@/api/axiosPublic";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  FaLightbulb,
  FaChartPie,
  FaChartLine,
  FaArrowTrendUp,
} from "react-icons/fa6";
import { FaExclamationTriangle } from "react-icons/fa";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AnalyticsPage() {
  const { user } = useUser();

  const { data: insights, isLoading } = useQuery({
    queryKey: ["financialInsights", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/insights/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="p-10 text-center animate-pulse font-black uppercase tracking-tighter">
        Analyzing your patterns...
      </div>
    );

  // suggestion message according to users finacial condition
  const generateTextInsights = () => {
    const list = [];
    if (!insights) return list;

    const { totals, categories } = insights;
    const ratio = (totals.expense / totals.income) * 100;

    if (ratio > 70)
      list.push(
        "Your expense-to-income ratio is high. Consider reviewing non-essential spending.",
      );
    if (ratio <= 50)
      list.push("Excellent! You're keeping expenses under 50% of your income.");

    const topCategory = categories[0];
    if (topCategory) {
      list.push(
        `The "${topCategory._id}" category is your largest expenditure this month (৳${topCategory.amount.toLocaleString()}).`,
      );
    }

    if (totals.balance > 0) {
      list.push(
        `You have a surplus of ৳${totals.balance.toLocaleString()}. This is a great time to contribute to your goals.`,
      );
    }

    return list.length > 0
      ? list
      : ["Start logging more transactions to unlock deeper insights."];
  };

  const textInsights = generateTextInsights();

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter text-foreground">
          Analytics
        </h1>
        <p className="text-muted-foreground text-sm italic">
          Smart financial insights and spending behavior.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* expense pie chart */}
        <div className="bg-card border border-border rounded-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <FaChartPie className="text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest">
              Spending Breakdown
            </h3>
          </div>
          <div className="h-72">
            {insights?.categories?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={insights.categories}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="amount"
                    nameKey="_id"
                  >
                    {insights.categories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "8px",
                      color: "#ffffff",
                    }}
                    itemStyle={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                    labelStyle={{
                      color: "#ffffff",
                    }}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <FallbackUI message="No category data available yet." />
            )}
          </div>
        </div>

        {/*  expense vs income ratio */}
        <div className="space-y-6">
          <div className="bg-primary/5 border border-primary/20 rounded-md p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FaLightbulb size={60} />
            </div>
            <div className="flex items-center gap-2 mb-4 text-primary">
              <FaLightbulb />
              <h3 className="text-xs font-black uppercase tracking-widest">
                Personalized Insights
              </h3>
            </div>
            <div className="space-y-4 relative z-10">
              {textInsights.map((text, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-xs leading-relaxed text-foreground font-medium italic">
                    &quot;{text}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-md p-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest mb-4">
              Monthly Income vs Expense Ratio
            </h3>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black">
                {insights?.totals?.income > 0
                  ? Math.round(
                      (insights.totals.expense / insights.totals.income) * 100,
                    )
                  : 0}
                %
              </span>
              <span className="text-[10px] text-muted-foreground mb-1 uppercase font-bold tracking-widest italic">
                Utilized
              </span>
            </div>
            <div className="w-full bg-muted h-2.5 mt-4 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-1000"
                style={{
                  width: `${Math.min(100, (insights?.totals?.expense / (insights?.totals?.income || 1)) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Balance Trend Visualization */}
      <div className="bg-card border border-border rounded-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <FaArrowTrendUp className="text-primary" />
          <h3 className="text-xs font-black uppercase tracking-widest">
            Net Change Trend
          </h3>
        </div>
        <div className="h-80 w-full">
          {insights?.trend?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={insights.trend}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#333"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="_id"
                  tick={{ fontSize: 10, fill: "#666" }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#666" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#000",
                    border: "1px solid #333",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="netChange"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorTrend)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <FallbackUI message="Tracking your net change requires data from different days." />
          )}
        </div>
      </div>
    </div>
  );
}

function FallbackUI({ message }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-muted/5 rounded-lg border border-dashed border-border/50">
      <FaExclamationTriangle
        className="text-muted-foreground/40 mb-3"
        size={24}
      />
      <p className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground">
        {message}
      </p>
      <div className="mt-4 p-3 bg-primary/5 rounded border border-primary/10">
        <p className="text-[9px] italic text-primary/70 max-w-[250px] leading-relaxed">
          Tip: Consistent logging helps the AI identify spending leaks and
          growth opportunities.
        </p>
      </div>
    </div>
  );
}
