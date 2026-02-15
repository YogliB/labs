import type { Meta, StoryObj } from 'storybook-solidjs-vite';

import RepoSelectorVariation1 from '../src/components/experiments/repo-selector-variation1';

const meta: Meta<typeof RepoSelectorVariation1> = {
	title: 'Experiments/Repo Selector Variation 1',
	component: RepoSelectorVariation1,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
