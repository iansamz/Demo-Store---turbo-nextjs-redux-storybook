import type { NavItem } from "@lib/types";
import { NavLink } from "./nav-link";

interface NavLinksProps {
  items: NavItem[];
  isMobile?: boolean;
}

const NavLinks = ({ items, isMobile }: NavLinksProps) => {
  const itemsToDisplay = isMobile ? items : items.slice(0, 5);

  return itemsToDisplay.map((item) => (
    <NavLink key={`nav-link-${item.name}`} href={item.href} isMobile={isMobile}>
      {item.name}
    </NavLink>
  ));
};

export { NavLinks };
