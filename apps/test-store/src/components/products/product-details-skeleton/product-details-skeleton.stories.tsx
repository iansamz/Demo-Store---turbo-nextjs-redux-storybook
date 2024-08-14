import type { Meta, StoryObj } from "@storybook/react";
import { ProductDetailsSkeleton } from "./product-details-skeleton";

const meta = {
  title: "Store/Components/ProductDetailsSkeleton",
  component: ProductDetailsSkeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {},
} satisfies Meta<typeof ProductDetailsSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
