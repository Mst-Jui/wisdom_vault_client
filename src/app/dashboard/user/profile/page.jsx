import React from "react";
import Link from "next/link";
// import { getUser } from "@/lib/getUser"; 
import { getProfileStats } from "@/lib/api/users/action"; // adjust path to match your project
import ProfileEditCard from "@/components/dashboard/ProfileEditCard";
import ProfileLessonsGrid from "@/components/dashboard/ProfileLessonsGrid";
import { getUser } from "@/lib/api/session";
// import ProfileEditCard from "./ProfileEditCard";
// import ProfileLessonsGrid from "./ProfileLessonsGrid";

const ProfilePage = async () => {
  const user = await getUser();

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-lg font-medium">
          Please log in to view your profile.
        </p>
        <Link
          href="/login"
          className="inline-block mt-4 px-5 py-2 rounded-lg bg-blue-600 text-white"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const result = await getProfileStats(user.id);
  const stats = result?.success
    ? result.data
    : { lessonsCreatedCount: 0, favoritesSavedCount: 0, publicLessons: [] };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Profile</h1>

      <ProfileEditCard
        user={user}
        lessonsCreatedCount={stats.lessonsCreatedCount}
        favoritesSavedCount={stats.favoritesSavedCount}
      />

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Public Lessons by {user.name}
        </h2>
        <ProfileLessonsGrid lessons={stats.publicLessons} />
      </div>
    </div>
  );
};

export default ProfilePage;