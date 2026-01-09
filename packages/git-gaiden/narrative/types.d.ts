/**
 * Represents a single scene in the choose-your-own-adventure game.
 */
export interface Scene {
    /** Unique identifier for the scene (commit hash) */
    readonly id: string;
    /** The narrative text to display (2-3 sentences) */
    readonly sceneText: string;
    /** Available choices for the player */
    readonly choices: readonly Choice[];
}
/**
 * A choice available to the player in a scene.
 */
export interface Choice {
    /** Unique identifier for the choice */
    readonly id: string;
    /** Text label displayed to the player */
    readonly label: string;
    /** Type of choice affecting UI styling and behavior */
    readonly type: ChoiceType;
    /** Optional commit hash to navigate to (for meta choices) */
    readonly nextCommitHash?: string;
}
/**
 * Types of choices available in scenes.
 */
export declare enum ChoiceType {
    /** Safe choice - typically continues linearly */
    SAFE = "safe",
    /** Risky choice - may lead to interesting or dangerous paths */
    RISKY = "risky",
    /** Meta choice - affects game state or provides information */
    META = "meta"
}
