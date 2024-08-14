import React from "react";
import { MinusIcon, PlusIcon, ShoppingBagIcon, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { type Product as ProductType } from "@lib/types";

export interface ProductDetailsProps {
  className?: string;
  product: ProductType;
  quantity: number;
  onAddToCart: () => void;
  onUpdateQuantity: (type: "minus" | "plus") => void;
}

const ProductDetails = ({
  className,
  product,
  quantity,
  onAddToCart,
  onUpdateQuantity,
}: ProductDetailsProps) => (
  <div
    className={cn("grid gap-2 sm:grid-cols-2 lg:grid-cols-8", className)}
    aria-labelledby="product-title"
  >
    <div className="md:col-span-1 lg:col-span-5 flex items-center justify-center transition-all rounded border border-neutral-200 p-4 w-full h-72 md:h-[800px]">
      {product.image ? (
        <Image
          priority={true}
          src={product.image}
          alt={product.image}
          className="object-cover h-auto w-auto max-h-full max-w-full"
          aria-label={`Image of ${product.title}`}
          width={800}
          height={800}
        />
      ) : (
        <div
          className="flex items-center justify-center bg-neutral-100 text-neutral-500 text-sm font-bold uppercase w-full h-full"
          role="img"
          aria-label="No image available"
        >
          No image
        </div>
      )}
    </div>
    <div className="flex flex-col pt-6 sm:col-span-1 sm:px-6 sm:pt-0 lg:col-span-3 lg:pt-16">
      <div className="space-y-8">
        <div>
          <h1
            className="mb-4 flex-auto text-3xl font-medium tracking-tight text-neutral-900"
            data-testid="ProductDetails_Title"
          >
            {product.title}
          </h1>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" fill="yellow" />
            <p className="text-xs font-medium text-neutral-900">
              {product.rating.rate} ({product.rating.count})
            </p>
          </div>
        </div>
        <p
          className="space-y-2 text-sm text-neutral-500"
          data-testid="ProductDetails_Description"
        >
          {product.description}
        </p>
        <p
          className="mb-8 text-lg font-bold text-neutral-500"
          data-testid="ProductDetails_Price"
        >
          ${product.price} USD
        </p>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-neutral-500">Quantity</p>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                onUpdateQuantity("minus");
              }}
              disabled={quantity === 1}
            >
              <MinusIcon className="w-4 h-4" />
            </Button>

            <div className="w-10 h-10 flex items-center justify-center border rounded text-neutral-500">
              {quantity}
            </div>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                onUpdateQuantity("plus");
              }}
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Button
          size="lg"
          onClick={onAddToCart}
          className="w-full"
          aria-label={`Add ${product.title} to cart`}
        >
          <ShoppingBagIcon className="w-6 h-6 mr-2" />
          Add to cart
        </Button>
      </div>
    </div>
  </div>
);

export { ProductDetails };
