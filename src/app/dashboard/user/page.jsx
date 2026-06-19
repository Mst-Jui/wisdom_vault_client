'use client'
import DashboardHeading from '@/components/dashboard/DashboardHeading';
import { useSession } from '@/lib/auth-client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', contributions: 4 },
  { name: 'Week 2', contributions: 2 },
  { name: 'Week 3', contributions: 5 },
  { name: 'Week 4', contributions: 4 },
];

const UserDashboardHomePage = () => {
  const { data: session } = useSession();
  // const user = session?.user?.name
  // console.log(user);

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold">Welcome Back,  <span className='text-pink-600'>{session?.user?.name} !</span>
          </h1>
          <p className="text-gray-400">Dashboard Overview</p>
        </div>
      




        <div className="flex items-center space-x-4">
          <img src="jane-doe-profile.jpg" alt="Jane Doe" className="w-16 h-16 rounded-full ring-2 ring-gold" />
          <div>
            <p className="font-semibold">{session?.user?.name}</p>
            <p className="text-sm text-gray-400">Premium User</p>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="border border-1 p-6 rounded-lg text-center">
          <p className="text-gray-400">Total Lessons Created</p>
          <p className="text-5xl font-bold">12</p>
        </div>
        <div className="border border-1 p-6 rounded-lg text-center">
          <p className="text-gray-400">Saved (Favorites)</p>
          <p className="text-5xl font-bold">24</p>
        </div>
        <div className="border border-1  p-6 rounded-lg text-center">
          <p className="text-gray-400">Community Reactions</p>
          <p className="text-5xl font-bold">1.2k Likes</p>
        </div>
        <div className="border border-1 p-6 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Premium Badge</p>
          <div className="bg-gold text-gray-900 p-3 rounded-full ml-4">⭐ Premium ⭐</div>
        </div>
      </div>

      {/* Recently Added, Quick Shortcuts, Weekly Reflections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recently Added Lessons */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Recently Added Lessons</h2>
          <ul>
            <li className="mb-2">Navigating Career Changes <span className="text-gray-400">(Career)</span> - 3 days ago</li>
            <li className="mb-2">Embracing Daily Gratitude <span className="text-gray-400">(Mindset)</span> - 5 days ago</li>
            <li className="mb-2">The Power of Vulnerability <span className="text-gray-400">(Personal Growth)</span> - 1 week ago</li>
          </ul>
        </div>

        {/* Quick Shortcuts */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Quick Shortcuts</h2>
          <div className="space-y-3">
            <button className="w-full bg-pink-600 hover:bg-pink-700 p-3 rounded-lg font-semibold">Add New Lesson</button>
            <button className="w-full bg-pink-600 hover:bg-pink-700 p-3 rounded-lg font-semibold">My Lessons</button>
            <button className="w-full bg-pink-600 hover:bg-pink-700 p-3 rounded-lg font-semibold">View Favorites</button>
            <button className="w-full bg-gray-600 p-3 rounded-lg font-semibold cursor-not-allowed">Pricing/Upgrade for Premium</button>
          </div>
        </div>

        {/* Weekly Reflections Activity */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Weekly Reflections Activity</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#a0aec0" />
                <YAxis stroke="#a0aec0" />
                <Bar dataKey="contributions" fill="#ec4899" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHomePage;