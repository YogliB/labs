import 'virtual:uno.css';
import 'daisyui/dist/full.css';
import './styles/terminal-theme.css';

import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';

export default function App() {
	return (
		<div data-theme="terminal">
			<Router
				root={(properties) => (
					<>
						<Suspense>{properties.children}</Suspense>
					</>
				)}
			>
				<FileRoutes />
			</Router>
		</div>
	);
}
