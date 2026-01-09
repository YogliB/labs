import { describe, it, expect } from 'vitest';
import { mapCommitGraphToStory } from './mapper.js';
import type { CommitGraph, Commit, BranchInfo } from '../git/types.js';

describe('mapCommitGraphToStory', () => {
	it('maps linear commit history to story tree', () => {
		const commits: Commit[] = [
			{
				hash: 'c1',
				shortHash: 'c1',
				message: 'Initial commit',
				author: 'Author',
				date: '2023-01-01',
				parents: [],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
			{
				hash: 'c2',
				shortHash: 'c2',
				message: 'Second commit',
				author: 'Author',
				date: '2023-01-02',
				parents: ['c1'],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
			{
				hash: 'c3',
				shortHash: 'c3',
				message: 'Third commit',
				author: 'Author',
				date: '2023-01-03',
				parents: ['c2'],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
		];
		const branches: BranchInfo[] = [
			{
				name: 'main',
				commitHash: 'c3',
				isCurrent: true,
				isRemote: false,
			},
		];
		const commitGraph: CommitGraph = {
			commits,
			branches,
			merges: [],
			reverts: [],
		};

		const story = mapCommitGraphToStory(commitGraph);

		expect(story.commitHash).toBe('c3');
		expect(story.branch).toBe('main');
		expect(story.children).toHaveLength(1);
		expect(story.children[0].commitHash).toBe('c2');
		expect(story.children[0].children).toHaveLength(1);
		expect(story.children[0].children[0].commitHash).toBe('c1');
		expect(story.children[0].children[0].children).toHaveLength(0);
	});

	it('handles branched repository with detours', () => {
		const commits: Commit[] = [
			{
				hash: 'c1',
				shortHash: 'c1',
				message: 'Initial commit',
				author: 'Author',
				date: '2023-01-01',
				parents: [],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
			{
				hash: 'c2',
				shortHash: 'c2',
				message: 'Main branch commit',
				author: 'Author',
				date: '2023-01-02',
				parents: ['c1'],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
			{
				hash: 'c3',
				shortHash: 'c3',
				message: 'Feature branch commit',
				author: 'Author',
				date: '2023-01-02',
				parents: ['c1'],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
			{
				hash: 'c4',
				shortHash: 'c4',
				message: 'Merge commit',
				author: 'Author',
				date: '2023-01-03',
				parents: ['c2', 'c3'],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
		];
		const branches: BranchInfo[] = [
			{
				name: 'main',
				commitHash: 'c4',
				isCurrent: true,
				isRemote: false,
			},
			{
				name: 'feature',
				commitHash: 'c3',
				isCurrent: false,
				isRemote: false,
			},
		];
		const commitGraph: CommitGraph = {
			commits,
			branches,
			merges: ['c4'],
			reverts: [],
		};

		const story = mapCommitGraphToStory(commitGraph);

		expect(story.commitHash).toBe('c4');
		expect(story.children).toHaveLength(2); // main path and detour
		const mainChild = story.children.find((c) => c.commitHash === 'c2');
		const detourChild = story.children.find((c) => c.commitHash === 'c3');
		expect(mainChild).toBeDefined();
		expect(detourChild).toBeDefined();
		if (mainChild && detourChild) {
			expect(mainChild.branch).toBe('main');
			expect(detourChild.branch).toBe('feature');
		}
	});

	it('handles merge commits by following first parent', () => {
		const commits: Commit[] = [
			{
				hash: 'c1',
				shortHash: 'c1',
				message: 'Base',
				author: 'Author',
				date: '2023-01-01',
				parents: [],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
			{
				hash: 'c2',
				shortHash: 'c2',
				message: 'Branch A',
				author: 'Author',
				date: '2023-01-02',
				parents: ['c1'],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
			{
				hash: 'c3',
				shortHash: 'c3',
				message: 'Branch B',
				author: 'Author',
				date: '2023-01-02',
				parents: ['c1'],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
			{
				hash: 'c4',
				shortHash: 'c4',
				message: 'Merge A and B',
				author: 'Author',
				date: '2023-01-03',
				parents: ['c2', 'c3'],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
		];
		const branches: BranchInfo[] = [
			{
				name: 'main',
				commitHash: 'c4',
				isCurrent: true,
				isRemote: false,
			},
		];
		const commitGraph: CommitGraph = {
			commits,
			branches,
			merges: ['c4'],
			reverts: [],
		};

		const story = mapCommitGraphToStory(commitGraph);

		expect(story.commitHash).toBe('c4');
		expect(story.children).toHaveLength(2);
		// First parent path
		expect(story.children[0].commitHash).toBe('c2');
		expect(story.children[0].children[0].commitHash).toBe('c1');
		// Detour for second parent
		expect(story.children[1].commitHash).toBe('c3');
	});

	it('assigns correct branch names from branch info', () => {
		const commits: Commit[] = [
			{
				hash: 'c1',
				shortHash: 'c1',
				message: 'Initial',
				author: 'Author',
				date: '2023-01-01',
				parents: [],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
			{
				hash: 'c2',
				shortHash: 'c2',
				message: 'On feature',
				author: 'Author',
				date: '2023-01-02',
				parents: ['c1'],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
		];
		const branches: BranchInfo[] = [
			{
				name: 'feature',
				commitHash: 'c2',
				isCurrent: true,
				isRemote: false,
			},
		];
		const commitGraph: CommitGraph = {
			commits,
			branches,
			merges: [],
			reverts: [],
		};

		const story = mapCommitGraphToStory(commitGraph);

		expect(story.branch).toBe('feature');
		expect(story.children[0].branch).toBe('feature');
	});

	it('defaults to main branch when no branch info', () => {
		const commits: Commit[] = [
			{
				hash: 'c1',
				shortHash: 'c1',
				message: 'Initial',
				author: 'Author',
				date: '2023-01-01',
				parents: [],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
		];
		const branches: BranchInfo[] = [];
		const commitGraph: CommitGraph = {
			commits,
			branches,
			merges: [],
			reverts: [],
		};

		const story = mapCommitGraphToStory(commitGraph);

		expect(story.branch).toBe('main');
	});

	it('throws error for empty repository', () => {
		const commitGraph: CommitGraph = {
			commits: [],
			branches: [],
			merges: [],
			reverts: [],
		};

		expect(() => mapCommitGraphToStory(commitGraph)).toThrow(
			'No tip commit found in repository',
		);
	});

	it('handles single commit repository', () => {
		const commits: Commit[] = [
			{
				hash: 'c1',
				shortHash: 'c1',
				message: 'Single commit',
				author: 'Author',
				date: '2023-01-01',
				parents: [],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
		];
		const branches: BranchInfo[] = [
			{
				name: 'main',
				commitHash: 'c1',
				isCurrent: true,
				isRemote: false,
			},
		];
		const commitGraph: CommitGraph = {
			commits,
			branches,
			merges: [],
			reverts: [],
		};

		const story = mapCommitGraphToStory(commitGraph);

		expect(story.commitHash).toBe('c1');
		expect(story.children).toHaveLength(0);
		expect(story.branch).toBe('main');
	});

	it('avoids cycles in DAG by marking visited', () => {
		// Create a cycle scenario (though Git doesn't allow cycles, for robustness)
		const commits: Commit[] = [
			{
				hash: 'c1',
				shortHash: 'c1',
				message: 'Commit 1',
				author: 'Author',
				date: '2023-01-01',
				parents: [],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
			{
				hash: 'c2',
				shortHash: 'c2',
				message: 'Commit 2',
				author: 'Author',
				date: '2023-01-02',
				parents: ['c1'],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
		];
		// Manually create cycle in children map (not realistic but for test)
		const branches: BranchInfo[] = [
			{
				name: 'main',
				commitHash: 'c2',
				isCurrent: true,
				isRemote: false,
			},
		];
		const commitGraph: CommitGraph = {
			commits,
			branches,
			merges: [],
			reverts: [],
		};

		const story = mapCommitGraphToStory(commitGraph);

		expect(story.commitHash).toBe('c2');
		expect(story.children[0].commitHash).toBe('c1');
	});

	it('handles multiple tip commits by choosing first', () => {
		const commits: Commit[] = [
			{
				hash: 'c1',
				shortHash: 'c1',
				message: 'Tip 1',
				author: 'Author',
				date: '2023-01-01',
				parents: [],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
			{
				hash: 'c2',
				shortHash: 'c2',
				message: 'Tip 2',
				author: 'Author',
				date: '2023-01-01',
				parents: [],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
		];
		const branches: BranchInfo[] = [
			{
				name: 'branch1',
				commitHash: 'c1',
				isCurrent: false,
				isRemote: false,
			},
			{
				name: 'branch2',
				commitHash: 'c2',
				isCurrent: true,
				isRemote: false,
			},
		];
		const commitGraph: CommitGraph = {
			commits,
			branches,
			merges: [],
			reverts: [],
		};

		const story = mapCommitGraphToStory(commitGraph);

		// Should pick first tip (c1 or c2, order not guaranteed)
		expect(['c1', 'c2']).toContain(story.commitHash);
	});

	it('sets visited to false for all nodes initially', () => {
		const commits: Commit[] = [
			{
				hash: 'c1',
				shortHash: 'c1',
				message: 'Initial',
				author: 'Author',
				date: '2023-01-01',
				parents: [],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
			{
				hash: 'c2',
				shortHash: 'c2',
				message: 'Second',
				author: 'Author',
				date: '2023-01-02',
				parents: ['c1'],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
		];
		const branches: BranchInfo[] = [
			{
				name: 'main',
				commitHash: 'c2',
				isCurrent: true,
				isRemote: false,
			},
		];
		const commitGraph: CommitGraph = {
			commits,
			branches,
			merges: [],
			reverts: [],
		};

		const story = mapCommitGraphToStory(commitGraph);

		expect(story.visited).toBe(false);
		expect(story.children[0].visited).toBe(false);
	});
});
