"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import Footer from "@/components/home/footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.", {
        duration: 4000,
        style: {
          background: "var(--color-success)",
          color: "#fff",
        },
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: "support@fintrack.com",
      subtext: "We'll respond within 24 hours",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: FaPhone,
      title: "Call Us",
      details: "+880 1234-567890",
      subtext: "Mon-Fri from 9am to 6pm",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: "Dhaka, Bangladesh",
      subtext: "123 Finance Street, Gulshan",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: FaClock,
      title: "Working Hours",
      details: "Monday - Friday",
      subtext: "9:00 AM - 6:00 PM (GMT+6)",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <>
      <Toaster position="top-center" />
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
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground">
                Have questions? We'd love to hear from you. Send us a message
                and we'll respond as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24 mb-12">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg ${info.bgColor} flex items-center justify-center mb-4`}
                    >
                      <Icon className={`${info.color} text-xl`} />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">
                      {info.title}
                    </h3>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {info.details}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {info.subtext}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Contact Form and Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-card border border-border rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Fill out the form below and we'll get back to you shortly
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Tell us more about your inquiry..."
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Map and Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Map Placeholder */}
                <div className="bg-card border border-border rounded-xl overflow-hidden aspect-video">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center">
                    <div className="text-center">
                      <FaMapMarkerAlt className="text-6xl text-primary/40 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Map Location Placeholder
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        How do I reset my password?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Click on "Forgot Password" on the login page and follow
                        the instructions sent to your email.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        Is my financial data secure?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Yes, we use bank-level encryption to protect your data
                        and never share it with third parties.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        Can I export my data?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Yes, you can export your transactions and reports in CSV
                        or PDF format from your dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
