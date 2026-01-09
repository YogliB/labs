import React from 'react';
import { Box, Text } from 'ink';

interface ProgressBarProperties {
	current: number;
	total: number;
	branch: string;
	elapsed: number; // in seconds
}

export function ProgressBar({
	current,
	total,
	branch,
	elapsed,
}: ProgressBarProperties): React.ReactElement {
	const percentage = Math.round((current / total) * 100);
	const barWidth = 20;
	const filled = Math.round((current / total) * barWidth);
	const bar = '█'.repeat(filled) + '░'.repeat(barWidth - filled);

	const minutes = Math.floor(elapsed / 60);
	const seconds = elapsed % 60;
	const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

	return (
		<Box flexDirection="column">
			<Text>
				Progress: {current}/{total} commits ({percentage}%) | Branch:{' '}
				{branch} | Time: {timeString}
			</Text>
			<Text>[{bar}]</Text>
		</Box>
	);
}
