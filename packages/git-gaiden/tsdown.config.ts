import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: ['src/cli/index.tsx'],
	format: 'esm',
	outDir: 'dist',
	target: 'node18',
	shims: true,
	banner: { js: '#!/usr/bin/env node' },
	clean: true,
	dts: true,
});
