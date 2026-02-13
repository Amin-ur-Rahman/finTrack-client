"use client";
import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "motion/react";
import axiosPublic from "@/api/axiosPublic";
import Swal from "sweetalert2";

const EditCategoryModal = ({ category, onClose }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: category?.name,
      type: category?.type,
    },
  });

  // useEffect(() => {  //this thing has hounted me for about half an hour
  //   if (category?._id) {
  //     reset({
  //       name: category.name,
  //       type: category.type,
  //     });
  //   }
  // }, [category._id]);

  const selectedType = useWatch({ control, name: "type" });

  console.log("Selected type:", selectedType);
  const { mutate, isPending } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosPublic.patch(
        `/category/${category._id}`,
        updatedData,
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0 || data.acknowledged) {
        queryClient.invalidateQueries(["categories"]);
        Swal.fire({
          title: "Updated!",
          text: "Category changes saved successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        onClose();
      }
    },
    onError: (err) => {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Update failed",
        "error",
      );
    },
  });

  const onSubmit = (data) => mutate(data);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card w-full max-w-md border border-border rounded-lg shadow-2xl overflow-hidden"
      >
        <div className="p-5 border-b border-border flex justify-between items-center bg-muted/30">
          <h2 className="font-bold text-lg">Edit Category</h2>
          <button onClick={onClose} className="hover:text-danger p-1">
            <IoClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Name Field */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              Category Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 bg-background border border-border rounded-md focus:border-primary outline-none"
            />
          </div>

          {/* type selection */}

          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* Expense Option */}
              <label className="cursor-pointer group" htmlFor="edit-expense">
                <input
                  type="radio"
                  value="expense"
                  {...register("type", { required: true })}
                  className="peer sr-only"
                  id="edit-expense"
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
              <label className="cursor-pointer group" htmlFor="edit-income">
                <input
                  type="radio"
                  value="income"
                  {...register("type", { required: true })}
                  className="peer sr-only"
                  id="edit-income"
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

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold uppercase tracking-tighter hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Update Category"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditCategoryModal;
