import React from 'react';
import { render } from 'ink-testing-library';
import { describe, it, expect } from 'vitest';
import { SceneView } from '../scene-view.js';
import type { Choice } from '../../../narrative/types.js';

const createMockScene = (overrides = {}) => ({
	id: 'abc1234567890def',
	sceneText: 'You stand at a crossroads.',
	choices: [] as readonly Choice[],
	...overrides,
});

describe('SceneView', () => {
	it('renders scene text', () => {
		const scene = createMockScene({
			sceneText: 'You enter a mysterious cave.',
		});
		const { lastFrame } = render(<SceneView scene={scene} />);

		const output = lastFrame();
		expect(output).toContain('You enter a mysterious cave.');
	});

	it('displays commit hash first 7 characters', () => {
		const scene = createMockScene({
			id: 'abc1234567890def',
		});
		const { lastFrame } = render(<SceneView scene={scene} />);

		const output = lastFrame();
		expect(output).toContain('abc1234');
	});

	it('renders without errors', () => {
		const scene = createMockScene();
		expect(() => {
			render(<SceneView scene={scene} />);
		}).not.toThrow();
	});

	it('displays full scene information', () => {
		const scene = createMockScene({
			id: 'def5678901234abc',
			sceneText: 'A long story begins here...',
		});
		const { lastFrame } = render(<SceneView scene={scene} />);

		const output = lastFrame();
		expect(output).toContain('A long story begins here...');
		expect(output).toContain('def5678');
	});

	it('handles multiline scene text', () => {
		const scene = createMockScene({
			sceneText: 'Line one\nLine two\nLine three',
		});
		const { lastFrame } = render(<SceneView scene={scene} />);

		const output = lastFrame();
		expect(output).toContain('Line one');
		expect(output).toContain('Line two');
		expect(output).toContain('Line three');
	});

	it('handles very long commit hashes', () => {
		const scene = createMockScene({
			id: 'a'.repeat(50),
		});
		const { lastFrame } = render(<SceneView scene={scene} />);

		const output = lastFrame();
		expect(output).toContain('aaaaaaa');
	});

	it('displays commit info with Commit label', () => {
		const scene = createMockScene({
			id: '1234567890abcdef',
		});
		const { lastFrame } = render(<SceneView scene={scene} />);

		const output = lastFrame();
		expect(output).toContain('Commit:');
	});

	it('handles empty scene text', () => {
		const scene = createMockScene({
			sceneText: '',
		});
		const { lastFrame } = render(<SceneView scene={scene} />);

		const output = lastFrame();
		expect(output).toBeDefined();
	});

	it('renders scene with minimal commit hash', () => {
		const scene = createMockScene({
			id: 'a',
		});
		const { lastFrame } = render(<SceneView scene={scene} />);

		const output = lastFrame();
		expect(output).toContain('a');
	});
});
