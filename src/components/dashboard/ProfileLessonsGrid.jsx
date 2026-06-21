"use client";

import React from "react";
import Link from "next/link";

const ProfileLessonsGrid = ({ lessons }) => {
  if (!lessons || lessons.length === 0) {
    return (
      <div className="border rounded-2xl p-10 text-center text-gray-500">
        No public lessons yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {lessons.map((lesson) => (
        <Link
          key={lesson._id}
          href={`/lessons/${lesson._id}`}
          className="border rounded-2xl overflow-hidden hover:shadow-md transition flex flex-col"
        >
          {lesson.image && (
            <img
              src={lesson.image}
              alt={lesson.title}
              className="w-full h-40 object-cover"
            />
          )}

          <div className="p-4 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-2">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${lesson.accessLevel === "Premium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                  }`}
              >
                {lesson.accessLevel}
              </span>
              <span className="text-xs text-gray-400">
                {lesson.createdAt?.slice(0, 10)}
              </span>
            </div>

            <p className="font-semibold mb-1 line-clamp-1">{lesson.title}</p>
            <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-1">
              {lesson.description}
            </p>

            <div className="flex gap-2 text-xs text-gray-400">
              <span>{lesson.category}</span>
              <span>•</span>
              <span>{lesson.emotionalTone}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProfileLessonsGrid;