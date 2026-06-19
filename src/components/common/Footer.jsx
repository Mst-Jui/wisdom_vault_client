'use client'

import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname()
    if (pathname.includes('dashboard')) {
      return null;
    }
  return (
    <div>
      Footer
    </div>
  );
};

export default Footer;