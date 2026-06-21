"use client";

import { useSession } from "@/lib/auth-client";
import { getDashboardOverview } from "@/lib/api/users/action"; // adjust path to match your project
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  BookOpen,
  Bookmark,
  Heart,
  Sparkles,
  Plus,
  Library,
  Star,
  ArrowRight,
} from "lucide-react";

const BRAND = {
  violet: "#622ad8",
  magenta: "#a8258e",
};

const formatDayLabel = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  const weeks = Math.floor(diffDays / 7);
  if (weeks === 1) return "1 week ago";
  return `${weeks} weeks ago`;
};

const UserDashboardHomePage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [overview, setOverview] = useState({
    totalLessonsCreated: 0,
    totalFavoritesSaved: 0,
    totalLikesReceived: 0,
    recentLessons: [],
    weeklyActivity: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchOverview = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await getDashboardOverview(user.id);
      if (res?.success) {
        setOverview(res.data);
      }
    } catch (err) {
      console.error("Failed to load dashboard overview:", err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Initial load
  useEffect(() => {
    setLoading(true);
    fetchOverview();
  }, [fetchOverview]);

  // Re-fetch whenever the user comes back to this tab/page — this is what
  // keeps "Community Reactions" and other counts fresh after liking a lesson
  // on a different page, without needing a manual reload.
  useEffect(() => {
    const handleFocus = () => fetchOverview();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") fetchOverview();
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [fetchOverview]);

  const chartData = (overview.weeklyActivity || []).map((day) => ({
    name: formatDayLabel(day.date),
    contributions: day.count,
  }));

  const formatLikes = (count) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return `${count}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="animate-spin h-10 w-10 border-4 border-t-transparent rounded-full"
          style={{ borderColor: BRAND.magenta, borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  const statCards = [
    {
      label: "Lessons Created",
      value: overview.totalLessonsCreated,
      icon: BookOpen,
    },
    {
      label: "Saved Favorites",
      value: overview.totalFavoritesSaved,
      icon: Bookmark,
    },
    {
      label: "Community Reactions",
      value: `${formatLikes(overview.totalLikesReceived)} Likes`,
      icon: Heart,
    },
  ];

  const brandGradient = `linear-gradient(135deg, ${BRAND.violet}, ${BRAND.magenta})`;

  return (
    <div className="min-h-screen p-5 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* ---------------- HEADER ---------------- */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div>
            <p
              className="text-sm font-medium mb-1 tracking-wide uppercase"
              style={{ color: BRAND.magenta }}
            >
              Dashboard Overview
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: brandGradient }}
              >
                {user?.name?.split(" ")[0] || "there"}
              </span>
            </h1>
          </div>

          <Link href={'/dashboard/user/profile'}>
            <div className="flex items-center gap-4 border border-gray-300 rounded-2xl px-5 py-3">
              <div className="relative">
                <img
                  src={user?.image || "/default-avatar.png"}
                  alt={user?.name || "User"}
                  className="w-14 h-14 rounded-full object-cover ring-2"
                  style={{ "--tw-ring-color": `${BRAND.violet}99` }}
                />
                {user?.isPremium && (
                  <span
                    className="absolute -bottom-1 -right-1 rounded-full p-1 ring-2 ring-gray-900"
                    style={{ backgroundImage: brandGradient }}
                  >
                    <Star size={10} className="text-white" fill="currentColor" />
                  </span>
                )}
              </div>
              <div>
                <p className="font-semibold leading-tight">{user?.name}</p>
                <p
                  className="text-xs font-medium"
                  style={{
                    color: user?.isPremium ? BRAND.magenta : "#6b7280",
                  }}
                >
                  {user?.isPremium ? "Premium Member" : "Free Member"}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* ---------------- STAT CARDS ---------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {statCards.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="relative border border-gray-300 rounded-2xl p-6 overflow-hidden group hover:border-gray-700 transition-colors"
            >
              <div
                className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ backgroundImage: brandGradient }}
              />
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                style={{ backgroundImage: brandGradient }}
              >
                <Icon size={20} className="text-white" />
              </div>
              <p className="text-3xl font-bold tracking-tight">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}

          {/* Premium / Upgrade card */}
          <div className="relative border border-gray-300 rounded-2xl p-6 overflow-hidden flex flex-col justify-between hover:border-gray-700">
            <div
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4"
              style={{ backgroundImage: brandGradient }}
            >
              <Sparkles size={20} className="text-white" />
            </div>
            {user?.isPremium ? (
              <div>
                <p className="text-lg font-bold" style={{ color: BRAND.magenta }}>
                  Premium Active
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Full access unlocked
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-500 mb-2">
                  Unlock premium lessons & perks
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
                  style={{ color: BRAND.magenta }}
                >
                  Upgrade now <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ---------------- MAIN GRID ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recently Added Lessons */}
          <div className="border border-gray-300 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold">Recently Added</h2>
              <Link
                href="/dashboard/user/my-lessons"
                className="text-xs font-medium transition-colors"
                style={{ color: BRAND.magenta }}
              >
                View all
              </Link>
            </div>

            {overview.recentLessons.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Library size={28} className=" mb-3" />
                <p className="text-sm">
                  No lessons added yet.
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {overview.recentLessons.map((lesson) => (
                  <li key={lesson._id}>
                    <Link
                      href={`/lessons/${lesson._id}`}
                      className="block rounded-xl px-3 py-2.5 -mx-3 hover:bg-gray-200/60 transition-colors"
                    >
                      <p className="font-medium text-sm truncate">
                        {lesson.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {lesson.category} • {timeAgo(lesson.createdAt)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="border border-gray-300 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-5">Quick Shortcuts</h2>
            <div className="space-y-3">
              <Link
                href="/dashboard/user/add-lessons"
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
                style={{ backgroundImage: brandGradient }}
              >
                <span className="flex items-center gap-2">
                  <Plus size={16} /> Add New Lesson
                </span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/dashboard/user/my-lessons"
                className="flex items-center justify-between w-full bg-gray-300 hover:bg-gray-400 px-4 py-3 rounded-xl font-medium text-sm transition-colors"
              >
                <span className="flex items-center gap-2">
                  <BookOpen size={16} /> My Lessons
                </span>
                <ArrowRight size={16} className="text-gray-500" />
              </Link>

              <Link
                href="/dashboard/user/my-favorites"
                className="flex items-center justify-between w-full bg-gray-300 hover:bg-gray-400 px-4 py-3 rounded-xl font-medium text-sm transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Bookmark size={16} /> View Favorites
                </span>
                <ArrowRight size={16} className="text-gray-500" />
              </Link>

              {user?.isPremium ? (
                <div className="flex items-center justify-center gap-2 w-full bg-gray-800/50 border border-gray-800 px-4 py-3 rounded-xl text-sm text-gray-500 font-medium">
                  <Star size={14} style={{ color: BRAND.magenta }} />
                  You&apos;re already Premium
                </div>
              ) : (
                <Link
                  href="/pricing"
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${BRAND.magenta}, ${BRAND.violet})`,
                  }}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles size={16} /> Upgrade to Premium
                  </span>
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>

          {/* Weekly Reflections Activity */}
          <div className="border border-gray-300 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-5">Weekly Activity</h2>
            <div className="h-56">
              {chartData.every((d) => d.contributions === 0) ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <Sparkles size={24} className="text-gray-700 mb-3" />
                  <p className="text-sm text-gray-500">
                    No lessons created in the last 7 days.
                  </p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={BRAND.magenta} />
                        <stop offset="100%" stopColor={BRAND.violet} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="name"
                      stroke="#6b7280"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#6b7280"
                      allowDecimals={false}
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      contentStyle={{
                        backgroundColor: "#111827",
                        border: "1px solid #1f2937",
                        borderRadius: "10px",
                        color: "#fff",
                        fontSize: "13px",
                      }}
                    />
                    <Bar
                      dataKey="contributions"
                      fill="url(#barGradient)"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={28}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHomePage;