import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import type { GameState } from './types.js';

/**
 * Manages the persistence and manipulation of game state.
 */
export class GameStateManager {
	private readonly repoPath: string;
	private readonly stateFile: string;
	private currentState: GameState | undefined = undefined;

	constructor(repoPath: string) {
		this.repoPath = repoPath;
		this.stateFile = path.join(repoPath, '.git-gaiden.json');
	}

	/**
	 * Loads the game state from disk.
	 * @returns The loaded game state, or null if no state exists.
	 */
	load(): GameState | undefined {
		try {
			if (!existsSync(this.stateFile)) {
				return undefined;
			}
			const data = readFileSync(this.stateFile, 'utf8');
			const parsed = JSON.parse(data);
			this.currentState = {
				currentCommit: parsed.currentCommit,
				visitedCommits: new Set(parsed.visitedCommits),
				progress: parsed.progress,
				branchPath: parsed.branchPath,
			};
			return this.currentState;
		} catch (error) {
			// If file exists but is corrupted, treat as no state
			console.warn('Failed to load game state:', error);
			return undefined;
		}
	}

	/**
	 * Saves the current game state to disk.
	 */
	save(): void {
		if (!this.currentState) {
			throw new Error('No current state to save');
		}
		const data = {
			currentCommit: this.currentState.currentCommit,
			visitedCommits: [...this.currentState.visitedCommits],
			progress: {
				...this.currentState.progress,
				lastPlayedAt: new Date().toISOString(),
			},
			branchPath: this.currentState.branchPath,
		};
		writeFileSync(this.stateFile, JSON.stringify(data, undefined, 2));
	}

	/**
	 * Updates the current game state with the provided changes.
	 * @param updates Partial updates to apply to the current state.
	 */
	update(updates: Partial<GameState>): void {
		if (!this.currentState) {
			throw new Error('No current state to update');
		}
		this.currentState = {
			...this.currentState,
			...updates,
			progress: updates.progress
				? { ...this.currentState.progress, ...updates.progress }
				: this.currentState.progress,
			visitedCommits: updates.visitedCommits
				? new Set([
						...this.currentState.visitedCommits,
						...updates.visitedCommits,
					])
				: this.currentState.visitedCommits,
			branchPath: updates.branchPath
				? [...this.currentState.branchPath, ...updates.branchPath]
				: this.currentState.branchPath,
		};
		this.save();
	}

	/**
	 * Resets the game state by clearing it from memory and disk.
	 */
	reset(): void {
		this.currentState = undefined;
		try {
			if (existsSync(this.stateFile)) {
				unlinkSync(this.stateFile);
			}
		} catch (error) {
			console.warn('Failed to delete state file:', error);
		}
	}

	/**
	 * Gets the current game state.
	 * @returns The current game state, or null if not loaded.
	 */
	getCurrentState(): GameState | undefined {
		return this.currentState;
	}
}
