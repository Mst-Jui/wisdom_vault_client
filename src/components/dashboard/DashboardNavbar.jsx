'use client'
import { authClient, useSession } from '@/lib/auth-client';
import { Avatar, Dropdown, Label } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { MdDashboard } from 'react-icons/md';
import ThemeToggle from '../common/Toggle';

const DashboardNavbar = () => {
  const { data: session } = useSession();
  const role = session?.user?.role
  return (
    <div className='flex justify-end items-center border border-b-1'>
      <ThemeToggle />




      <Link href={`/dashboard/${role}/profile`}>
        <div className="px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0">
              <Avatar size="sm" aria-label="Menu" className="w-full h-full overflow-hidden rounded-full">
                <Avatar.Image
                  referrerPolicy="no-referrer"
                  alt="John Doe"
                  src={session?.user?.image}
                  className="aspect-square h-full w-full object-cover"
                />
                <Avatar.Fallback>{session?.user?.name.charAt(0)}</Avatar.Fallback>
              </Avatar>
            </div>
            <div>
              <p className="text-sm font-bold truncate">{session?.user?.name}</p>
              <span
                className={`text-[10px] font-bold uppercase ${role === "user" ? "text-indigo-400" : "text-pink-600"}`}
              >
                {role}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div >
  );
};

export default DashboardNavbar;