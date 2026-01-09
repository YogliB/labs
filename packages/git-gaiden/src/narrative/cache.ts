import { readFile, writeFile, mkdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import { cacheDirectory } from '../config/paths.js';
import type { Scene } from './types.js';

interface CacheEntryMeta {
	readonly key: string;
	readonly timestamp: number;
	readonly modelVersion: string;
	readonly size: number;
}

interface CacheIndex {
	readonly entries: readonly CacheEntryMeta[];
}

export class SceneCache {
	private readonly indexPath: string;
	private readonly maxSize: number;

	constructor(options?: { maxSize?: number }) {
		this.indexPath = path.join(cacheDirectory, 'index.json');
		this.maxSize = options?.maxSize ?? 100 * 1024 * 1024; // 100MB default
	}

	private getCacheFilePath(key: string): string {
		return path.join(cacheDirectory, `${key}.json`);
	}

	private async ensureCacheDir(): Promise<void> {
		await mkdir(cacheDirectory, { recursive: true });
	}

	private async loadIndex(): Promise<Map<string, CacheEntryMeta>> {
		try {
			const data = await readFile(this.indexPath, 'utf8');
			const index: CacheIndex = JSON.parse(data);
			return new Map(index.entries.map((entry) => [entry.key, entry]));
		} catch {
			return new Map();
		}
	}

	private async saveIndex(index: Map<string, CacheEntryMeta>): Promise<void> {
		await this.ensureCacheDir();
		const cacheIndex: CacheIndex = {
			entries: [...index.values()],
		};
		// eslint-disable-next-line unicorn/no-null
		await writeFile(this.indexPath, JSON.stringify(cacheIndex, null, 2));
	}

	async get(commitHash: string, modelId: string): Promise<Scene | undefined> {
		const key = `${commitHash}-${modelId}`;
		const index = await this.loadIndex();
		const meta = index.get(key);
		if (!meta) {
			return undefined;
		}

		try {
			const filePath = this.getCacheFilePath(key);
			const data = await readFile(filePath, 'utf8');
			const scene: Scene = JSON.parse(data);

			// Update access timestamp
			meta.timestamp = Date.now();
			await this.saveIndex(index);

			return scene;
		} catch {
			// If file corrupted or missing, remove from index
			index.delete(key);
			await this.saveIndex(index);
			return undefined;
		}
	}

	async set(
		commitHash: string,
		modelId: string,
		scene: Scene,
		modelVersion = 'unknown',
	): Promise<void> {
		const key = `${commitHash}-${modelId}`;
		const filePath = this.getCacheFilePath(key);

		await this.ensureCacheDir();
		// eslint-disable-next-line unicorn/no-null
		const sceneData = JSON.stringify(scene, null, 2);
		await writeFile(filePath, sceneData);

		const index = await this.loadIndex();
		const size = Buffer.byteLength(sceneData, 'utf8');
		const meta: CacheEntryMeta = {
			key,
			timestamp: Date.now(),
			modelVersion,
			size,
		};
		index.set(key, meta);
		await this.saveIndex(index);

		// Prune if necessary
		await this.prune();
	}

	async clear(): Promise<void> {
		const index = await this.loadIndex();
		for (const meta of index.values()) {
			try {
				await unlink(this.getCacheFilePath(meta.key));
			} catch {
				// Ignore errors
			}
		}
		index.clear();
		await this.saveIndex(index);
	}

	async prune(): Promise<void> {
		const index = await this.loadIndex();
		let totalSize = [...index.values()].reduce(
			(sum, meta) => sum + meta.size,
			0,
		);

		if (totalSize <= this.maxSize) {
			return;
		}

		// Sort by timestamp ascending (oldest first)
		const sortedEntries = [...index.entries()].toSorted(
			([, a], [, b]) => a.timestamp - b.timestamp,
		);

		for (const [key, meta] of sortedEntries) {
			if (totalSize <= this.maxSize) {
				break;
			}
			try {
				await unlink(this.getCacheFilePath(key));
				totalSize -= meta.size;
				index.delete(key);
			} catch {
				// Ignore errors
			}
		}

		await this.saveIndex(index);
	}
}
