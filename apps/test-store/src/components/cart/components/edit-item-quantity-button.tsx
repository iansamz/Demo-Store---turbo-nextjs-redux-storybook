"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/button";
import type { ProductCart } from "@lib/types";
import { useAppDispatch } from "@lib/store/hooks";
import { updateCartItemQuantity } from "@lib/store/slices/cart-slice";

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: ProductCart;
  type: "plus" | "minus";
}) {
  const [isQuanityChanged, setIsQuantityChanged] = useState(false);
  const dispatch = useAppDispatch();
  const onEditItemQuantity = (id: number, value: "plus" | "minus") => {
    setIsQuantityChanged(true);
    dispatch(updateCartItemQuantity({ id, value }));
  };

  return (
    <>
      <Button
        onClick={() => {
          onEditItemQuantity(item.id, type);
        }}
        variant="outline"
        size="icon"
        aria-label={
          type === "plus" ? "Increase item quantity" : "Reduce item quantity"
        }
        className={cn(
          "ease flex h-full min-w-[36px] max-w-[36px] border-none rounded-full px-2 transition-all duration-200 hover:text-white hover:bg-neutral-800 hover:border-neutral-800",
          {
            "ml-auto": type === "minus",
          },
        )}
      >
        {type === "plus" ? (
          <PlusIcon className="h-4 w-4" />
        ) : (
          <MinusIcon className="h-4 w-4" />
        )}
      </Button>

      {isQuanityChanged && (
        <p aria-live="polite" className="sr-only" role="status">
          {`"${item.title}"`} quantity has been updated to{" "}
          {type === "plus" ? item.quantity + 1 : item.quantity - 1}.
        </p>
      )}
    </>
  );
}
