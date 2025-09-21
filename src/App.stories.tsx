import type { Meta, StoryObj } from "@storybook/react-vite";

import App from "./App";

const meta = {
  title: "Pages/Index",
  component: App,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="md:mx-auto xl:w-[75.75rem] md:w-[45rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
