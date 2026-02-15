import type { Meta, StoryObj } from 'storybook-solidjs-vite';

import RepoSelectorVariation3 from '../src/components/experiments/repo-selector-variation3';

const meta: Meta<typeof RepoSelectorVariation3> = {
	title: 'Experiments/Repo Selector Variation 3',
	component: RepoSelectorVariation3,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
