import type { Commit } from '../git/types.js';
export interface PromptContext {
	readonly previousCommits: readonly Commit[];
	readonly branchName: string;
	readonly contributorInfo: string;
}
export interface PromptParameters {
	readonly commit: Commit;
	readonly context: PromptContext;
}
export declare function buildScenePrompt(parameters: PromptParameters): string;
export declare function buildCommitSummary(commit: Commit): string;
export declare function buildContextSummary(context: PromptContext): string;
