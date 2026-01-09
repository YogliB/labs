import { pipeline, env } from '@xenova/transformers';
import { modelsDirectory } from './paths.js';

// Set local model path to our models directory
env.localModelPath = modelsDirectory;

let modelPipeline: unknown;
let currentModelId: string | undefined;

/**
 * Initializes the language model pipeline.
 * Downloads the model if not cached, with optional progress callback.
 * Uses lazy loading - only initializes when first called.
 */
export async function initializeModel(
	modelId = 'onnx-community/Phi-3.5-mini-instruct-onnx-web',
	progressCallback?: (progress: unknown) => void,
): Promise<unknown> {
	if (modelPipeline && currentModelId === modelId) {
		return modelPipeline;
	}

	// Allow remote models for download
	env.allowRemoteModels = true;

	try {
		modelPipeline = await pipeline('text-generation', modelId, {
			progress_callback: progressCallback,
			dtype: 'q4', // Use quantized version for efficiency
		});
		currentModelId = modelId;
		return modelPipeline;
	} catch (error) {
		throw new Error(`Failed to initialize model ${modelId}: ${error}`);
	}
}

/**
 * Checks if the model is already downloaded/cached.
 */
export async function isModelCached(modelId: string): Promise<boolean> {
	// For now, try to load and see if it fails quickly
	// In practice, transformers.js handles caching internally
	try {
		await pipeline('text-generation', modelId, {
			progress_callback: () => {
				// Empty callback
			},
		});
		return true;
	} catch {
		return false;
	}
}

/**
 * Gets the current loaded model pipeline, or undefined if not initialized.
 */
export function getCurrentModel(): unknown {
	return modelPipeline;
}
