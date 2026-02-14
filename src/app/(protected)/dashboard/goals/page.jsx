"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosPublic from "@/api/axiosPublic";
import { useUser } from "@/hooks/useUser";
import { FaPlus, FaPiggyBank, FaCalendarAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import AddGoalModal from "@/components/modals/addGoalModal";
import ContributeModal from "@/components/modals/contributeModal";

const SavingsGoals = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoalForFund, setSelectedGoalForFund] = useState(null);

  const { data: goals = [], isLoading } = useQuery({
    queryKey: ["savingsGoals", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/goals/${user?.email}`);
      return res.data;
    },
  });

  const contributeMutation = useMutation({
    mutationFn: async ({ id, amount }) => {
      const res = await axiosPublic.patch(`/goals/${id}`, { amount });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["savingsGoals"]);
      Swal.fire("Success", "Savings updated!", "success");
    },
  });

  return (
    <div className="p-6 space-y-6">
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
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md font-bold text-xs uppercase hover:opacity-90 transition-all"
        >
          <FaPlus /> New Goal
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-48 bg-muted animate-pulse rounded-md" />
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

            return (
              <div
                key={goal._id}
                className="bg-card border border-border rounded-md p-6 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{goal.title}</h3>
                    <div className="p-2 bg-primary/10 text-primary rounded-full">
                      <FaPiggyBank size={14} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <FaCalendarAlt />
                    <span>
                      Target: {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span>{progress.toFixed(1)}%</span>
                      <span>
                        ৳{goal.currentAmount.toLocaleString()} / ৳
                        {goal.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">
                    {remaining > 0
                      ? `৳${remaining.toLocaleString()} Left`
                      : "Goal Achieved! 🎉"}
                  </div>
                  <button
                    onClick={() => setSelectedGoalForFund(goal)}
                    className="text-xs font-black text-primary hover:underline uppercase"
                  >
                    Add Funds
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isModalOpen && <AddGoalModal onClose={() => setIsModalOpen(false)} />}
      {selectedGoalForFund && (
        <ContributeModal
          goal={selectedGoalForFund}
          onClose={() => setSelectedGoalForFund(null)}
        />
      )}
    </div>
  );
};

export default SavingsGoals;
