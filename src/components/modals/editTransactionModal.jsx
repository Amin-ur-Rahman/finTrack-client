"use client";
import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import axiosPublic from "@/api/axiosPublic";
import Swal from "sweetalert2";

const EditTransactionModal = ({ transaction, onClose }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: transaction?.title,
      amount: transaction?.amount,
      type: transaction?.type,
      category: transaction?.category,
      date: transaction?.date
        ? new Date(transaction.date).toISOString().split("T")[0]
        : "",
      note: transaction?.note || "",
    },
  });

  //   useEffect(() => {
  //     if (transaction) {
  //       reset({
  //         title: transaction.title,
  //         amount: transaction.amount,
  //         type: transaction.type,
  //         category: transaction.category,
  //         date: new Date(transaction.date).toISOString().split("T")[0],
  //         note: transaction.note || "",
  //       });
  //     }
  //   }, [transaction, reset]);

  const selectedType = useWatch({ control, name: "type" });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data;
    },
  });

  const filteredCategories = categories.filter(
    (cat) => cat.type === selectedType,
  );

  const { mutate } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosPublic.patch(
        `/transactions/${transaction._id}`,
        updatedData,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      Swal.fire("Updated!", "Transaction has been updated.", "success");
      onClose();
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    mutate({ ...data, amount: parseFloat(data.amount) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card w-full max-w-md border border-border rounded-md shadow-xl overflow-hidden"
      >
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="font-bold">Edit Transaction</h2>
          <button onClick={onClose} className="hover:text-danger">
            <IoClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Title
            </label>
            <input
              {...register("title", { required: true })}
              className="w-full p-2 bg-background border border-border rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground">
                Amount
              </label>
              <input
                type="number"
                step="0.01"
                {...register("amount", { required: true })}
                className="w-full p-2 bg-background border border-border rounded-md"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground">
                Type
              </label>
              <select
                {...register("type")}
                className="w-full p-2 bg-background border border-border rounded-md"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Category
            </label>
            <select
              {...register("category", { required: true })}
              className="w-full p-2 bg-background border border-border rounded-md capitalize"
            >
              {filteredCategories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Date
            </label>
            <input
              type="date"
              {...register("date", { required: true })}
              className="w-full p-2 bg-background border border-border rounded-md"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Note
            </label>
            <textarea
              {...register("note")}
              className="w-full p-2 bg-background border border-border rounded-md resize-none"
              rows="2"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-white rounded-md font-bold uppercase transition-all"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditTransactionModal;
