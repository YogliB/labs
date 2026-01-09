import React from 'react';
import { Box, Text } from 'ink';
import type { Choice } from '../../narrative/types.js';

interface SceneViewProperties {
	scene: {
		id: string;
		sceneText: string;
		choices: readonly Choice[];
	};
}

export function SceneView({ scene }: SceneViewProperties): React.ReactElement {
	return (
		<Box flexDirection="column" marginY={1}>
			<Text>{scene.sceneText}</Text>
			<Text dimColor>Commit: {scene.id.slice(0, 7)}</Text>
		</Box>
	);
}
