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

export function buildScenePrompt(parameters: PromptParameters): string {
	const { commit, context } = parameters;

	const systemPrompt = `You are a narrative engine for a choose-your-own-adventure game based on Git history. Generate engaging 2-3 sentence scene descriptions and 2-3 choices for each category (SAFE, RISKY, META).

Output format:
SCENE: [2-3 sentence narrative scene]
SAFE: [choice1], [choice2], [choice3] (safe, linear progression choices)
RISKY: [choice1], [choice2], [choice3] (risky, branching or dangerous choices)
META: [choice1], [choice2], [choice3] (meta, informational or game-state choices)

Each choice should be a short, actionable phrase. Keep the scene immersive and the choices meaningful to the commit's changes.`;

	const commitSummary = buildCommitSummary(commit);
	const contextSummary = buildContextSummary(context);

	return `${systemPrompt}

COMMIT SUMMARY:
${commitSummary}

CONTEXT:
${contextSummary}

Generate the scene and choices:`;
}

export function buildCommitSummary(commit: Commit): string {
	const message = commit.message.trim() || '[empty commit message]';
	const author = commit.author;
	const date = new Date(commit.date).toLocaleDateString();
	const filesChanged = commit.files.length;
	const stats = commit.stats;

	let summary = `Commit: ${commit.shortHash}
Message: ${message}
Author: ${author}
Date: ${date}
Files changed: ${filesChanged}`;

	if (stats.insertions > 0 || stats.deletions > 0) {
		summary += `
Insertions: ${stats.insertions}, Deletions: ${stats.deletions}`;
	}

	if (commit.parents.length > 1) {
		summary += `
Type: Merge commit`;
	} else if (commit.parents.length === 0) {
		summary += `
Type: Initial commit`;
	}

	if (filesChanged > 50) {
		summary += `
Note: Large commit with many files changed`;
	}

	return summary;
}

export function buildContextSummary(context: PromptContext): string {
	const { previousCommits, branchName, contributorInfo } = context;

	let summary = `Branch: ${branchName}
Contributor: ${contributorInfo}`;

	if (previousCommits.length > 0) {
		const recentCommits = previousCommits.slice(-3);
		summary += `
Recent commits:`;
		for (const previousCommit of recentCommits) {
			const shortMessage = previousCommit.message
				.split('\n')[0]
				.slice(0, 50);
			summary += `
- ${previousCommit.shortHash}: ${shortMessage}`;
		}
	}

	return summary;
}
