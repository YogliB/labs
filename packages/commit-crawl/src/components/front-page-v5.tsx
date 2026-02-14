import { A } from '@solidjs/router';

export default function FrontPageV5() {
	return (
		<div class="min-h-screen bg-gray-900 text-white overflow-hidden">
			<div class="relative h-screen flex items-center justify-center">
				{/* Background SVG */}
				<svg
					class="absolute inset-0 w-full h-full opacity-20"
					viewBox="0 0 800 600"
				>
					<g stroke="currentColor" stroke-width="2" fill="none">
						{/* Commit nodes */}
						<circle cx="400" cy="300" r="8" class="fill-blue-400" />
						<circle
							cx="350"
							cy="250"
							r="6"
							class="fill-green-400"
						/>
						<circle
							cx="450"
							cy="250"
							r="6"
							class="fill-green-400"
						/>
						<circle
							cx="300"
							cy="200"
							r="5"
							class="fill-yellow-400"
						/>
						<circle
							cx="500"
							cy="200"
							r="5"
							class="fill-yellow-400"
						/>
						<circle cx="250" cy="150" r="4" class="fill-red-400" />
						<circle cx="550" cy="150" r="4" class="fill-red-400" />

						{/* Connections */}
						<path d="M400 300 L350 250" />
						<path d="M400 300 L450 250" />
						<path d="M350 250 L300 200" />
						<path d="M450 250 L500 200" />
						<path d="M300 200 L250 150" />
						<path d="M500 200 L550 150" />
					</g>
				</svg>

				<div class="relative z-10 text-center">
					<h1 class="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
						Commit Crawl
					</h1>
					<p class="text-xl mb-8 opacity-75">
						Navigate the branches of code history
					</p>
					<div class="flex flex-col gap-4">
						<button class="btn btn-primary btn-lg px-8">
							Enter the Graph
						</button>
						<button class="btn btn-ghost">Resume Journey</button>
					</div>
					<div class="mt-12">
						<A
							href="/about"
							class="text-sm opacity-50 hover:opacity-100"
						>
							What is Commit Crawl?
						</A>
					</div>
				</div>
			</div>
		</div>
	);
}
