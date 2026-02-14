"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaClock, FaUser, FaArrowRight } from "react-icons/fa";
import Footer from "@/components/landing/Footer";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Simple Ways to Save Money Every Month",
      excerpt:
        "Discover practical tips to cut unnecessary expenses and boost your savings without sacrificing your lifestyle.",
      author: "Sarah Johnson",
      date: "Feb 10, 2026",
      readTime: "5 min read",
      category: "Savings",
      image: "/blog-1.jpg",
    },
    {
      id: 2,
      title: "Understanding Your Spending Patterns",
      excerpt:
        "Learn how to analyze your spending habits and identify areas where you can make better financial decisions.",
      author: "Michael Chen",
      date: "Feb 8, 2026",
      readTime: "7 min read",
      category: "Analytics",
      image: "/blog-2.jpg",
    },
    {
      id: 3,
      title: "Budget Planning for Beginners",
      excerpt:
        "A comprehensive guide to creating your first budget and sticking to it. Master the basics of financial planning.",
      author: "Emily Davis",
      date: "Feb 5, 2026",
      readTime: "6 min read",
      category: "Budgeting",
      image: "/blog-3.jpg",
    },
    {
      id: 4,
      title: "How to Set Realistic Financial Goals",
      excerpt:
        "Setting achievable financial goals is the first step to financial freedom. Here's how to do it right.",
      author: "David Williams",
      date: "Feb 3, 2026",
      readTime: "4 min read",
      category: "Goals",
      image: "/blog-4.jpg",
    },
    {
      id: 5,
      title: "The Psychology of Money Management",
      excerpt:
        "Understand the emotional and psychological factors that influence your financial decisions.",
      author: "Lisa Anderson",
      date: "Feb 1, 2026",
      readTime: "8 min read",
      category: "Psychology",
      image: "/blog-5.jpg",
    },
    {
      id: 6,
      title: "Emergency Fund 101: Why You Need One",
      excerpt:
        "Learn why having an emergency fund is crucial and how to build one that works for your situation.",
      author: "James Taylor",
      date: "Jan 28, 2026",
      readTime: "5 min read",
      category: "Savings",
      image: "/blog-6.jpg",
    },
  ];

  const categories = [
    "All",
    "Savings",
    "Budgeting",
    "Analytics",
    "Goals",
    "Psychology",
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-success/10 py-20">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                FinTrack Blog
              </h1>
              <p className="text-lg text-muted-foreground">
                Financial tips, insights, and stories to help you manage your
                money better
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-10">
          <div className="container mx-auto px-4 md:px-8 py-4">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all hover:bg-primary hover:text-primary-foreground bg-muted text-foreground"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all group"
                >
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-success/20 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold text-primary/20">
                        {post.id}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <FaUser size={12} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock size={12} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Read More Link */}
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                    >
                      Read More <FaArrowRight size={12} />
                    </Link>

                    {/* Date */}
                    <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                      {post.date}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-semibold transition-all">
                Load More Posts
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-success/10">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Stay Updated
              </h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to our newsletter and get the latest financial tips
                delivered to your inbox
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-md"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default BlogPage;
