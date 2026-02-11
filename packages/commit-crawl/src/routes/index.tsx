import { A } from '@solidjs/router';
import Counter from '~/components/counter';

export default function Home() {
	return (
		<div class="min-h-screen bg-base-200">
			<div class="hero min-h-screen">
				<div class="hero-content text-center">
					<div class="max-w-md">
						<h1 class="text-5xl font-bold text-primary">
							Commit Crawl
						</h1>
						<p class="py-6 text-lg">
							Embark on a textual adventure through the world of
							commits!
						</p>
						<div class="flex flex-col gap-4">
							<button class="btn btn-primary btn-lg">
								Start New Game
							</button>
							<button class="btn btn-secondary">Load Game</button>
						</div>
						<div class="mt-8">
							<Counter />
						</div>
						<p class="mt-4 text-sm opacity-75">
							Built with SolidJS, UnoCSS, and DaisyUI.
						</p>
						<p class="my-4">
							<A href="/about" class="link link-primary">
								About
							</A>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
