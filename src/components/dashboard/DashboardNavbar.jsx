'use client'
import { authClient, useSession } from '@/lib/auth-client';
import { Avatar, Dropdown, Label } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { MdDashboard } from 'react-icons/md';

const DashboardNavbar = () => {
  const { data: session } = useSession();
  const role = session?.user?.role
  // const user = session?.user

  // const handleSignOut = async () => {
  //   await authClient.signOut();
  // };

  return (
    <div className='flex justify-end border border-b-1'>
      {/* {user && (
        <div className="hidden items-center gap-4 md:flex">
          <Dropdown>
            <Dropdown.Trigger className="rounded-full">
              <Avatar size="sm" aria-label="Menu">
                <Avatar.Image
                  referrerPolicy="no-referrer"
                  alt="John Doe"
                  src={user?.image}
                />
                <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
              </Avatar>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <div className="px-3 pt-3 pb-1">
                <div className="flex items-center gap-2">
                  <Avatar size="sm">
                    <Avatar.Image alt={user?.name} src={user?.image} />
                    <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                  </Avatar>
                  <div className="flex flex-col gap-0">
                    <p className="text-sm leading-5 font-medium">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
              <Dropdown.Menu
                onAction={(key) => console.log(`Selected: ${key}`)}
              >
                <Dropdown.Item id="new-file" textValue="New file">
                  <Link
                    className="flex items-center gap-2"
                    href={`/dashboard/${user?.role}`}
                  >
                    <MdDashboard />
                    <Label>Dashboard</Label>
                  </Link>
                </Dropdown.Item>

                <Dropdown.Item id="copy-link" textValue="Copy link">
                  <CgProfile />
                  <Label>Profile</Label>
                </Dropdown.Item>

                <Dropdown.Item
                  id="delete-file"
                  textValue="Delete file"
                  variant="danger"
                  onClick={handleSignOut}
                >
                  <BiLogOut />
                  <Label>Logout</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      )} */}




      <Link href={'/dashboard/user/profile'}>
        <div className="px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0">
              <Image
                width={40} height={40}
                src={session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent("User")}&background=7c3aed&color=fff`}
                alt="Avatar" className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-sm font-bold truncate">{session?.user?.name}</p>
              <span
                className={`text-[10px] font-bold uppercase ${role === "user" ? "text-indigo-400" : "text-pink-600"
                  }`}
              >
                {role}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DashboardNavbar;