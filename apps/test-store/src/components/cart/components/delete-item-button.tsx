"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/button";
import type { ProductCart } from "@lib/types";
import { useAppDispatch } from "@lib/store/hooks";
import { removeCartItem } from "@lib/store/slices/cart-slice";

export function DeleteItemButton({ item }: { item: ProductCart }) {
  const [isItemRemoved, setIsItemRemoved] = useState(false);
  const dispatch = useAppDispatch();

  const onRemoveItem = (id: number) => {
    setIsItemRemoved(true);
    dispatch(removeCartItem(id));
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        aria-label="Remove cart item"
        className={cn(
          "ease flex h-[17px] w-[17px] bg-neutral-900 transition-all duration-200 hover:bg-destructive",
        )}
        onClick={() => {
          onRemoveItem(item.id);
        }}
      >
        <X className="mx-[1px] h-4 w-4 text-white" />
      </Button>
      {isItemRemoved && (
        <p aria-live="polite" className="sr-only" role="status">
          {`"${item.title}"`}has been removed from your cart.
        </p>
      )}
    </>
  );
}
