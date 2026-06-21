"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  deleteLesson,
  ignoreReports,
  getLessonReports,
} from "@/lib/api/users/action"; // adjust path to match your project

const ReportedLessonsTable = ({ initialLessons, admin }) => {
  const [lessons, setLessons] = useState(initialLessons);

  // Reasons modal
  const [reasonsTarget, setReasonsTarget] = useState(null);
  const [reasonsList, setReasonsList] = useState([]);
  const [loadingReasons, setLoadingReasons] = useState(false);

  // Ignore action
  const [ignoringId, setIgnoringId] = useState(null);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ---------------- VIEW REASONS ----------------
  const handleViewReasons = async (lesson) => {
    setReasonsTarget(lesson);
    setLoadingReasons(true);
    setReasonsList([]);

    try {
      const res = await getLessonReports(lesson._id, admin.id);
      if (!res.success) {
        throw new Error(res.message || "Failed to load report details");
      }
      setReasonsList(res.data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingReasons(false);
    }
  };

  // ---------------- IGNORE ----------------
  const handleIgnore = async (lesson) => {
    try {
      setIgnoringId(lesson._id);
      const res = await ignoreReports(lesson._id, admin.id);

      if (!res.success) {
        throw new Error(res.message || "Failed to clear reports");
      }

      setLessons((prev) => prev.filter((l) => l._id !== lesson._id));
      toast.success("Reports cleared. Lesson stays live.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIgnoringId(null);
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

  const ActionButtons = ({ lesson }) => (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleViewReasons(lesson)}
        className="px-3 py-1 rounded-lg border text-xs"
      >
        View Reasons
      </button>
      <button
        onClick={() => handleIgnore(lesson)}
        disabled={ignoringId === lesson._id}
        className="px-3 py-1 rounded-lg border border-blue-500 text-blue-600 text-xs"
      >
        {ignoringId === lesson._id ? "Clearing..." : "Ignore"}
      </button>
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
      {/* ---------------- DESKTOP / LARGE SCREEN: TABLE VIEW ---------------- */}
      <div className="hidden lg:block overflow-x-auto border rounded-2xl">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th className="p-4">Lesson Title</th>
              <th className="p-4">Report Count</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id} className="border-t">
                <td className="p-4 font-medium max-w-[300px] truncate">
                  <Link
                    href={`/lessons/${lesson._id}`}
                    className="hover:underline"
                  >
                    {lesson.title}
                  </Link>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    🚩 {lesson.reportCount}
                  </span>
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
            <div className="flex items-start justify-between gap-2">
              <Link
                href={`/lessons/${lesson._id}`}
                className="font-semibold truncate hover:underline"
              >
                {lesson.title}
              </Link>
              <span className="shrink-0 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                🚩 {lesson.reportCount}
              </span>
            </div>

            <ActionButtons lesson={lesson} />
          </div>
        ))}
      </div>

      {/* VIEW REASONS MODAL */}
      {reasonsTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-8">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-1">
              Reports on &quot;{reasonsTarget.title}&quot;
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {reasonsList.length} report{reasonsList.length !== 1 ? "s" : ""}
            </p>

            {loadingReasons ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
              </div>
            ) : reasonsList.length === 0 ? (
              <p className="text-sm text-gray-400 py-6 text-center">
                No report details found.
              </p>
            ) : (
              <div className="space-y-3 mb-4">
                {reasonsList.map((report) => (
                  <div
                    key={report._id}
                    className="border rounded-xl p-3 text-sm"
                  >
                    <p className="font-medium">{report.reason}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Reported by {report.reporterName}
                      {report.reporterEmail && ` (${report.reporterEmail})`}
                    </p>
                    <p className="text-xs text-gray-400">
                      {report.timestamp?.slice(0, 10)}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setReasonsTarget(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
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
                disabled={deleting}
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

export default ReportedLessonsTable;