import 'virtual:uno.css';
import 'daisyui/dist/full.css';

import addonA11y from '@storybook/addon-a11y';
import { definePreview } from 'storybook-solidjs-vite';

export default definePreview({
	addons: [addonA11y()],
	decorators: [],
	parameters: {
		// automatically create action args for all props that start with 'on'
		actions: {
			argTypesRegex: '^on.*',
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		a11y: {
			test: 'todo',
		},
	},
	// All components will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	// tags: ['autodocs'],
});
