#!/usr/bin/env node

import React from 'react';
import { render, Text } from 'ink';
import meow from 'meow';
import { ThemeProvider, useTheme } from '../ui/theme-provider.js';
import { getTheme } from '../ui/themes.js';

const cli = meow(
	`
	Usage
	  $ gaiden [options]

	Options
	  --help     Show this help message
	  --version  Show version number
	  --theme    Theme to use (default, dark, light) [default: default]

	Examples
	  $ gaiden
	  $ gaiden --theme dark
`,
	{
		importMeta: import.meta,
		flags: {
			theme: {
				type: 'string',
				default: 'default',
			},
		},
	},
);

function App() {
	const theme = useTheme();
	return (
		<Text color={theme.colors.text}>Git Gaiden - Theme: {theme.name}</Text>
	);
}

const theme = getTheme(cli.flags.theme);
render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>,
);
