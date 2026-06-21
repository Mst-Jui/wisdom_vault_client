import React from "react";
import Link from "next/link";
import ReportedLessonsTable from "@/components/dashboard/ReportedLessonsTable";
import { getUser } from "@/lib/api/session";
import { getReportedLessons } from "@/lib/api/users/action";


const ReportedLessonsPage = async () => {
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

  const result = await getReportedLessons(admin.id);
  const lessons = result?.success ? result.data : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Reported / Flagged Lessons
        </h1>
        <p className="text-sm text-gray-500">
          {lessons.length} lesson{lessons.length !== 1 ? "s" : ""} flagged by
          users
        </p>
      </div>

      {lessons.length === 0 ? (
        <div className="border rounded-2xl p-10 text-center text-gray-500">
          No reported lessons right now. 
        </div>
      ) : (
        <ReportedLessonsTable initialLessons={lessons} admin={admin} />
      )}
    </div>
  );
};

export default ReportedLessonsPage;