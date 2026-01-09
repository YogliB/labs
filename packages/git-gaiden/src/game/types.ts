/**
 * Current state of the game session.
 */
export interface GameState {
	/** Hash of the currently displayed commit */
	readonly currentCommit: string;
	/** Set of commit hashes that have been visited */
	readonly visitedCommits: ReadonlySet<string>;
	/** Progress metrics */
	readonly progress: GameProgress;
	/** Path of branches taken during gameplay */
	readonly branchPath: readonly string[];
}

/**
 * Progress information for the game.
 */
export interface GameProgress {
	/** Ratio of commits explored (0.0 to 1.0) */
	readonly commitsExploredRatio: number;
	/** Current branch being explored */
	readonly currentBranch: string;
	/** Timestamp when the game was last played */
	readonly lastPlayedAt: string;
}

/**
 * Node in the story graph representation.
 */
export interface StoryNode {
	/** Commit hash this node represents */
	readonly commitHash: string;
	/** Child nodes (possible next commits) */
	readonly children: readonly StoryNode[];
	/** Whether this node has been visited */
	readonly visited: boolean;
	/** Branch this node belongs to */
	readonly branch: string;
}
