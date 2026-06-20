import React from "react";
import Link from "next/link"; 
import MyLessonsTable from "@/components/dashboard/Mylessonstable";
import { getMyLessons } from "@/lib/api/users/action";
import { getUser } from "@/lib/api/session";
import Button from "@/components/reusable/Button";

const MyLessonsPage = async () => {
  const user = await getUser();

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-lg font-medium">
          Please log in to view your lessons.
        </p>
        <Link
          href="/signin"
          className="inline-block mt-4 px-5 py-2 rounded-lg"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const result = await getMyLessons(user.id);
  const lessons = result?.success ? result.data : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My Lessons</h1>
          <p className="text-sm text-gray-500">
            {lessons.length} lesson{lessons.length !== 1 ? "s" : ""} created
          </p>
        </div>
        <Link
          href="/dashboard/user/add-lessons"
        >
          <Button>
            + Add Lesson
          </Button>

        </Link>
      </div>

      {lessons.length === 0 ? (
        <div className="border rounded-2xl p-10 text-center text-gray-500">
          You haven&apos;t created any lessons yet.
        </div>
      ) : (
        <MyLessonsTable lessons={lessons} user={user} />
      )}
    </div>
  );
};

export default MyLessonsPage;