"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Button from "@/components/reusable/Button";
import Image from "next/image";
import { FcLock } from "react-icons/fc";

const REPORT_REASONS = [
  "Spam or misleading",
  "Inappropriate content",
  "Hate speech or harassment",
  "False information",
  "Other",
];

const LessonDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState(REPORT_REASONS[0]);
  const [reporting, setReporting] = useState(false);

  // ---------------- FETCH LESSON ----------------
  useEffect(() => {
    if (!id) return;

    const fetchLesson = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${id}`
        );
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to load lesson");
        }

        setLesson(data.data);
        setLiked(
          user?.id ? (data.data.likes || []).includes(user.id) : false
        );
      } catch (err) {
        toast.error(err.message || "Failed to load lesson");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id, user?.id]);

  // ---------------- CHECK FAVORITE STATUS ----------------
  useEffect(() => {
    if (!user?.id || !id) return;

    const checkFavorite = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/check?lessonId=${id}&userId=${user.id}`
        );
        const data = await res.json();
        if (res.ok && data.success) {
          setSaved(data.saved);
        }
      } catch (err) {
        // non-critical, fail silently
      }
    };

    checkFavorite();
  }, [id, user?.id]);

  // ---------------- LIKE TOGGLE ----------------
  const handleLike = async () => {
    if (!user) {
      toast.error("Please log in to like");
      return router.push("/login");
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${id}/like`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update like");
      }

      setLesson((prev) => ({
        ...prev,
        likesCount: data.likesCount,
        likes: data.likes,
      }));
      setLiked(data.liked);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ---------------- FAVORITE TOGGLE ----------------
  const handleFavorite = async () => {
    if (!user) {
      toast.error("Please log in to save");
      return router.push("/login");
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/toggle`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lessonId: id, userId: user.id }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update favorites");
      }

      setSaved(data.saved);
      setLesson((prev) => ({
        ...prev,
        favoritesCount: data.favoritesCount,
      }));
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ---------------- COMMENT ----------------
  const handleComment = async () => {
    if (!user) {
      toast.error("Please log in to comment");
      return router.push("/login");
    }

    if (!comment.trim()) return;

    try {
      setPosting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lessonId: id,
            userId: user.id,
            userName: user.name,
            userPhoto: user.image,
            text: comment,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to post comment");
      }

      setLesson((prev) => ({
        ...prev,
        comments: [data.comment, ...(prev.comments || [])],
      }));
      setComment("");
      toast.success("Comment posted");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPosting(false);
    }
  };

  // ---------------- REPORT ----------------
  const handleReport = async () => {
    if (!user) {
      toast.error("Please log in to report");
      return router.push("/login");
    }

    try {
      setReporting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${id}/report`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reporterUserId: user.id,
            reportedUserEmail: user.email,
            reason: reportReason,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to report lesson");
      }

      toast.success("Lesson reported. Our team will review it.");
      setReportOpen(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setReporting(false);
    }
  };

  // ---------------- LOADING STATE ----------------
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!lesson) {
    return <p className="text-center py-20">Lesson not found</p>;
  }

  // ---------------- PREMIUM LOCK ----------------
  const isLocked = lesson.accessLevel === "Premium" && !user?.isPremium;

  return (
    <div className="max-w-5xl mx-auto px-4 py-5">
      {/* FEATURED IMAGE — blurred + locked when premium and user isn't premium */}
      {lesson.image && (
        <div className="relative w-full h-72 md:h-96 mb-8 rounded-2xl overflow-hidden">
          <Image
            fill
            src={lesson.image}
            alt={lesson.title}
            className={`object-cover ${isLocked ? "blur-md scale-105" : ""
              }`}
          />

          {isLocked && (
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
              <span className="text-4xl mb-2">
                <FcLock />
              </span>
              <p className="font-semibold">Premium Lesson</p>
              <p className="text-xs opacity-90">Upgrade to view this image</p>
            </div>
          )}
        </div>
      )}

      {/* TITLE */}
      <div className="flex flex-wrap gap-2 text-sm text-gray-400 mb-6">
        <span className="px-3 py-1 rounded-full">{lesson.category}</span>
        <span className="px-3 py-1 rounded-full">
          {lesson.emotionalTone}
        </span>
        <span className="px-3 py-1 rounded-full">{lesson.accessLevel}</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{lesson.title}</h1>

      {/* PREMIUM LOCK VIEW */}
      {isLocked ? (
        <div className="relative p-10 border rounded-2xl text-center overflow-hidden">
          <p className="text-4xl mb-3">
            <FcLock />
          </p>
          <p className="font-semibold text-lg mb-2">Premium Lesson</p>
          <p className="text-sm mb-5 text-gray-600">
            This lesson is available exclusively for Premium members.
            Upgrade to unlock full content.
          </p>
          <Button onClick={() => router.push("/pricing")}>
            Upgrade to Premium
          </Button>
        </div>
      ) : (
        <>
          {/* CONTENT */}
          <div className="prose max-w-none mb-8 whitespace-pre-line">
            <p>{lesson.description}</p>
          </div>

          {/* METADATA */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm rounded-xl p-4 mb-8">
            <div>
              <p className="text-gray-400">Created</p>
              <p className="font-medium">
                {lesson.createdAt?.slice(0, 10)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Last Updated</p>
              <p className="font-medium">
                {lesson.updatedAt?.slice(0, 10) || "—"}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Visibility</p>
              <p className="font-medium">{lesson.visibility}</p>
            </div>
            <div>
              <p className="text-gray-400">Reading Time</p>
              <p className="font-medium">
                {Math.max(
                  1,
                  Math.ceil(
                    (lesson.description?.split(" ").length || 0) / 200
                  )
                )}{" "}
                min
              </p>
            </div>
          </div>

          {/* AUTHOR CARD */}
          <div className="flex items-center justify-between gap-4 border rounded-2xl p-4 mb-8">
            <div className="flex items-center gap-3">
              <Image
                width={100}
                height={100}
                src={lesson.creatorPhoto}
                className="w-12 h-12 rounded-full object-cover"
                alt={lesson.creatorName || "Creator"}
              />
              <div>
                <p className="font-semibold">{lesson.creatorName}</p>
                <p className="text-xs text-gray-500">
                  {lesson.creatorLessonsCount} lessons created
                </p>
              </div>
            </div>
            <Link href={`/profile/${lesson.creatorId}`}>
              <Button>View all lessons</Button>
            </Link>
          </div>

          {/* STATS */}
          <div className="flex gap-6 text-sm mb-8">
            <span>❤️ {lesson.likesCount || 0} Likes</span>
            <span>🔖 {lesson.favoritesCount || 0} Favorites</span>
            <span>👀 {lesson.views || 0} Views</span>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Button onClick={handleLike}>
              {liked ? "❤️ Unlike" : "🤍 Like"}
            </Button>

            <Button onClick={handleFavorite}>
              {saved ? "🔖 Saved" : "🔖 Save to Favorites"}
            </Button>

            <Button
              onClick={() => setReportOpen(true)}
              className="bg-red-500"
            >
              🚩 Report
            </Button>
          </div>

          {/* REPORT MODAL */}
          {reportOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Report Lesson</h3>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="border p-2 w-full rounded mb-4"
                >
                  {REPORT_REASONS.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => setReportOpen(false)}
                    className="bg-gray-300 text-black"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleReport} disabled={reporting}>
                    {reporting ? "Submitting..." : "Submit Report"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* COMMENTS */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
              Comments ({lesson.comments?.length || 0})
            </h2>

            <div className="flex gap-2 mb-6">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border p-2 w-full rounded"
                placeholder="Write a comment..."
              />
              <Button onClick={handleComment} disabled={posting}>
                {posting ? "Posting..." : "Post"}
              </Button>
            </div>

            <div className="space-y-3">
              {lesson.comments?.length ? (
                lesson.comments.map((c) => (
                  <div key={c._id} className="border p-3 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      {c.userPhoto && (
                        <Image
                          width={100}
                          height={100}
                          src={c.userPhoto}
                          className="w-6 h-6 rounded-full object-cover"
                          alt={c.userName}
                        />
                      )}
                      <p className="text-xs font-medium text-gray-700">
                        {c.userName}
                      </p>
                    </div>
                    <p className="text-sm">{c.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">
                  No comments yet. Be the first to share your thoughts.
                </p>
              )}
            </div>
          </div>

          {/* SIMILAR LESSONS */}
          {lesson.similarLessons?.length > 0 && (
            <div className="mt-14">
              <h2 className="text-xl font-semibold mb-4">Similar Lessons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {lesson.similarLessons.map((item) => (
                  <Link
                    key={item._id}
                    href={`/lessons/${item._id}`}
                    className="border rounded-2xl p-4 hover:shadow-md transition"
                  >
                    <p className="font-semibold mb-1 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                      {item.description}
                    </p>
                    <div className="flex gap-2 text-xs text-gray-400">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.emotionalTone}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LessonDetailsPage;