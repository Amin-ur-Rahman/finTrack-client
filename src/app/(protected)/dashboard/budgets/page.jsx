"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosPublic from "@/api/axiosPublic";
import {
  FaPlus,
  FaTrash,
  FaSpinner,
  FaExclamationTriangle,
  FaCheckCircle,
  FaEdit,
  FaWallet,
  FaChartPie,
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";

export default function BudgetPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const { user } = useUser();

  const { data: categories = [], isLoading: isCatLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data.filter((cat) => cat.type === "expense");
    },
  });

  const { data: budgets = [], isLoading: isBudgetsLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["myBudgets", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/budgets/${user?.email}`);
      return res.data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: (budgetData) => {
      if (editingBudget) {
        return axiosPublic.patch(`/budgets/${editingBudget._id}`, budgetData);
      }
      return axiosPublic.post("/budgets", budgetData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myBudgets"]);
      setIsModalOpen(false);
      setEditingBudget(null);
      toast.success(editingBudget ? "Budget Updated!" : "Budget Created!", {
        style: {
          background: "var(--color-success)",
          color: "#fff",
          fontWeight: "600",
        },
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to save budget");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/budgets/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myBudgets"]);
      toast.success("Budget Deleted", {
        style: {
          background: "var(--color-danger)",
          color: "#fff",
        },
      });
    },
    onError: () => {
      toast.error("Could not delete budget");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const categoryId = formData.get("category");
    const limit = formData.get("limit");

    if (!categoryId) return toast.error("Please select a category");
    if (!limit || parseFloat(limit) <= 0) {
      return toast.error("Please enter a valid amount");
    }

    saveMutation.mutate({
      category: categoryId,
      limit: parseFloat(limit),
      userEmail: user.email,
    });
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBudget(null);
  };

  // Calculate overall stats
  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const overallPercent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  // Count alerts
  const criticalBudgets = budgets.filter((b) => b.percent >= 90);
  const warningBudgets = budgets.filter(
    (b) => b.percent >= 75 && b.percent < 90,
  );

  // Get status for budget
  const getBudgetStatus = (percent) => {
    if (percent >= 100) return "over";
    if (percent >= 90) return "critical";
    if (percent >= 75) return "warning";
    return "safe";
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-center" />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Budget Planning
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Set monthly limits and track your spending
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-md w-fit"
        >
          <FaPlus size={14} /> Create Budget
        </button>
      </div>

      {/* Overall Summary */}
      {budgets.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4">
            Overall Budget Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Budget</p>
              <p className="text-2xl font-bold text-foreground">
                ৳{totalBudget.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-danger">
                ৳{totalSpent.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Remaining</p>
              <p className="text-2xl font-bold text-success">
                ৳{totalRemaining.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Overall Progress
              </p>
              <p className="text-2xl font-bold text-foreground">
                {overallPercent.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  overallPercent >= 100
                    ? "bg-danger"
                    : overallPercent >= 75
                      ? "bg-orange-500"
                      : "bg-success"
                }`}
                style={{ width: `${Math.min(overallPercent, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Alerts Section */}
      {(criticalBudgets.length > 0 || warningBudgets.length > 0) && (
        <div className="bg-danger/5 border border-danger/20 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <FaExclamationTriangle className="text-danger" size={18} />
            <h3 className="font-semibold text-danger">Budget Alerts</h3>
          </div>
          <div className="space-y-2">
            {criticalBudgets.length > 0 && (
              <p className="text-sm text-foreground">
                🔴{" "}
                <span className="font-semibold">{criticalBudgets.length}</span>{" "}
                {criticalBudgets.length === 1 ? "budget is" : "budgets are"} at
                or over 90% (critical)
              </p>
            )}
            {warningBudgets.length > 0 && (
              <p className="text-sm text-foreground">
                🟡{" "}
                <span className="font-semibold">{warningBudgets.length}</span>{" "}
                {warningBudgets.length === 1 ? "budget is" : "budgets are"} at
                75-90% (warning)
              </p>
            )}
          </div>
        </div>
      )}

      {/* Budget Cards */}
      {isBudgetsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 bg-card border border-border animate-pulse rounded-lg"
            />
          ))}
        </div>
      ) : budgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map((budget) => {
            const status = getBudgetStatus(budget.percent);
            const remaining = budget.limit - budget.spent;

            return (
              <div
                key={budget._id}
                className={`bg-card border rounded-lg p-5 transition-all hover:shadow-lg relative ${
                  status === "over" || status === "critical"
                    ? "border-danger/50"
                    : status === "warning"
                      ? "border-orange-500/50"
                      : "border-border"
                }`}
              >
                {/* Status Badge */}
                {status !== "safe" && (
                  <div
                    className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold ${
                      status === "over" || status === "critical"
                        ? "bg-danger/10 text-danger"
                        : "bg-orange-500/10 text-orange-500"
                    }`}
                  >
                    {status === "over"
                      ? "OVER"
                      : status === "critical"
                        ? "CRITICAL"
                        : "WARNING"}
                  </div>
                )}

                {/* Category Info with Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FaChartPie className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {budget.category}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Monthly Budget
                    </p>
                  </div>
                </div>

                {/* Amounts */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Limit</span>
                    <span className="font-bold text-foreground">
                      ৳{budget.limit.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Spent</span>
                    <span
                      className={`font-bold ${
                        status === "over" || status === "critical"
                          ? "text-danger"
                          : status === "warning"
                            ? "text-orange-500"
                            : "text-success"
                      }`}
                    >
                      ৳{budget.spent.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Remaining
                    </span>
                    <span
                      className={`font-bold ${
                        remaining < 0 ? "text-danger" : "text-success"
                      }`}
                    >
                      ৳{Math.abs(remaining).toLocaleString()}
                      {remaining < 0 && " over"}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Progress
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        status === "over" || status === "critical"
                          ? "text-danger"
                          : status === "warning"
                            ? "text-orange-500"
                            : "text-success"
                      }`}
                    >
                      {budget.percent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        status === "over" || status === "critical"
                          ? "bg-danger"
                          : status === "warning"
                            ? "bg-orange-500"
                            : "bg-success"
                      }`}
                      style={{ width: `${Math.min(budget.percent, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                  <button
                    onClick={() => handleEdit(budget)}
                    className="flex-1 px-3 py-2 bg-muted hover:bg-muted/80 rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <FaEdit size={12} /> Edit
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(`Delete budget for ${budget.category}?`)
                      ) {
                        deleteMutation.mutate(budget._id);
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-danger/10 hover:bg-danger/20 text-danger rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <FaTrash size={12} /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-border rounded-lg bg-muted/5">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaWallet size={28} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Budgets Yet
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Start managing your finances by creating your first budget
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-all shadow-md"
          >
            Create Your First Budget
          </button>
        </div>
      )}

      {/* edit modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-md rounded-lg shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">
                {editingBudget ? "Edit Budget" : "Create New Budget"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Set a monthly spending limit for a category
              </p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-5">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={editingBudget?.category || ""}
                  disabled={!!editingBudget}
                  className="w-full bg-background border border-border px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="" disabled>
                    Choose a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {editingBudget && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Category cannot be changed
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                  Monthly Limit (৳)
                </label>
                <input
                  name="limit"
                  type="number"
                  required
                  min="1"
                  step="0.01"
                  defaultValue={editingBudget?.limit || ""}
                  placeholder="e.g., 10000"
                  className="w-full bg-background border border-border px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Set how much you want to spend on this category per month
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saveMutation.isPending || isCatLoading}
                  className="flex-1 bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg text-sm flex justify-center items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-md"
                >
                  {saveMutation.isPending ? (
                    <>
                      <FaSpinner className="animate-spin" size={14} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle size={14} />
                      {editingBudget ? "Update Budget" : "Create Budget"}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={saveMutation.isPending}
                  className="flex-1 bg-muted font-semibold py-2.5 rounded-lg text-sm hover:bg-muted/80 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
