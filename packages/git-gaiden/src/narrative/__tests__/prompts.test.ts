import { describe, it, expect } from 'vitest';
import {
	buildScenePrompt,
	buildCommitSummary,
	buildContextSummary,
} from '../prompts.js';
import type { Commit } from '../../git/types.js';

describe('buildCommitSummary', () => {
	const baseCommit: Commit = {
		hash: 'abc123def456789',
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

	it('should build summary for normal commit', () => {
		const summary = buildCommitSummary(baseCommit);

		expect(summary).toContain('Commit: abc123d');
		expect(summary).toContain('Message: Add new feature');
		expect(summary).toContain('Author: John Doe <john@example.com>');
		expect(summary).toContain('Date: 1/1/2024');
		expect(summary).toContain('Files changed: 2');
		expect(summary).toContain('Insertions: 50, Deletions: 10');
	});

	it('should handle empty commit message', () => {
		const emptyMessageCommit = { ...baseCommit, message: '' };
		const summary = buildCommitSummary(emptyMessageCommit);

		expect(summary).toContain('Message: [empty commit message]');
	});

	it('should detect merge commit', () => {
		const mergeCommit = { ...baseCommit, parents: ['parent1', 'parent2'] };
		const summary = buildCommitSummary(mergeCommit);

		expect(summary).toContain('Type: Merge commit');
	});

	it('should detect initial commit', () => {
		const initialCommit = { ...baseCommit, parents: [] };
		const summary = buildCommitSummary(initialCommit);

		expect(summary).toContain('Type: Initial commit');
	});

	it('should note large commits', () => {
		const largeFiles = Array.from(
			{ length: 60 },
			(_, index) => `file${index}.ts`,
		);
		const largeCommit = {
			...baseCommit,
			files: largeFiles,
			stats: { ...baseCommit.stats, filesChanged: 60 },
		};
		const summary = buildCommitSummary(largeCommit);

		expect(summary).toContain('Note: Large commit with many files changed');
	});

	it('should handle commits with no changes', () => {
		const noChangeCommit = {
			...baseCommit,
			files: ['src/feature.ts'],
			stats: { filesChanged: 1, insertions: 0, deletions: 0 },
		};
		const summary = buildCommitSummary(noChangeCommit);

		expect(summary).toContain('Files changed: 1');
		expect(summary).not.toContain('Insertions:');
	});
});

describe('buildContextSummary', () => {
	it('should build summary with branch and contributor', () => {
		const context = {
			previousCommits: [],
			branchName: 'main',
			contributorInfo: 'John Doe',
		};

		const summary = buildContextSummary(context);

		expect(summary).toContain('Branch: main');
		expect(summary).toContain('Contributor: John Doe');
	});

	it('should include recent commits', () => {
		const previousCommits: Commit[] = [
			{
				hash: 'prev1',
				shortHash: 'prev1',
				message: 'Previous commit 1',
				author: 'Jane',
				date: '2024-01-01T10:00:00Z',
				parents: ['p1'],
				files: ['file1.ts'],
				stats: { filesChanged: 1, insertions: 1, deletions: 0 },
			},
			{
				hash: 'prev2',
				shortHash: 'prev2',
				message:
					'Previous commit 2 with longer message that should be truncated',
				author: 'Jane',
				date: '2024-01-01T11:00:00Z',
				parents: ['p2'],
				files: ['file2.ts'],
				stats: { filesChanged: 1, insertions: 1, deletions: 0 },
			},
		];

		const context = {
			previousCommits,
			branchName: 'feature',
			contributorInfo: 'Jane Smith',
		};

		const summary = buildContextSummary(context);

		expect(summary).toContain('Branch: feature');
		expect(summary).toContain('Contributor: Jane Smith');
		expect(summary).toContain('Recent commits:');
		expect(summary).toContain('- prev1: Previous commit 1');
		expect(summary).toContain(
			'- prev2: Previous commit 2 with longer message that should ',
		);
	});

	it('should limit to last 3 commits', () => {
		const previousCommits = Array.from({ length: 5 }, (_, index) => ({
			hash: `commit${index}`,
			shortHash: `c${index}`,
			message: `Commit ${index}`,
			author: 'Author',
			date: '2024-01-01T12:00:00Z',
			parents: ['p'],
			files: ['file.ts'],
			stats: { filesChanged: 1, insertions: 1, deletions: 0 },
		}));

		const context = {
			previousCommits,
			branchName: 'main',
			contributorInfo: 'Author',
		};

		const summary = buildContextSummary(context);

		expect(summary).toContain('- c2: Commit 2');
		expect(summary).toContain('- c3: Commit 3');
		expect(summary).toContain('- c4: Commit 4');
		expect(summary).not.toContain('c0');
		expect(summary).not.toContain('c1');
	});
});

describe('buildScenePrompt', () => {
	const mockCommit: Commit = {
		hash: 'abc123def456789',
		shortHash: 'abc123d',
		message: 'Add user authentication',
		author: 'John Doe <john@example.com>',
		date: '2024-01-01T12:00:00Z',
		parents: ['parent123'],
		files: ['src/auth.ts', 'test/auth.test.ts'],
		stats: {
			filesChanged: 2,
			insertions: 100,
			deletions: 20,
		},
	};

	const mockContext = {
		previousCommits: [
			{
				hash: 'prev1',
				shortHash: 'prev1',
				message: 'Initial setup',
				author: 'John',
				date: '2024-01-01T10:00:00Z',
				parents: [],
				files: ['package.json'],
				stats: { filesChanged: 1, insertions: 10, deletions: 0 },
			},
		],
		branchName: 'main',
		contributorInfo: 'John Doe',
	};

	it('should build complete prompt with system instructions', () => {
		const prompt = buildScenePrompt({
			commit: mockCommit,
			context: mockContext,
		});

		expect(prompt).toContain('You are a narrative engine');
		expect(prompt).toContain('SCENE: [2-3 sentence narrative scene]');
		expect(prompt).toContain('SAFE: [choice1], [choice2], [choice3]');
		expect(prompt).toContain('RISKY: [choice1], [choice2], [choice3]');
		expect(prompt).toContain('META: [choice1], [choice2], [choice3]');
	});

	it('should include commit summary', () => {
		const prompt = buildScenePrompt({
			commit: mockCommit,
			context: mockContext,
		});

		expect(prompt).toContain('COMMIT SUMMARY:');
		expect(prompt).toContain('Add user authentication');
		expect(prompt).toContain('John Doe <john@example.com>');
		expect(prompt).toContain('Files changed: 2');
		expect(prompt).toContain('Insertions: 100, Deletions: 20');
	});

	it('should include context summary', () => {
		const prompt = buildScenePrompt({
			commit: mockCommit,
			context: mockContext,
		});

		expect(prompt).toContain('CONTEXT:');
		expect(prompt).toContain('Branch: main');
		expect(prompt).toContain('Contributor: John Doe');
		expect(prompt).toContain('Recent commits:');
		expect(prompt).toContain('- prev1: Initial setup');
	});

	it('should end with generation instruction', () => {
		const prompt = buildScenePrompt({
			commit: mockCommit,
			context: mockContext,
		});

		expect(prompt).toContain('Generate the scene and choices:');
	});

	it('should handle merge commits in prompt', () => {
		const mergeCommit = {
			...mockCommit,
			parents: ['p1', 'p2'],
			message: 'Merge feature branch',
		};
		const prompt = buildScenePrompt({
			commit: mergeCommit,
			context: mockContext,
		});

		expect(prompt).toContain('Type: Merge commit');
	});

	it('should handle initial commits in prompt', () => {
		const initialCommit = {
			...mockCommit,
			parents: [],
			message: 'Initial commit',
		};
		const prompt = buildScenePrompt({
			commit: initialCommit,
			context: mockContext,
		});

		expect(prompt).toContain('Type: Initial commit');
	});
});
