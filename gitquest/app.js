const GITHUB_API_BASE = 'https://api.github.com';
const TOKEN_STORAGE_KEY = 'gitquest:githubToken';

const DEFAULT_TOP_REPO_COUNT = 10;
const COMMITS_PER_PAGE = 30;
const MAX_FILES_TO_RENDER = 20;

/** @typedef {{ owner: { login: string }, name: string, full_name: string, stargazers_count: number, description: string | undefined, default_branch: string | undefined }} Repo */

function mustGetElement(id) {
	const element = document.querySelector(`#${id}`);
	if (!element) {
		throw new Error(`Missing element #${id}`);
	}

	return element;
}

const elements = {
	repoCount: /** @type {HTMLSelectElement} */ (mustGetElement('repoCount')),
	repoList: mustGetElement('repoList'),
	refreshRepos: mustGetElement('refreshRepos'),
	status: mustGetElement('status'),
	viewRepos: mustGetElement('view-repos'),
	viewCommits: mustGetElement('view-commits'),
	commitScreen: mustGetElement('commitScreen'),
	backToRepos: mustGetElement('backToRepos'),
	prevCommit: mustGetElement('prevCommit'),
	nextCommit: mustGetElement('nextCommit'),
	token: /** @type {HTMLInputElement} */ (mustGetElement('token')),
	saveToken: mustGetElement('saveToken'),
};

const state = {
	repos: /** @type {Repo[]} */ ([]),
	selectedRepo: /** @type {Repo | undefined} */ (undefined),
	defaultBranch: /** @type {string | undefined} */ (undefined),
	lastPage: 1,
	currentPage: 1,
	currentIndex: 0,
	commitsByPage: /** @type {Map<number, any[]>} */ (new Map()),
	commitDetailsBySha: /** @type {Map<string, any>} */ (new Map()),
	detailsRequestCounter: 0,
};

init();

function init() {
	elements.repoCount.value = String(DEFAULT_TOP_REPO_COUNT);
	elements.token.value = loadToken();

	elements.refreshRepos.addEventListener('click', () => {
		void refreshRepoList();
	});

	elements.saveToken.addEventListener('click', () => {
		saveToken(elements.token.value.trim());
		setStatus('Saved token to local storage.');
	});

	elements.backToRepos.addEventListener('click', () => {
		showRepoListView();
	});

	elements.prevCommit.addEventListener('click', () => {
		void goPrevious();
	});

	elements.nextCommit.addEventListener('click', () => {
		void goNext();
	});

	document.addEventListener('keydown', (event) => {
		const isCommitView = !elements.viewCommits.classList.contains('hidden');
		if (!isCommitView) {
			return;
		}

		const activeElement = document.activeElement;
		const isTyping =
			activeElement instanceof HTMLInputElement ||
			activeElement instanceof HTMLTextAreaElement ||
			activeElement instanceof HTMLSelectElement;
		if (isTyping) {
			return;
		}

		if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'p') {
			event.preventDefault();
			void goPrevious();
			return;
		}

		if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'n') {
			event.preventDefault();
			void goNext();
		}
	});

	void refreshRepoList();
}

async function refreshRepoList() {
	setStatus('Fetching top-starred repositories…');
	showRepoListView();

	const topCount = Number(
		elements.repoCount.value || String(DEFAULT_TOP_REPO_COUNT),
	);
	const repos = await fetchTopStarredRepos(topCount);
	state.repos = repos;
	renderRepoList(repos);
	setStatus('Choose a repository to begin.');
}

function showRepoListView() {
	elements.viewCommits.classList.add('hidden');
	elements.viewRepos.classList.remove('hidden');
	state.selectedRepo = undefined;
	state.commitsByPage.clear();
	state.commitDetailsBySha.clear();
}

function showCommitView() {
	elements.viewRepos.classList.add('hidden');
	elements.viewCommits.classList.remove('hidden');
}

function setStatus(message, { isError = false } = {}) {
	elements.status.textContent = message;
	elements.status.classList.toggle('error', isError);
}

function renderRepoList(repos) {
	elements.repoList.replaceChildren();

	for (const repo of repos) {
		const li = document.createElement('li');
		li.className = 'repo-item';

		const button = document.createElement('button');
		button.type = 'button';
		button.addEventListener('click', () => {
			void selectRepo(repo);
		});

		const title = document.createElement('div');
		title.className = 'repo-title';

		const name = document.createElement('span');
		name.className = 'name';
		name.textContent = repo.full_name;

		const stars = document.createElement('span');
		stars.className = 'stars';
		stars.textContent = `★ ${repo.stargazers_count.toLocaleString()}`;

		title.append(name, stars);

		const desc = document.createElement('p');
		desc.className = 'repo-desc';
		desc.textContent = repo.description || '(no description)';

		button.append(title, desc);
		li.append(button);
		elements.repoList.append(li);
	}
}

async function selectRepo(repo) {
	state.selectedRepo = repo;
	state.defaultBranch = repo.default_branch || 'main';
	state.commitsByPage.clear();
	state.commitDetailsBySha.clear();
	state.detailsRequestCounter = 0;
	showCommitView();

	const owner = repo.owner.login;
	const repoName = repo.name;
	setStatus(`Loading commit history for ${repo.full_name}…`);

	try {
		const lastPage = await fetchLastCommitPage({
			owner,
			repo: repoName,
			sha: state.defaultBranch,
		});
		state.lastPage = lastPage;
		state.currentPage = lastPage;
		await ensureCommitsPageLoaded(state.currentPage);
		state.currentIndex = 0;
		await renderCurrentCommit();
		setStatus(
			`Quest started: ${repo.full_name} (branch: ${state.defaultBranch}).`,
		);
	} catch (error) {
		setStatus(formatError(error), { isError: true });
		elements.commitScreen.textContent = 'Failed to load commit history.';
	}
}

async function goNext() {
	if (!state.selectedRepo) {
		return;
	}

	const commits = state.commitsByPage.get(state.currentPage);
	if (!commits || commits.length === 0) {
		return;
	}

	const isAtEndOfPage = state.currentIndex >= commits.length - 1;
	const hasNewerPage = state.currentPage > 1;

	if (!isAtEndOfPage) {
		state.currentIndex += 1;
		await renderCurrentCommit();
		return;
	}

	if (!hasNewerPage) {
		setStatus('You have reached the latest commit.');
		updateNavButtons();
		return;
	}

	state.currentPage -= 1;
	await ensureCommitsPageLoaded(state.currentPage);
	state.currentIndex = 0;
	await renderCurrentCommit();
}

async function goPrevious() {
	if (!state.selectedRepo) {
		return;
	}

	const commits = state.commitsByPage.get(state.currentPage);
	if (!commits || commits.length === 0) {
		return;
	}

	const isAtStartOfPage = state.currentIndex <= 0;
	const hasOlderPage = state.currentPage < state.lastPage;

	if (!isAtStartOfPage) {
		state.currentIndex -= 1;
		await renderCurrentCommit();
		return;
	}

	if (!hasOlderPage) {
		setStatus('You are at the first commit.');
		updateNavButtons();
		return;
	}

	state.currentPage += 1;
	await ensureCommitsPageLoaded(state.currentPage);
	const olderCommits = state.commitsByPage.get(state.currentPage);
	state.currentIndex = olderCommits
		? Math.max(olderCommits.length - 1, 0)
		: 0;
	await renderCurrentCommit();
}

function updateNavButtons() {
	const commits = state.commitsByPage.get(state.currentPage);
	const commitCount = commits ? commits.length : 0;

	const atFirstCommit =
		state.currentPage === state.lastPage && state.currentIndex === 0;
	const atLatestCommit =
		state.currentPage === 1 && state.currentIndex >= commitCount - 1;

	elements.prevCommit.toggleAttribute('disabled', atFirstCommit);
	elements.nextCommit.toggleAttribute('disabled', atLatestCommit);
}

async function renderCurrentCommit() {
	if (!state.selectedRepo) {
		return;
	}

	const commits = state.commitsByPage.get(state.currentPage);
	if (!commits || commits.length === 0) {
		elements.commitScreen.textContent = 'No commits found.';
		updateNavButtons();
		return;
	}

	const commit = commits[state.currentIndex];
	const owner = state.selectedRepo.owner.login;
	const repo = state.selectedRepo.name;
	const sha = commit.sha;

	const pageInfo = `Page ${state.currentPage}/${state.lastPage}`;
	const commitInfo = `Commit ${state.currentIndex + 1}/${commits.length}`;
	const headerLine = `${state.selectedRepo.full_name}  •  ${pageInfo}  •  ${commitInfo}`;

	elements.commitScreen.textContent = [
		headerLine,
		'-'.repeat(headerLine.length),
		formatCommitSummary(commit),
		'',
		'Loading file summary…',
	].join('\n');

	updateNavButtons();

	const requestId = (state.detailsRequestCounter += 1);

	try {
		const details = await fetchCommitDetails({ owner, repo, sha });
		if (requestId !== state.detailsRequestCounter) {
			return;
		}

		elements.commitScreen.textContent = [
			headerLine,
			'-'.repeat(headerLine.length),
			formatCommitSummary(commit),
			'',
			formatCommitDetails(details),
		].join('\n');
	} catch (error) {
		if (requestId !== state.detailsRequestCounter) {
			return;
		}

		elements.commitScreen.textContent = [
			headerLine,
			'-'.repeat(headerLine.length),
			formatCommitSummary(commit),
			'',
			`(Could not load file summary: ${formatError(error)})`,
		].join('\n');
	}
}

function formatCommitSummary(commit) {
	const message = String(commit.commit?.message || '').trim();
	const firstLine = message.split('\n')[0] || '(no message)';
	const authorName =
		commit.commit?.author?.name || commit.author?.login || 'unknown';
	const authoredAt = commit.commit?.author?.date || 'unknown date';
	const shortSha = String(commit.sha).slice(0, 8);
	const url = commit.html_url || '';

	return [
		`SHA:     ${shortSha}`,
		`Title:   ${firstLine}`,
		`Author:  ${authorName}`,
		`Date:    ${authoredAt}`,
		`URL:     ${url}`,
	].join('\n');
}

function formatCommitDetails(details) {
	const stats = details.stats;
	const files = Array.isArray(details.files) ? details.files : [];

	const lines = [];
	if (stats) {
		lines.push(
			`Stats: +${stats.additions}  -${stats.deletions}  Δ${stats.total}`,
			'',
		);
	}

	if (files.length === 0) {
		lines.push('Files: (no file info)');
		return lines.join('\n');
	}

	lines.push(`Files changed (${files.length}):`);
	for (const file of files.slice(0, MAX_FILES_TO_RENDER)) {
		lines.push(
			`- ${file.filename}  (${file.status})  +${file.additions} -${file.deletions} Δ${file.changes}`,
		);
	}

	if (files.length > MAX_FILES_TO_RENDER) {
		lines.push(`… and ${files.length - MAX_FILES_TO_RENDER} more`);
	}

	return lines.join('\n');
}

async function ensureCommitsPageLoaded(pageNumber) {
	if (!state.selectedRepo) {
		return;
	}

	if (state.commitsByPage.has(pageNumber)) {
		return;
	}

	const owner = state.selectedRepo.owner.login;
	const repo = state.selectedRepo.name;

	setStatus(`Loading commits (page ${pageNumber}/${state.lastPage})…`);
	const commits = await fetchCommitsPage({
		owner,
		repo,
		sha: state.defaultBranch,
		page: pageNumber,
	});
	state.commitsByPage.set(pageNumber, commits);
}

async function fetchTopStarredRepos(limit) {
	const perPage = Math.min(Math.max(limit, 1), 10);
	const url = new URL(`${GITHUB_API_BASE}/search/repositories`);
	url.searchParams.set('q', 'stars:>1');
	url.searchParams.set('sort', 'stars');
	url.searchParams.set('order', 'desc');
	url.searchParams.set('per_page', String(perPage));

	const response = await githubFetch(url);
	const data = await response.json();

	if (!data.items || !Array.isArray(data.items)) {
		throw new Error('Unexpected GitHub response.');
	}

	return /** @type {Repo[]} */ (data.items);
}

async function fetchLastCommitPage({ owner, repo, sha }) {
	const url = new URL(`${GITHUB_API_BASE}/repos/${owner}/${repo}/commits`);
	url.searchParams.set('sha', sha);
	url.searchParams.set('per_page', '1');
	url.searchParams.set('page', '1');

	const response = await githubFetch(url);
	const link = response.headers.get('link') || '';
	const lastPage = parseLastPageNumber(link);

	return lastPage;
}

function parseLastPageNumber(linkHeader) {
	if (!linkHeader) {
		return 1;
	}

	const parts = linkHeader.split(',');
	for (const part of parts) {
		const [rawUrl, ...rawParameters] = part.trim().split(';');
		const parameters = rawParameters.map((value) => value.trim());

		if (!parameters.includes('rel="last"')) {
			continue;
		}

		const urlString = rawUrl.trim();
		if (!urlString.startsWith('<') || !urlString.endsWith('>')) {
			continue;
		}

		const url = new URL(urlString.slice(1, -1));
		const page = Number(url.searchParams.get('page') || '1');
		return Number.isFinite(page) && page > 0 ? page : 1;
	}

	return 1;
}

async function fetchCommitsPage({ owner, repo, sha, page }) {
	const url = new URL(`${GITHUB_API_BASE}/repos/${owner}/${repo}/commits`);
	url.searchParams.set('sha', sha);
	url.searchParams.set('per_page', String(COMMITS_PER_PAGE));
	url.searchParams.set('page', String(page));

	const response = await githubFetch(url);
	const commits = await response.json();

	if (!Array.isArray(commits)) {
		throw new TypeError('Unexpected commit list response.');
	}

	if (typeof commits.toReversed === 'function') {
		return commits.toReversed();
	}

	const reversedCommits = [];
	for (let index = commits.length - 1; index >= 0; index -= 1) {
		reversedCommits.push(commits[index]);
	}

	return reversedCommits;
}

async function fetchCommitDetails({ owner, repo, sha }) {
	const cached = state.commitDetailsBySha.get(sha);
	if (cached) {
		return cached;
	}

	const url = new URL(
		`${GITHUB_API_BASE}/repos/${owner}/${repo}/commits/${sha}`,
	);
	const response = await githubFetch(url);
	const details = await response.json();

	state.commitDetailsBySha.set(sha, details);
	return details;
}

async function githubFetch(url) {
	const token = loadToken();
	const headers = {
		Accept: 'application/vnd.github+json',
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	const response = await fetch(String(url), {
		headers,
	});

	if (response.ok) {
		return response;
	}

	let details = '';
	try {
		const body = await response.json();
		details = body && typeof body.message === 'string' ? body.message : '';
	} catch {
		details = '';
	}

	const remaining = response.headers.get('x-ratelimit-remaining');
	const reset = response.headers.get('x-ratelimit-reset');
	const rateInfo = remaining ? ` (rate remaining: ${remaining})` : '';
	const resetInfo = reset
		? ` (reset: ${new Date(Number(reset) * 1000).toISOString()})`
		: '';

	throw new Error(
		`GitHub API error ${response.status}: ${details || response.statusText}${rateInfo}${resetInfo}`,
	);
}

function loadToken() {
	try {
		return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
	} catch {
		return '';
	}
}

function saveToken(token) {
	try {
		if (token) {
			localStorage.setItem(TOKEN_STORAGE_KEY, token);
		} else {
			localStorage.removeItem(TOKEN_STORAGE_KEY);
		}
	} catch {
		// Ignore storage errors.
	}
}

function formatError(error) {
	if (error instanceof Error) {
		return error.message;
	}

	return String(error);
}
