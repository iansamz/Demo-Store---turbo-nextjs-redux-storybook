"use client";

import { useState } from "react";
import { ShoppingBagIcon } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/sheet";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch } from "@lib/store/hooks";
import { type CartState, clearCart } from "@lib/store/slices/cart-slice";
import { Price } from "./components/price";
import { DeleteItemButton } from "./components/delete-item-button";
import { EditItemQuantityButton } from "./components/edit-item-quantity-button";

interface CartProps {
  cart: CartState;
}

export const Cart = ({ cart }: CartProps) => {
  const { cartItems, totalPrice, taxesAmount } = cart;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const dispatch = useAppDispatch();
  const onClearCart = () => {
    // simulate loading
    setCheckoutLoading(true);
    setTimeout(() => {
      dispatch(clearCart());
      setCheckoutLoading(false);
      setIsCartOpen(false);
    }, 2000);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative flex items-center"
          data-testid="CartButton"
        >
          <ShoppingBagIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
          {cartItems.length > 0 ? (
            <div
              className={cn(
                "absolute bottom-2 right-2 -mb-2 -mr-2 flex h-4 flex-col items-center justify-center rounded bg-neutral-900 text-xs font-medium text-white",
                cartItems.length > 9 ? "w-[3ch]" : "w-[2ch]",
              )}
            >
              {cartItems.length}{" "}
              <span className="sr-only">
                item{cartItems.length > 1 ? "s" : ""} in cart, view bag
              </span>
            </div>
          ) : (
            <span className="sr-only">0 items in cart</span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="h-full backdrop-blur-md">
        <SheetTitle>
          My Cart ({cartItems.length})<span className="sr-only">Cart</span>
        </SheetTitle>
        <SheetDescription />
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-neutral-500 gap-2">
            <ShoppingBagIcon
              className="h-12 w-12 shrink-0"
              aria-hidden="true"
            />
            Your cart is empty
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between overflow-hidden p-1 pb-6">
            <ScrollArea className="h-full">
              <ul className="flex-grow overflow-auto py-4">
                {cartItems.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className="flex w-full flex-col border-b border-neutral-300"
                    >
                      <div className="relative flex w-full flex-row justify-between px-1 py-4">
                        <div className="absolute z-40 -mt-2 ml-[55px]">
                          <DeleteItemButton item={item} />
                        </div>
                        <Link
                          href={`/products/${item.id}`}
                          onClick={() => {
                            setIsCartOpen(false);
                          }}
                          className="z-30 flex flex-row space-x-4"
                        >
                          <div className="flex items-center justify-center relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-transparent">
                            <Image
                              width={64}
                              height={64}
                              alt={`cart-item-${item.title}`}
                              src={item.image}
                              className="object-cover h-auto w-auto max-h-full max-w-full"
                            />
                          </div>

                          <div className="flex flex-1 flex-col text-base">
                            <span className="leading-tight">{item.title}</span>
                            <p className="text-xs text-neutral-500 font-bold dark:text-neutral-400 uppercase">
                              {item.category}
                            </p>
                          </div>
                        </Link>
                        <div className="flex h-16 flex-col justify-between">
                          <Price
                            amount={item.price.toString()}
                            currencyCode="USD"
                          />
                          <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200">
                            <EditItemQuantityButton item={item} type="minus" />
                            <p className="w-6 text-center">
                              <span className="w-full text-sm">
                                {item.quantity}
                              </span>
                            </p>
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </ScrollArea>
            <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400 border-t border-t-neutral-200">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1">
                <p>Taxes</p>
                <Price amount={taxesAmount.toString()} currencyCode="USD" />
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                <p>Shipping</p>
                <p className="text-right">Calculated at checkout</p>
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                <p>Total</p>

                <Price amount={totalPrice.toString()} currencyCode="USD" />
              </div>
            </div>
            <Button size="xl" loading={checkoutLoading} onClick={onClearCart}>
              Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
