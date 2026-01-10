import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { pipeline, env } from '@xenova/transformers';

// Mock @xenova/transformers
vi.mock('@xenova/transformers', () => ({
	pipeline: vi.fn(),
	env: {
		localModelPath: '/mock/path',
		allowRemoteModels: false,
	},
}));
describe('Model Initialization', () => {
	let mockPipeline: unknown;
	let initializeModel: (
		modelId?: string,
		progressCallback?: (progress: unknown) => void,
	) => Promise<unknown>;
	let isModelCached: (modelId: string) => Promise<boolean>;
	let getCurrentModel: () => unknown;

	beforeEach(async () => {
		vi.clearAllMocks();
		mockPipeline = { generate: vi.fn() };

		// Reset module state by re-importing
		vi.resetModules();
		const modelModule = await import('../model.js');
		initializeModel = modelModule.initializeModel;
		isModelCached = modelModule.isModelCached;
		getCurrentModel = modelModule.getCurrentModel;
	});

	afterEach(() => {
		// Clean up after each test
		vi.restoreAllMocks();
	});

	describe('initializeModel', () => {
		it('initializes model with default model ID', async () => {
			pipeline.mockResolvedValue(mockPipeline);

			const result = await initializeModel();

			expect(pipeline).toHaveBeenCalledWith(
				'text-generation',
				'onnx-community/Phi-3.5-mini-instruct-onnx-web',
				{
					progress_callback: undefined,
					dtype: 'q4',
				},
			);
			expect(result).toBe(mockPipeline);
		});

		it('initializes model with custom model ID', async () => {
			pipeline.mockResolvedValue(mockPipeline);
			const customModelId = 'custom/model-id';

			const result = await initializeModel(customModelId);

			expect(pipeline).toHaveBeenCalledWith(
				'text-generation',
				customModelId,
				{
					progress_callback: undefined,
					dtype: 'q4',
				},
			);
			expect(result).toBe(mockPipeline);
		});

		it('calls progress callback during initialization', async () => {
			pipeline.mockResolvedValue(mockPipeline);
			const progressCallback = vi.fn();

			await initializeModel('test-model', progressCallback);

			expect(pipeline).toHaveBeenCalledWith(
				'text-generation',
				'test-model',
				{
					progress_callback: progressCallback,
					dtype: 'q4',
				},
			);
		});

		it('reuses cached model when same model ID is requested', async () => {
			pipeline.mockResolvedValue(mockPipeline);

			await initializeModel('test-model');
			await initializeModel('test-model');

			expect(pipeline).toHaveBeenCalledTimes(1);
		});

		it('reinitializes when different model ID is requested', async () => {
			pipeline.mockResolvedValue(mockPipeline);

			await initializeModel('model1');
			await initializeModel('model2');

			expect(pipeline).toHaveBeenCalledTimes(2);
		});

		it('sets allowRemoteModels to true during initialization', async () => {
			pipeline.mockResolvedValue(mockPipeline);

			await initializeModel();

			expect(env.allowRemoteModels).toBe(true);
		});

		it('throws error when model initialization fails', async () => {
			const error = new Error('Network error');
			pipeline.mockRejectedValue(error);

			await expect(initializeModel('failing-model')).rejects.toThrow(
				'Failed to initialize model failing-model: Error: Network error',
			);
		});
	});

	describe('isModelCached', () => {
		it('returns true when model loads successfully', async () => {
			pipeline.mockResolvedValue(mockPipeline);

			const result = await isModelCached('cached-model');

			expect(result).toBe(true);
			expect(pipeline).toHaveBeenCalledWith(
				'text-generation',
				'cached-model',
				{
					progress_callback: expect.any(Function),
				},
			);
		});

		it('returns false when model fails to load', async () => {
			pipeline.mockRejectedValue(new Error('Model not found'));

			const result = await isModelCached('uncached-model');

			expect(result).toBe(false);
		});
	});

	describe('getCurrentModel', () => {
		it('returns undefined when no model is initialized', () => {
			const result = getCurrentModel();

			expect(result).toBeUndefined();
		});

		it('returns the initialized model pipeline', async () => {
			pipeline.mockResolvedValue(mockPipeline);

			await initializeModel('test-model');
			const result = getCurrentModel();

			expect(result).toBe(mockPipeline);
		});

		it('returns the most recently initialized model', async () => {
			const mockPipeline2 = { generate: vi.fn() };
			pipeline.mockResolvedValueOnce(mockPipeline);
			pipeline.mockResolvedValueOnce(mockPipeline2);

			await initializeModel('model1');
			await initializeModel('model2');
			const result = getCurrentModel();

			expect(result).toBe(mockPipeline2);
		});
	});

	describe('Integration tests', () => {
		it('full initialization workflow works correctly', async () => {
			pipeline.mockResolvedValue(mockPipeline);

			// Initially no model
			expect(getCurrentModel()).toBeUndefined();

			// Initialize model
			const initializedModel = await initializeModel('integration-test');
			expect(initializedModel).toBe(mockPipeline);

			// Now model is available
			expect(getCurrentModel()).toBe(mockPipeline);

			// Check caching
			const isCached = await isModelCached('integration-test');
			expect(isCached).toBe(true);
		});

		it('handles multiple model switches correctly', async () => {
			const mockPipeline1 = { id: 'pipeline1' };
			const mockPipeline2 = { id: 'pipeline2' };

			pipeline.mockResolvedValueOnce(mockPipeline1);
			pipeline.mockResolvedValueOnce(mockPipeline2);

			await initializeModel('model1');
			expect(getCurrentModel()).toBe(mockPipeline1);

			await initializeModel('model2');
			expect(getCurrentModel()).toBe(mockPipeline2);

			// Switch back to first model
			pipeline.mockResolvedValueOnce(mockPipeline1);
			await initializeModel('model1');
			expect(getCurrentModel()).toBe(mockPipeline1);
		});
	});
});
