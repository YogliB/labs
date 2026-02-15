import { createSignal } from 'solid-js';

const predefinedRepos = [
	{ name: 'React', owner: 'facebook', repo: 'react' },
	{ name: 'Vue.js', owner: 'vuejs', repo: 'vue' },
	{ name: 'Angular', owner: 'angular', repo: 'angular' },
	{ name: 'VS Code', owner: 'microsoft', repo: 'vscode' },
	{ name: 'Node.js', owner: 'nodejs', repo: 'node' },
];

export default function RepoSelector() {
	const [selectedRepo, setSelectedRepo] = createSignal('');
	const [customRepo, setCustomRepo] = createSignal('');

	const handleSelect = (repo: string) => {
		setSelectedRepo(repo);
		setCustomRepo('');
	};

	const handleCustom = () => {
		setSelectedRepo('custom');
	};

	const getSelectedValue = () => {
		if (selectedRepo() === 'custom') {
			return customRepo();
		}
		return selectedRepo();
	};

	return (
		<div class="min-h-screen bg-black text-green-400 font-mono p-8">
			<div class="max-w-4xl mx-auto">
				<h1 class="text-3xl font-bold mb-8 text-center">
					Select Repository to Crawl
				</h1>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
					{predefinedRepos.map((repo) => (
						<div
							class={`card bg-gray-800 border-2 cursor-pointer transition-colors ${
								selectedRepo() === `${repo.owner}/${repo.repo}`
									? 'border-green-400'
									: 'border-gray-600 hover:border-green-300'
							}`}
							onClick={() =>
								handleSelect(`${repo.owner}/${repo.repo}`)
							}
						>
							<div class="card-body p-4">
								<h3 class="card-title text-lg">{repo.name}</h3>
								<p class="text-sm opacity-75">
									{repo.owner}/{repo.repo}
								</p>
							</div>
						</div>
					))}
				</div>
				<div class="mb-8">
					<div
						class={`card bg-gray-800 border-2 cursor-pointer transition-colors ${
							selectedRepo() === 'custom'
								? 'border-green-400'
								: 'border-gray-600 hover:border-green-300'
						}`}
						onClick={handleCustom}
					>
						<div class="card-body p-4">
							<h3 class="card-title text-lg">
								Custom Repository
							</h3>
							<p class="text-sm opacity-75">
								Enter your own GitHub repo
							</p>
						</div>
					</div>
					{selectedRepo() === 'custom' && (
						<div class="mt-4">
							<input
								type="text"
								placeholder="owner/repo"
								value={customRepo()}
								onInput={(event) =>
									setCustomRepo(event.target.value)
								}
								class="input input-bordered w-full"
							/>
						</div>
					)}
				</div>
				<div class="text-center">
					<button
						class="btn btn-primary"
						disabled={!getSelectedValue()}
					>
						Start Crawling
					</button>
				</div>
			</div>
		</div>
	);
}
