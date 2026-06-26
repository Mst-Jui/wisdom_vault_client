"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-[#622ad8]/10 via-background to-[#a8258e]/10">
      <div className="max-w-2xl text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-[#622ad8] to-[#a8258e] bg-clip-text text-transparent"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-3xl md:text-4xl font-bold"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-default-500 text-lg"
        >
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to exploring valuable life lessons.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#622ad8] to-[#a8258e] px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            <Home size={18} />
            Back Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}