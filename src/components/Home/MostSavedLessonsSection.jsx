"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { serverFetch } from "@/lib/api/server";
import Button from "@/components/reusable/Button";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

const MostSavedLessonsSection = () => {
  const [lessons, setLessons] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const session = await authClient.getSession();
        const email = session?.data?.user?.email;

        if (!email) return;

        const userData = await serverFetch(`/api/lessons/most-saved?limit=6`);
        setCurrentUser(userData?.data);
      } catch (error) {
        console.error("User load error:", error);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    const loadMostSaved = async () => {
      try {
        setLoading(true);

        const data = await serverFetch(
          "/api/lessons/most-saved?limit=6"
        );

        setLessons(data?.data || []);
      } catch (error) {
        console.error("Most saved lessons load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMostSaved();
  }, []);

  if (!loading && lessons.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">
          Most Saved{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#622ad8] to-[#a8258e]">
            Lessons
          </span>
        </h1>

        <p className="text-gray-500 mt-2">
          The lessons our community finds most worth keeping
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          Loading...
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson, i) => {
            const isLocked =
              lesson.accessLevel === "Premium" &&
              !currentUser?.isPremium &&
              currentUser?.email !== lesson.creatorEmail;

            return (
              <motion.div
                key={lesson._id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
              >
                <div className="relative border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                  <img
                    src={
                      lesson.image ||
                      "https://images.unsplash.com/photo-1517841905240-472988babdf9"
                    }
                    alt={lesson.title}
                    className="h-48 w-full object-cover"
                  />

                  {isLocked && (
                    <div className="absolute inset-0 z-20 bg-black/20 backdrop-blur-md flex flex-col items-center justify-center">
                      <h3 className="font-bold text-white text-lg">
                        🔒 Premium Lesson
                      </h3>

                      <p className="text-white text-sm mb-3">
                        Upgrade to Premium
                      </p>

                      <Link href="/pricing">
                        <Button>
                          Upgrade Now
                        </Button>
                      </Link>
                    </div>
                  )}

                  <div
                    className={`p-4 ${
                      isLocked
                        ? "blur-sm select-none"
                        : ""
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                        {lesson.category}
                      </span>

                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          lesson.accessLevel === "Premium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {lesson.accessLevel}
                      </span>
                    </div>

                    <h2 className="font-bold text-lg line-clamp-1">
                      {lesson.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                      {lesson.description}
                    </p>

                    <div className="space-y-1 text-sm text-gray-500 mt-3">
                      <p>
                        Tone: {lesson.emotionalTone}
                      </p>

                      <p>
                        By:{" "}
                        {lesson.creatorName ||
                          "Unknown"}
                      </p>

                      <p>
                        🔖{" "}
                        {lesson.favoritesCount || 0}{" "}
                        saves
                      </p>

                      <p>
                        {new Date(
                          lesson.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <Link
                      href={`/lessons/${lesson._id}`}
                    >
                      <Button
                        className="w-full mt-3"
                        disabled={isLocked}
                      >
                        See Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MostSavedLessonsSection;