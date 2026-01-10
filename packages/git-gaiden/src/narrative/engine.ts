import type { Commit } from '../git/types.js';
import type { Scene } from './types.js';
import { ChoiceType } from './types.js';
import { buildScenePrompt } from './prompts.js';
import { initializeModel } from '../config/model.js';

interface LlmResponse {
	generated_text: string;
}

export class NarrativeEngine {
	private initialized = false;
	private model: unknown;

	async initialize(
		progressCallback?: (progress: unknown) => void,
	): Promise<void> {
		this.model = await initializeModel(
			'onnx-community/Phi-3.5-mini-instruct-onnx-web',
			progressCallback,
		);
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

		try {
			const prompt = buildScenePrompt({
				commit,
				context,
			});

			const response = await this.callLlm(prompt);
			const parsed = this.parseResponse(response);

			return {
				id: commit.hash,
				sceneText: parsed.scene,
				choices: parsed.choices,
			};
		} catch {
			return this.getFallbackScene(commit, context);
		}
	}

	private async callLlm(prompt: string): Promise<string> {
		if (!this.model) {
			throw new Error('Model not initialized');
		}

		const generatorFunction = this.model as (
			prompt: string,
			options: {
				max_new_tokens: number;
				temperature: number;
			},
		) => Promise<LlmResponse[]>;

		const results = await generatorFunction(prompt, {
			max_new_tokens: 256,
			temperature: 0.7,
		});

		if (!results || results.length === 0) {
			throw new Error('Empty LLM response');
		}

		return results[0].generated_text;
	}

	private parseResponse(response: string): {
		scene: string;
		choices: {
			id: string;
			label: string;
			type: ChoiceType;
		}[];
	} {
		const parts = this.splitResponseSections(response);
		const scene = parts.scene || response;

		const parseChoices = (
			text: string | undefined,
			type: ChoiceType,
		): {
			id: string;
			label: string;
			type: ChoiceType;
		}[] => {
			if (!text) {
				return [];
			}

			return text
				.split(',')
				.map((choice, index) => ({
					id: `${type}-${index}`,
					label: choice.trim(),
					type,
				}))
				.filter((choice) => choice.label.length > 0);
		};

		const choices = [
			...parseChoices(parts.safe, ChoiceType.SAFE),
			...parseChoices(parts.risky, ChoiceType.RISKY),
			...parseChoices(parts.meta, ChoiceType.META),
		];

		return {
			scene: scene.slice(0, 500),
			choices: choices.slice(0, 6),
		};
	}

	private splitResponseSections(response: string): {
		scene: string;
		safe: string | undefined;
		risky: string | undefined;
		meta: string | undefined;
	} {
		const sceneStart = response.indexOf('SCENE:');
		const safeStart = response.indexOf('SAFE:');
		const riskyStart = response.indexOf('RISKY:');
		const metaStart = response.indexOf('META:');

		const scene = this.extractSection(response, sceneStart, [
			safeStart,
			riskyStart,
			metaStart,
		]);
		const safe = this.extractSection(response, safeStart, [
			riskyStart,
			metaStart,
		]);
		const risky = this.extractSection(response, riskyStart, [metaStart]);
		const meta = this.extractSection(response, metaStart, []);

		return {
			scene: scene ? scene.trim() : undefined,
			safe: safe ? safe.trim() : undefined,
			risky: risky ? risky.trim() : undefined,
			meta: meta ? meta.trim() : undefined,
		};
	}

	private extractSection(
		response: string,
		start: number,
		ends: number[],
	): string | undefined {
		if (start === -1) {
			return undefined;
		}

		const colonIndex = response.indexOf(':', start);
		if (colonIndex === -1) {
			return undefined;
		}

		let nextMarkerIndex = Infinity;
		for (const end of ends) {
			if (end > start && end < nextMarkerIndex) {
				nextMarkerIndex = end;
			}
		}

		const endIndex =
			nextMarkerIndex === Infinity ? response.length : nextMarkerIndex;
		return response.slice(colonIndex + 1, endIndex);
	}

	private getFallbackScene(
		commit: Commit,
		context: {
			previousCommits: Commit[];
			branchName: string;
			contributorInfo: string;
		},
	): Scene {
		const sceneText = `You are exploring the commit "${commit.message}" by ${commit.author} on branch ${context.branchName}. This commit changed ${commit.stats.filesChanged} files with ${commit.stats.insertions} additions and ${commit.stats.deletions} deletions.`;

		const choices = [
			{
				id: 'continue',
				label: 'Continue to the next commit',
				type: ChoiceType.SAFE,
			},
			{
				id: 'explore',
				label: 'Explore this commit in detail',
				type: ChoiceType.RISKY,
			},
			{
				id: 'meta',
				label: 'View commit statistics',
				type: ChoiceType.META,
			},
		];

		return {
			id: commit.hash,
			sceneText,
			choices,
		};
	}
}
