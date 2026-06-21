import React from "react";

const AdminTopContributors = ({ contributors }) => {
  return (
    <div className="border rounded-2xl p-5 sm:p-6 h-full">
      <h2 className="text-lg font-semibold mb-4">
        Most Active Contributors
      </h2>

      {!contributors || contributors.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-sm text-gray-400 text-center px-4">
          No lessons created yet.
        </div>
      ) : (
        <ul className="space-y-3">
          {contributors.map((contributor, index) => (
            <li
              key={contributor.userId}
              className="flex items-center gap-3"
            >
              <span className="w-6 text-sm font-semibold text-gray-400">
                #{index + 1}
              </span>
              <img
                src={contributor.image || "/default-avatar.png"}
                alt={contributor.name}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">
                  {contributor.name}
                </p>
              </div>
              <span className="text-xs font-medium text-gray-500 shrink-0">
                {contributor.lessonCount} lesson
                {contributor.lessonCount !== 1 ? "s" : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminTopContributors;