import { createSignal } from 'solid-js';

const predefinedRepos = [
	{ name: 'React', owner: 'facebook', repo: 'react' },
	{ name: 'Vue.js', owner: 'vuejs', repo: 'vue' },
	{ name: 'Angular', owner: 'angular', repo: 'angular' },
	{ name: 'VS Code', owner: 'microsoft', repo: 'vscode' },
	{ name: 'Node.js', owner: 'nodejs', repo: 'node' },
];

export default function RepoSelectorVariation1() {
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
			<div class="max-w-2xl mx-auto">
				<h1 class="text-3xl font-bold mb-8 text-center">
					Select Repository to Crawl
				</h1>
				<div class="space-y-4">
					<h2 class="text-xl mb-4">
						Choose from popular repositories:
					</h2>
					{predefinedRepos.map((repo) => (
						<label class="flex items-center space-x-3 cursor-pointer">
							<input
								type="radio"
								name="repo"
								value={`${repo.owner}/${repo.repo}`}
								checked={
									selectedRepo() ===
									`${repo.owner}/${repo.repo}`
								}
								onChange={() =>
									handleSelect(`${repo.owner}/${repo.repo}`)
								}
								class="radio radio-primary"
							/>
							<span>
								{repo.name} ({repo.owner}/{repo.repo})
							</span>
						</label>
					))}
					<label class="flex items-center space-x-3 cursor-pointer">
						<input
							type="radio"
							name="repo"
							value="custom"
							checked={selectedRepo() === 'custom'}
							onChange={handleCustom}
							class="radio radio-primary"
						/>
						<span>Custom Repository</span>
					</label>
					{selectedRepo() === 'custom' && (
						<input
							type="text"
							placeholder="owner/repo"
							value={customRepo()}
							onInput={(event) =>
								setCustomRepo(event.target.value)
							}
							class="input input-bordered w-full"
						/>
					)}
				</div>
				<div class="mt-8">
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
