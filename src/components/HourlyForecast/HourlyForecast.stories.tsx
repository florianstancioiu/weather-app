import type { Meta, StoryObj } from "@storybook/react-vite";

import HourlyForecast, { type ForecastHourlyData } from "./HourlyForecast";
import { data, fahrenheitData } from "../../utils/stories/hourlyForecast";

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

export const Primary: Story = {
  args: {
    data: data as ForecastHourlyData,
    isLoading: false,
  },
};

// TODO: Add isMetric prop
// First in the component and then here too
export const ImperialUnits: Story = {
  args: {
    data: fahrenheitData as ForecastHourlyData,
    isLoading: false,
  },
};

export const LoadingState: Story = {
  args: {
    isLoading: true,
  },
};
