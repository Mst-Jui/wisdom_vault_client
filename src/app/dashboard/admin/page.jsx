import React from "react";
import Link from "next/link";
// import { getUser } from "@/lib/getUser"; 
import { getAdminDashboardOverview } from "@/lib/api/users/action"; 
import AdminStatsCards from "@/components/dashboard/AdminStatsCards";
import AdminGrowthChart from "@/components/dashboard/AdminGrowthChart";
import AdminTopContributors from "@/components/dashboard/AdminTopContributors";
import { getUser } from "@/lib/api/session";


const AdminDashboardOverviewPage = async () => {
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

  const result = await getAdminDashboardOverview(admin.id);
  const overview = result?.success
    ? result.data
    : {
      totalUsers: 0,
      totalPublicLessons: 0,
      reportedLessonIds: 0,
      todaysNewLessons: 0,
      topContributors: [],
      growthData: [],
    };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
      <div className="mb-8">
        <p className="text-sm text-purple-600 font-medium mb-1 tracking-wide uppercase">
          Admin Dashboard
        </p>
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome back, {admin.name?.split(" ")[0] || "Admin"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Platform overview and moderation insights
        </p>
      </div>

      <AdminStatsCards
        totalUsers={overview.totalUsers}
        totalPublicLessons={overview.totalPublicLessons}
        reportedLessonIds={overview.reportedLessonIds}
        todaysNewLessons={overview.todaysNewLessons}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <AdminGrowthChart growthData={overview.growthData} />
        </div>
        <div className="lg:col-span-1">
          <AdminTopContributors contributors={overview.topContributors} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOverviewPage;