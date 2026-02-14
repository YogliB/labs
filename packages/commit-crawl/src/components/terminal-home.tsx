import { A } from '@solidjs/router';

export default function TerminalHome() {
	return (
		<div class="min-h-screen bg-black text-green-400 font-mono p-8">
			<div class="max-w-4xl mx-auto">
				<div class="mb-8">
					<div class="text-center text-4xl font-bold mb-4">
						Commit Crawl
					</div>
					<div class="text-center text-xl mb-8">Terminal Edition</div>
				</div>
				<div class="space-y-4">
					<div>
						<span class="text-green-300">$ </span>
						git clone https://github.com/facebook/react.git
					</div>
					<div>
						<span class="text-green-300">$ </span>
						cd react
					</div>
					<div>
						<span class="text-green-300">$ </span>
						git log --oneline --graph | head -20
					</div>
					<div class="text-yellow-400">
						<div>* 1234567 (HEAD → main) Fix some bug</div>
						<div>* 2345678 Add new feature</div>
						<div>* 3456789 Update docs</div>
						<div>...</div>
					</div>
					<div>
						<span class="text-green-300">$ </span>
						<span class="animate-pulse">commit-crawl --start</span>
					</div>
				</div>
				<div class="mt-12 flex flex-col gap-4">
					<button class="bg-green-600 hover:bg-green-500 text-black px-6 py-3 rounded font-bold">
						Start Crawling
					</button>
					<button class="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded">
						Load Previous Session
					</button>
				</div>
				<div class="mt-8 text-sm opacity-75">
					<A href="/about" class="text-green-300 underline">
						About Commit Crawl
					</A>
				</div>
			</div>
		</div>
	);
}
