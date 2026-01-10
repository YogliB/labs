import React from 'react';
import { render } from 'ink-testing-library';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Game } from '../game.js';
import type { StoryNode } from '../../../game/types.js';
import type { GameStateManager } from '../../../game/state.js';
import type { NarrativeEngine } from '../../../narrative/engine.js';

const createMockStoryNode = (overrides = {}): StoryNode => ({
	commitHash: 'abc123',
	branch: 'main',
	children: [],
	...overrides,
});

const createMockGameStateManager = (): GameStateManager =>
	({
		reset: vi.fn(),
		getCurrentState: vi.fn(() => ({})),
	}) as unknown as GameStateManager;

const createMockNarrativeEngine = (): NarrativeEngine =>
	({
		generateScene: vi.fn(async () => ({
			id: 'scene-1',
			sceneText: 'You stand at a crossroads.',
			choices: [
				{ id: 'choice-1', label: 'Go left', type: 'safe' },
				{ id: 'choice-2', label: 'Go right', type: 'risky' },
			],
		})),
		initialize: vi.fn(() => Promise.resolve()),
	}) as unknown as NarrativeEngine;

describe('Game', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders without errors', () => {
		const storyGraph = createMockStoryNode();
		const stateManager = createMockGameStateManager();
		const engine = createMockNarrativeEngine();

		expect(() => {
			render(
				<Game
					storyGraph={storyGraph}
					stateManager={stateManager}
					engine={engine}
				/>,
			);
		}).not.toThrow();
	});

	it('shows loading screen initially', () => {
		const storyGraph = createMockStoryNode();
		const stateManager = createMockGameStateManager();
		const engine = createMockNarrativeEngine();

		const { lastFrame } = render(
			<Game
				storyGraph={storyGraph}
				stateManager={stateManager}
				engine={engine}
			/>,
		);

		const output = lastFrame();
		expect(output).toContain('Loading scene...');
	});

	it('accepts game props with different branch names', () => {
		const storyGraph = createMockStoryNode({
			commitHash: 'def456',
			branch: 'feature',
		});
		const stateManager = createMockGameStateManager();
		const engine = createMockNarrativeEngine();

		expect(() => {
			render(
				<Game
					storyGraph={storyGraph}
					stateManager={stateManager}
					engine={engine}
				/>,
			);
		}).not.toThrow();
	});

	it('accepts story graph with multiple children nodes', () => {
		const childNode1 = createMockStoryNode({
			commitHash: 'child1',
			branch: 'feature-1',
		});
		const childNode2 = createMockStoryNode({
			commitHash: 'child2',
			branch: 'feature-2',
		});
		const storyGraph = createMockStoryNode({
			children: [childNode1, childNode2],
		});
		const stateManager = createMockGameStateManager();
		const engine = createMockNarrativeEngine();

		expect(() => {
			render(
				<Game
					storyGraph={storyGraph}
					stateManager={stateManager}
					engine={engine}
				/>,
			);
		}).not.toThrow();
	});

	it('accepts game state manager', () => {
		const storyGraph = createMockStoryNode();
		const stateManager = createMockGameStateManager();
		const engine = createMockNarrativeEngine();

		expect(() => {
			render(
				<Game
					storyGraph={storyGraph}
					stateManager={stateManager}
					engine={engine}
				/>,
			);
		}).not.toThrow();

		expect(stateManager).toBeDefined();
	});

	it('accepts narrative engine', () => {
		const storyGraph = createMockStoryNode();
		const stateManager = createMockGameStateManager();
		const engine = createMockNarrativeEngine();

		expect(() => {
			render(
				<Game
					storyGraph={storyGraph}
					stateManager={stateManager}
					engine={engine}
				/>,
			);
		}).not.toThrow();

		expect(engine).toBeDefined();
	});

	it('renders component with long branch names', () => {
		const storyGraph = createMockStoryNode({
			branch: 'feature/very-long-branch-name-with-many-words',
		});
		const stateManager = createMockGameStateManager();
		const engine = createMockNarrativeEngine();

		expect(() => {
			render(
				<Game
					storyGraph={storyGraph}
					stateManager={stateManager}
					engine={engine}
				/>,
			);
		}).not.toThrow();
	});

	it('renders component with complex commit hashes', () => {
		const storyGraph = createMockStoryNode({
			commitHash: 'abc123def456ghi789jkl012mnopqr',
		});
		const stateManager = createMockGameStateManager();
		const engine = createMockNarrativeEngine();

		expect(() => {
			render(
				<Game
					storyGraph={storyGraph}
					stateManager={stateManager}
					engine={engine}
				/>,
			);
		}).not.toThrow();
	});

	it('renders with deeply nested story structure', () => {
		const leaf = createMockStoryNode({
			commitHash: 'leaf',
			branch: 'leaf',
		});
		const middle = createMockStoryNode({
			commitHash: 'middle',
			branch: 'middle',
			children: [leaf],
		});
		const storyGraph = createMockStoryNode({
			commitHash: 'root',
			children: [middle],
		});
		const stateManager = createMockGameStateManager();
		const engine = createMockNarrativeEngine();

		expect(() => {
			render(
				<Game
					storyGraph={storyGraph}
					stateManager={stateManager}
					engine={engine}
				/>,
			);
		}).not.toThrow();
	});
});
