"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SLIDES = [
  {
    id: 1,
    badge: "Welcome to Wisdom Vault",
    heading: "Preserve the lessons",
    highlight: "life teaches you",
    description:
      "You've learned so much — from mistakes, from growth, from people. Don't let those lessons fade. Wisdom Vault is your personal space to write them down and carry them forward.",
    cta: { label: "Start Writing", href: "/dashboard/user/add-lessons" },
    ctaSecondary: { label: "Browse Lessons", href: "/lessons" },
  },
  {
    id: 2,
    badge: "Community Wisdom",
    heading: "Learn from the",
    highlight: "experiences of others",
    description:
      "Browse real life lessons shared by people navigating careers, relationships, mindset shifts, and mistakes made. Grow faster by reading what others wish they knew earlier.",
    cta: { label: "Explore Public Lessons", href: "/lessons" },
    ctaSecondary: { label: "Join Free", href: "/register" },
  },
  {
    id: 3,
    badge: "Go Premium",
    heading: "Unlock the full",
    highlight: "Wisdom Vault experience",
    description:
      "Premium members get access to exclusive lessons, can create paid content, and enjoy priority listing in the community. One payment, lifetime access.",
    cta: { label: "View Pricing", href: "/pricing" },
    ctaSecondary: { label: "Learn More", href: "/about" },
  },
];

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: (dir) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  }),
};

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => {
    const index = (current - 1 + SLIDES.length) % SLIDES.length;
    setDirection(-1);
    setCurrent(index);
  };

  const next = () => {
    const index = (current + 1) % SLIDES.length;
    setDirection(1);
    setCurrent(index);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
      setDirection(1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <div className="relative w-full min-h-[90vh] overflow-hidden flex items-center">
      {/* Decorative blobs — static, not animated so they don't flicker on slide change */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "linear-gradient(135deg, #622ad8, #a8258e)" }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "linear-gradient(135deg, #a8258e, #622ad8)" }}
      />

      {/* Slide content */}
      <div className="relative w-full max-w-4xl mx-auto px-6 sm:px-12 py-24 text-center z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col items-center"
          >
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="inline-block text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(98,42,216,0.3), rgba(168,37,142,0.3))",
              }}
            >
              {slide.badge}
            </motion.span>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-tight"
            >
              {slide.heading}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #a78bfa, #f472b6)",
                }}
              >
                {slide.highlight}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.4 }}
              className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              {slide.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href={slide.cta.href}
                className="px-7 py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #622ad8, #a8258e)",
                }}
              >
                {slide.cta.label}
              </Link>
              <Link
                href={slide.ctaSecondary.href}
                className="px-7 py-3 rounded-xl font-semibold text-sm border border-gray-300 hover:border-gray-400 transition-colors"
              >
                {slide.ctaSecondary.label}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
        aria-label="Previous slide"
      >
        <IoIosArrowBack />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
        aria-label="Next slide"
      >
        <IoIosArrowForward />
      </button>

      {/* Dot navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              background:
                i === current
                  ? "linear-gradient(135deg, #622ad8, #a8258e)"
                  : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;