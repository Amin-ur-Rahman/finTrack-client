"use client";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosPublic from "@/api/axiosPublic";
import { useUser } from "@/hooks/useUser";
import { FaPlus, FaPiggyBank, FaCalendarAlt, FaChartBar } from "react-icons/fa";
import AddGoalModal from "@/components/modals/addGoalModal";
import GoalStatsModal from "@/components/modals/goalStatsModal"; // Make sure to create this file
import ContributeModal from "@/components/modals/contributeModal";

const SavingsGoals = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoalForFund, setSelectedGoalForFund] = useState(null);
  const [selectedGoalForStats, setSelectedGoalForStats] = useState(null);

  const { data: goals = [], isLoading } = useQuery({
    queryKey: ["savingsGoals", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/goals/${user?.email}`);
      return res.data;
    },
  });

  // Logic to calculate monthly requirement guide
  const calculateMonthlyTarget = (deadline, remaining) => {
    if (remaining <= 0) return 0;
    const today = new Date();
    const target = new Date(deadline);
    const months =
      (target.getFullYear() - today.getFullYear()) * 12 +
      (target.getMonth() - today.getMonth());
    const effectiveMonths = months <= 0 ? 1 : months;
    return Math.ceil(remaining / effectiveMonths);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">
            Savings Goals
          </h1>
          <p className="text-muted-foreground text-sm">
            Every penny counts towards your big dreams.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md font-bold text-xs uppercase hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          <FaPlus /> New Goal
        </button>
      </div>

      {/* Goals Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-56 bg-muted animate-pulse rounded-md" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const progress = Math.min(
              (goal.currentAmount / goal.targetAmount) * 100,
              100,
            );
            const remaining = goal.targetAmount - goal.currentAmount;
            const monthlyTarget = calculateMonthlyTarget(
              goal.deadline,
              remaining,
            );

            return (
              <div
                key={goal._id}
                className="group bg-card border border-border rounded-md p-6 space-y-4 flex flex-col justify-between hover:border-primary/50 transition-colors shadow-sm"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg tracking-tight">
                      {goal.title}
                    </h3>
                    <div className="flex gap-2">
                      {/* Monthly Contribution Monitor Button */}
                      <button
                        onClick={() => setSelectedGoalForStats(goal)}
                        className="p-2 bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-full transition-all"
                        title="View Monthly Contributions"
                      >
                        <FaChartBar size={12} />
                      </button>
                      <div className="p-2 bg-primary/10 text-primary rounded-full">
                        <FaPiggyBank size={14} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground mb-4">
                    <FaCalendarAlt className="text-primary" />
                    <span>
                      Target:{" "}
                      {new Date(goal.deadline).toLocaleDateString("en-GB", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Progress Bar Section */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-black italic uppercase">
                      <span className="text-primary">
                        {progress.toFixed(1)}% Done
                      </span>
                      <span className="text-muted-foreground">
                        ৳{goal.currentAmount.toLocaleString()} / ৳
                        {goal.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden border border-border">
                      <div
                        className="h-full bg-primary transition-all duration-700 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Monthly Target Indicator */}
                  {remaining > 0 && (
                    <div className="mt-4 p-2 bg-primary/5 rounded border border-primary/10 text-center">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">
                        Recommended Monthly
                      </p>
                      <p className="text-sm font-black text-foreground">
                        ৳{monthlyTarget.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <div className="text-[10px] uppercase font-black text-muted-foreground">
                    {remaining > 0
                      ? `৳${remaining.toLocaleString()} Left`
                      : "Goal Achieved! 🎉"}
                  </div>
                  <button
                    onClick={() => setSelectedGoalForFund(goal)}
                    className="text-xs font-black text-primary hover:text-primary/80 transition-colors uppercase tracking-widest"
                  >
                    Add Funds
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals Container */}
      {isModalOpen && <AddGoalModal onClose={() => setIsModalOpen(false)} />}

      {selectedGoalForFund && (
        <ContributeModal
          goal={selectedGoalForFund}
          onClose={() => setSelectedGoalForFund(null)}
        />
      )}

      {selectedGoalForStats && (
        <GoalStatsModal
          goal={selectedGoalForStats}
          onClose={() => setSelectedGoalForStats(null)}
        />
      )}
    </div>
  );
};

export default SavingsGoals;
