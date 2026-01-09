#!/usr/bin/env node

/* eslint-disable import/no-unresolved */
import meow from 'meow';

meow(
	`
	Usage
	  $ gaiden [options]

	Options
	  --help     Show this help message
	  --version  Show version number

	Examples
	  $ gaiden
	  $ gaiden --help
`,
	{
		importMeta: import.meta,
	},
);

console.log('Git Gaiden - Coming soon!');
