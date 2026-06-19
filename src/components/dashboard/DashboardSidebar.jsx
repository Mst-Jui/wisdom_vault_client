'use client'
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBuilding, FaCalendarAlt, FaHome, FaPlus, FaSignOutAlt, FaUsers, FaUserShield, FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "../common/Toggle";
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { IoMdAddCircleOutline, IoMdBook } from "react-icons/io";
import { GrOverview } from "react-icons/gr";
import { MdFavoriteBorder } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const DashboardSideBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.push("/signin");
  };

  const userMenu = [
    { key: "overview", label: "Overview", icon: GrOverview, href: "/dashboard/user" },
    { key: "add-lessons", label: "Add Lessons", icon: IoMdAddCircleOutline, href: "/dashboard/user/add-lessons" },
    { key: "my-lessons", label: "My Lessons", icon: IoMdBook, href: "/dashboard/user/my-lessons" },
    { key: "my-favorites", label: "My-Favorites", icon: MdFavoriteBorder, href: "/dashboard/user/my-favorites" },
    { key: "profile", label: "profile", icon: CgProfile, href: "/dashboard/user/profile" },
  ];

  const adminMenu = [
    { key: "overview", label: "Overview", icon: FaUserShield, href: "/dashboard/admin" },
    { key: "users", label: "Manage Users", icon: FaUsers, href: "/dashboard/admin/manage-users" },
  ];

  const role = session?.user?.role;
  const menuItems = role === "admin" ? adminMenu : userMenu;

  return (
    <>
      {/* মোবাইল মেনু বাটন */}
      <div className="md:hidden sticky top-0 left-0 w-full z-50 bg-gray-400 rounded-full px-4 py-3 flex justify-between items-center shadow-sm">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* সাইডবার */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen w-64 z-40 transform transition-transform duration-300 ease-in-out 
  ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
  bg-slate-900 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-r border-white/5`}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center">
            {/* <span className="font-bold">Logo</span> */}
            <ThemeToggle />
          </div>
          
          {/* logo hobe  */}
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

          <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-1">
            {menuItems?.map(({ key, label, icon: Icon, href }) => (
              <Link key={key} href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-pink-700 hover:bg-white/5 transition-all">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5"><Icon size={16} /></span>
                {label}
              </Link>
            ))}
          </nav>

          <div className="px-3 py-4 border-t border-white/5 space-y-1">
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-pink-700">
              <IoHomeOutline size={16} /> Back to Site
            </Link>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400">
              <FaSignOutAlt size={16} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* মোবাইল ওভারলে */}
      {isOpen && <div className="fixed inset-0 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default DashboardSideBar;