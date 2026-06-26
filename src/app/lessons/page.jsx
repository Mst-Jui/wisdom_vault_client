"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BiReset } from "react-icons/bi";

import { authClient } from "@/lib/auth-client";
import { serverFetch } from "@/lib/api/server";
import Button from "@/components/reusable/Button";
import { ImageOff } from "lucide-react";

const LessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setTone("");
    setSortBy("newest");
  };

  // current user load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const session = await authClient.getSession();

        const email = session?.data?.user?.email;

        if (!email) return;

        const userData = await serverFetch(
          `/api/users/${email}`
        );

        setCurrentUser(userData?.data);
      } catch (error) {
        console.error("User load error:", error);
      }
    };

    loadUser();
  }, []);

  // lessons load
  useEffect(() => {
    const loadLessons = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (search) {
          params.append("search", search);
        }

        if (category) {
          params.append("category", category);
        }

        if (tone) {
          params.append("emotionalTone", tone);
        }

        if (sortBy) {
          params.append("sort", sortBy);
        }

        const data = await serverFetch(
          `/api/lessons?${params.toString()}`
        );

        setLessons(data?.data || []);
      } catch (error) {
        console.error("Lessons load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLessons();
  }, [search, category, tone, sortBy]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        Loading...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">
          Public Life Lessons
        </h1>

        <p className="text-gray-500 mt-2">
          Discover meaningful lessons shared by the community
        </p>
      </div>

      {/* filters */}
      <div className="grid md:grid-cols-5 gap-3 mb-8">
        <input
          type="text"
          placeholder="Search lessons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-4 py-2 outline-none"
        >
          <option value="">All Categories</option>
          <option value="Personal Growth">
            Personal Growth
          </option>
          <option value="Career">Career</option>
          <option value="Relationships">
            Relationships
          </option>
          <option value="Mindset">Mindset</option>
          <option value="Mistakes Learned">
            Mistakes Learned
          </option>
        </select>

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="border rounded-lg px-4 py-2 outline-none"
        >
          <option value="">All Tones</option>
          <option value="Motivational">
            Motivational
          </option>
          <option value="Sad">Sad</option>
          <option value="Realization">
            Realization
          </option>
          <option value="Gratitude">
            Gratitude
          </option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg px-4 py-2 outline-none"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="mostSaved">
            Most Saved
          </option>
        </select>

        <button
          onClick={handleReset}
          className="border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <BiReset size={20} />
          Reset
        </button>
      </div>

      {/* lessons */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson) => {
          const isLocked =
            lesson.accessLevel === "Premium" &&
            !currentUser?.isPremium &&
            currentUser?.email !==
            lesson.creatorEmail;

          return (
            <div
              key={lesson._id}
              className="relative border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              

              {
                lesson.image ? (
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-48 w-full bg-gray-100 flex flex-col items-center justify-center">
                    <ImageOff className="w-12 h-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">No Image Available</p>
                  </div>
                )
              }

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
                className={`p-4 ${isLocked
                    ? "blur-sm select-none"
                    : ""
                  }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs px-2 py-1 rounded-full">
                    {lesson.category}
                  </span>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${lesson.accessLevel ===
                        "Premium"
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
                    Tone:{" "}
                    {lesson.emotionalTone}
                  </p>

                  <p>
                    By:{" "}
                    {lesson.creatorName ||
                      "Unknown"}
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
          );
        })}
      </div>

      {!lessons.length && (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold">
            No lessons found
          </h3>

          <p className="text-gray-500 mt-2">
            Try changing filters or search
            keywords.
          </p>
        </div>
      )}
    </section>
  );
};

export default LessonsPage;