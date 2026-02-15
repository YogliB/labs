import type { Meta, StoryObj } from 'storybook-solidjs-vite';

import RepoSelectorVariation4 from '../src/components/experiments/repo-selector-variation4';

const meta: Meta<typeof RepoSelectorVariation4> = {
	title: 'Experiments/Repo Selector Variation 4',
	component: RepoSelectorVariation4,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
