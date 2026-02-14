"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaExchangeAlt,
  FaChartPie,
  FaBullseye,
  FaChartLine,
  FaBell,
  FaFilter,
} from "react-icons/fa";
import Link from "next/link";

const ServicesSection = () => {
  const services = [
    {
      icon: FaExchangeAlt,
      title: "Transaction Management",
      description:
        "Record and manage all your income and expenses with ease. Add notes, categorize, and track every transaction effortlessly.",
      features: [
        "Add income and expense entries",
        "Categorize transactions",
        "Edit and delete with confirmation",
        "Add optional notes",
      ],
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: FaChartPie,
      title: "Budget Planning",
      description:
        "Set monthly budgets for each category and get alerts when you're approaching your limits. Stay in control of your spending.",
      features: [
        "Set category-wise budgets",
        "Real-time budget tracking",
        "Overspending alerts",
        "Visual progress indicators",
      ],
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: FaBullseye,
      title: "Savings Goals",
      description:
        "Define your financial goals and track progress. Whether it's a vacation or emergency fund, stay motivated to save.",
      features: [
        "Set custom savings targets",
        "Track monthly contributions",
        "View remaining amounts",
        "Progress visualization",
      ],
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: FaChartLine,
      title: "Financial Insights",
      description:
        "Get intelligent insights based on your spending patterns. Understand your financial habits and make data-driven decisions.",
      features: [
        "Spending pattern analysis",
        "Category breakdown charts",
        "Monthly summaries",
        "Personalized recommendations",
      ],
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: FaFilter,
      title: "Advanced Filtering",
      description:
        "Search and filter transactions by category, date range, or type. Find exactly what you need in seconds.",
      features: [
        "Search by keyword",
        "Filter by category",
        "Date range selection",
        "Income/Expense sorting",
      ],
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      icon: FaBell,
      title: "Bill Reminders",
      description:
        "Never miss a payment again. Set up reminders for recurring bills and get notified before due dates.",
      features: [
        "Add recurring bills",
        "Due date reminders",
        "Payment tracking",
        "Paid/unpaid indicators",
      ],
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
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
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Manage Your Finances
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive financial management tools designed to help you track,
            budget, and save smarter.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all group"
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl ${service.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`${service.color} text-2xl`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Take Control?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances
            smarter with FinTrack.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25"
          >
            Start Your Financial Journey
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
