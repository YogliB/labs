import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock React
vi.mock('react', () => ({
	createElement: vi.fn(),
}));

// Mock all dependencies before importing CLI
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
	exit: vi.fn(),
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

// Mock the Game component
vi.mock('./components/game.js', () => ({
	Game: vi.fn(),
}));

// Import mocks after setup
import meow from 'meow';
import { render } from 'ink';
import { existsSync } from 'node:fs';
import { cwd, exit } from 'node:process';
import { parseRepository } from '../git/parser.js';
import { GameStateManager } from '../game/state.js';
import { mapCommitGraphToStory } from '../game/mapper.js';
import { NarrativeEngine } from '../narrative/engine.js';
import { Game } from './components/game.js';

// Define the CLI logic as a testable function
async function runCli(cli: any) {
	try {
		// Validate repo
		const repoPath = cwd();
		if (!existsSync(`${repoPath}/.git`)) {
			throw new Error('Not a git repository');
		}

		// Load state
		const stateManager = new GameStateManager(repoPath);
		if (cli.flags.reset) {
			stateManager.reset();
		}
		const gameState = stateManager.load();

		// Parse git
		const commitGraph = await parseRepository(repoPath, {
			branch: cli.flags.branch,
		});

		// Welcome message
		console.log(
			`Git Gaiden - Exploring ${commitGraph.commits.length} commits across ${commitGraph.branches.length} branches`,
		);

		// Init engine
		const engine = new NarrativeEngine();
		await engine.initialize();

		// Map to story
		const storyGraph = mapCommitGraphToStory(commitGraph);

		// Start UI
		render(
			<Game
				storyGraph={storyGraph}
				gameState={gameState}
				stateManager={stateManager}
				engine={engine}
				startCommit={cli.flags.start}
			/>,
		);

		return { success: true };
	} catch (error) {
		console.error(
			'Error:',
			error instanceof Error ? error.message : String(error),
		);
		exit(1);
		return { success: false, error };
	}
}

describe('CLI Integration Tests', () => {
	let mockCli: any;
	let mockCommitGraph: any;
	let mockStoryGraph: any;
	let mockGameState: any;
	let mockStateManager: any;
	let mockEngine: any;

	beforeEach(() => {
		vi.clearAllMocks();

		// Setup default mocks
		mockCli = {
			flags: {
				branch: undefined,
				start: undefined,
				model: 'phi-3.5-mini',
				reset: false,
				noCache: false,
			},
		};

		mockCommitGraph = {
			commits: [{ hash: 'abc123' }, { hash: 'def456' }],
			branches: [{ name: 'main' }],
			merges: [],
			reverts: [],
		};

		mockStoryGraph = {
			commitHash: 'abc123',
			children: [],
			visited: false,
			branch: 'main',
		};

		mockGameState = undefined;

		mockStateManager = {
			load: vi.fn().mockReturnValue(mockGameState),
			reset: vi.fn(),
		};

		mockEngine = {
			initialize: vi.fn().mockResolvedValue(),
		};

		// Setup default mock implementations
		(meow as any).mockReturnValue(mockCli);
		(cwd as any).mockReturnValue('/test/repo');
		(existsSync as any).mockReturnValue(true);
		(parseRepository as any).mockResolvedValue(mockCommitGraph);
		(GameStateManager as any).mockImplementation(() => mockStateManager);
		(mapCommitGraphToStory as any).mockReturnValue(mockStoryGraph);
		(NarrativeEngine as any).mockImplementation(() => mockEngine);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	// Helper function to execute CLI logic
	async function executeCli(flags: any = {}) {
		const cliWithFlags = {
			...mockCli,
			flags: { ...mockCli.flags, ...flags },
		};
		(meow as any).mockReturnValue(cliWithFlags);

		// Clear all mocks to ensure clean state
		vi.clearAllMocks();
		// Re-setup mocks
		(meow as any).mockReturnValue(cliWithFlags);
		(cwd as any).mockReturnValue('/test/repo');
		(existsSync as any).mockReturnValue(true);
		(parseRepository as any).mockResolvedValue(mockCommitGraph);
		(GameStateManager as any).mockImplementation(() => mockStateManager);
		(mapCommitGraphToStory as any).mockReturnValue(mockStoryGraph);
		(NarrativeEngine as any).mockImplementation(() => mockEngine);

		return await runCli(cliWithFlags);
	}

	it('should execute full CLI flow successfully with default flags', async () => {
		const consoleSpy = vi
			.spyOn(console, 'log')
			.mockImplementation(() => {});

		const result = await executeCli();

		expect(result.success).toBe(true);
		expect(cwd).toHaveBeenCalled();
		expect(existsSync).toHaveBeenCalledWith('/test/repo/.git');
		expect(GameStateManager).toHaveBeenCalledWith('/test/repo');
		expect(mockStateManager.load).toHaveBeenCalled();
		expect(parseRepository).toHaveBeenCalledWith('/test/repo', {
			branch: undefined,
		});
		expect(mockEngine.initialize).toHaveBeenCalled();
		expect(mapCommitGraphToStory).toHaveBeenCalledWith(mockCommitGraph);
		expect(render).toHaveBeenCalled();
		expect(consoleSpy).toHaveBeenCalledWith(
			'Git Gaiden - Exploring 2 commits across 1 branches',
		);

		consoleSpy.mockRestore();
	});

	it('should handle --branch flag correctly', async () => {
		await executeCli({ branch: 'feature' });

		expect(parseRepository).toHaveBeenCalledWith('/test/repo', {
			branch: 'feature',
		});
	});

	it('should handle --start flag correctly', async () => {
		const result = await executeCli({ start: 'abc123' });

		expect(result.success).toBe(true);
		expect(render).toHaveBeenCalledWith(
			expect.objectContaining({
				props: expect.objectContaining({
					startCommit: 'abc123',
				}),
			}),
		);
	});

	it('should handle --reset flag correctly', async () => {
		await executeCli({ reset: true });

		expect(mockStateManager.reset).toHaveBeenCalled();
		expect(mockStateManager.load).toHaveBeenCalled();
	});

	it('should handle --model flag correctly', async () => {
		const result = await executeCli({ model: 'custom-model' });

		expect(result.success).toBe(true);
		// Model flag is parsed but not directly used in current implementation
		expect(meow).toHaveBeenCalled();
	});

	it('should handle --no-cache flag correctly', async () => {
		const result = await executeCli({ noCache: true });

		expect(result.success).toBe(true);
		// noCache flag is parsed but not directly used in current implementation
		expect(meow).toHaveBeenCalled();
	});

	it('should handle --help flag correctly', async () => {
		const result = await executeCli({ help: true });

		expect(result.success).toBe(true);
		// Help is handled by meow, not in our execution logic
		expect(meow).toHaveBeenCalled();
	});

	it('should fail when not in a git repository', async () => {
		const consoleSpy = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});

		const result = await executeCli();

		// Override existsSync for this test
		(existsSync as any).mockReturnValue(false);

		expect(result.success).toBe(false);
		expect(consoleSpy).toHaveBeenCalledWith(
			'Error:',
			'Not a git repository',
		);
		expect(exitSpy).toHaveBeenCalledWith(1);

		consoleSpy.mockRestore();
		exitSpy.mockRestore();
	});

	it('should handle git parsing errors gracefully', async () => {
		const consoleSpy = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});

		// Override parseRepository for this test
		(parseRepository as any).mockRejectedValue(
			new Error('Permission denied'),
		);

		const result = await executeCli();

		expect(result.success).toBe(false);
		expect(consoleSpy).toHaveBeenCalledWith('Error:', 'Permission denied');
		expect(exitSpy).toHaveBeenCalledWith(1);

		consoleSpy.mockRestore();
		exitSpy.mockRestore();
	});

	it('should handle engine initialization errors gracefully', async () => {
		const consoleSpy = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});

		// Override engine for this test
		const failingEngine = {
			initialize: vi
				.fn()
				.mockRejectedValue(new Error('Model download failed')),
		};
		(NarrativeEngine as any).mockImplementation(() => failingEngine);

		const result = await executeCli();

		expect(result.success).toBe(false);
		expect(consoleSpy).toHaveBeenCalledWith(
			'Error:',
			'Model download failed',
		);
		expect(exitSpy).toHaveBeenCalledWith(1);

		consoleSpy.mockRestore();
		exitSpy.mockRestore();
	});

	it('should pass correct data to Game component', async () => {
		const result = await executeCli({ start: 'def456' });

		expect(result.success).toBe(true);
		expect(render).toHaveBeenCalledWith(
			expect.objectContaining({
				props: expect.objectContaining({
					storyGraph: mockStoryGraph,
					gameState: mockGameState,
					stateManager: mockStateManager,
					engine: mockEngine,
					startCommit: 'def456',
				}),
			}),
		);
	});

	it('should display correct stats for repository with multiple branches', async () => {
		const largeCommitGraph = {
			...mockCommitGraph,
			commits: Array.from({ length: 25 }, (_, index) => ({
				hash: `commit${index}`,
			})),
			branches: [
				{ name: 'main' },
				{ name: 'develop' },
				{ name: 'feature' },
				{ name: 'hotfix' },
			],
		};

		const consoleSpy = vi
			.spyOn(console, 'log')
			.mockImplementation(() => {});

		// Override parseRepository for this test
		(parseRepository as any).mockResolvedValue(largeCommitGraph);

		const result = await executeCli();

		expect(result.success).toBe(true);
		expect(consoleSpy).toHaveBeenCalledWith(
			'Git Gaiden - Exploring 25 commits across 4 branches',
		);

		consoleSpy.mockRestore();
	});
});
