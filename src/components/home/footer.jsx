"use client";
import React from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "/#services" },
      { name: "Budget Planning", href: "/#services" },
      { name: "Analytics", href: "/#services" },
      { name: "Security", href: "/about" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Community", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Disclaimer", href: "#" },
    ],
  };

  const socialLinks = [
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/aminur.rahman.333043",
      label: "Facebook",
    },

    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/aminur-rahman679/",
      label: "LinkedIn",
    },
    {
      icon: FaGithub,
      href: "https://github.com/Amin-ur-Rahman",
      label: "GitHub",
    },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">
                  F
                </span>
              </div>
              <span className="text-xl font-bold text-foreground">
                FinTrack
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed max-w-sm">
              Your personal finance companion. Track expenses, set budgets, and
              achieve your financial goals with smart insights.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FaEnvelope className="text-primary" size={14} />
                <span>support@fintrack.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FaPhone className="text-primary" size={14} />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FaMapMarkerAlt className="text-primary" size={14} />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border pt-8 pb-8">
          <div className="max-w-md mx-auto md:mx-0">
            <h3 className="text-sm font-bold text-foreground mb-3">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get financial tips and product updates delivered to your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} FinTrack. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>

          {/* Made with love */}
          <p className="text-sm text-muted-foreground text-center md:text-right">
            Made with ❤️ in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
