import type { Meta, StoryObj } from "@storybook/react-vite";

import NoSearchResults from "./NoSearchResults";

const meta = {
  title: "Components/NoSearchResults",
  component: NoSearchResults,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof NoSearchResults>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
