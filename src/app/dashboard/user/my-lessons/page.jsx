"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Button from "@/components/reusable/Button";
import { Trash2, Eye, Edit } from "lucide-react";
import DashboardHeading from "@/components/dashboard/DashboardHeading";

export default function MyLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch my lessons
  const fetchLessons = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/lessons/my", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load lessons");
      }

      setLessons(data.lessons || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  // Delete lesson
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this lesson?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/lessons/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setLessons((prev) => prev.filter((l) => l._id !== id));
      toast.success("Lesson deleted successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Toggle visibility
  const toggleVisibility = async (id) => {
    try {
      const res = await fetch(`/api/lessons/${id}/visibility`, {
        method: "PATCH",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setLessons((prev) =>
        prev.map((l) =>
          l._id === id ? { ...l, visibility: data.visibility } : l
        )
      );

      toast.success("Visibility updated");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <DashboardHeading
          title="My Lessons"
          description="Manage lessons"
        />

        <Link href="/dashboard/add-lessons">
          <Button className="bg-black text-white">
            + Add Lesson
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Tone</th>
              <th className="p-3">Access</th>
              <th className="p-3">Visibility</th>
              <th className="p-3">Likes</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No lessons found
                </td>
              </tr>
            ) : (
              lessons.map((lesson) => (
                <tr key={lesson._id} className="border-t">
                  <td className="p-3 font-medium">
                    {lesson.title}
                  </td>

                  <td className="p-3">{lesson.category}</td>

                  <td className="p-3">{lesson.emotionalTone}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${lesson.accessLevel === "Premium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                        }`}
                    >
                      {lesson.accessLevel}
                    </span>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => toggleVisibility(lesson._id)}
                      className={`px-2 py-1 rounded text-xs ${lesson.visibility === "Public"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-200 text-gray-700"
                        }`}
                    >
                      {lesson.visibility}
                    </button>
                  </td>

                  <td className="p-3">
                    ❤️ {lesson.likesCount || 0}
                  </td>

                  <td className="p-3 flex gap-2">
                    <Link href={`/dashboard/update-lesson/${lesson._id}`}>
                      <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                        <Edit size={16} />
                      </button>
                    </Link>

                    <Link href={`/lessons/${lesson._id}`}>
                      <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                        <Eye size={16} />
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(lesson._id)}
                      className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}