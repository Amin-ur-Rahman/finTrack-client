"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaChartPie,
  FaBullseye,
  FaBell,
  FaLock,
  FaMobile,
  FaChartLine,
} from "react-icons/fa";

const AboutSection = () => {
  const features = [
    {
      icon: FaChartPie,
      title: "Expense Tracking",
      description:
        "Record and categorize all your income and expenses in one place. Never lose track of where your money goes.",
    },
    {
      icon: FaBullseye,
      title: "Savings Goals",
      description:
        "Set financial goals and track your progress. Stay motivated to achieve your savings targets.",
    },
    {
      icon: FaBell,
      title: "Budget Alerts",
      description:
        "Get notified when you're approaching your budget limits. Stay in control of your spending.",
    },
    {
      icon: FaChartLine,
      title: "Smart Insights",
      description:
        "AI-powered analytics reveal your spending patterns and provide personalized recommendations.",
    },
    {
      icon: FaMobile,
      title: "Responsive Design",
      description:
        "Access your financial data anywhere, anytime. Fully optimized for mobile, tablet, and desktop.",
    },
    {
      icon: FaLock,
      title: "Secure & Private",
      description:
        "Your financial data is encrypted and protected. We take your privacy seriously.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            About FinTrack
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Personal Finance Companion
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            FinTrack is designed to help you take control of your finances with
            intelligent tracking, budgeting, and insights. Make better financial
            decisions and achieve your money goals faster.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gradient-to-br from-primary/5 to-success/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Our Mission
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We believe everyone deserves financial clarity and control. FinTrack
            empowers users to understand their spending habits, make informed
            decisions, and build a secure financial future through simple,
            intuitive tools and data-driven insights.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
