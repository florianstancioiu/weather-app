import type { Meta, StoryObj } from "@storybook/react-vite";

import HourlyForecast from "./HourlyForecast";

const meta = {
  title: "Components/HourlyForecast",
  component: HourlyForecast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    data: { control: { type: "object" } },
    isLoading: { control: { type: "boolean" } },
  },
} satisfies Meta<typeof HourlyForecast>;

export default meta;
type Story = StoryObj<typeof meta>;

// TODO: Add dummy data for data arg

export const LoadingState: Story = {
  args: {
    isLoading: true,
  },
};
