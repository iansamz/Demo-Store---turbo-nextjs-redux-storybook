import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Product } from "./product";

const meta = {
  title: "Store/Components/Product",
  component: Product,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    onAddToCart: fn(),
  },
} satisfies Meta<typeof Product>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
  },
};
