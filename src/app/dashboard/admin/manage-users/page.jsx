import React from "react";
import Link from "next/link";
// import { getUser } from "@/lib/getUser"; 
import { getAllUsers } from "@/lib/api/users/action"; // adjust path to match your project
import ManageUsersTable from "@/components/dashboard/ManageUsersTable";
import { getUser } from "@/lib/api/session";
// import ManageUsersTable from "./ManageUsersTable";

const ManageUsersPage = async () => {
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

  const result = await getAllUsers(admin.id);
  const users = result?.success ? result.data : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Manage Users</h1>
        <p className="text-sm text-gray-500">
          {users.length} user{users.length !== 1 ? "s" : ""} registered
        </p>
      </div>

      {users.length === 0 ? (
        <div className="border rounded-2xl p-10 text-center text-gray-500">
          No users found.
        </div>
      ) : (
        <ManageUsersTable initialUsers={users} admin={admin} />
      )}
    </div>
  );
};

export default ManageUsersPage;