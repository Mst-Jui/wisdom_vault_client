import React from "react";
import Link from "next/link";
import ManageLessonsStats from "@/components/dashboard/ManageLessonsStats";
import ManageLessonsTable from "@/components/dashboard/ManageLessonsTable";
import { getUser } from "@/lib/api/session";
import { getAdminLessons } from "@/lib/api/users/action";


const ManageLessonsPage = async () => {
  const admin = await getUser();

  if (!admin) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-lg font-medium">Please log in to continue.</p>
        <Link
          href="/login"
          className="inline-block mt-4 px-5 py-2 rounded-lg bg-blue-600 text-white"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  if (admin.role !== "admin") {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-lg font-medium">
          You don&apos;t have permission to view this page.
        </p>
      </div>
    );
  }

  const result = await getAdminLessons(admin.id);
  const lessons = result?.success ? result.data.lessons : [];
  const stats = result?.success
    ? result.data.stats
    : { total: 0, publicCount: 0, privateCount: 0, flaggedCount: 0 };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Manage Lessons</h1>
        <p className="text-sm text-gray-500">
          {stats.total} lesson{stats.total !== 1 ? "s" : ""} across all users
        </p>
      </div>

      <ManageLessonsStats stats={stats} />

      {lessons.length === 0 ? (
        <div className="border rounded-2xl p-10 text-center text-gray-500 mt-6">
          No lessons found.
        </div>
      ) : (
        <ManageLessonsTable initialLessons={lessons} admin={admin} />
      )}
    </div>
  );
};

export default ManageLessonsPage;