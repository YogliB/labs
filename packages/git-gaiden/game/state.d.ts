import type { GameState } from './types.js';
/**
 * Manages the persistence and manipulation of game state.
 */
export declare class GameStateManager {
    private readonly repoPath;
    private readonly stateFile;
    private currentState;
    constructor(repoPath: string);
    /**
     * Loads the game state from disk.
     * @returns The loaded game state, or null if no state exists.
     */
    load(): GameState | undefined;
    /**
     * Saves the current game state to disk.
     */
    save(): void;
    /**
     * Updates the current game state with the provided changes.
     * @param updates Partial updates to apply to the current state.
     */
    update(updates: Partial<GameState>): void;
    /**
     * Resets the game state by clearing it from memory and disk.
     */
    reset(): void;
    /**
     * Gets the current game state.
     * @returns The current game state, or null if not loaded.
     */
    getCurrentState(): GameState | undefined;
}
