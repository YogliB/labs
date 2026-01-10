import React from 'react';
import { Box, Text } from 'ink';

export function LoadingScreen(): React.ReactElement {
	return (
		<Box
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="100%"
		>
			<Text>Loading scene...</Text>
		</Box>
	);
}
