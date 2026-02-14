"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "@/api/axiosPublic";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FaTimes, FaChartLine } from "react-icons/fa";

const GoalStatsModal = ({ goal, onClose }) => {
  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["singleGoalStats", goal?._id],
    enabled: !!goal?._id,
    queryFn: async () => {
      const res = await axiosPublic.get(`/goals/single-goal-stats/${goal._id}`);

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

      if (!res.data || !Array.isArray(res.data)) return [];

      return res.data
        .map((d) => ({
          name: d._id?.month ? monthNames[d._id.month - 1] : "Unknown",
          amount: d.monthlyTotal || 0,
        }))
        .reverse();
    },
  });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
      <div className="bg-card border border-border w-full max-w-md rounded-lg p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-2"
        >
          <FaTimes size={16} />
        </button>

        <div className="mb-6 flex items-start gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-md">
            <FaChartLine size={18} />
          </div>
          <div>
            <h2 className="text-lg font-black text-foreground uppercase tracking-tight leading-none mb-1 text-nowrap overflow-hidden">
              {goal.title}
            </h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              Monthly Contribution History
            </p>
          </div>
        </div>

        <div className="h-64 w-full bg-muted/20 rounded-md p-4 border border-border/50 min-w-0">
          {isLoading ? (
            <div className="h-full w-full flex flex-col items-center justify-center text-xs animate-pulse gap-2">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="font-bold uppercase tracking-tighter">
                Loading Data...
              </span>
            </div>
          ) : stats.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats}
                margin={{ top: 5, right: 5, left: -30, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#333"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#888", fontWeight: 600 }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} hide />
                <Tooltip
                  cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                  contentStyle={{
                    backgroundColor: "#000",
                    border: "1px solid #333",
                    fontSize: "12px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                  }}
                  itemStyle={{ color: "#3b82f6" }}
                />
                <Bar
                  dataKey="amount"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-[10px] text-muted-foreground uppercase font-black italic">
              No contributions recorded yet.
            </div>
          )}
        </div>

        <div className="mt-6 space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-[9px] font-black uppercase text-muted-foreground mb-3 tracking-widest">
            Breakdown
          </p>
          {stats.length > 0 ? (
            stats.map((s, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-sm p-2 rounded hover:bg-muted/30 transition-colors border-b border-border/30 last:border-0"
              >
                <span className="text-muted-foreground font-medium">
                  {s.name} Savings
                </span>
                <span className="font-black text-primary">
                  ৳{s.amount.toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-xs text-muted-foreground italic">
              Start saving to see your progress here!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalStatsModal;
