import { describe, it, expect, vi, beforeEach } from 'vitest';
import { simpleGit } from 'simple-git';
import {
	parseRepository,
	detectMerges,
	detectReverts,
	buildBranchGraph,
	parseLogOutput,
	type ParseOptions,
} from './parser';
import type { Commit, BranchInfo } from './types.js';

// Mock simple-git
vi.mock('simple-git', () => ({
	default: vi.fn(),
}));

const mockSimpleGit = vi.mocked(simpleGit);

describe('parseRepository', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('parses a basic repository', async () => {
		const mockGit = {
			branch: vi.fn().mockResolvedValue({
				branches: {
					main: { commit: 'abc123', current: true },
					feature: { commit: 'def456', current: false },
				},
			}),
			raw: vi
				.fn()
				.mockResolvedValue(
					'abc123òabòInitial commitòAuthor <author@example.com>ò2023-01-01T00:00:00+00:00ò\n1\t0\tfile.txt\n\ndef456òdeòAdd featureòAuthor <author@example.com>ò2023-01-02T00:00:00+00:00òabc123\n2\t1\tfile.txt\n',
				),
		};
		mockSimpleGit.mockReturnValue(mockGit);

		const result = await parseRepository('/path/to/repo');

		expect(result.commits).toHaveLength(2);
		expect(result.branches).toHaveLength(2);
		expect(result.merges).toEqual([]);
		expect(result.reverts).toEqual([]);
		expect(result.commits[0].hash).toBe('abc123');
		expect(result.commits[1].hash).toBe('def456');
	});

	it('filters by branch', async () => {
		const mockGit = {
			branch: vi.fn().mockResolvedValue({
				branches: { main: { commit: 'abc123', current: true } },
			}),
			raw: vi
				.fn()
				.mockResolvedValue(
					'abc123òabòInitial commitòAuthor <author@example.com>ò2023-01-01T00:00:00+00:00ò\n1\t0\tfile.txt\n',
				),
		};
		mockSimpleGit.mockReturnValue(mockGit);

		const options: ParseOptions = { branch: 'main' };
		await parseRepository('/path/to/repo', options);

		expect(mockGit.raw).toHaveBeenCalledWith([
			'log',
			'--all',
			'--numstat',
			'--pretty=format:%Hò%hò%sò%an <%ae>ò%adò%Pò',
			'--date=iso',
			'main',
		]);
	});

	it('handles merge commits', async () => {
		const mockGit = {
			branch: vi.fn().mockResolvedValue({
				branches: { main: { commit: 'merge123', current: true } },
			}),
			raw: vi
				.fn()
				.mockResolvedValue(
					'merge123òmeòMerge branchòAuthor <author@example.com>ò2023-01-03T00:00:00+00:00òabc123 def456\n0\t0\tfile.txt\n',
				),
		};
		mockSimpleGit.mockReturnValue(mockGit);

		const result = await parseRepository('/path/to/repo');

		expect(result.merges).toEqual(['merge123']);
	});

	it('handles revert commits', async () => {
		const mockGit = {
			branch: vi.fn().mockResolvedValue({
				branches: { main: { commit: 'rev123', current: true } },
			}),
			raw: vi
				.fn()
				.mockResolvedValue(
					'rev123òreòRevert commitòAuthor <author@example.com>ò2023-01-04T00:00:00+00:00òabc123\n1\t0\tfile.txt\n',
				),
		};
		mockSimpleGit.mockReturnValue(mockGit);

		const result = await parseRepository('/path/to/repo');

		expect(result.reverts).toEqual(['rev123']);
	});

	it('handles empty repository', async () => {
		const mockGit = {
			branch: vi.fn().mockResolvedValue({ branches: {} }),
			raw: vi.fn().mockResolvedValue(''),
		};
		mockSimpleGit.mockReturnValue(mockGit);

		const result = await parseRepository('/path/to/repo');

		expect(result.commits).toEqual([]);
		expect(result.branches).toEqual([]);
		expect(result.merges).toEqual([]);
		expect(result.reverts).toEqual([]);
	});
});

describe('detectMerges', () => {
	it('detects merge commits', () => {
		const commits: Commit[] = [
			{
				hash: 'a',
				shortHash: 'a',
				message: 'commit',
				author: 'author',
				date: '2023-01-01',
				parents: ['p1'],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
			{
				hash: 'b',
				shortHash: 'b',
				message: 'merge',
				author: 'author',
				date: '2023-01-02',
				parents: ['a', 'c'],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
		];

		const merges = detectMerges(commits);
		expect(merges).toEqual(['b']);
	});
});

describe('detectReverts', () => {
	it('detects revert commits', () => {
		const commits: Commit[] = [
			{
				hash: 'a',
				shortHash: 'a',
				message: 'Revert something',
				author: 'author',
				date: '2023-01-01',
				parents: ['p1'],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
			{
				hash: 'b',
				shortHash: 'b',
				message: 'Normal commit',
				author: 'author',
				date: '2023-01-02',
				parents: ['a'],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			},
		];

		const reverts = detectReverts(commits);
		expect(reverts).toEqual(['a']);
	});
});

describe('buildBranchGraph', () => {
	it('builds branch graph', () => {
		const branches: BranchInfo[] = [
			{ name: 'main', commitHash: 'a', isCurrent: true, isRemote: false },
			{
				name: 'feature',
				commitHash: 'a',
				isCurrent: false,
				isRemote: false,
			},
			{
				name: 'other',
				commitHash: 'b',
				isCurrent: false,
				isRemote: false,
			},
		];

		const graph = buildBranchGraph(branches);
		expect(graph.get('a')).toEqual(['main', 'feature']);
		expect(graph.get('b')).toEqual(['other']);
	});
});

describe('parseLogOutput', () => {
	it('parses log output correctly', () => {
		const output =
			'abc123òabòInitial commitòAuthor <author@example.com>ò2023-01-01T00:00:00+00:00ò\n1\t0\tfile.txt\n\ndef456òdeòAdd featureòAuthor <author@example.com>ò2023-01-02T00:00:00+00:00òabc123\n2\t1\tfile2.txt\n';

		const commits = parseLogOutput(output);
		expect(commits).toHaveLength(2);
		expect(commits[0]).toMatchObject({
			hash: 'abc123',
			shortHash: 'ab',
			message: 'Initial commit',
			author: 'Author <author@example.com>',
			date: '2023-01-01T00:00:00+00:00',
			parents: [],
			files: ['file.txt'],
			stats: { filesChanged: 1, insertions: 1, deletions: 0 },
		});
		expect(commits[1]).toMatchObject({
			hash: 'def456',
			shortHash: 'de',
			message: 'Add feature',
			parents: ['abc123'],
			files: ['file2.txt'],
			stats: { filesChanged: 1, insertions: 2, deletions: 1 },
		});
	});

	it('handles binary files', () => {
		const output =
			'abc123òabòBinary commitòAuthor <author@example.com>ò2023-01-01T00:00:00+00:00ò\n-\t-\tbinary.bin\n';

		const commits = parseLogOutput(output);
		expect(commits[0].stats).toEqual({
			filesChanged: 1,
			insertions: 0,
			deletions: 0,
		});
		expect(commits[0].files).toEqual(['binary.bin']);
	});
});
