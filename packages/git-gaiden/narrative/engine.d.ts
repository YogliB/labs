import type { Commit } from '../git/types.js';
import type { Scene } from './types.js';
export declare class NarrativeEngine {
    private initialized;
    initialize(): Promise<void>;
    generateScene(commit: Commit, context: {
        previousCommits: Commit[];
        branchName: string;
        contributorInfo: string;
    }): Promise<Scene>;
    private buildScenePrompt;
}
