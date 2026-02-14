"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IoClose } from "react-icons/io5";
import axiosPublic from "@/api/axiosPublic";

const AddGoalModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => axiosPublic.post("/goals", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["savingsGoals"]);
      onClose();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      ...data,
      targetAmount: parseFloat(data.targetAmount),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border w-full max-w-md rounded-md overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="font-bold uppercase text-sm tracking-widest">
            Set New Savings Goal
          </h2>
          <button onClick={onClose} className="hover:text-danger">
            <IoClose size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase text-muted-foreground">
              Goal Title
            </label>
            <input
              {...register("title", { required: true })}
              placeholder="e.g. New Laptop"
              className="w-full p-2 bg-background border border-border rounded-md mt-1"
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-muted-foreground">
              Target Amount (৳)
            </label>
            <input
              type="number"
              {...register("targetAmount", { required: true })}
              className="w-full p-2 bg-background border border-border rounded-md mt-1"
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-muted-foreground">
              Deadline
            </label>
            <input
              type="date"
              {...register("deadline", { required: true })}
              className="w-full p-2 bg-background border border-border rounded-md mt-1"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-white font-bold uppercase rounded-md text-sm mt-2"
          >
            {isSubmitting ? "Creating..." : "Start Saving"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;
