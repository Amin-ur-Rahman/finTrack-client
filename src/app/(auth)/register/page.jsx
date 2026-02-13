"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCamera,
} from "react-icons/fa6";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import axiosPublic from "@/api/axiosPublic";
import Swal from "sweetalert2";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Skeleton from "@/components/loading/skeleton";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  // Cloudinary credentials from env
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      let imageUrl = "";

      // setting up cloudinary upload logics
      if (data.profilePhoto && data.profilePhoto[0]) {
        const formData = new FormData();
        formData.append("file", data.profilePhoto[0]);
        formData.append("upload_preset", preset);

        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
        );
        imageUrl = uploadRes.data.secure_url;
      }

      const submission = {
        ...data,
        imageUrl,
      };
      console.log(submission);

      const res = await axiosPublic.post("/api/auth/register", submission);
      return res.data;
    },
    onSuccess: (res) => {
      Swal.fire({
        title: "Registration Successful!",
        text: "Your account is ready and you are logged in.",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
      reset();
      router.push("/");
    },
    onError: (err) => {
      Swal.fire({
        title: "Error",
        text:
          err.response?.data?.message ||
          "Registration failed. Please try again.",
        icon: "error",
        confirmButtonColor: "#f43f5e",
      });
      // console.log(err.response);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return !isLoading && !user ? (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center py-10"
    >
      <div className="w-[95dvw] lg:w-[450px] bg-card border border-border p-8 rounded-md shadow-sm">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Sign Up</h1>
          <p className="text-muted-foreground text-sm">
            Start tracking your wealth today
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold flex items-center gap-2 text-foreground">
              <FaUser className="text-primary" /> Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              className={`p-3 bg-background border ${errors.username ? "border-danger" : "border-border"} rounded-md outline-none focus:ring-1 focus:ring-primary text-foreground transition-all`}
              placeholder="fintracker_01"
            />
            {errors.username && (
              <span className="text-danger text-xs">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold flex items-center gap-2 text-foreground">
              <FaEnvelope className="text-primary" /> Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              className={`p-3 bg-background border ${errors.email ? "border-danger" : "border-border"} rounded-md outline-none focus:ring-1 focus:ring-primary text-foreground transition-all`}
              placeholder="hello@example.com"
            />
            {errors.email && (
              <span className="text-danger text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold flex items-center gap-2 text-foreground">
              <FaLock className="text-primary" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Must be at least 6 characters",
                  },
                  validate: {
                    hasNumber: (value) =>
                      /\d/.test(value) || "Must include at least one number",
                    hasSpecial: (value) =>
                      /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                      "Must include a special character",
                  },
                })}
                className={`w-full p-3 bg-background border ${
                  errors.password ? "border-danger" : "border-border"
                } rounded-md outline-none focus:ring-1 focus:ring-primary text-foreground transition-all`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* error msg */}
            {errors.password && (
              <span className="text-danger text-xs mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* photo upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold flex items-center gap-2 text-foreground">
              <FaCamera className="text-primary" /> Profile Photo
            </label>
            <div className="group relative border-2 border-dashed border-border rounded-md hover:border-primary transition-colors bg-muted/30">
              <input
                type="file"
                accept="image/*"
                {...register("profilePhoto")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="p-4 text-center">
                <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  Click to upload or drag image
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button with Spinner */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isPending}
            className={`w-full bg-primary text-primary-foreground py-3 rounded-md font-bold shadow-sm mt-2 flex justify-center items-center gap-2 transition-all ${
              isPending ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        <footer className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <a href="/login" className="text-primary font-bold hover:underline">
            Login
          </a>
        </footer>
      </div>
    </motion.div>
  ) : (
    <Skeleton></Skeleton>
  );
};

export default RegisterPage;
