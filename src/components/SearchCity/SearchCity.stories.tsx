import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import SearchCity from "./SearchCity";

const meta = {
  title: "Components/SearchCity",
  component: SearchCity,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onChange: fn(), onSearch: fn() },
} satisfies Meta<typeof SearchCity>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
