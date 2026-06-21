import React from "react";
import Link from "next/link";
// import { getUser } from "@/lib/getUser";
import { getMyFavorites } from "@/lib/api/users/action"; // adjust path to match your project
import MyFavoritesTable from "@/components/dashboard/Myfavoritestable";
import { getUser } from "@/lib/api/session";
// import MyFavoritesTable from "./MyFavoritesTable";

const MyFavoritesPage = async () => {
  const user = await getUser();

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-lg font-medium">
          Please log in to view your favorites.
        </p>
        <Link
          href="/login"
          className="inline-block mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-[#622ad8] to-[#a8258e] text-white"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const result = await getMyFavorites(user.id);
  const favorites = result?.success ? result.data : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">My Favorites</h1>
        <p className="text-sm text-gray-500">
          {favorites.length} lesson{favorites.length !== 1 ? "s" : ""} saved
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="border rounded-2xl p-10 text-center text-gray-500">
          You haven&apos;t saved any lessons yet.
          <div className="mt-4">
            <Link
              href="/public-lessons"
              className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#622ad8] to-[#a8258e] text-white text-sm"
            >
              Browse Public Lessons
            </Link>
          </div>
        </div>
      ) : (
        <MyFavoritesTable favorites={favorites} user={user} />
      )}
    </div>
  );
};

export default MyFavoritesPage;