import type { Meta, StoryObj } from "@storybook/react-vite";

import DailyForecast, { type ForecastDailyData } from "./DailyForecast";

import { data, fahrenheitData } from "../../utils/stories/dailyForecast";

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

export const Primary: Story = {
  args: {
    data: data as ForecastDailyData,
    isMetric: true,
    isLoading: false,
  },
};

export const ImperialUnits: Story = {
  args: {
    data: fahrenheitData as ForecastDailyData,
    isMetric: false,
    isLoading: false,
  },
};

export const LoadingState: Story = {
  args: {
    isMetric: false,
    isLoading: true,
  },
};
