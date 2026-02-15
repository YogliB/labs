import type { Meta, StoryObj } from 'storybook-solidjs-vite';

import RepoSelector from '../src/components/repo-selector';

const meta: Meta<typeof RepoSelector> = {
	title: 'Components/Repo Selector',
	component: RepoSelector,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
