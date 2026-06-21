"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const BRAND = {
  violet: "#622ad8",
  magenta: "#a8258e",
};

const formatDateLabel = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const AdminGrowthChart = ({ growthData }) => {
  const chartData = (growthData || []).map((d) => ({
    date: formatDateLabel(d.date),
    Lessons: d.lessons,
    Users: d.users,
  }));

  const hasActivity = chartData.some((d) => d.Lessons > 0 || d.Users > 0);

  return (
    <div className="border rounded-2xl p-5 sm:p-6 h-full">
      <h2 className="text-lg font-semibold mb-1">Growth — Last 30 Days</h2>
      <p className="text-xs text-gray-500 mb-4">
        New lessons and new users per day
      </p>

      {!hasActivity ? (
        <div className="h-64 flex items-center justify-center text-sm text-gray-400">
          No activity in the last 30 days yet.
        </div>
      ) : (
        <div className="w-full h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  fontSize: "13px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line
                type="monotone"
                dataKey="Lessons"
                stroke={BRAND.violet}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Users"
                stroke={BRAND.magenta}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AdminGrowthChart;