import type { Meta, StoryObj } from "@storybook/react-vite";

import DailyForecast from "./DailyForecast";

const meta = {
  title: "Components/DailyForecast",
  component: DailyForecast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    data: { control: "object" },
    isMetric: { control: "boolean" },
    isLoading: { control: "boolean" },
  },
} satisfies Meta<typeof DailyForecast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    isMetric: false,
    isLoading: true,
  },
};
