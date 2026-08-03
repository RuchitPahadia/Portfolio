"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { contactData } from "@/data/contact";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const mailtoUrl = `mailto:${contactData.email}?subject=Portfolio Contact from ${encodeURIComponent(
      name
    )}&body=${encodeURIComponent(
      `Hello Ruchit,\n\n${message}\n\nBest regards,\n${name}\nEmail: ${email}`
    )}`;
    window.location.href = mailtoUrl;
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return (
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        );
      case "linkedin":
        return (
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        );
      case "leetcode":
        return (
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.777 9.778a3.758 3.758 0 0 0 .002 5.314c.084.083.17.163.26.24l-3.02 3.021a1.242 1.242 0 0 0 1.758 1.758l3.02-3.02c.078.09.158.176.24.26a3.758 3.758 0 0 0 5.317-.002l9.778-9.778A1.374 1.374 0 0 0 24 6.741c0-.363-.141-.71-.393-.962L17.659.414A1.361 1.361 0 0 0 16.697 0h-3.214zm.014 2.766h2.955l4.896 4.897-8.318 8.318a1.008 1.008 0 0 1-1.424 0 1.008 1.008 0 0 1 0-1.426l5.77-5.77a1.008 1.008 0 1 0-1.426-1.426l-5.77 5.77a3.024 3.024 0 0 0 0 4.276 3.024 3.024 0 0 0 4.276 0l8.318-8.318-2.956-2.956-6.425 6.425a1.008 1.008 0 1 0 1.426 1.426l6.425-6.425z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="contact" className="py-16 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-accent/5 dark:bg-accent/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-accent font-semibold tracking-wider text-sm uppercase mb-3"
          >
            <MessageSquare size={16} />
            <span>Connect</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            Get In Touch
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-accent mt-4 mx-auto rounded-full"
          />
        </div>

        {/* Content grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto"
        >
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <motion.p
                variants={itemVariants}
                className="text-lg text-muted leading-relaxed"
              >
                I'm actively looking for opportunities as an ML Engineer, Data Scientist, or AI Developer. Whether you have a question or want to discuss collaborating, feel free to reach out!
              </motion.p>

              {/* Info Cards */}
              <div className="space-y-4">
                {/* Email Card */}
                <motion.a
                  variants={itemVariants}
                  href={`mailto:${contactData.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card-bg border border-card-border hover:border-accent/40 shadow-sm transition-all duration-300 group"
                >
                  <div className="p-3 rounded-lg bg-accent/5 border border-accent/10 text-accent group-hover:bg-accent/10 transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-muted font-bold">Email</h3>
                    <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                      {contactData.email}
                    </p>
                  </div>
                </motion.a>

                {/* Phone Card */}
                <motion.a
                  variants={itemVariants}
                  href={`tel:${contactData.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card-bg border border-card-border hover:border-accent/40 shadow-sm transition-all duration-300 group"
                >
                  <div className="p-3 rounded-lg bg-accent/5 border border-accent/10 text-accent group-hover:bg-accent/10 transition-colors">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-muted font-bold">Phone</h3>
                    <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                      {contactData.phone}
                    </p>
                  </div>
                </motion.a>

                {/* Location Card */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card-bg border border-card-border shadow-sm group"
                >
                  <div className="p-3 rounded-lg bg-accent/5 border border-accent/10 text-accent">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-muted font-bold">Location</h3>
                    <p className="text-sm font-semibold text-foreground">
                      {contactData.address}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 mt-8 lg:mt-0"
            >
              {[
                { name: "GitHub", url: contactData.github },
                { name: "LinkedIn", url: contactData.linkedin },
                { name: "LeetCode", url: contactData.leetcode }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted-light border border-card-border text-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 transform hover:-translate-y-1"
                  title={social.name}
                >
                  {getSocialIcon(social.name)}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-card-bg border border-card-border/80 shadow-md relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted-light border border-card-border focus:border-accent focus:ring-1 focus:ring-accent text-sm text-foreground placeholder:text-muted/60 outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted-light border border-card-border focus:border-accent focus:ring-1 focus:ring-accent text-sm text-foreground placeholder:text-muted/60 outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-1.5">
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted-light border border-card-border focus:border-accent focus:ring-1 focus:ring-accent text-sm text-foreground placeholder:text-muted/60 outline-none transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white font-medium hover:bg-accent/90 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 cursor-pointer"
              >
                <span>Send Message</span>
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
