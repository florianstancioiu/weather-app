import type { Meta, StoryObj } from "@storybook/react-vite";

import WeatherCodeImage from "./WeatherCodeImage";

const meta = {
  title: "Components/WeatherCodeImage",
  component: WeatherCodeImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    code: { control: { type: "number", min: 0, max: 99 } },
    className: { control: { type: "text" } },
  },
  args: {},
} satisfies Meta<typeof WeatherCodeImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    code: 0,
  },
};

export const PartylCloudy: Story = {
  args: {
    code: 1,
  },
};

export const Cloudy: Story = {
  args: {
    code: 3,
  },
};

export const Foggy: Story = {
  args: {
    code: 45,
  },
};

export const Drizzle: Story = {
  args: {
    code: 51,
  },
};

export const Rain: Story = {
  args: {
    code: 61,
  },
};

export const Snow: Story = {
  args: {
    code: 71,
  },
};

export const Storm: Story = {
  args: {
    code: 95,
  },
};

export const UnknownWeather: Story = {
  args: {
    code: 100,
  },
};
