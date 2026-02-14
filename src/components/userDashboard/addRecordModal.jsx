"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { IoClose } from "react-icons/io5";

import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosPublic from "@/api/axiosPublic";

const AddRecordModal = ({ setIsRecordModalOpen }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data;
    },
  });

  console.log(categories);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        amount: parseFloat(data.amount),
        date: new Date(data.date),
      };
      // console.log(payload);

      const res = await axiosPublic.post("/transactions", payload);

      if (res.data.insertedId) {
        queryClient.invalidateQueries(["transactions"]);
        Swal.fire({
          title: "Saved!",
          text: "Record added successfully",
          icon: "success",
          confirmButtonColor: "#10b981",
        });
        reset();
        // onClose();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to save record", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card w-[50dvw] max-w-md border border-border rounded-md shadow-xl overflow-hidden"
      >
        <div className="p-4 border-b border-border flex justify-between items-center bg-muted/20">
          <h2 className="font-bold text-lg">Add New Record</h2>
          <button
            onClick={() => setIsRecordModalOpen(false)}
            className="cursor-pointer hover:text-red-500"
          >
            <IoClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Title
            </label>
            <input
              {...register("title", { required: true })}
              className="w-full p-2 bg-background border border-border rounded-md outline-hidden focus:border-primary"
              placeholder="Rent, Grocery, etc."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Amount */}
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground">
                Amount
              </label>
              <input
                type="number"
                step="0.01"
                {...register("amount", { required: true })}
                className="w-full p-2 bg-background border border-border rounded-md outline-hidden focus:border-primary"
              />
            </div>
            {/* Type */}
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground">
                Type
              </label>
              <select
                {...register("type")}
                className="w-full p-2 bg-background border border-border rounded-md outline-hidden"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          {/*  category */}
          <div>
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Category
            </label>
            <select
              {...register("category")}
              className="w-full p-2 bg-background border border-border rounded-md outline-hidden"
            >
              {categories?.map((cat) => (
                <option key={cat?._id} value={cat?.name}>
                  {cat?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Date
            </label>
            <input
              type="date"
              {...register("date", { required: true })}
              defaultValue={new Date().toISOString().split("T")[0]}
              className="w-full p-2 bg-background border border-border rounded-md outline-hidden"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Note (optional)
            </label>
            <textarea
              {...register("note")} // Changed from "title" to "note"
              className="w-full p-2 bg-background border border-border rounded-md outline-hidden focus:border-primary min-h-20 resize-none"
              placeholder="Add some details..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#00b894] hover:bg-[#00a383] text-white rounded-md font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Confirm Record"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddRecordModal;
