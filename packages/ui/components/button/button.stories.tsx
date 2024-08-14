import { fn } from "@storybook/test";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: { type: "radio" },
      options: ["default", "sm", "lg"],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    children: "Button",
  },
};

export const Destructive = {
  args: {
    children: "Button",
    variant: "destructive",
  },
};

export const Secondary = {
  args: {
    children: "Button",
    variant: "secondary",
  },
};

export const Ghost = {
  args: {
    children: "Button",
    variant: "ghost",
  },
};

export const Link = {
  args: {
    children: "Button",
    variant: "link",
  },
};

export const Loading = {
  args: {
    children: "Button",
    loading: true,
  },
};

export const Icon = {
  args: {
    children: <ChevronRight />,
    size: "icon",
  },
};

export const WithIconLeft = {
  args: {
    children: (
      <>
        <ChevronLeft className="w-4 h-4" />
        <span>Back</span>
      </>
    ),
    variant: "default",
  },
};

export const WithIconRight = {
  args: {
    children: (
      <>
        <span>Button</span>
        <ChevronRight className="w-4 h-4" />
      </>
    ),
    variant: "default",
  },
};

export const Small = {
  args: {
    children: "Button",
    size: "sm",
  },
};

export const Large = {
  args: {
    children: "Button",
    size: "lg",
  },
};
