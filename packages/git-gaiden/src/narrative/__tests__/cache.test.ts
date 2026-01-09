import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SceneCache } from '../cache.js';
import type { Scene } from '../types.js';

// Mock fs/promises
vi.mock('node:fs/promises', () => ({
	readFile: vi.fn(),
	writeFile: vi.fn(),
	mkdir: vi.fn(),
	unlink: vi.fn(),
}));

import { readFile, writeFile, mkdir, unlink } from 'node:fs/promises';

describe('SceneCache', () => {
	let cache: SceneCache;

	beforeEach(() => {
		vi.clearAllMocks();
		cache = new SceneCache();
	});

	describe('get', () => {
		it('returns undefined if cache entry does not exist', async () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(readFile as any).mockResolvedValue(
				JSON.stringify({ entries: [] }),
			);
			const result = await cache.get('hash1', 'model1');
			expect(result).toBeUndefined();
		});

		it('returns scene if cache entry exists and is valid', async () => {
			const mockScene: Scene = {
				id: 'hash1',
				sceneText: 'Test scene',
				choices: [],
			};
			const indexData = {
				entries: [
					{
						key: 'hash1-model1',
						timestamp: Date.now(),
						modelVersion: 'v1',
						size: JSON.stringify(mockScene).length,
					},
				],
			};
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(readFile as any)
				.mockResolvedValueOnce(JSON.stringify(indexData)) // index
				.mockResolvedValueOnce(JSON.stringify(mockScene)); // scene file
			const result = await cache.get('hash1', 'model1');
			expect(result).toEqual(mockScene);
		});

		it('removes invalid cache entry and returns undefined', async () => {
			const indexData = {
				entries: [
					{
						key: 'hash1-model1',
						timestamp: Date.now(),
						modelVersion: 'v1',
						size: 100,
					},
				],
			};
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(readFile as any)
				.mockResolvedValueOnce(JSON.stringify(indexData)) // index
				.mockRejectedValueOnce(new Error('Corrupt file')); // scene file
			const result = await cache.get('hash1', 'model1');
			expect(result).toBeUndefined();
			expect(writeFile).toHaveBeenCalledWith(
				expect.any(String),
				// eslint-disable-next-line unicorn/no-null
				JSON.stringify({ entries: [] }, null, 2),
			);
		});
	});

	describe('set', () => {
		it('saves scene to cache and updates index', async () => {
			const mockScene: Scene = {
				id: 'hash1',
				sceneText: 'Test scene',
				choices: [],
			};
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(readFile as any).mockResolvedValue(
				JSON.stringify({ entries: [] }),
			);
			await cache.set('hash1', 'model1', mockScene);
			expect(mkdir).toHaveBeenCalled();
			expect(writeFile).toHaveBeenCalledTimes(2); // scene and index
		});

		it('calls prune after setting', async () => {
			const mockScene: Scene = {
				id: 'hash1',
				sceneText: 'Test scene',
				choices: [],
			};
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(readFile as any).mockResolvedValue(
				JSON.stringify({ entries: [] }),
			);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const pruneSpy = vi.spyOn(cache as any, 'prune');
			await cache.set('hash1', 'model1', mockScene);
			expect(pruneSpy).toHaveBeenCalled();
		});
	});

	describe('clear', () => {
		it('removes all cache files and clears index', async () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(readFile as any).mockResolvedValue(
				JSON.stringify({
					entries: [{ key: 'hash1-model1' }],
				}),
			);
			await cache.clear();
			expect(unlink).toHaveBeenCalled();
			expect(writeFile).toHaveBeenCalledWith(
				expect.any(String),
				// eslint-disable-next-line unicorn/no-null
				JSON.stringify({ entries: [] }, null, 2),
			);
		});
	});

	describe('prune', () => {
		it('does nothing if total size is under max', async () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(readFile as any).mockResolvedValue(
				JSON.stringify({
					entries: [{ key: 'hash1-model1', size: 100 }],
				}),
			);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			await (cache as any).prune();
			expect(unlink).not.toHaveBeenCalled();
		});

		it('removes oldest entries when over max size', async () => {
			const cacheWithSmallMax = new SceneCache({ maxSize: 50 });
			const entries = [
				{ key: 'old', timestamp: 1000, modelVersion: 'v1', size: 40 },
				{ key: 'new', timestamp: 2000, modelVersion: 'v1', size: 40 },
			];
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(readFile as any).mockResolvedValue(JSON.stringify({ entries }));
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			await (cacheWithSmallMax as any).prune();
			expect(unlink).toHaveBeenCalledWith(expect.stringContaining('old'));
			expect(writeFile).toHaveBeenCalled();
		});
	});
});
