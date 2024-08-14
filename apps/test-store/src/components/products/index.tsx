"use client";

import { ProductList } from "@components/products/product-list";
import { ProductListSkeleton } from "@components/products/product-list-skeleton";
import type { Product } from "@lib/types";
import { useAppDispatch } from "@lib/store/hooks";
import { addCartItem } from "@lib/store/slices/cart-slice";
import { useGetProductsQuery } from "@lib/store/services/products";

export interface ProductsProps {
  category?: string;
  limit?: number;
  relatedProuctId?: number;
}

export function Products({
  category,
  limit,
  relatedProuctId,
}: ProductsProps): JSX.Element {
  const { data, isLoading, error } = useGetProductsQuery({ limit, category });

  const dispatch = useAppDispatch();

  if (isLoading) return <ProductListSkeleton count={limit ? limit : 9} />;
  if (error || !data)
    return <div>Error: An error occurred while fetching products.</div>;

  let products = data;
  if (relatedProuctId) {
    products = data.filter(
      (product: Product) => product.id !== relatedProuctId,
    );
  }

  const onAddToCart = (productId: number) => {
    const product = data.find((p: Product) => p.id === productId);
    if (!product) return;
    dispatch(
      addCartItem({
        product,
        quantity: 1,
      }),
    );
  };

  return <ProductList products={products} onAddToCart={onAddToCart} />;
}
