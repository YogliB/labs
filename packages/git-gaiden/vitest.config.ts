/* eslint-disable import/no-unresolved */
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'node',
		snapshotFormat: {
			printBasicPrototype: false,
		},
	},
	coverage: {
		provider: 'v8',
		reporter: ['text', 'html', 'json', 'json-summary'],
		include: ['src/**/*.ts', 'src/**/*.tsx'],
		exclude: [
			'node_modules/',
			'dist/',
			'**/*.test.ts',
			'**/*.spec.ts',
			'**/*.d.ts',
		],
		all: true,
		lines: 70,
		functions: 70,
		branches: 70,
		statements: 70,
	},
});
