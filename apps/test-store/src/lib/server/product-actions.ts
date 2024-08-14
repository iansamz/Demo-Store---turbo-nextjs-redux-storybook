"use server";

import type { NavItem } from "@lib/types";
import { ENDPOINTS } from "@lib/constants";

export const getProductCategories = async (): Promise<NavItem[]> => {
  const response = await fetch(ENDPOINTS.CATEGORIES);
  const data = (await response.json()) as string[];
  const products = data.map((category) => ({
    name: category,
    href: `/products/category/${category}`,
  }));

  return [{ name: "All", href: "/" }, ...products];
};
