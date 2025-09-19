import type { Meta, StoryObj } from "@storybook/react-vite";

import HourlyForecastItem from "./HourlyForecastItem";

const meta = {
  title: "Components/HourlyForecastItem",
  component: HourlyForecastItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    hour: { control: { type: "text" } },
    temperature: { control: { type: "number" } },
    weatherCode: { control: { type: "number", min: 0, max: 99 } },
    isLoading: { control: { type: "boolean" } },
  },
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof HourlyForecastItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    hour: "9 AM",
    temperature: 30,
    weatherCode: 0,
    isLoading: false,
  },
};

export const PartlyCloudy: Story = {
  args: {
    hour: "10 AM",
    temperature: 30,
    weatherCode: 1,
    isLoading: false,
  },
};

export const Cloudy: Story = {
  args: {
    hour: "11 AM",
    temperature: 30,
    weatherCode: 3,
    isLoading: false,
  },
};

export const LoadingState: Story = {
  args: {
    hour: "11 AM",
    temperature: 30,
    weatherCode: 2,
    isLoading: true,
  },
};
