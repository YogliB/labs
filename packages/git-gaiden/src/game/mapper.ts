import type { CommitGraph } from '../git/types.js';
import type { StoryNode } from './types.js';

/**
 * Transforms a CommitGraph into a StoryNode tree representation.
 * For MVP, builds a linear path with occasional detours for branches.
 * Starts from the repository tip (commit not referenced as parent).
 */
export function mapCommitGraphToStory(commitGraph: CommitGraph): StoryNode {
	// Build parent map: hash -> list of parent hashes
	const parentMap = new Map<string, string[]>();
	for (const commit of commitGraph.commits) {
		parentMap.set(commit.hash, commit.parents);
	}

	// Find tip commits (not referenced as parents)
	const allParentHashes = new Set<string>();
	for (const commit of commitGraph.commits) {
		for (const parent of commit.parents) {
			allParentHashes.add(parent);
		}
	}
	// For MVP, start from the first tip (assuming single branch repo)
	const startHash = commitGraph.commits
		.map((c) => c.hash)
		.find((hash) => !allParentHashes.has(hash));
	if (!startHash) {
		throw new Error('No tip commit found in repository');
	}

	// Build branch map: commit hash -> branch name
	const branchMap = new Map<string, string>();
	for (const branch of commitGraph.branches) {
		branchMap.set(branch.commitHash, branch.name);
	}

	// Recursively build the story tree from tip down to roots
	const visited = new Set<string>();
	function buildNode(commitHash: string, branchName: string): StoryNode {
		if (visited.has(commitHash)) {
			// Avoid cycles in DAG
			return {
				commitHash,
				children: [],
				visited: false,
				branch: branchName,
			};
		}
		visited.add(commitHash);

		const parentHashes = parentMap.get(commitHash) || [];
		const children: StoryNode[] = [];

		// For merges, only follow the first parent for linear path
		const isMerge = commitGraph.merges.includes(commitHash);
		const hashesToProcess = isMerge
			? parentHashes.slice(0, 1)
			: parentHashes;

		for (const parentHash of hashesToProcess) {
			const parentBranch = branchMap.get(parentHash) || branchName;
			children.push(buildNode(parentHash, parentBranch));
		}

		// Add detours for other parents (branches)
		if (isMerge && parentHashes.length > 1) {
			for (let index = 1; index < parentHashes.length; index++) {
				const detourBranch =
					branchMap.get(parentHashes[index]) ||
					`${branchName}-detour`;
				children.push(buildNode(parentHashes[index], detourBranch));
			}
		}

		return {
			commitHash,
			children,
			visited: false,
			branch: branchName,
		};
	}

	const rootBranch = branchMap.get(startHash) || 'main';
	return buildNode(startHash, rootBranch);
}
