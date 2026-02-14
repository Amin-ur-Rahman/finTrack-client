"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosPublic from "@/api/axiosPublic";
import { IoClose } from "react-icons/io5";

const ContributeModal = ({ goal, onClose }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: `Contribution to ${goal.title}`,
    },
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => axiosPublic.patch(`/goals/${goal._id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["savingsGoals"]);
      queryClient.invalidateQueries(["transactions"]);
      onClose();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      title: data.title,
      amount: parseFloat(data.amount),
      goalTitle: goal.title,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="bg-card border border-border w-full max-w-sm rounded-md overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
          <h2 className="font-black uppercase text-[10px] tracking-widest">
            Add Funds
          </h2>
          <button
            onClick={onClose}
            className="hover:text-danger transition-colors"
          >
            <IoClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <p className="text-xs text-muted-foreground italic">
            Moving money from your balance to{" "}
            <span className="text-primary font-bold">{goal.title}</span>.
          </p>

          <div>
            <label className="text-[10px] font-black uppercase text-muted-foreground">
              Transaction Label
            </label>
            <input
              {...register("title", { required: true })}
              className="w-full p-2 bg-background border border-border rounded-md mt-1 text-sm"
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-muted-foreground">
              Amount (৳)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("amount", { required: true })}
              className="w-full p-2 bg-background border border-border rounded-md mt-1 text-sm"
              placeholder="0.00"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-bold uppercase rounded-md text-xs tracking-widest hover:brightness-110 transition-all"
          >
            Confirm Transfer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContributeModal;
