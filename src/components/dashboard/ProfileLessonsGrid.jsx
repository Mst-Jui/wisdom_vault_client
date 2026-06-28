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
          className="relative border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
        >
          <div className="p-4 flex flex-col flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                {lesson.category}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  lesson.accessLevel === "Premium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {lesson.accessLevel}
              </span>
            </div>

            <p className="font-bold text-lg line-clamp-1">{lesson.title}</p>

            <p className="text-sm text-gray-500 mt-2 line-clamp-1">
              {lesson.description}
            </p>

            <div className="space-y-1 text-sm text-gray-500 mt-3">
              <p>Tone: {lesson.emotionalTone}</p>
              <p>{lesson.createdAt?.slice(0, 10)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProfileLessonsGrid;