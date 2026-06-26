"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { serverFetch } from "@/lib/api/server"; // adjust path to match your project

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

const TopContributorsSection = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContributors = async () => {
      try {
        setLoading(true);
        const data = await serverFetch(`/api/top-contributors?limit=6`);
        setContributors(data?.data || []);
      } catch (error) {
        console.error("Top contributors load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContributors();
  }, []);

  if (!loading && contributors.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Top contributors of  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#622ad8] to-[#a8258e]">
           the Week
          </span>
        </h1>
        <p className="text-gray-500 mt-2">
          Members who shared the most wisdom in the last 7 days
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {contributors.map((contributor, i) => (
            <motion.div
              key={contributor.userId}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <Link
                href={`/profile/${contributor.userId}`}
                className="relative border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col items-center p-5 gap-3 text-center"
              >
                <img
                  src={
                    contributor.image ||
                    "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(contributor.name || "U") +
                    "&background=622ad8&color=fff"
                  }
                  alt={contributor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <p className="font-bold text-sm line-clamp-1">
                    {contributor.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {contributor.lessonCount} lesson
                    {contributor.lessonCount !== 1 ? "s" : ""} this week
                  </p>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                  Contributor
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopContributorsSection;