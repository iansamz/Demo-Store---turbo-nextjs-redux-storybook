import React from "react";
import { cn } from "@repo/ui/lib/utils";
import { Skeleton } from "@repo/ui/components/skeleton";

export interface ProductDetailsSkeletonProps {
  className?: string;
}

const ProductDetailsSkeleton = ({ className }: ProductDetailsSkeletonProps) => (
  <div
    className={cn("grid gap-2 sm:grid-cols-2 lg:grid-cols-8 h-full", className)}
  >
    <div className="md:col-span-1 lg:col-span-5 h-72 md:h-[800px] m-8">
      <Skeleton className="w-full h-full" />
    </div>
    <div className="flex flex-col pt-6 sm:col-span-1 sm:px-6 p-6 lg:col-span-3 lg:pt-16">
      <div className="space-y-8">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-1/3 h-6" />
        <Skeleton className="w-full h-8" />
      </div>
    </div>
  </div>
);

export { ProductDetailsSkeleton };
