import { createSignal } from 'solid-js';

const predefinedRepos = [
	{ name: 'React', owner: 'facebook', repo: 'react' },
	{ name: 'Vue.js', owner: 'vuejs', repo: 'vue' },
	{ name: 'Angular', owner: 'angular', repo: 'angular' },
	{ name: 'VS Code', owner: 'microsoft', repo: 'vscode' },
	{ name: 'Node.js', owner: 'nodejs', repo: 'node' },
];

export default function RepoSelectorVariation5() {
	const [selectedRepo, setSelectedRepo] = createSignal('');
	const [customRepo, setCustomRepo] = createSignal('');
	const [isModalOpen, setIsModalOpen] = createSignal(false);

	const handleSelect = (repo: string) => {
		setSelectedRepo(repo);
		setCustomRepo('');
		setIsModalOpen(false);
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
		<div class="min-h-screen bg-black text-green-400 font-mono p-8 flex items-center justify-center">
			<div class="text-center">
				<h1 class="text-4xl font-bold mb-8">Commit Crawl</h1>
				<p class="text-xl mb-8">Interactive Git Commit Exploration</p>
				<div class="mb-8">
					{selectedRepo() && (
						<div class="text-lg mb-4">
							Selected: {getSelectedValue()}
						</div>
					)}
				</div>
				<button
					class="btn btn-primary btn-lg"
					onClick={() => setIsModalOpen(true)}
				>
					Select Repository
				</button>
			</div>

			<input
				type="checkbox"
				id="repo-modal"
				class="modal-toggle"
				checked={isModalOpen()}
				onChange={() => setIsModalOpen(!isModalOpen())}
			/>
			<div class="modal">
				<div class="modal-box bg-gray-900 text-green-400">
					<h3 class="font-bold text-lg mb-4">
						Choose Repository to Crawl
					</h3>
					<div class="space-y-4">
						<div>
							<h4 class="font-semibold mb-2">
								Popular Repositories:
							</h4>
							<div class="grid grid-cols-1 gap-2">
								{predefinedRepos.map((repo) => (
									<button
										class="btn btn-outline btn-sm justify-start"
										onClick={() =>
											handleSelect(
												`${repo.owner}/${repo.repo}`,
											)
										}
									>
										{repo.name} ({repo.owner}/{repo.repo})
									</button>
								))}
							</div>
						</div>
						<div>
							<h4 class="font-semibold mb-2">
								Or enter custom repository:
							</h4>
							<div class="flex space-x-2">
								<input
									type="text"
									placeholder="owner/repo"
									value={customRepo()}
									onInput={(event) =>
										setCustomRepo(event.target.value)
									}
									class="input input-bordered flex-1"
								/>
								<button
									class="btn btn-primary"
									onClick={handleCustom}
									disabled={!customRepo()}
								>
									Use Custom
								</button>
							</div>
						</div>
					</div>
					<div class="modal-action">
						<label for="repo-modal" class="btn">
							Close
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
