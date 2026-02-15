import { createSignal } from 'solid-js';

const predefinedRepos = [
	{ name: 'React', owner: 'facebook', repo: 'react', icon: '⚛️' },
	{ name: 'Vue.js', owner: 'vuejs', repo: 'vue', icon: '🟢' },
	{ name: 'Angular', owner: 'angular', repo: 'angular', icon: '🅰️' },
	{ name: 'VS Code', owner: 'microsoft', repo: 'vscode', icon: '💻' },
	{ name: 'Node.js', owner: 'nodejs', repo: 'node', icon: '🟨' },
];

export default function RepoSelectorVariation4() {
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
				<div class="mb-8">
					<div class="text-2xl font-bold mb-4">
						Commit Crawl Terminal
					</div>
					<div class="text-lg mb-4">
						Select a repository to crawl:
					</div>
				</div>
				<div class="space-y-2 mb-8">
					{predefinedRepos.map((repo, index) => (
						<div
							class={`flex items-center space-x-4 p-3 cursor-pointer border-l-4 transition-colors ${
								selectedRepo() === `${repo.owner}/${repo.repo}`
									? 'border-green-400 bg-gray-800'
									: 'border-gray-600 hover:border-green-300'
							}`}
							onClick={() =>
								handleSelect(`${repo.owner}/${repo.repo}`)
							}
						>
							<span class="text-lg">{repo.icon}</span>
							<span class="text-green-300">{index + 1}.</span>
							<span>
								{repo.name} - {repo.owner}/{repo.repo}
							</span>
						</div>
					))}
					<div
						class={`flex items-center space-x-4 p-3 cursor-pointer border-l-4 transition-colors ${
							selectedRepo() === 'custom'
								? 'border-green-400 bg-gray-800'
								: 'border-gray-600 hover:border-green-300'
						}`}
						onClick={handleCustom}
					>
						<span class="text-lg">🔗</span>
						<span class="text-green-300">6.</span>
						<span>Custom Repository</span>
					</div>
					{selectedRepo() === 'custom' && (
						<div class="ml-12 mt-2">
							<span class="text-green-300">
								$ git clone https://github.com/
							</span>
							<input
								type="text"
								placeholder="owner/repo"
								value={customRepo()}
								onInput={(event) =>
									setCustomRepo(event.target.value)
								}
								class="bg-transparent border-none outline-none text-green-400 placeholder-gray-500 ml-2"
							/>
						</div>
					)}
				</div>
				<div class="text-center">
					<button
						class="bg-green-600 hover:bg-green-500 text-black px-6 py-3 rounded font-bold"
						disabled={!getSelectedValue()}
					>
						commit-crawl --start
					</button>
				</div>
			</div>
		</div>
	);
}
