import type { Meta, StoryObj } from "@storybook/react-vite";

import TodaysWeather from "./TodaysWeather";

import { primaryData, secondaryData } from "../../utils/stories/todaysWeather";

const meta = {
  title: "Components/TodaysWeather",
  component: TodaysWeather,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    primaryData: { control: { type: "object" } },
    secondaryData: { control: { type: "object" } },
    isMetric: { control: { type: "boolean" } },
    isLoading: { control: { type: "boolean" } },
  },
  args: {},
} satisfies Meta<typeof TodaysWeather>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primaryData,
    secondaryData,
    isMetric: true,
    isLoading: false,
  },
};

export const CurrentLocation: Story = {
  args: {
    primaryData: {
      ...primaryData,
      city: "Current location",
    },
    secondaryData,
    isMetric: true,
    isLoading: false,
  },
};

export const ImperialUnits: Story = {
  args: {
    primaryData,
    secondaryData,
    isMetric: false,
    isLoading: false,
  },
};

export const LoadingState: Story = {
  args: {
    primaryData,
    secondaryData,
    isMetric: false,
    isLoading: true,
  },
};
