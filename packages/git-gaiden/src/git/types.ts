/**
 * Represents a single commit in a Git repository.
 */
export interface Commit {
	/** Full SHA-1 hash of the commit */
	readonly hash: string;
	/** Shortened SHA-1 hash (first 7 characters) */
	readonly shortHash: string;
	/** Commit message */
	readonly message: string;
	/** Author name and email */
	readonly author: string;
	/** Commit date as ISO string */
	readonly date: string;
	/** Array of parent commit hashes */
	readonly parents: readonly string[];
	/** Files changed in this commit */
	readonly files: readonly string[];
	/** Statistics about the commit */
	readonly stats: CommitStats;
}

/**
 * Statistics about a commit's changes.
 */
export interface CommitStats {
	/** Number of files changed */
	readonly filesChanged: number;
	/** Number of lines added */
	readonly insertions: number;
	/** Number of lines deleted */
	readonly deletions: number;
}

/**
 * Information about a Git branch.
 */
export interface BranchInfo {
	/** Branch name */
	readonly name: string;
	/** Commit hash that the branch points to */
	readonly commitHash: string;
	/** Whether this is the current branch */
	readonly isCurrent: boolean;
	/** Whether this is a remote branch */
	readonly isRemote: boolean;
}

/**
 * Complete graph representation of a Git repository's history.
 */
export interface CommitGraph {
	/** All commits in the repository */
	readonly commits: readonly Commit[];
	/** All branches in the repository */
	readonly branches: readonly BranchInfo[];
	/** Commit hashes that are merge commits */
	readonly merges: readonly string[];
	/** Commit hashes that are revert commits */
	readonly reverts: readonly string[];
}
