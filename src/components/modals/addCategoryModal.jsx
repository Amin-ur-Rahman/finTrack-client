"use client";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion } from "motion/react";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import axiosPublic from "@/api/axiosPublic";

const AddCategoryModal = ({ onClose, setIsModalOpen }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,

    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      type: "expense",
    },
  });

  const selectedType = useWatch({
    control,
    name: "type",
  });

  // Watch the type field to show visual feedback
  //   const selectedType = watch("type");

  const onSubmit = async (data) => {
    try {
      const res = await axiosPublic.post("/categories", data);

      if (res.data.insertedId) {
        queryClient.invalidateQueries(["categories"]);
        Swal.fire({
          title: "Success!",
          text: "New category added to the system.",
          icon: "success",
          confirmButtonColor: "#10b981",
        });
        reset();
        onClose();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to add category",
        icon: "error",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card w-full max-w-md border border-border rounded-lg shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 border-b border-border flex justify-between items-center bg-muted/30">
          <h2 className="font-bold text-lg text-foreground">Create Category</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="cursor-pointer hover:text-danger transition-colors p-1 hover:bg-danger/10 rounded-md"
            aria-label="Close modal"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Category Name */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              Category Name
            </label>
            <input
              {...register("name", { required: "Category name is required" })}
              className="w-full px-3 py-2.5 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              placeholder="e.g., Healthcare, Salary, Utilities"
            />
            {errors.name && (
              <p className="text-danger text-xs mt-1.5 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-danger rounded-full"></span>
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Type Selection */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* Expense Option */}
              <label className="cursor-pointer group">
                <input
                  type="radio"
                  value="expense"
                  {...register("type", { required: true })}
                  className="peer sr-only"
                />
                <div
                  className={`
                    relative text-center px-4 py-3.5 border-2 rounded-lg transition-all duration-200
                    ${
                      selectedType === "expense"
                        ? "bg-danger/10 border-danger text-danger shadow-md scale-105"
                        : "border-border text-muted-foreground hover:border-danger/50 hover:bg-danger/5"
                    }
                  `}
                >
                  <div className="flex items-center justify-center gap-2">
                    {selectedType === "expense" && (
                      <FaCheckCircle className="text-danger" size={16} />
                    )}
                    <span className="font-semibold text-sm">Expense</span>
                  </div>
                </div>
              </label>

              {/* Income Option */}
              <label className="cursor-pointer group">
                <input
                  type="radio"
                  value="income"
                  {...register("type", { required: true })}
                  className="peer sr-only"
                />
                <div
                  className={`
                    relative text-center px-4 py-3.5 border-2 rounded-lg transition-all duration-200
                    ${
                      selectedType === "income"
                        ? "bg-success/10 border-success text-success shadow-md scale-105"
                        : "border-border text-muted-foreground hover:border-success/50 hover:bg-success/5"
                    }
                  `}
                >
                  <div className="flex items-center justify-center gap-2">
                    {selectedType === "income" && (
                      <FaCheckCircle className="text-success" size={16} />
                    )}
                    <span className="font-semibold text-sm">Income</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Icon */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              Icon Slug (Optional)
            </label>
            <input
              {...register("icon")}
              className="w-full px-3 py-2.5 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              placeholder="e.g., FaHeart, FaWallet"
              defaultValue="FaTag"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Use icon names from &quot;React Icons&quot; for system mapping
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg active:scale-[0.98]"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </span>
            ) : (
              "Create Category"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCategoryModal;
