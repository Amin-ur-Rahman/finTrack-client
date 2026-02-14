"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaChartLine,
  FaWallet,
  FaPiggyBank,
} from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-success/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-primary">
                Smart Expense Analytics
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Take Control of Your{" "}
              <span className="text-primary">Financial Future</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Track expenses, set budgets, achieve savings goals, and get
              intelligent insights to make better financial decisions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25 group"
              >
                Get Started Free
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-all"
              >
                Sign In
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border"
            >
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-bold text-foreground">
                  10K+
                </p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-bold text-foreground">
                  ৳50M+
                </p>
                <p className="text-sm text-muted-foreground">Tracked</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-bold text-foreground">
                  98%
                </p>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-1 gap-6">
              {/* Feature Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FaChartLine className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Smart Analytics
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Get AI-powered insights on your spending patterns and
                      financial habits
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                    <FaWallet className="text-success" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Budget Planning
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Set monthly budgets and get alerts when you're close to
                      limits
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center flex-shrink-0">
                    <FaPiggyBank className="text-danger" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Savings Goals
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Track progress toward your financial goals and stay
                      motivated
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
