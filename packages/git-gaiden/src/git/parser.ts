import simpleGit from 'simple-git';
import type { Commit, BranchInfo, CommitGraph } from './types.js';

export interface ParseOptions {
	branch?: string;
}

export async function parseRepository(
	repoPath: string,
	options?: ParseOptions,
): Promise<CommitGraph> {
	const git = simpleGit(repoPath);

	// Get branches
	const branchSummary = await git.branch();
	const branches: BranchInfo[] = Object.entries(branchSummary.branches).map(
		([name, branch]) => ({
			name,
			commitHash: branch.commit,
			isCurrent: branch.current,
			isRemote: name.startsWith('remotes/'),
		}),
	);

	// Get log with numstat
	const logArguments = [
		'log',
		'--all',
		'--numstat',
		'--pretty=format:%Hò%hò%sò%an <%ae>ò%adò%Pò',
		'--date=iso',
	];
	if (options?.branch) {
		logArguments.push(options.branch);
	}
	const logOutput = await git.raw(logArguments);
	const commits = parseLogOutput(logOutput);

	// Detect merges and reverts
	const merges = commits
		.filter((c) => c.parents.length > 1)
		.map((c) => c.hash);
	const reverts = commits
		.filter((c) => c.message.startsWith('Revert'))
		.map((c) => c.hash);

	return {
		commits,
		branches,
		merges,
		reverts,
	};
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export function parseLogOutput(output: string): Commit[] {
	const lines = output.trim().split('\n');
	const commits: Commit[] = [];
	let currentCommit: Partial<Commit> | undefined = undefined;

	for (const line of lines) {
		if (line.includes('ò')) {
			// New commit header
			if (currentCommit?.hash) {
				commits.push(currentCommit as Commit);
			}
			const parts = line.split('ò');
			currentCommit = {
				hash: parts[0],
				shortHash: parts[1],
				message: parts[2],
				author: parts[3],
				date: parts[4],
				parents: parts[5] ? parts[5].split(' ') : [],
				files: [],
				stats: { filesChanged: 0, insertions: 0, deletions: 0 },
			};
		} else if (line.trim() === '') {
			// End of commit
			continue;
		} else if (currentCommit && line.includes('\t')) {
			// Numstat line: insertions	deletions	filename
			const parts = line.split('\t');
			if (parts.length === 3) {
				const insertions =
					parts[0] === '-' ? 0 : Number.parseInt(parts[0], 10) || 0;
				const deletions =
					parts[1] === '-' ? 0 : Number.parseInt(parts[1], 10) || 0;
				const filename = parts[2];
				currentCommit.files.push(filename);
				currentCommit.stats.insertions += insertions;
				currentCommit.stats.deletions += deletions;
				currentCommit.stats.filesChanged += 1;
			}
		}
	}

	// Add last commit
	if (currentCommit?.hash) {
		commits.push(currentCommit as Commit);
	}

	return commits;
}

// Helper functions
export function detectMerges(commits: readonly Commit[]): string[] {
	return commits.filter((c) => c.parents.length > 1).map((c) => c.hash);
}

export function detectReverts(commits: readonly Commit[]): string[] {
	return commits
		.filter((c) => c.message.startsWith('Revert'))
		.map((c) => c.hash);
}

export function buildBranchGraph(
	branches: readonly BranchInfo[],
): Map<string, string[]> {
	const graph = new Map<string, string[]>();
	for (const branch of branches) {
		if (!graph.has(branch.commitHash)) {
			graph.set(branch.commitHash, []);
		}
		graph.get(branch.commitHash)?.push(branch.name);
	}
	return graph;
}
