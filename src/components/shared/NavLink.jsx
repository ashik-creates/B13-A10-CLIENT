"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({
  href,
  children,
  mobile = false,
  onClick,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`transition-all duration-200 ${
        mobile
          ? `block rounded-lg px-4 py-2.5 text-sm font-medium ${
              isActive
                ? "bg-[#9C27B0]/10 text-[#9C27B0]"
                : "text-muted-foreground hover:bg-default-100 hover:text-foreground"
            }`
          : `rounded-md px-4 py-2 text-sm font-medium ${
              isActive
                ? "bg-[#9C27B0]/10 text-[#9C27B0]"
                : "text-muted-foreground hover:bg-default-100 hover:text-foreground"
            }`
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;