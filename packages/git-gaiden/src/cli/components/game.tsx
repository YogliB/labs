import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import type { StoryNode } from '../../game/types.js';
import type { Scene, Choice } from '../../narrative/types.js';
import type { GameStateManager } from '../../game/state.js';
import type { NarrativeEngine } from '../../narrative/engine.js';
import { SceneView } from './scene-view.js';
import { ProgressBar } from './progress-bar.js';
import { LoadingScreen } from './loading-screen.js';

interface GameProperties {
	storyGraph: StoryNode;
	stateManager: GameStateManager;
	engine: NarrativeEngine;
}

export function Game({
	storyGraph,
	stateManager,
	engine,
}: GameProperties): React.ReactElement {
	const [currentNode, setCurrentNode] = useState<StoryNode>(storyGraph);
	const [scene, setScene] = useState<Scene | undefined>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | undefined>();

	useEffect(() => {
		loadScene(currentNode);
	}, [currentNode]);

	const loadScene = async (node: StoryNode): Promise<void> => {
		setLoading(true);
		setError(undefined);
		try {
			// Find commit from graph (stub: assume commits are available)
			const commit = {
				hash: node.commitHash,
				message: 'Sample commit',
				author: 'Author',
				date: '2023-01-01',
				parents: [],
				files: [],
				stats: { filesChanged: 1, insertions: 10, deletions: 5 },
			};
			const context = {
				previousCommits: [],
				branchName: node.branch,
				contributorInfo: 'Contributor',
			};
			const generatedScene = await engine.generateScene(commit, context);
			setScene(generatedScene);
		} catch (error_) {
			setError(
				error_ instanceof Error ? error_.message : 'Unknown error',
			);
		} finally {
			setLoading(false);
		}
	};

	const handleChoice = (): void => {
		// Stub: navigate to next node
		if (currentNode.children.length > 0) {
			setCurrentNode(currentNode.children[0]);
		}
	};

	useInput((input, key) => {
		if (key.ctrl && input === 'c') {
			throw new Error('User requested exit');
		}
		if (input === 'r') {
			stateManager.reset();
			setCurrentNode(storyGraph);
		}
		if (input === 'h') {
			// Show help
		}
	});

	if (loading) {
		return <LoadingScreen />;
	}

	if (error) {
		return (
			<Box flexDirection="column">
				<Text color="red">Error: {error}</Text>
				<Text>Press Ctrl+C to exit</Text>
			</Box>
		);
	}

	if (!scene) {
		return <Text>No scene loaded</Text>;
	}

	return (
		<Box flexDirection="column" height="100%">
			<ProgressBar
				current={1}
				total={10}
				branch={currentNode.branch}
				elapsed={0}
			/>
			<SceneView scene={scene} />
			<ChoiceList choices={scene.choices} onSelect={handleChoice} />
		</Box>
	);
}

interface ChoiceListProperties {
	choices: readonly Choice[];
	onSelect: () => void;
}

function ChoiceList({ choices, onSelect }: ChoiceListProperties) {
	const [selectedIndex, setSelectedIndex] = useState(0);

	useInput((input, key) => {
		if (key.upArrow) {
			setSelectedIndex(Math.max(0, selectedIndex - 1));
		} else if (key.downArrow) {
			setSelectedIndex(Math.min(choices.length - 1, selectedIndex + 1));
		} else if (key.return) {
			onSelect();
		}
	});

	return (
		<Box flexDirection="column" marginTop={1}>
			<Text>Use ↑↓ to navigate, Enter to select:</Text>
			{choices.map((choice, index) => {
				let color: string;
				if (choice.type === 'safe') {
					color = 'green';
				} else if (choice.type === 'risky') {
					color = 'yellow';
				} else {
					color = 'blue';
				}
				return (
					<Text
						key={choice.id}
						color={index === selectedIndex ? 'cyan' : color}
					>
						{index === selectedIndex ? '→ ' : '  '}
						{choice.label}
					</Text>
				);
			})}
		</Box>
	);
}
