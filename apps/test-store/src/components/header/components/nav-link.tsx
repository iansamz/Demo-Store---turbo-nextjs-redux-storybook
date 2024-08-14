"use client";

import Link from "next/link";
import { cn } from "@repo/ui/lib/utils";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  isMobile?: boolean;
  children: React.ReactNode;
}

const NavLink = ({ href, isMobile, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = decodeURI(pathname) === href;

  return (
    <li className="inline-flex">
      <Link
        href={href}
        className={cn(
          isActive
            ? "border-neutral-900 text-neutral-900"
            : "border-transparent text-neutral-500",
          !isMobile ? "border-b-2 " : "",
          "inline-flex items-center pt-px text-sm font-medium hover:text-neutral-700 capitalize",
        )}
      >
        {children}
      </Link>
    </li>
  );
};

export { NavLink };
