import type { Meta, StoryObj } from 'storybook-solidjs-vite';

import RepoSelectorVariation2 from '../src/components/experiments/repo-selector-variation2';

const meta: Meta<typeof RepoSelectorVariation2> = {
	title: 'Experiments/Repo Selector Variation 2',
	component: RepoSelectorVariation2,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
