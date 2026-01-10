#!/usr/bin/env node

import 'core-js/actual/array/to-sorted.js';
import { existsSync } from 'node:fs';
import { cwd } from 'node:process';
import meow from 'meow';
import { render } from 'ink';
import { parseRepository } from '../git/parser.js';
import { GameStateManager } from '../game/state.js';
import { mapCommitGraphToStory } from '../game/mapper.js';
import { NarrativeEngine } from '../narrative/engine.js';
import { Game } from './components/game.js';

export async function runCli(flags: {
	branch?: string;
	start?: string;
	model: string;
	reset: boolean;
	noCache: boolean;
}): Promise<void> {
	try {
		// Validate repo
		const repoPath = cwd();
		if (!existsSync(`${repoPath}/.git`)) {
			throw new Error('Not a git repository');
		}

		// Load state
		const stateManager = new GameStateManager(repoPath);
		if (flags.reset) {
			stateManager.reset();
		}
		const gameState = stateManager.load();

		// Parse git
		const commitGraph = await parseRepository(repoPath, {
			branch: flags.branch,
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
				startCommit={flags.start}
			/>,
		);
	} catch (error) {
		console.error(
			'Error:',
			error instanceof Error ? error.message : String(error),
		);
		process.exit(1);
	}
}

const cli = meow(
	`
	Usage
	  $ gaiden [options]

	Options
	  --branch, -b    Filter by branch name
	  --start         Start commit hash to begin from
	  --model         Model to use for narrative generation (default: phi-3.5-mini)
	  --reset         Reset game state
	  --no-cache      Disable scene caching
	  --help          Show this help message
	  --version       Show version number

	Examples
	  $ gaiden
	  $ gaiden --branch main
	  $ gaiden --reset
`,
	{
		importMeta: import.meta,
		flags: {
			branch: {
				type: 'string',
				shortFlag: 'b',
			},
			start: {
				type: 'string',
			},
			model: {
				type: 'string',
				default: 'phi-3.5-mini',
			},
			reset: {
				type: 'boolean',
			},
			noCache: {
				type: 'boolean',
			},
		},
	},
);

if (import.meta.url === `file://${process.argv[1]}`) {
	await runCli(cli.flags);
}
