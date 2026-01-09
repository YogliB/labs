import { describe, it, expect } from 'vitest';
import { modelsDirectory, cacheDirectory, stateDirectory } from '../paths.js';

describe('paths', () => {
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
});
