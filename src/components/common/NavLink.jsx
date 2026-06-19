'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children, className }) => {
  const pathName = usePathname();
  const isActive = href === pathName;

  return (
    <Link
      href={href}
      className={`pb-1 transition-all duration-200 font-semibold border-b-2 ${isActive
          ? "border-transparent bg-gradient-to-r from-[#622ad8] to-[#a8258e] bg-[length:100%_2px] bg-no-repeat bg-bottom"
          : "border-transparent"
        } ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;

