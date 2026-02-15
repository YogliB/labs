import type { Meta, StoryObj } from 'storybook-solidjs-vite';

import RepoSelectorVariation5 from '../src/components/experiments/repo-selector-variation5';

const meta: Meta<typeof RepoSelectorVariation5> = {
	title: 'Experiments/Repo Selector Variation 5',
	component: RepoSelectorVariation5,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
