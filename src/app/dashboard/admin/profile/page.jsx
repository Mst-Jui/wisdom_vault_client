import React from "react";
import Link from "next/link";
import { getAdminActivity } from "@/lib/api/users/action"; 
import { getUser } from "@/lib/api/session";
import AdminProfileEditCard from "@/components/dashboard/AdminProfileEditCard";
import AdminActivitySummary from "@/components/dashboard/AdminActivitySummary";


const AdminProfilePage = async () => {
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

  const result = await getAdminActivity(admin.id);
  const activity = result?.success
    ? result.data
    : {
        lessonsReviewedCount: 0,
        lessonsFeaturedCount: 0,
        totalUsers: 0,
        totalLessons: 0,
        openReportsCount: 0,
      };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Profile</h1>

      <AdminProfileEditCard admin={admin} />

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Platform Activity</h2>
        <AdminActivitySummary activity={activity} />
      </div>
    </div>
  );
};

export default AdminProfilePage;