import type { Meta, StoryObj } from "@storybook/react";
import { ProductSkeleton } from "./product-skeleton";

const meta = {
  title: "Store/Components/ProductSkeleton",
  component: ProductSkeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ProductSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
