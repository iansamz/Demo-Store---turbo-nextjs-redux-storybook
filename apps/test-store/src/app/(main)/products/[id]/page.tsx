"use client";

import { useState } from "react";
import { SectionWrapper } from "@repo/ui/components/section-wrapper";
import { ProductDetails } from "@components/products/product-details";
import { ProductDetailsSkeleton } from "@components/products/product-details-skeleton";
import { useAppDispatch } from "@lib/store/hooks";
import { addCartItem } from "@lib/store/slices/cart-slice";
import { Products } from "@components/products";
import { useGetProductByIdQuery } from "@lib/store/services/products";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: PageProps): JSX.Element {
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(Number(id));

  const dispatch = useAppDispatch();

  if (isLoading) return <ProductDetailsSkeleton />;
  if (error || !product)
    return <div>Error: An Error Occured fetching product</div>;

  const onAddToCart = () => {
    dispatch(addCartItem({ product, quantity }));
  };

  const onUpdateQuantity = (type: "minus" | "plus") => {
    setQuantity((prevQuantity) =>
      type === "minus" ? Math.max(1, prevQuantity - 1) : prevQuantity + 1,
    );
  };

  return (
    <SectionWrapper>
      <ProductDetails
        product={product}
        quantity={quantity}
        onAddToCart={onAddToCart}
        onUpdateQuantity={onUpdateQuantity}
      />
      <div className="mt-8 space-y-6">
        <h3 className="text-2xl font-semibold text-neutral-900">
          Related Products
        </h3>
        <Products
          category={product.category}
          limit={3}
          relatedProuctId={product.id}
        />
      </div>
    </SectionWrapper>
  );
}
