// @refresh reload
import { mount, StartClient } from '@solidjs/start/client';

const app = document.querySelector('#app');
if (app) {
	mount(() => <StartClient />, app);
}
