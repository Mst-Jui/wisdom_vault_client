import React from "react";

const ManageLessonsStats = ({ stats }) => {
  const cards = [
    {
      label: "Public Lessons",
      value: stats.publicCount,
      color: "bg-green-50 text-green-700",
    },
    {
      label: "Private Lessons",
      value: stats.privateCount,
      color: "bg-gray-100 text-gray-700",
    },
    {
      label: "Flagged / Reported",
      value: stats.flaggedCount,
      color: "bg-red-50 text-red-700",
    },
    {
      label: "Total Lessons",
      value: stats.total,
      color: "bg-blue-50 text-blue-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

export default ManageLessonsStats;