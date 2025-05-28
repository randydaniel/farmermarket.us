<script>
	import Button from '$lib/components/Button.svelte';
	import { EnvelopeSimple, NyTimesLogo } from 'phosphor-svelte';
</script>

<footer class="border-t border-slate-200 py-11">
	<div class="container mx-auto">
		<div class="flex justify-between">
			<!-- Left Side -->
			<div class="flex flex-col gap-4">
				<div class="flex max-w-sm flex-col gap-8">
					<h2 class="flex items-center gap-1 text-lg leading-none font-medium text-slate-950">
						<NyTimesLogo size={24} />
						Resources Directory
					</h2>
					<p class="text-sm leading-normal font-light text-slate-600">
						All the tools &amp; resources you need, in one place. Boost productivity, unleash
						creativity, and simplify tasks with our curated collection.
					</p>
				</div>
				<div class="flex max-w-sm flex-col gap-2">
					<p class="text-sm leading-normal font-light text-slate-600">
						Looking to promote your resource or sponsor your service? Contact us.
					</p>
					<Button variant="primary" leftIcon={{ component: EnvelopeSimple, props: { size: 16 } }}
						>Contact</Button
					>
				</div>
			</div>
			<!-- Right Side -->
			<div class="flex flex-row gap-24">
				<div class="flex flex-col gap-2">
					<h3 class="text-lg leading-none font-medium text-slate-950">Links</h3>
					<ul class="flex flex-col gap-1">
						<li>
							<a
								href="/"
								class="text-sm leading-normal font-light text-slate-600 transition-all duration-300 hover:text-slate-950 hover:underline hover:decoration-dotted"
								>Directory</a
							>
						</li>
						<li>
							<a
								href="/"
								class="text-sm leading-normal font-light text-slate-600 transition-all duration-300 hover:text-slate-950 hover:underline hover:decoration-dotted"
								>FAQ</a
							>
						</li>
					</ul>
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="text-lg leading-none font-medium text-slate-950">Sites</h3>
					<ul class="flex flex-col gap-1">
						<li>
							<a
								href="/"
								class="text-sm leading-normal font-light text-slate-600 transition-all duration-300 hover:text-slate-950 hover:underline hover:decoration-dotted"
								>Terms of use</a
							>
						</li>
						<li>
							<a
								href="/"
								class="text-sm leading-normal font-light text-slate-600 transition-all duration-300 hover:text-slate-950 hover:underline hover:decoration-dotted"
								>Privacy Policy</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</footer>
