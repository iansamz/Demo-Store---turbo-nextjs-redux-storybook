import React from "react";
import { Footer } from "@repo/ui/components/footer";
import type { NavItem } from "@lib/types";
import { getProductCategories } from "@lib/server/product-actions";
import { Header } from "@components/header";

interface PageElementProps {
  children: React.ReactNode;
}

export default async function MainLayout({
  children,
}: PageElementProps): Promise<JSX.Element> {
  let navItems: NavItem[] = [];

  try {
    navItems = await getProductCategories();
  } catch (error) {
    // handle error for missing nav items
  }

  return (
    <>
      <Header navItems={navItems} />
      <div className="flex min-h-[calc(100dvh-64px)] flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
