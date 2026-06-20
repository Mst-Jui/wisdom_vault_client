"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { deleteLesson, updateLessons } from "@/lib/api/users/action";
import UpdateLessonModal from "./Updatelessonmodal";

const MyLessonsTable = ({ lessons: initialLessons, user }) => {
  const [lessons, setLessons] = useState(initialLessons);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  // ---------------- TOGGLE VISIBILITY ----------------
  const handleVisibilityToggle = async (lesson) => {
    const nextVisibility =
      lesson.visibility === "Public" ? "Private" : "Public";

    try {
      setUpdatingId(lesson._id);
      const res = await updateLessons(
        { userId: user.id, visibility: nextVisibility },
        lesson._id
      );

      if (!res.success) {
        throw new Error(res.message || "Failed to update visibility");
      }

      setLessons((prev) =>
        prev.map((l) =>
          l._id === lesson._id ? { ...l, visibility: nextVisibility } : l
        )
      );
      toast.success(`Lesson is now ${nextVisibility}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // TOGGLE ACCESS LEVEL (premium users only)
  const handleAccessLevelToggle = async (lesson) => {
    if (!user?.isPremium) {
      toast.error("Upgrade to Premium to create or mark Premium lessons");
      return;
    }

    const nextAccessLevel =
      lesson.accessLevel === "Premium" ? "Free" : "Premium";

    try {
      setUpdatingId(lesson._id);
      const res = await updateLessons(
        { userId: user.id, accessLevel: nextAccessLevel },
        lesson._id
      );

      if (!res.success) {
        throw new Error(res.message || "Failed to update access level");
      }

      setLessons((prev) =>
        prev.map((l) =>
          l._id === lesson._id ? { ...l, accessLevel: nextAccessLevel } : l
        )
      );
      toast.success(`Access level set to ${nextAccessLevel}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      const res = await deleteLesson(deleteTarget._id, user.id);

      if (!res.success) {
        throw new Error(res.message || "Failed to delete lesson");
      }

      setLessons((prev) => prev.filter((l) => l._id !== deleteTarget._id));
      toast.success("Lesson deleted");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  // ---------------- UPDATE (called by modal after successful save) ----------------
  const handleLessonUpdated = (updatedLesson) => {
    setLessons((prev) =>
      prev.map((l) =>
        l._id === updatedLesson._id ? { ...l, ...updatedLesson } : l
      )
    );
  };

  // Shared action buttons — reused in both table view and card view
  const ActionButtons = ({ lesson }) => (
    <div className="flex flex-wrap gap-2">
      <Link
        href={`/lessons/${lesson._id}`}
        className="px-3 py-1 rounded-lg border text-xs text-center"
      >
        Details
      </Link>
      <button
        onClick={() => setEditTarget(lesson)}
        className="px-3 py-1 rounded-lg border text-xs"
      >
        Update
      </button>
      <button
        onClick={() => setDeleteTarget(lesson)}
        className="px-3 py-1 rounded-lg bg-red-500 text-white text-xs"
      >
        Delete
      </button>
    </div>
  );

  const VisibilityBadge = ({ lesson }) => (
    <button
      onClick={() => handleVisibilityToggle(lesson)}
      disabled={updatingId === lesson._id}
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        lesson.visibility === "Public"
          ? "bg-green-100 text-green-700"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {lesson.visibility}
    </button>
  );

  const AccessBadge = ({ lesson }) => (
    <button
      onClick={() => handleAccessLevelToggle(lesson)}
      disabled={updatingId === lesson._id || !user?.isPremium}
      title={
        !user?.isPremium ? "Upgrade to Premium to change access level" : ""
      }
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        lesson.accessLevel === "Premium"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-blue-100 text-blue-700"
      } ${!user?.isPremium ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {lesson.accessLevel}
    </button>
  );

  return (
    <>
      {/* ---------------- DESKTOP / LARGE SCREEN: TABLE VIEW ---------------- */}
      <div className="hidden lg:block overflow-x-auto border rounded-2xl">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Visibility</th>
              <th className="p-4">Access</th>
              <th className="p-4">Likes</th>
              <th className="p-4">Saves</th>
              <th className="p-4">Created</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id} className="border-t">
                <td className="p-4 font-medium max-w-[200px] truncate">
                  {lesson.title}
                </td>
                <td className="p-4 text-gray-500">{lesson.category}</td>
                <td className="p-4">
                  <VisibilityBadge lesson={lesson} />
                </td>
                <td className="p-4">
                  <AccessBadge lesson={lesson} />
                </td>
                <td className="p-4">{lesson.likesCount || 0}</td>
                <td className="p-4">{lesson.favoritesCount || 0}</td>
                <td className="p-4 text-gray-500">
                  {lesson.createdAt?.slice(0, 10)}
                </td>
                <td className="p-4">
                  <ActionButtons lesson={lesson} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- MOBILE / TABLET: CARD VIEW ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="border rounded-2xl p-4 flex flex-col gap-3"
          >
            <div>
              <p className="font-semibold truncate">{lesson.title}</p>
              <p className="text-xs text-gray-500">{lesson.category}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <VisibilityBadge lesson={lesson} />
              <AccessBadge lesson={lesson} />
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>❤️ {lesson.likesCount || 0} Likes</span>
              <span>🔖 {lesson.favoritesCount || 0} Saves</span>
            </div>

            <p className="text-xs text-gray-400">
              Created: {lesson.createdAt?.slice(0, 10)}
            </p>

            <ActionButtons lesson={lesson} />
          </div>
        ))}
      </div>

      {/* UPDATE MODAL */}
      {editTarget && (
        <UpdateLessonModal
          lesson={editTarget}
          user={user}
          onClose={() => setEditTarget(null)}
          onUpdated={handleLessonUpdated}
        />
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">Delete Lesson</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to permanently delete{" "}
              <span className="font-medium">
                &quot;{deleteTarget.title}&quot;
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyLessonsTable;