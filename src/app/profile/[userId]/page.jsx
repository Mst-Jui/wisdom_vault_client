"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { getProfileStats } from "@/lib/api/users/action";


const ProfilePage = () => {
  const { userId } = useParams();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await getProfileStats(userId);
        if (res?.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch profile stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!data) {
    return (
      <p className="text-center py-20 text-gray-500">User not found.</p>
    );
  }

  const { userInfo, lessonsCreatedCount, favoritesSavedCount, publicLessons } =
    data;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* ── PROFILE CARD ── */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border rounded-2xl p-6 mb-10">

        {/* Avatar */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center">
          {userInfo?.image && userInfo.image.trim() !== "" ? (
            <Image
              src={userInfo.image}
              alt={userInfo?.name || "User"}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-gray-400">
              {userInfo?.name?.[0]?.toUpperCase() || "?"}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h1 className="text-2xl font-bold">
              {userInfo?.name || "Unknown User"}
            </h1>
            {userInfo?.isPremium && (
              <span className="text-xs bg-yellow-100 text-yellow-700 border border-yellow-300 px-2 py-0.5 rounded-full font-medium">
                ⭐ Premium
              </span>
            )}
            {userInfo?.role === "admin" && (
              <span className="text-xs bg-blue-100 text-blue-700 border border-blue-300 px-2 py-0.5 rounded-full font-medium">
                🛡️ Admin
              </span>
            )}
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-6 mt-3 text-sm text-gray-600">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900">
                {lessonsCreatedCount}
              </p>
              <p className="text-xs text-gray-400">Lessons Created</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900">
                {favoritesSavedCount}
              </p>
              <p className="text-xs text-gray-400">Favorites Saved</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── PUBLIC LESSONS GRID ── */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Public Lessons ({publicLessons?.length || 0})
        </h2>

        {publicLessons?.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-10">
            This user hasn't shared any public lessons yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {publicLessons.map((lesson) => (
              <Link
                key={lesson._id}
                href={`/lessons/${lesson._id}`}
                className="border rounded-2xl overflow-hidden hover:shadow-md transition flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative w-full h-40 bg-gray-100">
                  {lesson.image && lesson.image.trim() !== "" ? (
                    <Image
                      src={lesson.image}
                      alt={lesson.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center">
                      <ImageOff className="w-8 h-8 text-gray-300" />
                    </div>
                  )}

                  {/* Access Level badge */}
                  <span
                    className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium ${lesson.accessLevel === "Premium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                      }`}
                  >
                    {lesson.accessLevel === "Premium" ? "⭐ Premium" : "Free"}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-base line-clamp-1 mb-1">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                    {lesson.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 text-xs text-gray-400">
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                      {lesson.category}
                    </span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                      {lesson.emotionalTone}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-gray-400 mt-3">
                    <span>❤️ {lesson.likesCount || 0}</span>
                    <span>🔖 {lesson.favoritesCount || 0}</span>
                    <span>{lesson.createdAt?.slice(0, 10)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-400 hover:text-gray-600 mt-4 inline-flex items-center gap-1"
      >
        ← Go Back
      </button>
    </div>
  );
};

export default ProfilePage;