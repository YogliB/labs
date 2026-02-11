import 'virtual:uno.css';
import 'daisyui/dist/full.css';

import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import Nav from '~/components/nav';

export default function App() {
	return (
		<Router
			root={(properties) => (
				<>
					<Nav />
					<Suspense>{properties.children}</Suspense>
				</>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
