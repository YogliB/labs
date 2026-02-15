import { createSignal } from 'solid-js';

const predefinedRepos = [
	{ name: 'React', owner: 'facebook', repo: 'react' },
	{ name: 'Vue.js', owner: 'vuejs', repo: 'vue' },
	{ name: 'Angular', owner: 'angular', repo: 'angular' },
	{ name: 'VS Code', owner: 'microsoft', repo: 'vscode' },
	{ name: 'Node.js', owner: 'nodejs', repo: 'node' },
];

export default function RepoSelectorVariation3() {
	const [selectedRepo, setSelectedRepo] = createSignal('');
	const [customRepo, setCustomRepo] = createSignal('');

	const handleSelect = (event: Event & { target: HTMLSelectElement }) => {
		const value = event.target.value;
		if (value === 'custom') {
			setSelectedRepo('custom');
		} else {
			setSelectedRepo(value);
			setCustomRepo('');
		}
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
					<div>
						<label class="block text-xl mb-2">
							Choose a repository:
						</label>
						<select
							class="select select-bordered w-full"
							onChange={handleSelect}
							value={
								selectedRepo() === 'custom'
									? 'custom'
									: selectedRepo()
							}
						>
							<option value="">Select a repository...</option>
							{predefinedRepos.map((repo) => (
								<option value={`${repo.owner}/${repo.repo}`}>
									{repo.name} ({repo.owner}/{repo.repo})
								</option>
							))}
							<option value="custom">Custom Repository</option>
						</select>
					</div>
					{selectedRepo() === 'custom' && (
						<div>
							<label class="block text-lg mb-2">
								Enter GitHub repository (owner/repo):
							</label>
							<input
								type="text"
								placeholder="e.g., facebook/react"
								value={customRepo()}
								onInput={(event) =>
									setCustomRepo(event.target.value)
								}
								class="input input-bordered w-full"
							/>
						</div>
					)}
				</div>
				<div class="mt-8 text-center">
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
