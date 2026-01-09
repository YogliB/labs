import type { CommitGraph } from '../git/types.js';
import type { StoryNode } from './types.js';
/**
 * Transforms a CommitGraph into a StoryNode tree representation.
 * For MVP, builds a linear path with occasional detours for branches.
 * Starts from the repository tip (commit not referenced as parent).
 */
export declare function mapCommitGraphToStory(commitGraph: CommitGraph): StoryNode;
