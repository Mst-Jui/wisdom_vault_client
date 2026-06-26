"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import Button from "../reusable/Button";
import ThemeToggle from "./Toggle";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const pathname = usePathname();


  useEffect(() => {
    const fetchSession = async () => {
      const result = await refetch();
      console.log("refetch result:", result);
    };

    fetchSession();
  }, [pathname]);


  // const pathname = usePathname()
  if (pathname.includes('dashboard')) {
    return null;
  }


  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      <div className="bg-black p-1 text-white">
        <marquee>
          🎉 Avail Up to 6% Extra Discount with Bank Transfer | 💳 Cash on
          Delivery Available | 🚚 Fast Delivery in 2–3 Days | 🧠 Every Experience Holds a Lesson | 📚 Save Your Wisdom | 🌱 Grow Through Reflection
        </marquee>
      </div>

      <nav className="fixed top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2">

          {/* Logo and Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <button className="md:hidden p-2 text-xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <RxHamburgerMenu />
            </button>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 bg-gradient-to-br from-[#622ad8] to-[#a8258e]`}>
                W
              </span>
              <span className="text-lg font-bold">Wisdom Vault</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden items-center gap-6 md:flex">
            <li>
              <NavLink href={"/"}>Home</NavLink>
            </li>

            <li>
              <NavLink href="/lessons">Explore
              </NavLink>
            </li>

            {
              user?.role === "user" && (
                <>
                  <li>
                    <NavLink href="/dashboard/user/add-lessons">Add Lessons
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="/dashboard/user/my-lessons">My Lessons
                    </NavLink>
                  </li>
                </>
              )
            }
            {/* jui  */}
            {/* free user  */}
            {/* {user && !user.isPremium && (
              <li>
                <NavLink href="/pricing">Pricing</NavLink>
              </li>
            )} */}
            {/* premium user  */}
            {/* {user?.isPremium && (
              <li>
                <span className="rounded-full bg-gradient-to-r from-[#622ad8] to-[#a8258e] px-3 py-1 text-sm text-white">
                  Premium ⭐
                </span>
              </li>
            )} */}
            {/* jui  */}
            {/* Free User */}
            {user?.role === "user" && !user?.isPremium && (
              <li>
                <NavLink href="/pricing">Pricing</NavLink>
              </li>
            )}

            {/* Premium User */}
            {user?.role === "user" && user?.isPremium && (
              <li>
                <span className="rounded-full bg-gradient-to-r from-[#622ad8] to-[#a8258e] px-3 py-1 text-sm text-white">
                  Premium ⭐
                </span>
              </li>
            )}

            {/* Admin */}
            {user?.role === "admin" && (
              <li>
                <span className="rounded-full bg-gradient-to-r from-[#622ad8] to-[#a8258e] px-3 py-1 text-sm text-white">
                  Admin 👑
                </span>
              </li>
            )}

            <li>
              <NavLink href="/about">About</NavLink>
            </li>

            <li>
              <NavLink href="/contact">Contact</NavLink>
            </li> <span className="text-gray-300">|</span>
            <ThemeToggle />
          </ul>

          {/* Auth Buttons */}
          {/* <ThemeToggle /> */}
          {
            !user && (
              <div className="hidden items-center gap-4 md:flex">
                <Link className="font-semibold" href="/signin">Login</Link>

                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )
          }


          {user && (
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
                        <Avatar.Fallback delayMs={600}>{user.name.charAt(0)}</Avatar.Fallback>
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
                      <Link href={`/dashboard/${user?.role}/profile`} className="flex items-center gap-2">
                        <CgProfile />
                        <Label>Profile</Label>
                      </Link>
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
          )}



          {/* Mobile Auth (Avatar or Signup link) */}
          <div className="md:hidden">
            {!user ? (
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            ) : (
              <div className="items-center gap-4 md:flex">
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
                          <Avatar.Fallback delayMs={600}>{user.name.charAt(0)}</Avatar.Fallback>
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
                        <Link href={`/dashboard/${user?.role}/profile`} className="flex items-center gap-2">
                          <CgProfile />
                          <Label>Profile</Label>
                        </Link>
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
            )}
          </div>


        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-separator md:hidden">
            <ul className="flex flex-col gap-2 p-4">
              <li>
                <NavLink href="/" className="block py-2">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink href="/lessons" className="block py-2">
                  Explore
                </NavLink>
              </li>

              {
                user?.role === "user" && (
                  <>
                    <li>
                      <NavLink href="/dashboard/user/add-lessons">Add Lessons
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/dashboard/user/my-lessons">My Lessons
                      </NavLink>
                    </li>
                  </>
                )
              }

              {/* free user  */}
              {user && !user.isPremium && (
                <li>
                  <NavLink href="/pricing">Pricing</NavLink>
                </li>
              )}
              {/* premium user  */}
              {user?.isPremium && (
                <li>
                  <span className="rounded-full bg-gradient-to-r from-[#622ad8] to-[#a8258e] px-3 py-1 text-sm text-white">
                    Premium ⭐
                  </span>
                </li>
              )}


              <li>
                <NavLink href="/about" className="block py-2">
                  About
                </NavLink>
              </li>

              <li>
                <NavLink href="/contact" className="block py-2">
                  Contact
                </NavLink>
              </li>

              <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
                <ThemeToggle />
                {/* <Link href="/signin" className="block font-semibold py-2">
                  Login
                </Link>

                <Link href="/signup">
                  <Button className="w-full">Sign Up</Button>
                </Link> */}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div >
  );
};

export default Navbar;