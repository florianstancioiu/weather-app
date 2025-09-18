import type { Meta, StoryObj } from "@storybook/react-vite";

import DailyForecastItem from "./DailyForecastItem";

const meta = {
  title: "Components/DailyForecastItem",
  component: DailyForecastItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    day: { control: "number" },
    weatherCode: { control: "number" },
    minimum: { control: "number" },
    maximum: { control: "number" },
    isMetric: { control: "boolean" },
    isLoading: { control: "boolean" },
  },
} satisfies Meta<typeof DailyForecastItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Monday: Story = {
  args: {
    day: 1,
    weatherCode: 0,
    minimum: 28,
    maximum: 35,
    isMetric: true,
    isLoading: false,
  },
};

export const MondayWithImperialUnits: Story = {
  args: {
    day: 1,
    weatherCode: 0,
    minimum: 28,
    maximum: 35,
    isMetric: false,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    day: 1,
    weatherCode: 0,
    minimum: 28,
    maximum: 35,
    isMetric: false,
    isLoading: true,
  },
};
