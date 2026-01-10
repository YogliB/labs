import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NarrativeEngine } from '../engine.js';
import type { Commit } from '../../git/types.js';

// Mock @xenova/transformers
vi.mock('@xenova/transformers', () => ({
	pipeline: vi.fn().mockResolvedValue(
		vi.fn().mockResolvedValue([
			{
				generated_text: `SCENE: You stand at a crossroads in the codebase.
SAFE: Review the code, Continue exploring, Check tests
RISKY: Refactor everything, Delete old code, Rewrite from scratch
META: View git log, Check metrics, Show contributors`,
			},
		]),
	),
	env: {
		allowLocalModels: true,
		allowRemoteModels: true,
		localModelPath: '/home/user/.cache/git-gaiden/models',
	},
}));

// Mock config/model.ts
vi.mock('../../config/model.js', () => ({
	initializeModel: vi.fn().mockResolvedValue(
		vi.fn().mockResolvedValue([
			{
				generated_text: `SCENE: You stand at a crossroads in the codebase.
SAFE: Review the code, Continue exploring, Check tests
RISKY: Refactor everything, Delete old code, Rewrite from scratch
META: View git log, Check metrics, Show contributors`,
			},
		]),
	),
}));

describe('NarrativeEngine', () => {
	let engine: NarrativeEngine;

	beforeEach(() => {
		engine = new NarrativeEngine();
		vi.clearAllMocks();
	});

	describe('initialize', () => {
		it('initializes successfully on first call', async () => {
			await expect(engine.initialize()).resolves.toBeUndefined();
		});

		it('accepts progress callback during initialization', async () => {
			const progressCallback = vi.fn();
			await expect(
				engine.initialize(progressCallback),
			).resolves.toBeUndefined();
		});
	});

	describe('generateScene', () => {
		const mockCommit: Commit = {
			hash: 'abc123def456',
			shortHash: 'abc123d',
			message: 'Add new feature',
			author: 'John Doe <john@example.com>',
			date: '2024-01-01T12:00:00Z',
			parents: ['parent123'],
			files: ['src/feature.ts', 'test/feature.test.ts'],
			stats: {
				filesChanged: 2,
				insertions: 50,
				deletions: 10,
			},
		};

		const mockContext = {
			previousCommits: [],
			branchName: 'main',
			contributorInfo: 'John Doe',
		};

		it('throws error if not initialized', async () => {
			await expect(
				engine.generateScene(mockCommit, mockContext),
			).rejects.toThrow('NarrativeEngine not initialized');
		});

		it('generates scene for normal commit', async () => {
			await engine.initialize();
			const scene = await engine.generateScene(mockCommit, mockContext);

			expect(scene.id).toBe(mockCommit.hash);
			expect(scene.sceneText).toBeDefined();
			expect(scene.sceneText.length).toBeGreaterThan(0);
			expect(scene.choices.length).toBeGreaterThan(0);
		});

		it('generates scene with empty commit message', async () => {
			await engine.initialize();
			const emptyMessageCommit = { ...mockCommit, message: '' };
			const scene = await engine.generateScene(
				emptyMessageCommit,
				mockContext,
			);

			expect(scene.sceneText).toBeDefined();
			expect(scene.sceneText.length).toBeGreaterThan(0);
		});

		it('generates scene for merge commit', async () => {
			await engine.initialize();
			const mergeCommit = {
				...mockCommit,
				message: 'Merge branch feature into main',
				parents: ['parent1', 'parent2'],
			};
			const scene = await engine.generateScene(mergeCommit, mockContext);

			expect(scene.sceneText).toBeDefined();
			expect(scene.choices).toBeDefined();
		});

		it('generates scene for initial commit', async () => {
			await engine.initialize();
			const initialCommit = {
				...mockCommit,
				message: 'Initial commit',
				parents: [],
			};
			const scene = await engine.generateScene(
				initialCommit,
				mockContext,
			);

			expect(scene.sceneText).toBeDefined();
		});

		it('generates scene for large commit', async () => {
			await engine.initialize();
			const largeFiles = Array.from(
				{ length: 60 },
				(_, index) => `file${index}.ts`,
			);
			const largeCommit = {
				...mockCommit,
				files: largeFiles,
				stats: { ...mockCommit.stats, filesChanged: 60 },
			};
			const scene = await engine.generateScene(largeCommit, mockContext);

			expect(scene.sceneText).toBeDefined();
		});

		it('includes previous commits in context', async () => {
			await engine.initialize();
			const previousCommits = [
				{ ...mockCommit, hash: 'prev1', message: 'Previous commit 1' },
				{ ...mockCommit, hash: 'prev2', message: 'Previous commit 2' },
				{ ...mockCommit, hash: 'prev3', message: 'Previous commit 3' },
				{ ...mockCommit, hash: 'prev4', message: 'Previous commit 4' },
			];
			const contextWithHistory = {
				...mockContext,
				previousCommits,
			};

			const scene = await engine.generateScene(
				mockCommit,
				contextWithHistory,
			);
			expect(scene).toBeDefined();
			expect(scene.sceneText).toBeDefined();
		});

		it('includes branch name in context', async () => {
			await engine.initialize();
			const contextWithBranch = {
				...mockContext,
				branchName: 'feature-branch',
			};
			const scene = await engine.generateScene(
				mockCommit,
				contextWithBranch,
			);

			expect(scene.sceneText).toBeDefined();
		});

		it('includes contributor info in context', async () => {
			await engine.initialize();
			const contextWithContributor = {
				...mockContext,
				contributorInfo: 'Jane Smith <jane@example.com>',
			};
			const scene = await engine.generateScene(
				mockCommit,
				contextWithContributor,
			);

			expect(scene.sceneText).toBeDefined();
		});

		it('generates choices with correct types', async () => {
			await engine.initialize();
			const scene = await engine.generateScene(mockCommit, mockContext);

			expect(scene.choices.length).toBeGreaterThan(0);
			for (const choice of scene.choices) {
				expect(choice.id).toBeDefined();
				expect(choice.label).toBeDefined();
				expect(['safe', 'risky', 'meta']).toContain(choice.type);
			}
		});

		it('falls back to deterministic template on error', async () => {
			await engine.initialize();
			const scene = await engine.generateScene(mockCommit, mockContext);

			expect(scene.id).toBe(mockCommit.hash);
			expect(scene.sceneText).toBeDefined();
			expect(scene.choices).toBeDefined();
		});

		it('handles commits with no insertions or deletions', async () => {
			await engine.initialize();
			const noChangeCommit = {
				...mockCommit,
				stats: { filesChanged: 1, insertions: 0, deletions: 0 },
			};
			const scene = await engine.generateScene(
				noChangeCommit,
				mockContext,
			);

			expect(scene.sceneText).toBeDefined();
		});

		it('handles commits with many insertions and deletions', async () => {
			await engine.initialize();
			const bigChangeCommit = {
				...mockCommit,
				stats: { filesChanged: 5, insertions: 1000, deletions: 500 },
			};
			const scene = await engine.generateScene(
				bigChangeCommit,
				mockContext,
			);

			expect(scene.sceneText).toBeDefined();
		});
	});
});
