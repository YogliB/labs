import type { Commit } from '../git/types.js';
import type { Scene } from './types.js';
export declare class NarrativeEngine {
	private initialized;
	private model;
	initialize(progressCallback?: (progress: unknown) => void): Promise<void>;
	generateScene(
		commit: Commit,
		context: {
			previousCommits: Commit[];
			branchName: string;
			contributorInfo: string;
		},
	): Promise<Scene>;
	private callLlm;
	private parseResponse;
	private splitResponseSections;
	private extractSection;
	private getFallbackScene;
}
