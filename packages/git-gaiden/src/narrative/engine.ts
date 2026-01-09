// labs/packages/git-gaiden/src/narrative/engine.ts

import type { Commit } from '../git/types.js';
import type { Scene } from './types.js';

export class NarrativeEngine {
	private initialized = false;

	async initialize(): Promise<void> {
		// Stub: In real implementation, load the LLM model
		this.initialized = true;
	}

	async generateScene(
		commit: Commit,
		context: {
			previousCommits: Commit[];
			branchName: string;
			contributorInfo: string;
		},
	): Promise<Scene> {
		if (!this.initialized) {
			throw new Error('NarrativeEngine not initialized');
		}

		// Stub: Deterministic template fallback
		const sceneText = `You are exploring the commit "${commit.message}" by ${commit.author} on branch ${context.branchName}. This commit changed ${commit.stats.filesChanged} files with ${commit.stats.insertions} additions and ${commit.stats.deletions} deletions.`;

		const choices = [
			{
				id: 'continue',
				label: 'Continue to the next commit',
				type: 'safe' as const,
			},
			{
				id: 'explore',
				label: 'Explore this commit in detail',
				type: 'risky' as const,
			},
			{
				id: 'meta',
				label: 'View commit statistics',
				type: 'meta' as const,
			},
		];

		return {
			id: commit.hash,
			sceneText,
			choices,
		};
	}
}
