import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import type { Product, ProductCart } from "@lib/types";
import { type RootState } from "@lib/store";

export interface CartState {
  cartItems: ProductCart[];
  totalPrice: number;
  taxesAmount: number;
}

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
  taxesAmount: 0,
};

const getTotalPrice = (products: ProductCart[]): number => {
  return products.reduce((accumulator: number, item: ProductCart) => {
    return accumulator + item.quantity * item.price;
  }, 0);
};

const getTaxesAmount = (totalPrice: number): number => {
  return totalPrice * 0.1;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(
      state,
      action: PayloadAction<{ product: Product; quantity: number }>,
    ) {
      const { product, quantity } = action.payload;

      if (state.cartItems.find((item) => item.id === product.id)) {
        const newCartItems = state.cartItems;
        const index = newCartItems.findIndex((item) => item.id === product.id);
        newCartItems[index].quantity += quantity;
        state.cartItems = [...newCartItems];
        toast.success("Product quantity updated in cart");
      } else {
        state.cartItems = [...state.cartItems, { ...product, quantity }];
        toast.success("Product added to cart");
      }

      state.totalPrice = getTotalPrice(state.cartItems);
      state.taxesAmount = getTaxesAmount(state.totalPrice);
    },

    removeCartItem(state, action) {
      const newCartItems = state.cartItems;
      const newData = newCartItems.filter((item) => item.id !== action.payload);
      state.cartItems = newData;
      state.totalPrice = getTotalPrice(state.cartItems);
      state.taxesAmount = getTaxesAmount(state.totalPrice);
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; value: "plus" | "minus" }>,
    ) => {
      const { id, value } = action.payload;
      const cartItems = state.cartItems;
      const index = cartItems.findIndex((item) => item.id === id);
      if (index === -1) {
        return;
      }

      const item = cartItems[index];
      if (value === "plus") {
        item.quantity += 1;
      } else {
        item.quantity -= 1;
      }

      if (item.quantity < 1) {
        cartItems.splice(index, 1);
      }

      state.cartItems = [...cartItems];
      state.totalPrice = getTotalPrice(state.cartItems);
      state.taxesAmount = getTaxesAmount(state.totalPrice);
    },

    clearCart: () => {
      toast.info("Checkout successful");
      return initialState;
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  updateCartItemQuantity,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

export const cartData = (state: RootState) => state.cart;

export default cartSlice.reducer;
