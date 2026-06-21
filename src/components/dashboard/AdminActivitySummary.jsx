import React from "react";

const AdminActivitySummary = ({ activity }) => {
  const cards = [
    {
      label: "Lessons Reviewed",
      value: activity.lessonsReviewedCount,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Lessons Featured",
      value: activity.lessonsFeaturedCount,
      color: "bg-yellow-50 text-yellow-700",
    },
    {
      label: "Open Reports",
      value: activity.openReportsCount,
      color: "bg-red-50 text-red-700",
    },
    {
      label: "Total Users",
      value: activity.totalUsers,
      color: "bg-purple-50 text-purple-700",
    },
    {
      label: "Total Lessons",
      value: activity.totalLessons,
      color: "bg-green-50 text-green-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`border rounded-2xl p-4 sm:p-5 ${card.color}`}
        >
          <p className="text-2xl sm:text-3xl font-bold">{card.value}</p>
          <p className="text-xs sm:text-sm mt-1">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminActivitySummary;