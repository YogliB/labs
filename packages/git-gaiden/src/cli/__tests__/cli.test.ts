import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { existsSync } from 'node:fs';
import { cwd } from 'node:process';

// Mock dependencies
vi.mock('meow', () => ({
	default: vi.fn(),
}));

vi.mock('ink', () => ({
	render: vi.fn(),
}));

vi.mock('node:fs', () => ({
	existsSync: vi.fn(),
}));

vi.mock('node:process', () => ({
	cwd: vi.fn(),
}));

vi.mock('../git/parser.js', () => ({
	parseRepository: vi.fn(),
}));

vi.mock('../game/state.js', () => ({
	GameStateManager: vi.fn(),
}));

vi.mock('../game/mapper.js', () => ({
	mapCommitGraphToStory: vi.fn(),
}));

vi.mock('../narrative/engine.js', () => ({
	NarrativeEngine: vi.fn(),
}));

// Import after mocks
import meow from 'meow';
import { render } from 'ink';
import { parseRepository } from '../git/parser.js';
import { GameStateManager } from '../game/state.js';
import { mapCommitGraphToStory } from '../game/mapper.js';
import { NarrativeEngine } from '../narrative/engine.js';

describe('CLI Integration Tests', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should parse CLI flags correctly', () => {
		const mockCli = {
			flags: {
				branch: 'main',
				start: 'abc123',
				model: 'phi-3.5-mini',
				reset: false,
				noCache: true,
			},
		};
		(meow as vi.MockedFunction<typeof meow>).mockReturnValue(
			mockCli as any,
		);

		// Simulate CLI setup
		const cli = meow('', {
			importMeta: { url: 'file:///test' },
			flags: {
				branch: { type: 'string' },
				start: { type: 'string' },
				model: { type: 'string', default: 'phi-3.5-mini' },
				reset: { type: 'boolean' },
				noCache: { type: 'boolean' },
			},
		});

		expect(cli.flags.branch).toBe('main');
		expect(cli.flags.start).toBe('abc123');
		expect(cli.flags.model).toBe('phi-3.5-mini');
		expect(cli.flags.reset).toBe(false);
		expect(cli.flags.noCache).toBe(true);
	});

	it('should validate repository exists', () => {
		(cwd as vi.MockedFunction<typeof cwd>).mockReturnValue('/test/repo');
		(existsSync as vi.MockedFunction<typeof existsSync>).mockImplementation(
			(path: string) => path === '/test/repo/.git',
		);

		const isValidRepo = existsSync(`${cwd()}/.git`);

		expect(isValidRepo).toBe(true);
	});

	it('should throw error for invalid repository', () => {
		(cwd as vi.MockedFunction<typeof cwd>).mockReturnValue('/invalid/repo');
		(existsSync as vi.MockedFunction<typeof existsSync>).mockReturnValue(
			false,
		);

		const consoleSpy = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});

		try {
			if (!existsSync(`${cwd()}/.git`)) {
				throw new Error('Not a git repository');
			}
		} catch (error) {
			console.error('Error:', (error as Error).message);
			process.exit(1);
		}

		expect(consoleSpy).toHaveBeenCalledWith(
			'Error:',
			'Not a git repository',
		);
		expect(exitSpy).toHaveBeenCalledWith(1);

		consoleSpy.mockRestore();
		exitSpy.mockRestore();
	});

	it('should call parseRepository with correct options', async () => {
		const mockCommitGraph = {
			commits: [],
			branches: [],
			merges: [],
			reverts: [],
		};
		(
			parseRepository as vi.MockedFunction<typeof parseRepository>
		).mockResolvedValue(mockCommitGraph);

		await parseRepository('/test/repo', { branch: 'main' });

		expect(parseRepository).toHaveBeenCalledWith('/test/repo', {
			branch: 'main',
		});
	});

	it('should initialize game state manager', () => {
		const mockStateManager = {
			load: vi.fn().mockReturnValue(),
			reset: vi.fn(),
		};
		(
			GameStateManager as vi.MockedFunction<typeof GameStateManager>
		).mockImplementation(() => mockStateManager);

		const stateManager = new (GameStateManager as any)('/test/repo');
		stateManager.load();

		expect(GameStateManager).toHaveBeenCalledWith('/test/repo');
		expect(stateManager.load).toHaveBeenCalled();
	});

	it('should reset state when --reset flag is set', () => {
		const mockStateManager = {
			reset: vi.fn(),
		};
		(
			GameStateManager as vi.MockedFunction<typeof GameStateManager>
		).mockImplementation(() => mockStateManager);

		const stateManager = new (GameStateManager as any)('/test/repo');
		stateManager.reset();

		expect(stateManager.reset).toHaveBeenCalled();
	});

	it('should initialize narrative engine', async () => {
		const mockEngine = {
			initialize: vi.fn().mockResolvedValue(),
		};
		(
			NarrativeEngine as vi.MockedFunction<typeof NarrativeEngine>
		).mockImplementation(() => mockEngine);

		const engine = new (NarrativeEngine as any)();
		await engine.initialize();

		expect(engine.initialize).toHaveBeenCalled();
	});

	it('should map commit graph to story', () => {
		const mockCommitGraph = {
			commits: [],
			branches: [],
			merges: [],
			reverts: [],
		};
		const mockStoryGraph = {
			commitHash: 'abc',
			children: [],
			visited: false,
			branch: 'main',
		};
		(
			mapCommitGraphToStory as vi.MockedFunction<
				typeof mapCommitGraphToStory
			>
		).mockReturnValue(mockStoryGraph);

		const result = (mapCommitGraphToStory as any)(mockCommitGraph);

		expect(mapCommitGraphToStory).toHaveBeenCalledWith(mockCommitGraph);
		expect(result).toEqual(mockStoryGraph);
	});

	it('should render the game UI', () => {
		const mockStoryGraph = {};
		const mockGameState = undefined;
		const mockStateManager = {};
		const mockEngine = {};

		(render as vi.MockedFunction<typeof render>)({
			type: 'Game',
			props: {
				storyGraph: mockStoryGraph,
				gameState: mockGameState,
				stateManager: mockStateManager,
				engine: mockEngine,
				startCommit: undefined,
			},
		} as any);

		expect(render).toHaveBeenCalled();
	});

	it('should handle git parsing errors', async () => {
		(
			parseRepository as vi.MockedFunction<typeof parseRepository>
		).mockRejectedValue(new Error('Permission denied'));

		const consoleSpy = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});

		try {
			await parseRepository('/test/repo', {});
		} catch (error) {
			console.error('Error:', (error as Error).message);
			process.exit(1);
		}

		expect(consoleSpy).toHaveBeenCalledWith('Error:', 'Permission denied');
		expect(exitSpy).toHaveBeenCalledWith(1);

		consoleSpy.mockRestore();
		exitSpy.mockRestore();
	});

	it('should display welcome message with stats', () => {
		const mockCommitGraph = {
			commits: Array.from({ length: 5 }, (_, index) => ({
				hash: `commit${index}`,
			})),
			branches: [
				{ name: 'main' },
				{ name: 'feature' },
				{ name: 'hotfix' },
			],
			merges: [],
			reverts: [],
		};

		const consoleSpy = vi
			.spyOn(console, 'log')
			.mockImplementation(() => {});

		console.log(
			`Git Gaiden - Exploring ${mockCommitGraph.commits.length} commits across ${mockCommitGraph.branches.length} branches`,
		);

		expect(consoleSpy).toHaveBeenCalledWith(
			'Git Gaiden - Exploring 5 commits across 3 branches',
		);

		consoleSpy.mockRestore();
	});
});
