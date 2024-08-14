import type { Meta, StoryObj } from "@storybook/react";
import { ProductListSkeleton } from "./product-list-skeleton";

const meta = {
  title: "Store/Components/ProductListSkeleton",
  component: ProductListSkeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ProductListSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 10,
  },
};
