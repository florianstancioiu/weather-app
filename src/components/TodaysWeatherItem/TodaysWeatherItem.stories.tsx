import type { Meta, StoryObj } from "@storybook/react-vite";

import TodaysWeatherItem from "./TodaysWeatherItem";

const meta = {
  title: "Components/TodaysWeatherItem",
  component: TodaysWeatherItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: { type: "text" } },
    value: { control: { type: "number" } },
    isMetric: { control: { type: "boolean" } },
    isLoading: { control: { type: "boolean" } },
  },
  args: {},
} satisfies Meta<typeof TodaysWeatherItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Feels Like",
    value: 20,
    isMetric: true,
    isLoading: false,
  },
};

export const ImperialUnits: Story = {
  args: {
    title: "Feels Like",
    value: 68,
    isMetric: false,
    isLoading: false,
  },
};

export const Humidity: Story = {
  args: {
    title: "Humidity",
    value: 60,
    isMetric: true,
    isLoading: false,
  },
};

export const Wind: Story = {
  args: {
    title: "Wind",
    value: 5,
    isMetric: true,
    isLoading: false,
  },
};

export const Precipitation: Story = {
  args: {
    title: "Precipitation",
    value: 0,
    isMetric: true,
    isLoading: false,
  },
};

export const LoadingState: Story = {
  args: {
    title: "Precipitation",
    value: 0,
    isMetric: true,
    isLoading: true,
  },
};
