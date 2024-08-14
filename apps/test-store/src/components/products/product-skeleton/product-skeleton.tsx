import React from "react";
import { Card } from "@repo/ui/components/card";
import { Skeleton } from "@repo/ui/components/skeleton";
import { cn } from "@repo/ui/lib/utils";

export interface ProductSkeletonProps {
  className?: string;
}

const ProductSkeleton = ({ className }: ProductSkeletonProps) => (
  <li
    data-testid="Product"
    className={cn("inline-flex justify-center items-center", className)}
  >
    <Card className="p-4 min-w-64 w-80">
      <Skeleton className="h-64 w-full" />
      <div className="mt-2 w-full space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/6" />
        </div>
        <Skeleton className="h-4 w-1/2" />
      </div>
    </Card>
  </li>
);

export { ProductSkeleton };
