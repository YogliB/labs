/**
 * Initializes the language model pipeline.
 * Downloads the model if not cached, with optional progress callback.
 * Uses lazy loading - only initializes when first called.
 */
export declare function initializeModel(
	modelId?: string,
	progressCallback?: (progress: unknown) => void,
): Promise<unknown>;
/**
 * Checks if the model is already downloaded/cached.
 */
export declare function isModelCached(modelId: string): Promise<boolean>;
/**
 * Gets the current loaded model pipeline, or undefined if not initialized.
 */
export declare function getCurrentModel(): unknown;
