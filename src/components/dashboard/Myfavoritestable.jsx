"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { toggleFavorite } from "@/lib/api/users/action"; // adjust path to match your project

const CATEGORIES = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];

const EMOTIONAL_TONES = ["Motivational", "Sad", "Realization", "Gratitude"];

const MyFavoritesTable = ({ favorites: initialFavorites, user }) => {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [removing, setRemoving] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [toneFilter, setToneFilter] = useState("");

  // ---------------- FILTERED LIST ----------------
  const filteredFavorites = useMemo(() => {
    return favorites.filter((lesson) => {
      const matchesCategory = categoryFilter
        ? lesson.category === categoryFilter
        : true;
      const matchesTone = toneFilter
        ? lesson.emotionalTone === toneFilter
        : true;
      return matchesCategory && matchesTone;
    });
  }, [favorites, categoryFilter, toneFilter]);

  // ---------------- REMOVE FROM FAVORITES ----------------
  const handleRemove = async () => {
    if (!removeTarget) return;

    try {
      setRemoving(true);
      const res = await toggleFavorite(removeTarget._id, user.id);

      if (!res.success) {
        throw new Error(res.message || "Failed to remove favorite");
      }

      setFavorites((prev) => prev.filter((l) => l._id !== removeTarget._id));
      toast.success("Removed from favorites");
      setRemoveTarget(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setRemoving(false);
    }
  };

  const clearFilters = () => {
    setCategoryFilter("");
    setToneFilter("");
  };

  return (
    <>
      {/* ---------------- FILTERS ---------------- */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
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
          value={toneFilter}
          onChange={(e) => setToneFilter(e.target.value)}
          className="border p-2 rounded text-sm w-full sm:w-auto"
        >
          <option value="">All Emotional Tones</option>
          {EMOTIONAL_TONES.map((tone) => (
            <option key={tone} value={tone}>
              {tone}
            </option>
          ))}
        </select>

        {(categoryFilter || toneFilter) && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 underline self-start sm:self-auto"
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredFavorites.length === 0 ? (
        <div className="border rounded-2xl p-10 text-center text-gray-500">
          No favorites match the selected filters.
        </div>
      ) : (
        <>
          {/* ---------------- DESKTOP / LARGE SCREEN: TABLE VIEW ---------------- */}
          <div className="hidden lg:block overflow-x-auto border rounded-2xl">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Emotional Tone</th>
                  <th className="p-4">Creator</th>
                  <th className="p-4">Access</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFavorites.map((lesson) => (
                  <tr key={lesson._id} className="border-t">
                    <td className="p-4 font-medium max-w-[220px] truncate">
                      {lesson.title}
                    </td>
                    <td className="p-4 text-gray-500">{lesson.category}</td>
                    <td className="p-4 text-gray-500">
                      {lesson.emotionalTone}
                    </td>
                    <td className="p-4 text-gray-500">
                      {lesson.creatorName || "—"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${lesson.accessLevel === "Premium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                          }`}
                      >
                        {lesson.accessLevel}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/lessons/${lesson._id}`}
                          className="px-3 py-1 rounded-lg border text-xs"
                        >
                          Details
                        </Link>
                        <button
                          onClick={() => setRemoveTarget(lesson)}
                          className="px-3 py-1 rounded-lg bg-red-500 text-white text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---------------- MOBILE / TABLET: CARD VIEW ---------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {filteredFavorites.map((lesson) => (
              <div
                key={lesson._id}
                className="border rounded-2xl p-4 flex flex-col gap-3"
              >
                <div>
                  <p className="font-semibold truncate">{lesson.title}</p>
                  <p className="text-xs text-gray-500">
                    {lesson.category} • {lesson.emotionalTone}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${lesson.accessLevel === "Premium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                      }`}
                  >
                    {lesson.accessLevel}
                  </span>
                  <span className="text-xs text-gray-400">
                    by {lesson.creatorName || "Unknown"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/lessons/${lesson._id}`}
                    className="flex-1 text-center px-3 py-1 rounded-lg border text-xs"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => setRemoveTarget(lesson)}
                    className="flex-1 px-3 py-1 rounded-lg bg-red-500 text-white text-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* REMOVE CONFIRMATION MODAL */}
      {removeTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">
              Remove from Favorites
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Remove{" "}
              <span className="font-medium">
                &quot;{removeTarget.title}&quot;
              </span>{" "}
              from your favorites?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRemoveTarget(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleRemove}
                disabled={removing}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm"
              >
                {removing ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyFavoritesTable;