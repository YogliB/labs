import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { modelsDirectory, cacheDirectory, stateDirectory } from '../paths.js';
import path from 'node:path';

const isAbsoluteOrHome = (p: string): boolean =>
	path.isAbsolute(p) || p.includes('.');

const mockLinuxPlatform = (): void => {
	vi.doMock('node:os', async () => {
		const actual = await vi.importActual('node:os');
		return {
			...actual,
			platform: () => 'linux',
		};
	});
};

const mockDarwinPlatform = (): void => {
	vi.doMock('node:os', async () => {
		const actual = await vi.importActual('node:os');
		return {
			...actual,
			platform: () => 'darwin',
		};
	});
};

const mockWin32Platform = (): void => {
	vi.doMock('node:os', async () => {
		const actual = await vi.importActual('node:os');
		return {
			...actual,
			platform: () => 'win32',
		};
	});
};

const mockFreeBsdPlatform = (): void => {
	vi.doMock('node:os', async () => {
		const actual = await vi.importActual('node:os');
		return {
			...actual,
			platform: () => 'freebsd',
		};
	});
};

describe('paths', () => {
	const originalEnvironment = { ...process.env };

	beforeEach(() => {
		process.env = { ...originalEnvironment };
	});

	afterEach(() => {
		process.env = { ...originalEnvironment };
		vi.resetModules();
	});

	describe('exported paths', () => {
		it('exports modelsDirectory as string', () => {
			expect(typeof modelsDirectory).toBe('string');
			expect(modelsDirectory).toContain('git-gaiden');
			expect(modelsDirectory).toContain('models');
		});

		it('exports cacheDirectory as string', () => {
			expect(typeof cacheDirectory).toBe('string');
			expect(cacheDirectory).toContain('git-gaiden');
		});

		it('exports stateDirectory as string', () => {
			expect(typeof stateDirectory).toBe('string');
			expect(stateDirectory).toContain('git-gaiden');
			expect(stateDirectory).toContain('state');
		});

		it('all paths are under git-gaiden directory', () => {
			expect(modelsDirectory).toContain('git-gaiden');
			expect(stateDirectory).toContain('git-gaiden');
			expect(cacheDirectory).toContain('git-gaiden');
		});
	});

	describe('XDG environment variables (Linux)', () => {
		it('uses XDG_DATA_HOME when set', async () => {
			process.env.XDG_DATA_HOME = '/custom/data';
			delete process.env.XDG_CACHE_HOME;

			mockLinuxPlatform();

			vi.resetModules();
			const { modelsDirectory: modelsDirectory_ } =
				await import('../paths.js');
			expect(modelsDirectory_).toContain('/custom/data');
			expect(modelsDirectory_).toContain('git-gaiden');
		});

		it('uses XDG_DATA_HOME fallback to .local/share when not set', async () => {
			delete process.env.XDG_DATA_HOME;
			delete process.env.XDG_CACHE_HOME;

			mockLinuxPlatform();

			vi.resetModules();
			const { modelsDirectory: modelsDirectory_ } =
				await import('../paths.js');
			expect(modelsDirectory_).toContain('.local');
			expect(modelsDirectory_).toContain('share');
		});

		it('uses .cache fallback when XDG_CACHE_HOME not set on Linux', async () => {
			delete process.env.XDG_CACHE_HOME;

			mockLinuxPlatform();

			vi.resetModules();
			const { cacheDirectory: cacheDirectory_ } =
				await import('../paths.js');
			expect(cacheDirectory_).toContain('.cache');
		});
	});

	describe('platform-specific paths', () => {
		it('returns Linux paths when platform is linux', async () => {
			mockLinuxPlatform();

			vi.resetModules();
			const { modelsDirectory: modelsDirectory_ } =
				await import('../paths.js');
			expect(modelsDirectory_).toContain('.local');
		});

		it('returns macOS paths when platform is darwin', async () => {
			mockDarwinPlatform();

			vi.resetModules();
			const { modelsDirectory: modelsDirectory_ } =
				await import('../paths.js');
			expect(modelsDirectory_).toContain('Library');
			expect(modelsDirectory_).toContain('Application Support');
		});

		it('returns Windows paths when platform is win32', async () => {
			mockWin32Platform();

			vi.resetModules();
			delete process.env.APPDATA;
			const { modelsDirectory: modelsDirectory_ } =
				await import('../paths.js');
			expect(modelsDirectory_).toContain('AppData');
		});

		it('uses APPDATA on Windows when set', async () => {
			process.env.APPDATA = String.raw`C:\Users\TestUser\AppData\Roaming`;
			mockWin32Platform();

			vi.resetModules();
			const { modelsDirectory: modelsDirectory_ } =
				await import('../paths.js');
			expect(modelsDirectory_).toContain('AppData');
			expect(modelsDirectory_).toContain('Roaming');
		});

		it('returns fallback path for unknown platforms', async () => {
			mockFreeBsdPlatform();

			vi.resetModules();
			const { modelsDirectory: modelsDirectory_ } =
				await import('../paths.js');
			expect(modelsDirectory_).toContain('.git-gaiden');
		});
	});

	describe('cache directory platform logic', () => {
		it('uses data directory cache on non-Linux platforms', async () => {
			mockDarwinPlatform();

			vi.resetModules();
			const { cacheDirectory: cacheDirectory_ } =
				await import('../paths.js');
			expect(cacheDirectory_).toContain('cache');
			expect(cacheDirectory_).toContain('Library');
		});
	});

	describe('directory structure', () => {
		it('models directory is nested under data directory', () => {
			expect(modelsDirectory).toMatch(/git-gaiden.*models/);
		});

		it('state directory is nested under data directory', () => {
			expect(stateDirectory).toMatch(/git-gaiden.*state/);
		});

		it('cache directory contains git-gaiden', () => {
			expect(cacheDirectory).toContain('git-gaiden');
		});

		it('all paths are absolute or start with home directory pattern', () => {
			expect(isAbsoluteOrHome(modelsDirectory)).toBe(true);
			expect(isAbsoluteOrHome(cacheDirectory)).toBe(true);
			expect(isAbsoluteOrHome(stateDirectory)).toBe(true);
		});
	});
});
