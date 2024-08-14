"use client";

import { usePathname } from "next/navigation";

const companyName = "DVT";

export const Logo = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <h1 className="flex items-center font-bold" aria-label="homepage">
        {companyName}
      </h1>
    );
  }
  return (
    <div className="flex items-center font-bold">
      <a aria-label="homepage" href="/">
        {companyName}
      </a>
    </div>
  );
};
