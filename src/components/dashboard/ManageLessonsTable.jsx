"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { updateLessons, deleteLesson } from "@/lib/api/users/action"; // adjust path to match your project

const CATEGORIES = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];

const ManageLessonsTable = ({ initialLessons, admin }) => {
  const [lessons, setLessons] = useState(initialLessons);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("");
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ---------------- FILTERED LIST ----------------
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesCategory = categoryFilter
        ? lesson.category === categoryFilter
        : true;
      const matchesVisibility = visibilityFilter
        ? lesson.visibility === visibilityFilter
        : true;
      const matchesFlagged = flaggedOnly ? lesson.reportCount > 0 : true;
      return matchesCategory && matchesVisibility && matchesFlagged;
    });
  }, [lessons, categoryFilter, visibilityFilter, flaggedOnly]);

  const clearFilters = () => {
    setCategoryFilter("");
    setVisibilityFilter("");
    setFlaggedOnly(false);
  };

  // ---------------- TOGGLE FEATURED ----------------
  const handleFeaturedToggle = async (lesson) => {
    try {
      setUpdatingId(lesson._id);
      const res = await updateLessons(
        { userId: admin.id, isFeatured: !lesson.isFeatured },
        lesson._id
      );

      if (!res.success) {
        throw new Error(res.message || "Failed to update lesson");
      }

      setLessons((prev) =>
        prev.map((l) =>
          l._id === lesson._id ? { ...l, isFeatured: !lesson.isFeatured } : l
        )
      );
      toast.success(
        !lesson.isFeatured ? "Lesson marked as featured" : "Removed from featured"
      );
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // ---------------- TOGGLE REVIEWED ----------------
  const handleReviewedToggle = async (lesson) => {
    try {
      setUpdatingId(lesson._id);
      const res = await updateLessons(
        { userId: admin.id, isReviewed: !lesson.isReviewed },
        lesson._id
      );

      if (!res.success) {
        throw new Error(res.message || "Failed to update lesson");
      }

      setLessons((prev) =>
        prev.map((l) =>
          l._id === lesson._id ? { ...l, isReviewed: !lesson.isReviewed } : l
        )
      );
      toast.success(
        !lesson.isReviewed ? "Marked as reviewed" : "Marked as unreviewed"
      );
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
      const res = await deleteLesson(deleteTarget._id, admin.id);

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

  // ---------------- SHARED BADGES ----------------
  const VisibilityBadge = ({ lesson }) => (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${lesson.visibility === "Public"
          ? "bg-green-100 text-green-700"
          : "bg-gray-200 text-gray-700"
        }`}
    >
      {lesson.visibility}
    </span>
  );

  const ReportBadge = ({ lesson }) =>
    lesson.reportCount > 0 ? (
      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
        🚩 {lesson.reportCount}
      </span>
    ) : (
      <span className="text-xs text-gray-400">—</span>
    );

  const FeaturedToggle = ({ lesson }) => (
    <button
      onClick={() => handleFeaturedToggle(lesson)}
      disabled={updatingId === lesson._id}
      className={`px-3 py-1 rounded-full text-xs font-medium ${lesson.isFeatured
          ? "bg-yellow-100 text-yellow-700"
          : "bg-gray-100 text-gray-500"
        }`}
    >
      {lesson.isFeatured ? "★ Featured" : "Mark Featured"}
    </button>
  );

  const ReviewedToggle = ({ lesson }) => (
    <button
      onClick={() => handleReviewedToggle(lesson)}
      disabled={updatingId === lesson._id}
      className={`px-3 py-1 rounded-full text-xs font-medium ${lesson.isReviewed
          ? "bg-blue-100 text-blue-700"
          : "bg-gray-100 text-gray-500"
        }`}
    >
      {lesson.isReviewed ? "✓ Reviewed" : "Mark Reviewed"}
    </button>
  );

  const ActionButtons = ({ lesson }) => (
    <div className="flex flex-wrap gap-2">
      <Link
        href={`/lessons/${lesson._id}`}
        className="px-3 py-1 rounded-lg border text-xs"
      >
        Details
      </Link>
      <button
        onClick={() => setDeleteTarget(lesson)}
        className="px-3 py-1 rounded-lg bg-red-500 text-white text-xs"
      >
        Delete
      </button>
    </div>
  );

  return (
    <>
      {/* ---------------- FILTERS ---------------- */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded text-sm w-full sm:w-auto"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={visibilityFilter}
          onChange={(e) => setVisibilityFilter(e.target.value)}
          className="border p-2 rounded text-sm w-full sm:w-auto"
        >
          <option value="">All Visibility</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>

        <label className="flex items-center gap-2 text-sm border rounded px-3 py-2 w-full sm:w-auto cursor-pointer">
          <input
            type="checkbox"
            checked={flaggedOnly}
            onChange={(e) => setFlaggedOnly(e.target.checked)}
          />
          Flagged only
        </label>

        {(categoryFilter || visibilityFilter || flaggedOnly) && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 underline self-start sm:self-center"
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredLessons.length === 0 ? (
        <div className="border rounded-2xl p-10 text-center text-gray-500">
          No lessons match the selected filters.
        </div>
      ) : (
        <>
          {/* ---------------- DESKTOP / LARGE SCREEN: TABLE VIEW ---------------- */}
          <div className="hidden lg:block overflow-x-auto border rounded-2xl">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Creator</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Visibility</th>
                  <th className="p-4">Reports</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4">Reviewed</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLessons.map((lesson) => (
                  <tr key={lesson._id} className="border-t">
                    <td className="p-4 font-medium max-w-[200px] truncate">
                      {lesson.title}
                    </td>
                    <td className="p-4 text-gray-500 max-w-[160px] truncate">
                      {lesson.creatorName}
                    </td>
                    <td className="p-4 text-gray-500">{lesson.category}</td>
                    <td className="p-4">
                      <VisibilityBadge lesson={lesson} />
                    </td>
                    <td className="p-4">
                      <ReportBadge lesson={lesson} />
                    </td>
                    <td className="p-4">
                      <FeaturedToggle lesson={lesson} />
                    </td>
                    <td className="p-4">
                      <ReviewedToggle lesson={lesson} />
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
            {filteredLessons.map((lesson) => (
              <div
                key={lesson._id}
                className="border rounded-2xl p-4 flex flex-col gap-3"
              >
                <div>
                  <p className="font-semibold truncate">{lesson.title}</p>
                  <p className="text-xs text-gray-500">
                    by {lesson.creatorName} • {lesson.category}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <VisibilityBadge lesson={lesson} />
                  <ReportBadge lesson={lesson} />
                </div>

                <div className="flex flex-wrap gap-2">
                  <FeaturedToggle lesson={lesson} />
                  <ReviewedToggle lesson={lesson} />
                </div>

                <ActionButtons lesson={lesson} />
              </div>
            ))}
          </div>
        </>
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
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 text-sm"
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

export default ManageLessonsTable;