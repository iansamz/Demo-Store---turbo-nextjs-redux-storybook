import type { Meta, StoryObj } from "@storybook/react";
import { ToastStory } from "./toast-story";
import { Toaster } from "./toast";

const meta = {
  title: "Components/Toast",
  component: ToastStory,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["success", "error", "info", "promise"],
    },
  },
} satisfies Meta<typeof ToastStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { type: "info" },
  decorators: [
    (Story) => (
      <div className="h-screen w-screen flex justify-center items-center">
        <Story />
        <Toaster richColors />
      </div>
    ),
  ],
};
