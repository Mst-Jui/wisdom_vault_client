import React from "react";

const AdminStatsCards = ({
  totalUsers,
  totalPublicLessons,
  reportedLessonIds,
  todaysNewLessons,
}) => {
  const cards = [
    {
      label: "Total Users",
      value: totalUsers,
      color: "bg-purple-50 text-purple-700",
    },
    {
      label: "Total Public Lessons",
      value: totalPublicLessons,
      color: "bg-green-50 text-green-700",
    },
    {
      label: "Reported / Flagged Lessons",
      value: reportedLessonIds,
      color: "bg-red-50 text-red-700",
    },
    {
      label: "Today's New Lessons",
      value: todaysNewLessons,
      color: "bg-blue-50 text-blue-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`border rounded-2xl p-5 ${card.color}`}
        >
          <p className="text-3xl font-bold tracking-tight">{card.value}</p>
          <p className="text-sm mt-1">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsCards;