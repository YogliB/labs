import type { Commit, BranchInfo, CommitGraph } from './types.js';
export interface ParseOptions {
    branch?: string;
}
export declare function parseRepository(repoPath: string, options?: ParseOptions): Promise<CommitGraph>;
export declare function parseLogOutput(output: string): Commit[];
export declare function detectMerges(commits: readonly Commit[]): string[];
export declare function detectReverts(commits: readonly Commit[]): string[];
export declare function buildBranchGraph(branches: readonly BranchInfo[]): Map<string, string[]>;
