import React from "react";
import { ShoppingBagIcon, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";
import { type Product as ProductType } from "@lib/types";

export interface ProductProps {
  className?: string;
  product: ProductType;
  onAddToCart: (productId: number) => void;
}

const Product = ({ className, product, onAddToCart }: ProductProps) => (
  <li
    data-testid="Product"
    className={cn("inline-flex justify-center", className)}
  >
    <Card className="p-4 relative hover:shadow-lg w-80">
      <a href={`/products/${product.id}`} key={product.id}>
        <div className="flex items-center justify-center transition-all bg-white w-full h-72">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.image}
              className="object-cover h-auto w-auto max-h-full max-w-full"
              aria-label={`Image of ${product.title}`}
              width={800}
              height={800}
            />
          ) : (
            <div className="flex items-center justify-center bg-neutral-100 text-neutral-500 text-sm font-bold uppercase w-full h-full">
              No image
            </div>
          )}
        </div>
        <div className="mt-2 pt-2 flex justify-between border-t">
          <div>
            <h3 className="mt-1 text-sm font-semibold text-neutral-900">
              {product.title}
            </h3>
            <p
              className="mt-1 text-sm text-neutral-500 uppercase font-bold"
              data-testid="Product_Category"
            >
              {product.category}
            </p>
          </div>
          <div className="flex flex-col items-end min-w-max gap-2">
            <p
              className="mt-1 text-sm font-bold text-neutral-900"
              data-testid="Product_PriceRange"
            >
              ${product.price}
            </p>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" fill="yellow" />
              <p className="text-xs font-medium text-neutral-900">
                {product.rating.rate} ({product.rating.count})
              </p>
            </div>
          </div>
        </div>
      </a>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          onAddToCart(product.id);
        }}
        aria-label="add"
        className="absolute top-4 right-4 h-8 w-8 z-10"
        data-testid="Product_PriceRange"
      >
        <ShoppingBagIcon className="h-4 w-4 shrink-0" aria-hidden />
        <span className="sr-only">Add to cart</span>
      </Button>
    </Card>
  </li>
);

export { Product };
