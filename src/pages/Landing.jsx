import React from "react";
import { motion } from "framer-motion";
import UrlForm from "@/components/UrlForm";
import Services from "@/components/Services";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.4,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Landing = () => {
  return (
    <>
      {/* Hero Section */}
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        {/* Animated Heading */}
        <motion.h1
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6"
        >
          {["Simplify your links with", "NepLinkr"].map((line, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={textVariants}
              className={
                i === 1
                  ? "block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                  : "block"
              }
            >
              {line}
            </motion.span>
          ))}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-xl sm:text-2xl lg:text-3xl text-gray-600 max-w-3xl mb-10 leading-relaxed"
        >
          Shorten long URLs, share them easily, and track clicks with smart analytics.
          No ads, no clutter — just simple, powerful link management.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="#shorten"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="px-8 py-4 text-lg sm:text-xl bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300 shadow-lg"
        >
          Get Started
        </motion.a>
      </main>

      {/* URL Shortener Form Section */}
      <section
        id="shorten"
        className="-mt-8 scroll-mt-20 px-4 relative z-10"
      >
        <UrlForm />
      </section>

      {/* Services/Benefits Section */}
      <section className=" px-4">
        <Services />
      </section>
    </>
  );
};

export default Landing;

