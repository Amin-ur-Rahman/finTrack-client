"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosPublic from "@/api/axiosPublic";
import Swal from "sweetalert2";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useUser } from "@/hooks/useUser";
import Skeleton from "@/components/loading/skeleton";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (credentials) => {
      const res = await axiosPublic.post("/api/auth/login", credentials);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      Swal.fire({
        title: `Welcome back, ${data.user.username}!`,
        text: "Redirecting to your dashboard...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "#1a1a1a",
        color: "#fff",
      });
      router.push("/");
    },
    onError: (err) => {
      Swal.fire({
        title: "Access Denied",
        text:
          err.response?.data?.message || "Check your credentials and try again",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    },
  });

  const onSubmit = (data) => mutate(data);

  return isLoading ? (
    <div className="flex justify-center items-center py-20 min-h-[80vh]">
      <div className="w-[95dvw] lg:w-[450px] bg-card border border-border p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Login</h1>
          <p className="text-muted-foreground text-sm">
            Manage your finances smarter
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" />
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg outline-none focus:border-primary transition-all"
                placeholder="name@example.com"
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded-lg outline-none focus:border-primary transition-all"
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            disabled={isPending}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-bold hover:brightness-110 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/registration"
              className="text-primary font-bold hover:underline underline-offset-4"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  ) : (
    <Skeleton></Skeleton>
  );
};

export default LoginPage;
