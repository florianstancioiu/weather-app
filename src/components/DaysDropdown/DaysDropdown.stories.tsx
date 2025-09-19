import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import DaysDropdown from "./DaysDropdown";
import days from "../../utils/stories/days";

const meta = {
  title: "Components/DaysDropdown",
  component: DaysDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    days: { control: { type: "object" } },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof DaysDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SundayActive: Story = {
  args: {
    days: days
      .map((day) => ({ ...day, isActive: false }))
      .map((day) => ({ ...day, isActive: day.title === "Sunday" })),
  },
};

export const MondayActive: Story = {
  args: {
    days: days,
  },
};
