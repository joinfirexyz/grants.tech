import type { Meta, StoryObj } from '@storybook/react';

import { GrantList } from '../components/GrantList';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'GrantList',
  component: GrantList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof GrantList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    grants: [{title: "gud grant"},{title: "gud grant"},{title: "gud grant"}],
  },
};
