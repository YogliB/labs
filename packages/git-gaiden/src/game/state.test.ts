import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'node:fs';
import { GameStateManager } from './state.js';
import type { GameState } from './types.js';

// Mock fs module
vi.mock('node:fs', () => ({
	existsSync: vi.fn(),
	readFileSync: vi.fn(),
	writeFileSync: vi.fn(),
	unlinkSync: vi.fn(),
}));

const mockFs = vi.mocked(fs);

describe('GameStateManager', () => {
	let manager: GameStateManager;
	const repoPath = '/path/to/repo';
	const stateFile = '/path/to/repo/.git-gaiden.json';

	beforeEach(() => {
		vi.clearAllMocks();
		manager = new GameStateManager(repoPath);
	});

	describe('load', () => {
		it('returns undefined when state file does not exist', () => {
			mockFs.existsSync.mockReturnValue(false);

			const result = manager.load();

			expect(result).toBeUndefined();
			expect(mockFs.existsSync).toHaveBeenCalledWith(stateFile);
		});

		it('loads and returns valid game state', () => {
			const mockData = {
				currentCommit: 'abc123',
				visitedCommits: ['abc123', 'def456'],
				progress: {
					commitsExploredRatio: 0.5,
					currentBranch: 'main',
					lastPlayedAt: '2023-01-01T00:00:00.000Z',
				},
				branchPath: ['main'],
			};
			mockFs.existsSync.mockReturnValue(true);
			mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

			const result = manager.load();

			expect(result).toEqual({
				currentCommit: 'abc123',
				visitedCommits: new Set(['abc123', 'def456']),
				progress: mockData.progress,
				branchPath: ['main'],
			});
			expect(mockFs.readFileSync).toHaveBeenCalledWith(stateFile, 'utf8');
		});

		it('returns undefined and warns on corrupted JSON', () => {
			const consoleWarnSpy = vi
				.spyOn(console, 'warn')
				.mockImplementation(() => {
					// Mock implementation - do nothing
				});
			mockFs.existsSync.mockReturnValue(true);
			mockFs.readFileSync.mockReturnValue('invalid json');

			const result = manager.load();

			expect(result).toBeUndefined();
			expect(consoleWarnSpy).toHaveBeenCalledWith(
				'Failed to load game state:',
				expect.any(SyntaxError),
			);
			consoleWarnSpy.mockRestore();
		});

		it('returns undefined and warns on read error', () => {
			const consoleWarnSpy = vi
				.spyOn(console, 'warn')
				.mockImplementation(() => {
					// Mock implementation - do nothing
				});
			mockFs.existsSync.mockReturnValue(true);
			mockFs.readFileSync.mockImplementation(() => {
				throw new Error('Read error');
			});

			const result = manager.load();

			expect(result).toBeUndefined();
			expect(consoleWarnSpy).toHaveBeenCalledWith(
				'Failed to load game state:',
				expect.any(Error),
			);
			consoleWarnSpy.mockRestore();
		});
	});

	describe('save', () => {
		it('throws error when no current state', () => {
			expect(() => manager.save()).toThrow('No current state to save');
		});

		it('saves current state to file with updated lastPlayedAt', () => {
			const initialState: GameState = {
				currentCommit: 'abc123',
				visitedCommits: new Set(['abc123']),
				progress: {
					commitsExploredRatio: 0.5,
					currentBranch: 'main',
					lastPlayedAt: '2023-01-01T00:00:00.000Z',
				},
				branchPath: ['main'],
			};
			manager['currentState'] = initialState; // Access private for test

			manager.save();

			const writtenData = JSON.parse(
				mockFs.writeFileSync.mock.calls[0][1],
			);
			expect(writtenData).toEqual({
				currentCommit: 'abc123',
				visitedCommits: ['abc123'],
				progress: {
					commitsExploredRatio: 0.5,
					currentBranch: 'main',
					lastPlayedAt: expect.any(String),
				},
				branchPath: ['main'],
			});
		});
	});

	describe('update', () => {
		beforeEach(() => {
			const initialState: GameState = {
				currentCommit: 'abc123',
				visitedCommits: new Set(['abc123']),
				progress: {
					commitsExploredRatio: 0.5,
					currentBranch: 'main',
					lastPlayedAt: '2023-01-01T00:00:00.000Z',
				},
				branchPath: ['main'],
			};
			manager['currentState'] = initialState;
		});

		it('throws error when no current state', () => {
			manager['currentState'] = undefined;
			expect(() => manager.update({ currentCommit: 'new' })).toThrow(
				'No current state to update',
			);
		});

		it('updates current commit and saves', () => {
			manager.update({ currentCommit: 'def456' });

			expect(manager.getCurrentState()?.currentCommit).toBe('def456');
			expect(mockFs.writeFileSync).toHaveBeenCalled();
		});

		it('merges progress updates', () => {
			manager.update({
				progress: { commitsExploredRatio: 0.8 },
			});

			expect(
				manager.getCurrentState()?.progress.commitsExploredRatio,
			).toBe(0.8);
			expect(manager.getCurrentState()?.progress.currentBranch).toBe(
				'main',
			); // unchanged
		});

		it('adds to visited commits', () => {
			manager.update({
				visitedCommits: new Set(['new1', 'new2']),
			});

			expect(manager.getCurrentState()?.visitedCommits).toEqual(
				new Set(['abc123', 'new1', 'new2']),
			);
		});

		it('appends to branch path', () => {
			manager.update({
				branchPath: ['feature'],
			});

			expect(manager.getCurrentState()?.branchPath).toEqual([
				'main',
				'feature',
			]);
		});
	});

	describe('reset', () => {
		it('clears current state and deletes file', () => {
			manager['currentState'] = {} as GameState;
			mockFs.existsSync.mockReturnValue(true);

			manager.reset();

			expect(manager.getCurrentState()).toBeUndefined();
			expect(mockFs.unlinkSync).toHaveBeenCalledWith(stateFile);
		});

		it('handles file deletion error gracefully', () => {
			const consoleWarnSpy = vi
				.spyOn(console, 'warn')
				.mockImplementation(() => {
					// Mock implementation - do nothing
				});
			manager['currentState'] = {} as GameState;
			mockFs.existsSync.mockReturnValue(true);
			mockFs.unlinkSync.mockImplementation(() => {
				throw new Error('Delete error');
			});

			manager.reset();

			expect(consoleWarnSpy).toHaveBeenCalledWith(
				'Failed to delete state file:',
				expect.any(Error),
			);
			consoleWarnSpy.mockRestore();
		});
	});

	describe('getCurrentState', () => {
		it('returns current state', () => {
			const state: GameState = {
				currentCommit: 'abc123',
				visitedCommits: new Set(),
				progress: {
					commitsExploredRatio: 0,
					currentBranch: 'main',
					lastPlayedAt: '2023-01-01T00:00:00.000Z',
				},
				branchPath: [],
			};
			manager['currentState'] = state;

			expect(manager.getCurrentState()).toBe(state);
		});

		it('returns undefined when no state loaded', () => {
			expect(manager.getCurrentState()).toBeUndefined();
		});
	});
});
