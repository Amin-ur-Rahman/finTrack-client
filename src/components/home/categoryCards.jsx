"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaUtensils,
  FaCar,
  FaHome,
  FaShoppingCart,
  FaFilm,
  FaGraduationCap,
  FaHospital,
  FaBolt,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Food & Dining",
    icon: FaUtensils,
    color: "bg-orange-500",
    bgColor: "bg-orange-500/10",
    description: "Track your restaurant and grocery expenses",
  },
  {
    id: 2,
    name: "Transport",
    icon: FaCar,
    color: "bg-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Monitor fuel, taxi, and commute costs",
  },
  {
    id: 3,
    name: "Housing",
    icon: FaHome,
    color: "bg-purple-500",
    bgColor: "bg-purple-500/10",
    description: "Manage rent, maintenance, and utilities",
  },
  {
    id: 4,
    name: "Shopping",
    icon: FaShoppingCart,
    color: "bg-pink-500",
    bgColor: "bg-pink-500/10",
    description: "Keep tabs on retail and online purchases",
  },
  {
    id: 5,
    name: "Entertainment",
    icon: FaFilm,
    color: "bg-red-500",
    bgColor: "bg-red-500/10",
    description: "Track movies, games, and leisure spending",
  },
  {
    id: 6,
    name: "Education",
    icon: FaGraduationCap,
    color: "bg-indigo-500",
    bgColor: "bg-indigo-500/10",
    description: "Monitor tuition, books, and courses",
  },
  {
    id: 7,
    name: "Healthcare",
    icon: FaHospital,
    color: "bg-teal-500",
    bgColor: "bg-teal-500/10",
    description: "Track medical bills and medications",
  },
  {
    id: 8,
    name: "Utilities",
    icon: FaBolt,
    color: "bg-yellow-500",
    bgColor: "bg-yellow-500/10",
    description: "Manage electricity, water, and internet",
  },
];

const CategoryCards = () => {
  // Auto-scroll animation for cards
  const scrollAnimation = {
    x: [0, -100 * (categories.length / 2)],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
    },
  };

  return (
    <section className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Track Every Category
          </h2>
          <p className="text-lg text-muted-foreground">
            Organize your expenses with smart categories. Know exactly where
            your money goes.
          </p>
        </motion.div>
      </div>

      {/* Scrolling Cards Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <motion.div
          animate={scrollAnimation}
          className="flex gap-6 py-4"
          style={{ width: "fit-content" }}
        >
          {/* Render categories twice for seamless loop */}
          {[...categories, ...categories].map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={`${category.id}-${index}`}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 w-72 bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${category.bgColor} flex items-center justify-center mb-4`}
                >
                  <Icon className={`${category.color} text-2xl`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Grid View for Mobile */}
      <div className="container mx-auto px-4 md:px-8 mt-8 md:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.slice(0, 4).map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center mb-3`}
                >
                  <Icon className={`${category.color} text-lg`} />
                </div>
                <h4 className="font-semibold text-foreground mb-1">
                  {category.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
