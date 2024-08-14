import React from "react";
import { cn } from "@repo/ui/lib/utils";
import { ProductSkeleton } from "../product-skeleton";

export interface ProductListSkeletonProps {
  count?: number;
  className?: string;
}

const ProductListSkeleton = ({
  className,
  count = 1,
}: ProductListSkeletonProps) => (
  <ul
    data-testid="ProductList"
    className={cn(
      "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
      className,
    )}
  >
    {Array<number>(count)
      .fill(0)
      .map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
  </ul>
);

export { ProductListSkeleton };
