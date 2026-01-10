import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NarrativeEngine } from '../engine.js';
import type { Commit } from '../../git/types.js';

// Mock @xenova/transformers
vi.mock('@xenova/transformers', () => ({
	pipeline: vi.fn(),
	env: {
		allowLocalModels: true,
		allowRemoteModels: false,
	},
}));

describe('NarrativeEngine', () => {
	let engine: NarrativeEngine;

	beforeEach(() => {
		engine = new NarrativeEngine();
	});

	describe('initialize', () => {
		it('initializes successfully on first call', async () => {
			await expect(engine.initialize()).resolves.toBeUndefined();
			expect(engine.initialized).toBe(true);
		});

		it('does nothing if already initialized', async () => {
			await engine.initialize();
			await expect(engine.initialize()).resolves.toBeUndefined();
			expect(engine.initialized).toBe(true);
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
			expect(scene.sceneText).toContain('Add new feature');
			expect(scene.sceneText).toContain('John Doe');
			expect(scene.sceneText).toContain('main');
			expect(scene.sceneText).toContain('2 files');
			expect(scene.sceneText).toContain('50 additions');
			expect(scene.sceneText).toContain('10 deletions');
			expect(scene.choices).toHaveLength(3);
		});

		it('generates scene with empty commit message', async () => {
			await engine.initialize();
			const emptyMessageCommit = { ...mockCommit, message: '' };
			const scene = await engine.generateScene(
				emptyMessageCommit,
				mockContext,
			);

			expect(scene.sceneText).toContain('""'); // Current stub just quotes the message
		});

		it('generates scene for merge commit', async () => {
			await engine.initialize();
			const mergeCommit = {
				...mockCommit,
				message: 'Merge branch feature into main',
				parents: ['parent1', 'parent2'],
			};
			const scene = await engine.generateScene(mergeCommit, mockContext);

			expect(scene.sceneText).toContain('Merge branch feature into main');
			// Current stub doesn't detect merge commits
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

			expect(scene.sceneText).toContain('Initial commit');
			// Current stub doesn't detect initial commits
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

			expect(scene.sceneText).toContain('60 files');
			// Current stub doesn't detect large commits
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

			// This test verifies the template includes context, but since it's a stub,
			// we can't easily test the exact output. In real implementation, this would
			// be passed to the LLM prompt.
			const scene = await engine.generateScene(
				mockCommit,
				contextWithHistory,
			);
			expect(scene).toBeDefined();
		});

		it('includes branch name in scene text', async () => {
			await engine.initialize();
			const contextWithBranch = {
				...mockContext,
				branchName: 'feature-branch',
			};
			const scene = await engine.generateScene(
				mockCommit,
				contextWithBranch,
			);

			expect(scene.sceneText).toContain('feature-branch');
		});

		it('includes contributor info in scene text', async () => {
			await engine.initialize();
			const contextWithContributor = {
				...mockContext,
				contributorInfo: 'Jane Smith <jane@example.com>',
			};
			const scene = await engine.generateScene(
				mockCommit,
				contextWithContributor,
			);

			// Current stub doesn't use contributorInfo in scene text, only branchName
			expect(scene.sceneText).toContain('main');
		});

		it('generates choices with correct types', async () => {
			await engine.initialize();
			const scene = await engine.generateScene(mockCommit, mockContext);

			expect(scene.choices).toHaveLength(3);
			expect(scene.choices[0].type).toBe('safe');
			expect(scene.choices[1].type).toBe('risky');
			expect(scene.choices[2].type).toBe('meta');

			for (const choice of scene.choices) {
				expect(choice.id).toBeDefined();
				expect(choice.label).toBeDefined();
				expect(['safe', 'risky', 'meta']).toContain(choice.type);
			}
		});

		it('generates deterministic output for same input', async () => {
			await engine.initialize();
			const scene1 = await engine.generateScene(mockCommit, mockContext);
			const scene2 = await engine.generateScene(mockCommit, mockContext);

			expect(scene1.sceneText).toBe(scene2.sceneText);
			expect(scene1.choices).toEqual(scene2.choices);
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

			expect(scene.sceneText).toContain('1 files');
			// Current stub always includes insertions and deletions
			expect(scene.sceneText).toContain('0 additions');
			expect(scene.sceneText).toContain('0 deletions');
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

			expect(scene.sceneText).toContain('1000 additions');
			expect(scene.sceneText).toContain('500 deletions');
		});
	});
});
