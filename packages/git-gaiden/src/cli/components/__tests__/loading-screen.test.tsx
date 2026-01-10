import React from 'react';
import { render } from 'ink-testing-library';
import { describe, it, expect } from 'vitest';
import { LoadingScreen } from '../loading-screen.js';

describe('LoadingScreen', () => {
	it('renders loading message', () => {
		const { lastFrame } = render(<LoadingScreen />);

		const output = lastFrame();
		expect(output).toContain('Loading scene...');
	});

	it('renders without errors', () => {
		expect(() => {
			render(<LoadingScreen />);
		}).not.toThrow();
	});

	it('displays only loading text', () => {
		const { lastFrame } = render(<LoadingScreen />);

		const output = lastFrame();
		const lines = output?.split('\n').filter((line) => line.trim());
		expect(lines).toHaveLength(1);
		expect(lines?.[0]).toContain('Loading scene...');
	});
});
