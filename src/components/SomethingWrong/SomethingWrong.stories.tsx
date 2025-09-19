import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import SomethingWrong from "./SomethingWrong";

const meta = {
  title: "Components/SomethingWrong",
  component: SomethingWrong,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onRetry: fn() },
} satisfies Meta<typeof SomethingWrong>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
