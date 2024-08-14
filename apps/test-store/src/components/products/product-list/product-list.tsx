import React from "react";
import { cn } from "@repo/ui/lib/utils";
import { type Product as ProductType } from "@lib/types";
import { Product } from "../product";

export interface ProductListProps {
  className?: string;
  products: ProductType[];
  onAddToCart: (productId: number) => void;
}

const ProductList = ({
  className,
  products,
  onAddToCart,
}: ProductListProps) => (
  <ul
    role="list"
    data-testid="ProductList"
    className={cn(
      "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3",
      className,
    )}
  >
    {products.map((product) => (
      <Product key={product.id} product={product} onAddToCart={onAddToCart} />
    ))}
  </ul>
);

export { ProductList };
