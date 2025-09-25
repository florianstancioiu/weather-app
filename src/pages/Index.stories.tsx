import type { Meta, StoryObj } from "@storybook/react-vite";

import Index from "./Index";

const meta = {
  title: "Pages/Index",
  component: Index,
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
} satisfies Meta<typeof Index>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
