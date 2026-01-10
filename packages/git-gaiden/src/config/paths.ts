import { platform, homedir } from 'node:os';
import path from 'node:path';

function getXdgDataHome(): string {
	return process.env.XDG_DATA_HOME || path.join(homedir(), '.local', 'share');
}

function getXdgCacheHome(): string {
	return process.env.XDG_CACHE_HOME || path.join(homedir(), '.cache');
}

function getMacAppSupport(): string {
	return path.join(homedir(), 'Library', 'Application Support');
}

function getWindowsAppData(): string {
	return process.env.APPDATA || path.join(homedir(), 'AppData', 'Roaming');
}

function getDataDirectory(): string {
	const plat = platform();
	switch (plat) {
		case 'linux': {
			return path.join(getXdgDataHome(), 'git-gaiden');
		}
		case 'darwin': {
			return path.join(getMacAppSupport(), 'git-gaiden');
		}
		case 'win32': {
			return path.join(getWindowsAppData(), 'git-gaiden');
		}
		default: {
			return path.join(homedir(), '.git-gaiden');
		}
	}
}

function getCacheDirectory(): string {
	const plat = platform();
	return plat === 'linux'
		? path.join(getXdgCacheHome(), 'git-gaiden')
		: path.join(getDataDirectory(), 'cache');
}

export const modelsDirectory: string = path.join(getDataDirectory(), 'models');
export const cacheDirectory: string = getCacheDirectory();
export const stateDirectory: string = path.join(getDataDirectory(), 'state');
