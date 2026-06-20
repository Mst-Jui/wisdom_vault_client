"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import Button from "../reusable/Button";
import ThemeToggle from "./Toggle";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname()
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
          🎉 Avail Up to 4% Extra Discount with Bank Transfer | 💳 Cash on
          Delivery Available | 🚚 Fast Delivery in 2–3 Days.
        </marquee>
      </div>

      <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2">

          {/* Logo */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            <Link href="/">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.webp"
                  alt="logo"
                  width={40}
                  height={40}
                />
                <p className="font-bold">
                  <span className="text-pink-500">Wisdom</span>
                  <span className="text-pink-800">Vault</span>
                </p>
              </div>
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

            <li>
              <NavLink href="/pricing">Pricing</NavLink>
            </li>

            <li>
              <NavLink href="/about">About</NavLink>
            </li>

            <li>
              <NavLink href="/contact">Contact</NavLink>
            </li>
          </ul>

          {/* Auth Buttons */}
          <ThemeToggle />
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
          )}

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

              <li>
                <NavLink href="/pricing" className="block py-2">
                  Pricing
                </NavLink>
              </li>

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
                <Link href="/signin" className="block font-semibold py-2">
                  Login
                </Link>

                <Link href="/signup">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;