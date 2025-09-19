import type { Meta, StoryObj } from "@storybook/react-vite";

import DailyForecastItem from "./DailyForecastItem";

const meta = {
  title: "Components/DailyForecastItem",
  component: DailyForecastItem,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    day: { control: { type: "number", min: 0, max: 6 } },
    weatherCode: { control: { type: "number", min: 0 } },
    minimum: { control: "number" },
    maximum: { control: "number" },
    isMetric: { control: "boolean" },
    isLoading: { control: "boolean" },
  },
} satisfies Meta<typeof DailyForecastItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    day: 1,
    weatherCode: 0,
    minimum: 28,
    maximum: 35,
    isMetric: true,
    isLoading: false,
  },
};

export const ImperialUnits: Story = {
  args: {
    day: 2,
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
