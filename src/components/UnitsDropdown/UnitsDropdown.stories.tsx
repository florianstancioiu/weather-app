import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import UnitsDropdown from "./UnitsDropdown";

const meta = {
  title: "Components/UnitsDropdown",
  component: UnitsDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onChangeUnitSystem: fn() },
} satisfies Meta<typeof UnitsDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
