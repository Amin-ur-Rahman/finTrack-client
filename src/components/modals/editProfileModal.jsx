"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { IoClose } from "react-icons/io5";

import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import axiosPublic from "@/api/axiosPublic";

const EditProfileModal = ({ user, onClose }) => {
  const queryClient = useQueryClient();
  console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: user?.username,
      currency: user?.currency || "USD",
      imageUrl: user?.photoUrl,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic.patch("/user/update-profile", {
        ...data,
        id: user?._id,
      });

      if (response.data.success) {
        queryClient.invalidateQueries(["user"]);
        Swal.fire({
          title: "Success",
          text: "Profile updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
          buttonsStyling: false,
          customClass: {
            confirmButton:
              "bg-primary text-primary-foreground px-6 py-2 rounded-md",
          },
        });
        onClose();
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "User not found",
        "error",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border w-full max-w-md rounded-md shadow-lg overflow-hidden"
      >
        <div className="p-5 border-b border-border flex justify-between items-center bg-muted/10">
          <h2 className="text-lg font-bold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="hover:text-destructive transition-colors cursor-pointer"
          >
            <IoClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Username
            </label>
            <input
              {...register("username", { required: "Required" })}
              className="w-full p-2.5 rounded-md bg-background border border-border focus:border-primary outline-hidden transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Currency
            </label>
            <select
              {...register("currency")}
              className="w-full p-2.5 rounded-md bg-background border border-border focus:border-primary outline-hidden cursor-pointer"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="BDT">BDT (৳)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-primary-foreground rounded-md font-bold uppercase text-sm tracking-wider hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isSubmitting ? "Processing..." : "Save Changes"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProfileModal;
