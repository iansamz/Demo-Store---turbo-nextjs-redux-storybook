"use client";

import React, { useMemo } from "react";
import { Header as HeaderWrapper } from "@repo/ui/components/header";
import { Nav } from "@repo/ui/components/nav";
import { SearchBar } from "@repo/ui/components/search-bar";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { Logo } from "@repo/ui/components/logo";
import type { NavItem } from "@lib/types";
import { NavLinks } from "@components/header/components/nav-links";
import { Cart } from "@components/cart";
import { UserMenu } from "@components/header/components/user-menu";
import { MobileMenu } from "@components/header/components/mobile-menu";
import { cartData } from "@lib/store/slices/cart-slice";
import { useAppSelector } from "@lib/store/hooks";
import { selectAuth } from "@lib/store/slices/auth-slice";

export default function Header({
  navItems,
}: {
  navItems: NavItem[];
}): JSX.Element {
  const cart = useAppSelector(cartData);
  const auth = useAppSelector(selectAuth);

  const isUserLoggedIn = useMemo(() => Boolean(auth.token), [auth.token]);

  return (
    <HeaderWrapper>
      <Nav>
        <ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
          <NavLinks items={navItems} />
        </ul>
        <div className="ml-auto flex items-center justify-center gap-4 whitespace-nowrap lg:gap-8">
          <div className="hidden lg:flex">
            <SearchBar />
          </div>
          <UserMenu isUserLoggedIn={isUserLoggedIn} />
        </div>
        <div className="flex items-center">
          <Cart cart={cart} />
        </div>
        <MobileMenu>
          <div className="mx-1 flex flex-col gap-4">
            <Logo />
            <SearchBar />
          </div>
          <ScrollArea className="h-full">
            <ul
              className="flex h-full flex-col divide-y divide-neutral-200 whitespace-nowrap p-3 pt-0 sm:p-8 sm:pt-0 [&>li]:py-3"
              id="mobile-menu"
            >
              <NavLinks items={navItems} isMobile />
            </ul>
          </ScrollArea>
        </MobileMenu>
      </Nav>
    </HeaderWrapper>
  );
}
